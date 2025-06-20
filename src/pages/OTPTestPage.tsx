
import React from 'react';
import { OTPDemo } from '@/components/OTPDemo';

const OTPTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Secure OTP Verification System
          </h1>
          <p className="text-lg text-gray-600">
            Implementation following security best practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <OTPDemo />
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Security Implementation</h3>
            
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium text-green-700">✅ OTP Expiry Time</h4>
                <p className="text-gray-600">Set to 10 minutes (configurable 5-15 min)</p>
              </div>
              
              <div>
                <h4 className="font-medium text-green-700">✅ Rate Limiting</h4>
                <p className="text-gray-600">Maximum 5 OTP requests per hour per email</p>
              </div>
              
              <div>
                <h4 className="font-medium text-green-700">✅ Attempt Limiting</h4>
                <p className="text-gray-600">Maximum 3 verification attempts per OTP</p>
              </div>
              
              <div>
                <h4 className="font-medium text-green-700">✅ Audit Logging</h4>
                <p className="text-gray-600">All OTP activities logged for monitoring</p>
              </div>
              
              <div>
                <h4 className="font-medium text-green-700">✅ Automatic Cleanup</h4>
                <p className="text-gray-600">Expired OTPs automatically removed</p>
              </div>
              
              <div>
                <h4 className="font-medium text-green-700">✅ Secure Storage</h4>
                <p className="text-gray-600">Database with Row Level Security</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Development Mode</h4>
              <p className="text-yellow-700 text-sm">
                OTP codes are shown in console for testing. 
                Remove this in production and implement email/SMS delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPTestPage;
