
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, purpose = 'login' } = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check rate limit
    const { data: rateLimitResult } = await supabaseClient.rpc('check_otp_rate_limit', {
      p_email: email,
      p_purpose: purpose
    })

    if (!rateLimitResult.allowed) {
      // Log rate limit attempt
      await supabaseClient.from('otp_audit_logs').insert({
        email,
        action: 'rate_limited',
        purpose,
        ip_address: req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent'),
        metadata: { reason: rateLimitResult.reason }
      })

      return new Response(
        JSON.stringify({ 
          error: 'Too many OTP requests. Please try again later.',
          blocked_until: rateLimitResult.blocked_until
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Set expiry to 10 minutes (adjustable between 5-15 minutes)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()

    // Invalidate any existing OTPs for this email/purpose
    await supabaseClient
      .from('otps')
      .update({ used_at: new Date().toISOString() })
      .eq('email', email)
      .eq('purpose', purpose)
      .is('used_at', null)

    // Insert new OTP
    const { error: insertError } = await supabaseClient
      .from('otps')
      .insert({
        email,
        otp_code: otpCode,
        purpose,
        expires_at: expiresAt,
        max_attempts: 3
      })

    if (insertError) {
      console.error('Error inserting OTP:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to generate OTP' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Log successful generation
    await supabaseClient.from('otp_audit_logs').insert({
      email,
      action: 'generated',
      purpose,
      ip_address: req.headers.get('x-forwarded-for'),
      user_agent: req.headers.get('user-agent'),
      metadata: { expires_at: expiresAt }
    })

    // In a real application, you would send this via email/SMS
    // For now, we'll return it in the response (remove this in production)
    console.log(`OTP for ${email}: ${otpCode}`)

    return new Response(
      JSON.stringify({ 
        message: 'OTP generated successfully',
        // Remove this line in production:
        otp_code: otpCode,
        expires_in_minutes: 10
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
