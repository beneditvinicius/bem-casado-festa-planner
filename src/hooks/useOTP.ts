
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface OTPResponse {
  success: boolean;
  message: string;
  otp_code?: string; // Remove this in production
  expires_in_minutes?: number;
  remaining_attempts?: number;
  blocked_until?: string;
}

export function useOTP() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateOTP = async (email: string, purpose: string = 'login'): Promise<OTPResponse> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-otp', {
        body: { email, purpose }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive"
        });
        return { success: false, message: data.error };
      }

      toast({
        title: "OTP Generated",
        description: `OTP sent successfully! Expires in ${data.expires_in_minutes} minutes.`
      });

      return {
        success: true,
        message: data.message,
        otp_code: data.otp_code, // Remove this in production
        expires_in_minutes: data.expires_in_minutes
      };

    } catch (error: any) {
      console.error('Generate OTP error:', error);
      const errorMessage = error.message || 'Failed to generate OTP';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });

      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (email: string, otpCode: string, purpose: string = 'login'): Promise<OTPResponse> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { email, otp_code: otpCode, purpose }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        toast({
          title: "Verification Failed",
          description: data.error,
          variant: "destructive"
        });
        
        return { 
          success: false, 
          message: data.error,
          remaining_attempts: data.remaining_attempts
        };
      }

      toast({
        title: "Success",
        description: "OTP verified successfully!"
      });

      return {
        success: true,
        message: data.message
      };

    } catch (error: any) {
      console.error('Verify OTP error:', error);
      const errorMessage = error.message || 'Failed to verify OTP';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });

      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateOTP,
    verifyOTP,
    isLoading
  };
}
