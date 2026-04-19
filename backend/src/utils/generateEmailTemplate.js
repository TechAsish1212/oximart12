export const generateOtpEmailTemplate = (name, otp) => {
  return `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0a0a23, #1a1a3d); padding: 30px; border-radius: 10px; color: #ffffff;">
    
    <!-- Header -->
    <div style="text-align: center; padding-bottom: 15px; border-bottom: 1px solid #2e2e5e;">
      <h1 style="margin: 0; color: #00bfff;">OxiMart</h1>
      <p style="font-size: 14px; color: #b3b3ff;">Your trusted online shopping partner</p>
    </div>

    <!-- Body -->
    <div style="padding: 20px 10px;">
      <h2 style="text-align: center; color: #ffffff;">Email Verification Required</h2>
      <p style="font-size: 16px; color: #ddddff;">Hello <strong>${name}</strong>,</p>
      <p style="font-size: 16px; color: #ccccff;">
        Thank you for logging in to <strong>OxiMart</strong>. Please use the OTP below to verify your email address and complete the login process.
      </p>

      <div style="text-align: center; margin: 25px 0;">
        <span style="display: inline-block; background-color: #00bfff; color: #000; font-size: 28px; font-weight: bold; letter-spacing: 6px; padding: 12px 25px; border-radius: 8px;">
          ${otp}
        </span>
      </div>

      <p style="font-size: 15px; color: #bbbbff; text-align: center;">
        This OTP will expire in <strong>10 minutes</strong>.<br>
        If you did not request this, you can safely ignore this email.
      </p>
    </div>

    <!-- Footer -->
    <footer style="margin-top: 20px; text-align: center; border-top: 1px solid #2e2e5e; padding-top: 15px;">
      <p style="font-size: 14px; color: #9999cc;">Thank you for choosing <strong>OxiMart</strong> 💙</p>
      <p style="font-size: 12px; color: #6666aa;">This is an automated message, please do not reply.</p>
    </footer>
  </div>
  `;
};
