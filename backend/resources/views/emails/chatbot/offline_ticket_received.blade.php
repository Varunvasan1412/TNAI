<!DOCTYPE html>
<html>
<head>
    <title>Support Ticket Received</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .header-image { width: 100%; display: block; border-bottom: 4px solid #fca311; }
        .header-title { background-color: #0d1b2a; color: #ffffff; padding: 20px; text-align: center; }
        .header-title h1 { margin: 0; font-size: 24px; letter-spacing: 1px; }
        .header-title h1 span { color: #fca311; }
        .content { padding: 30px; color: #333; line-height: 1.6; }
        .message-box { background: #f8f9fa; border-left: 4px solid #fca311; padding: 15px; margin: 20px 0; font-style: italic; color: #555; border-radius: 0 4px 4px 0; }
        .footer { background: #e0e1dd; color: #777; text-align: center; padding: 15px; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <img src="{{ $message->embed(public_path('images/email_banner.png')) }}" alt="Electrical Banner" class="header-image">
        <div class="header-title">
            <h1>RSI <span>Store</span> Support</h1>
        </div>
        <div class="content">
            <h2 style="color: #1b263b; margin-top: 0;">We've received your message!</h2>
            <p>Thank you for reaching out to us. Our support team is currently offline, but your inquiry is safe with us.</p>
            
            <p><strong>Your Message:</strong></p>
            <div class="message-box">
                {{ $userMessage }}
            </div>
            
            <p>We will get back to you with lightning speed as soon as our team comes back online.</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} RSI Store. All rights reserved.
        </div>
    </div>
</body>
</html>
