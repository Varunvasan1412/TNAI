<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TNAI- API Backend Status</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-gradient: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
            --card-bg: rgba(255, 255, 255, 0.85);
            --card-border: rgba(255, 255, 255, 0.5);
            --text-main: #0f172a;
            --text-muted: #475569;
            --accent: #02a8f6ff;
            --error-bg: rgba(239, 68, 68, 0.1);
            --error-border: rgba(239, 68, 68, 0.3);
            --error-text: #b91c1c;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Outfit', sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--bg-gradient);
            color: var(--text-main);
            overflow: hidden;
        }

        /* Animated background blobs */
        .blob {
            position: absolute;
            filter: blur(80px);
            z-index: 0;
            opacity: 0.4;
            animation: float 10s infinite ease-in-out alternate;
        }
        .blob-1 {
            width: 400px;
            height: 400px;
            background: #7dd3fc;
            top: -100px;
            left: -100px;
            border-radius: 50%;
        }
        .blob-2 {
            width: 300px;
            height: 300px;
            background: #0ea5e9;
            bottom: -50px;
            right: -50px;
            border-radius: 50%;
            animation-delay: -5s;
        }

        @keyframes float {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(30px, 50px) scale(1.1); }
        }

        .container {
            position: relative;
            z-index: 1;
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--card-border);
            border-radius: 24px;
            padding: 50px;
            width: 90%;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .icon-wrapper {
            width: 80px;
            height: 80px;
            background: rgba(14, 165, 233, 0.1);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 24px auto;
            position: relative;
        }

        .icon-wrapper svg {
            width: 40px;
            height: 40px;
            color: var(--accent);
        }

        /* Pulse effect */
        .icon-wrapper::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid var(--accent);
            animation: pulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }

        @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(1.5); opacity: 0; }
        }

        h1 {
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 12px;
            letter-spacing: -0.5px;
        }

        p.subtitle {
            color: var(--text-muted);
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 30px;
            font-weight: 300;
        }

        .info-pill {
            display: inline-flex;
            align-items: center;
            background: rgba(14, 165, 233, 0.05);
            padding: 8px 16px;
            border-radius: 100px;
            font-size: 14px;
            color: var(--text-muted);
            border: 1px solid var(--card-border);
            margin-bottom: 10px;
        }

        .info-pill span {
            color: var(--text-main);
            font-weight: 600;
            margin-left: 6px;
        }

        .error-container {
            margin-top: 30px;
            background: var(--error-bg);
            border: 1px solid var(--error-border);
            border-radius: 12px;
            padding: 20px;
            text-align: left;
            animation: fadeIn 0.5s ease-in;
        }

        .error-container h3 {
            color: #ef4444;
            font-size: 16px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .error-container ul {
            list-style-position: inside;
            color: var(--error-text);
            font-size: 14px;
            line-height: 1.6;
        }

        .error-container li {
            margin-bottom: 4px;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
</head>
<body>
    
    <!-- Decorative background blobs -->
    <div class="blob blob-1"></div>
    <div class="blob blob-2"></div>

    <div class="container">
        <div class="icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </div>
        
        <h1>API Backend is Online</h1>
        <p class="subtitle">The TNAI server is running smoothly and actively listening for requests from your frontend application.</p>
        
        <div class="info-pill">
            Environment: <span>{{ env('APP_ENV', 'Production') }}</span>
        </div>

        @if($errors->any() || session('error'))
            <div class="error-container">
                <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    System Alerts
                </h3>
                <ul>
                    @if(session('error'))
                        <li>{{ session('error') }}</li>
                    @endif
                    @foreach($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
    </div>

</body>
</html>
