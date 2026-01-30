const getResetPasswordTemplate = (resetLink) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password</title>
  <style>
    /* Client-specific resets */
    body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
  </style>
</head>
<body style="background-color: #050505; margin: 0; padding: 0; font-family: 'Arial', sans-serif;">

  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #050505; padding: 40px 0;">
    <tr>
      <td align="center">
        
        <table role="presentation" width="100%" style="max-width: 500px; background-color: #141414; border: 1px solid #333333; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
          
          <tr>
            <td align="center" style="padding: 40px 0 20px 0;">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -1px;">
                    <span style="color: #FF5E3A;">&#x2B22;</span> TaskMaster
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 40px 40px 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 15px 0; font-weight: 700;">
                Reset Your Password
              </h1>
              
              <p style="color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                We received a request to reset the password for your account. If this was you, click the button below to secure your account.
              </p>

              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${resetLink}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #FF9D45 0%, #FF5E3A 100%); color: #000000; font-size: 16px; font-weight: 700; text-decoration: none; padding: 14px 32px; border-radius: 8px; box-shadow: 0 4px 15px rgba(255, 94, 58, 0.4);">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #52525b; font-size: 14px; margin-top: 30px;">
                This link will expire in 15 minutes.<br>
                If you didn't ask for this, you can safely ignore this email.
              </p>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #0a0a0a; padding: 20px; text-align: center; border-top: 1px solid #222;">
              <p style="color: #52525b; font-size: 12px; margin: 0;">
                &copy; 2026 TaskMaster. Built for performance.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

module.exports = getResetPasswordTemplate;  