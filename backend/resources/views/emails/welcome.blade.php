<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitation to TNAI Portal</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #0cb4ce; padding: 30px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">TNAI Portal</h1>
                        </td>
                    </tr>
                    
                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="color: #1f2937; font-size: 20px; margin-top: 0; margin-bottom: 20px;">Welcome, {{ $user->name }}!</h2>
                            
                            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
                                You have been invited by an administrator to join the TNAI Portal as a <strong>{{ ucwords(str_replace('_', ' ', $user->role)) }}</strong>.
                            </p>
                            
                            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                                To complete your registration and securely generate your login credentials, please click the button below and use the following One-Time Password (OTP) when prompted:
                                <br><br>
                                <span style="font-size: 24px; font-weight: bold; color: #1f2937; letter-spacing: 2px; padding: 10px 20px; background-color: #f3f4f6; border-radius: 8px; display: inline-block;">{{ $otp }}</span>
                                <br><br>
                                <span style="color: #ef4444; font-size: 14px;">(This link and OTP will expire in 24 hours for your security)</span>
                            </p>

                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <a href="{{ env('FRONTEND_URL', 'http://localhost:5173') }}/accept-invite?token={{ $token }}" 
                                           style="display: inline-block; background-color: #0cb4ce; color: #ffffff; font-weight: 600; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">
                                           Accept Invitation
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                                <p style="color: #6b7280; font-size: 14px; margin-bottom: 5px;">If the button doesn't work, copy and paste this link into your browser:</p>
                                <p style="color: #3b82f6; font-size: 13px; word-break: break-all; margin-top: 0;">
                                    {{ env('FRONTEND_URL', 'http://localhost:5173') }}/accept-invite?token={{ $token }}
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="color: #9ca3af; font-size: 13px; margin: 0;">
                                &copy; {{ date('Y') }} The TNAI Team. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
