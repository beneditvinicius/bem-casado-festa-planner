
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useOTP } from "@/hooks/useOTP";
import { 
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface OTPVerificationProps {
  email: string;
  purpose?: string;
  onVerified: () => void;
  onCancel?: () => void;
}

export function OTPVerification({ 
  email, 
  purpose = 'login', 
  onVerified, 
  onCancel 
}: OTPVerificationProps) {
  const [otpValue, setOtpValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const { generateOTP, verifyOTP, isLoading } = useOTP();
  const { toast } = useToast();

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    if (otpValue.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP code",
        variant: "destructive"
      });
      return;
    }

    const result = await verifyOTP(email, otpValue, purpose);
    
    if (result.success) {
      onVerified();
    } else {
      setOtpValue('');
      if (result.remaining_attempts !== undefined) {
        setRemainingAttempts(result.remaining_attempts);
      }
    }
  };

  const handleResendOTP = async () => {
    const result = await generateOTP(email, purpose);
    
    if (result.success) {
      setTimeLeft(600); // Reset to 10 minutes
      setCanResend(false);
      setOtpValue('');
      setRemainingAttempts(3);
      
      // Development only - show OTP in console
      if (result.otp_code) {
        console.log('New OTP:', result.otp_code);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">Verify Your Email</h2>
        <p className="text-gray-600 text-sm">
          We've sent a 6-digit code to<br />
          <strong>{email}</strong>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="otp">Enter OTP Code</Label>
          <div className="flex justify-center mt-2">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={(value) => setOtpValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          {timeLeft > 0 ? (
            <p>Code expires in: <strong>{formatTime(timeLeft)}</strong></p>
          ) : (
            <p className="text-red-600">Code has expired</p>
          )}
          
          {remainingAttempts < 3 && (
            <p className="text-orange-600 mt-1">
              {remainingAttempts} attempts remaining
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Button
            onClick={handleVerify}
            disabled={isLoading || otpValue.length !== 6 || timeLeft === 0}
            className="w-full rounded-full bg-[#eb6824] hover:bg-[#d25618]"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Button>

          <Button
            variant="outline"
            onClick={handleResendOTP}
            disabled={isLoading || !canResend}
            className="w-full rounded-full"
          >
            {isLoading ? 'Sending...' : 'Resend OTP'}
          </Button>

          {onCancel && (
            <Button
              variant="ghost"
              onClick={onCancel}
              className="w-full"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-sm text-blue-800 mb-2">Security Notice:</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• OTP expires in 10 minutes for your security</li>
          <li>• Maximum 3 verification attempts per code</li>
          <li>• Limited to 5 OTP requests per hour</li>
          <li>• Never share your OTP with anyone</li>
        </ul>
      </div>
    </div>
  );
}
