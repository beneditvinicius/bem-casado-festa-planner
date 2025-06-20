
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OTPVerification } from "@/components/OTPVerification";
import { useOTP } from "@/hooks/useOTP";

export function OTPDemo() {
  const [email, setEmail] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { generateOTP, isLoading } = useOTP();

  const handleStartVerification = async () => {
    if (!email || !email.includes('@')) {
      return;
    }

    const result = await generateOTP(email, 'demo');
    
    if (result.success) {
      setShowVerification(true);
      
      // Development only - show OTP in console
      if (result.otp_code) {
        console.log('OTP Code:', result.otp_code);
      }
    }
  };

  const handleVerified = () => {
    setIsVerified(true);
    setShowVerification(false);
  };

  const handleReset = () => {
    setEmail('');
    setShowVerification(false);
    setIsVerified(false);
  };

  if (isVerified) {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-50 rounded-2xl shadow-lg text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-green-800">Verification Successful!</h2>
          <p className="text-green-700 mt-2">
            Your email <strong>{email}</strong> has been verified.
          </p>
        </div>
        
        <Button 
          onClick={handleReset}
          className="rounded-full bg-[#eb6824] hover:bg-[#d25618]"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (showVerification) {
    return (
      <OTPVerification
        email={email}
        purpose="demo"
        onVerified={handleVerified}
        onCancel={() => setShowVerification(false)}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold mb-2">OTP Security Demo</h2>
        <p className="text-gray-600 text-sm">
          Test the secure OTP verification system
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1"
          />
        </div>

        <Button
          onClick={handleStartVerification}
          disabled={isLoading || !email || !email.includes('@')}
          className="w-full rounded-full bg-[#eb6824] hover:bg-[#d25618]"
        >
          {isLoading ? 'Generating OTP...' : 'Send OTP'}
        </Button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-sm text-gray-800 mb-2">Security Features:</h3>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>• ✅ 10-minute expiry time</li>
          <li>• ✅ Rate limiting (5 requests/hour)</li>
          <li>• ✅ Maximum 3 attempts per code</li>
          <li>• ✅ Audit logging</li>
          <li>• ✅ Automatic cleanup</li>
        </ul>
      </div>
    </div>
  );
}
