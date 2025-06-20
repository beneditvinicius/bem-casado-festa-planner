
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

    const { email, otp_code, purpose = 'login' } = await req.json()

    if (!email || !otp_code) {
      return new Response(
        JSON.stringify({ error: 'Email and OTP code are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get the OTP record
    const { data: otpRecord, error: fetchError } = await supabaseClient
      .from('otps')
      .select('*')
      .eq('email', email)
      .eq('purpose', purpose)
      .is('used_at', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError || !otpRecord) {
      await supabaseClient.from('otp_audit_logs').insert({
        email,
        action: 'failed',
        purpose,
        ip_address: req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent'),
        metadata: { reason: 'no_valid_otp' }
      })

      return new Response(
        JSON.stringify({ error: 'Invalid or expired OTP' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if OTP is expired
    if (new Date(otpRecord.expires_at) < new Date()) {
      await supabaseClient
        .from('otps')
        .update({ used_at: new Date().toISOString() })
        .eq('id', otpRecord.id)

      await supabaseClient.from('otp_audit_logs').insert({
        email,
        action: 'expired',
        purpose,
        ip_address: req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent'),
        metadata: { otp_id: otpRecord.id }
      })

      return new Response(
        JSON.stringify({ error: 'OTP has expired' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if max attempts exceeded
    if (otpRecord.attempts >= otpRecord.max_attempts) {
      await supabaseClient
        .from('otps')
        .update({ used_at: new Date().toISOString() })
        .eq('id', otpRecord.id)

      await supabaseClient.from('otp_audit_logs').insert({
        email,
        action: 'failed',
        purpose,
        ip_address: req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent'),
        metadata: { reason: 'max_attempts_exceeded', otp_id: otpRecord.id }
      })

      return new Response(
        JSON.stringify({ error: 'Maximum verification attempts exceeded' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify OTP code
    if (otpRecord.otp_code !== otp_code) {
      // Increment attempt counter
      await supabaseClient
        .from('otps')
        .update({ attempts: otpRecord.attempts + 1 })
        .eq('id', otpRecord.id)

      await supabaseClient.from('otp_audit_logs').insert({
        email,
        action: 'failed',
        purpose,
        ip_address: req.headers.get('x-forwarded-for'),
        user_agent: req.headers.get('user-agent'),
        metadata: { 
          reason: 'incorrect_code', 
          attempts: otpRecord.attempts + 1,
          otp_id: otpRecord.id 
        }
      })

      return new Response(
        JSON.stringify({ 
          error: 'Invalid OTP code',
          remaining_attempts: otpRecord.max_attempts - (otpRecord.attempts + 1)
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // OTP is valid - mark as used
    await supabaseClient
      .from('otps')
      .update({ used_at: new Date().toISOString() })
      .eq('id', otpRecord.id)

    // Log successful verification
    await supabaseClient.from('otp_audit_logs').insert({
      email,
      action: 'verified',
      purpose,
      ip_address: req.headers.get('x-forwarded-for'),
      user_agent: req.headers.get('user-agent'),
      metadata: { otp_id: otpRecord.id }
    })

    return new Response(
      JSON.stringify({ 
        message: 'OTP verified successfully',
        verified: true
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
