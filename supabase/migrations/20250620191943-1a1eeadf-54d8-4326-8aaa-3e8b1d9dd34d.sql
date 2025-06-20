
-- Create OTP table for storing one-time passwords
CREATE TABLE public.otps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  purpose TEXT NOT NULL DEFAULT 'login', -- login, password_reset, etc.
  attempts INTEGER NOT NULL DEFAULT 0,
  max_attempts INTEGER NOT NULL DEFAULT 3,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_otps_email_purpose ON public.otps(email, purpose);
CREATE INDEX idx_otps_expires_at ON public.otps(expires_at);

-- Enable RLS
ALTER TABLE public.otps ENABLE ROW LEVEL SECURITY;

-- Create policies for OTP access
CREATE POLICY "Users can view their own OTPs" 
  ON public.otps 
  FOR SELECT 
  USING (auth.uid() = user_id OR email = auth.email());

CREATE POLICY "Service can insert OTPs" 
  ON public.otps 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Service can update OTPs" 
  ON public.otps 
  FOR UPDATE 
  USING (true);

-- Create rate limiting table
CREATE TABLE public.otp_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  purpose TEXT NOT NULL DEFAULT 'login',
  request_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint for rate limiting per email/purpose
CREATE UNIQUE INDEX idx_otp_rate_limits_email_purpose ON public.otp_rate_limits(email, purpose);

-- Enable RLS
ALTER TABLE public.otp_rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policies for rate limiting
CREATE POLICY "Service can manage rate limits" 
  ON public.otp_rate_limits 
  FOR ALL 
  USING (true);

-- Create audit log table for OTP activities
CREATE TABLE public.otp_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  action TEXT NOT NULL, -- 'generated', 'verified', 'failed', 'expired', 'rate_limited'
  purpose TEXT NOT NULL DEFAULT 'login',
  ip_address INET,
  user_agent TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for audit logs
CREATE INDEX idx_otp_audit_logs_email_action ON public.otp_audit_logs(email, action);
CREATE INDEX idx_otp_audit_logs_created_at ON public.otp_audit_logs(created_at);

-- Enable RLS
ALTER TABLE public.otp_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for audit logs
CREATE POLICY "Service can insert audit logs" 
  ON public.otp_audit_logs 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admins can view audit logs" 
  ON public.otp_audit_logs 
  FOR SELECT 
  USING (false); -- Will be updated when admin system is implemented

-- Function to clean up expired OTPs
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.otps 
  WHERE expires_at < now() - INTERVAL '1 day';
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check rate limits
CREATE OR REPLACE FUNCTION public.check_otp_rate_limit(
  p_email TEXT,
  p_purpose TEXT DEFAULT 'login'
)
RETURNS JSONB AS $$
DECLARE
  rate_limit_record RECORD;
  max_requests INTEGER := 5; -- Max 5 OTP requests per hour
  window_minutes INTEGER := 60; -- 1 hour window
BEGIN
  -- Get current rate limit record
  SELECT * INTO rate_limit_record
  FROM public.otp_rate_limits
  WHERE email = p_email AND purpose = p_purpose;
  
  -- If no record exists, create one
  IF rate_limit_record IS NULL THEN
    INSERT INTO public.otp_rate_limits (email, purpose, request_count)
    VALUES (p_email, p_purpose, 1);
    
    RETURN jsonb_build_object(
      'allowed', true,
      'remaining', max_requests - 1
    );
  END IF;
  
  -- Check if we're in a new window
  IF rate_limit_record.window_start < now() - INTERVAL '1 hour' THEN
    -- Reset the window
    UPDATE public.otp_rate_limits
    SET request_count = 1,
        window_start = now(),
        blocked_until = NULL
    WHERE email = p_email AND purpose = p_purpose;
    
    RETURN jsonb_build_object(
      'allowed', true,
      'remaining', max_requests - 1
    );
  END IF;
  
  -- Check if blocked
  IF rate_limit_record.blocked_until IS NOT NULL AND rate_limit_record.blocked_until > now() THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'blocked_until', rate_limit_record.blocked_until,
      'reason', 'rate_limited'
    );
  END IF;
  
  -- Check if limit exceeded
  IF rate_limit_record.request_count >= max_requests THEN
    -- Block for 1 hour
    UPDATE public.otp_rate_limits
    SET blocked_until = now() + INTERVAL '1 hour'
    WHERE email = p_email AND purpose = p_purpose;
    
    RETURN jsonb_build_object(
      'allowed', false,
      'blocked_until', now() + INTERVAL '1 hour',
      'reason', 'rate_limit_exceeded'
    );
  END IF;
  
  -- Increment counter
  UPDATE public.otp_rate_limits
  SET request_count = request_count + 1
  WHERE email = p_email AND purpose = p_purpose;
  
  RETURN jsonb_build_object(
    'allowed', true,
    'remaining', max_requests - rate_limit_record.request_count - 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
