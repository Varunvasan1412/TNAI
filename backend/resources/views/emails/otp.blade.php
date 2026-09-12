<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your TNAI OTP</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6; padding: 40px 0; margin: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <tr>
            <td style="padding: 40px;">
                <h2 style="color: #1f2937; font-size: 24px; margin-top: 0; margin-bottom: 20px;">Your New OTP</h2>
                
                <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                    You recently requested a new One-Time Password (OTP). Please use the following code to continue:
                    <br><br>
                    <span style="font-size: 28px; font-weight: bold; color: #0cb4ce; letter-spacing: 4px; padding: 15px 30px; background-color: #f3f4f6; border-radius: 8px; display: inline-block;">{{ $otp }}</span>
                    <br><br>
                    <span style="color: #ef4444; font-size: 14px;">(This OTP will expire in 2 minutes for your security)</span>
                </p>

                <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                    If you did not request this OTP, you can safely ignore this email.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
