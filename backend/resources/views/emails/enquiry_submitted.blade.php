<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Enquiry Received</title>
    <style>
        /* Base Resets */
        body, table, td, p, a, h1, h2, h3, h4, h5, h6 {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }
    </style>
</head>
@php
    // Fetch company settings dynamically
    $company = null;
    try {
        if (\Illuminate\Support\Facades\Schema::hasTable('companies')) {
            $company = \App\Modules\Company\Models\Company::first();
        }
    } catch (\Exception $e) {}
    
    $companyName = $company->company_name ?? config('mail.from.name', 'OUR COMPANY');
    $primaryColor = $company->primary_color ?? '#16a34a'; // Green from the design
    $secondaryColor = '#111827'; // Dark Navy from the design

    // Pre-build style strings to completely bypass VS Code's CSS parser and Intelephense
    $s_header = 'style="background-color: '.$secondaryColor.'; padding: 40px 20px; border-bottom: 5px solid '.$primaryColor.';"';
    $s_logo = 'style="width: 40px; height: 40px; border: 3px solid '.$primaryColor.'; display: inline-block; transform: rotate(45deg); border-radius: 8px;"';
    $s_logo_text = 'style="color: '.$primaryColor.'; font-size: 13px; margin: 5px 0 0 0;"';
    
    // Changed border-radius from 50% to 8px for square/rectangle shape
    $s_check_bg = 'style="width: 50px; height: 50px; border-radius: 8px; border: 2px solid '.$primaryColor.'; background-color: #f0fdf4; text-align: center; line-height: 48px;"';
    $s_title = 'style="color: '.$secondaryColor.'; font-size: 28px; font-weight: bold; margin: 0 0 20px 0;"';
    $s_divider = 'style="width: 40px; height: 3px; background-color: '.$primaryColor.'; margin: 0 auto 30px auto;"';
    $s_name = 'style="color: '.$primaryColor.';"';
    
    // Changed border-radius from 50% to 8px for square/rectangle shape
    $s_icon_bg = 'style="width: 28px; height: 28px; background-color: '.$primaryColor.'; border-radius: 6px; text-align: center; line-height: 28px;"';
    $s_details_title = 'style="color: '.$primaryColor.'; font-size: 15px; font-weight: bold; margin: 0; text-transform: uppercase;"';
    $s_label = 'style="color: '.$secondaryColor.'; font-size: 14px;"';
    $s_sig_name = 'style="color: '.$primaryColor.'; font-size: 15px;"';
    $s_footer_label = 'style="color: '.$secondaryColor.'; font-size: 12px; display: block; margin-bottom: 3px;"';
    $s_footer_bg = 'style="background-color: '.$secondaryColor.'; padding: 25px;"';
    
    // Icon Styles
    $s_check_icon = 'style="color: '.$primaryColor.'; font-size: 28px; font-weight: bold;"';
    $s_tag_icon = 'style="color: '.$primaryColor.'; font-size: 16px;"';
    $s_mail_icon = 'style="color: '.$primaryColor.'; font-size: 16px;"';
    $s_user_icon = 'style="color: '.$primaryColor.'; font-size: 20px;"';
    $s_footer_icon = 'style="color: '.$primaryColor.'; font-size: 24px; display: block; margin-bottom: 5px;"';
@endphp
<body style="background-color: #f3f4f6; margin: 0; padding: 40px 0;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f3f4f6;">
        <tr>
            <td align="center">
                <!-- Main Container -->
                <table width="650" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                    
                    <!-- Top Dark Header -->
                    <tr>
                        <td align="center" {!! $s_header !!}>
                            <table border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <!-- Simple CSS Logo -->
                                    <td style="padding-right: 15px;">
                                        <div {!! $s_logo !!}>
                                            <div style="width: 20px; height: 20px; background-color: #ffffff; margin: 10px; transform: rotate(-45deg); border-radius: 4px;"></div>
                                        </div>
                                    </td>
                                    <td>
                                        <h1 style="color: #ffffff; font-size: 24px; font-weight: bold; margin: 0; letter-spacing: 1px; text-transform: uppercase;">
                                            {{ $companyName }}
                                        </h1>
                                        <p {!! $s_logo_text !!}>
                                            Your Trust. Our Commitment.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Body Content -->
                    <tr>
                        <td style="padding: 40px 50px 30px 50px; text-align: center;">
                            
                            <!-- Overlapping Checkmark -->
                            <div style="margin-top: -65px; margin-bottom: 20px;">
                                <!-- Changed outer wrapper to square as well -->
                                <div style="display: inline-block; background-color: #ffffff; padding: 8px; border-radius: 12px;">
                                    <div {!! $s_check_bg !!}>
                                        <!-- Safe Email Icon: Checkmark -->
                                        <span {!! $s_check_icon !!}>&#10003;</span>
                                    </div>
                                </div>
                            </div>

                            <h2 {!! $s_title !!}>
                                Thank You for Reaching Out!
                            </h2>
                            <div {!! $s_divider !!}></div>

                            <div style="text-align: left;">
                                <p style="font-size: 16px; color: #374151; margin-bottom: 15px;">
                                    Hi <strong {!! $s_name !!}>{{ $enquiry->name }}</strong>,
                                </p>
                                <p style="font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 35px;">
                                    We have successfully received your enquiry. Our team will review your request and get back to you as soon as possible. We appreciate your interest!
                                </p>

                                <!-- Enquiry Details Box -->
                                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px;">
                                    
                                    <!-- Box Header -->
                                    <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; width: 100%; padding-bottom: 15px;">
                                        <tr>
                                            <td width="30" valign="middle">
                                                <div {!! $s_icon_bg !!}>
                                                    <!-- Safe Email Icon: List/Doc -->
                                                    <span style="color: #ffffff; font-size: 16px;">&#9776;</span>
                                                </div>
                                            </td>
                                            <td valign="middle">
                                                <h3 {!! $s_details_title !!}>
                                                    Your Enquiry Details
                                                </h3>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Details List -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        @if($enquiry->subject)
                                        <tr>
                                            <td width="40" valign="top" style="padding-bottom: 20px;">
                                                <div style="width: 28px; height: 28px; background-color: #ecfdf5; border-radius: 6px; text-align: center; line-height: 28px;">
                                                    <!-- Safe Email Icon: Tag/Subject -->
                                                    <span {!! $s_tag_icon !!}>&#128204;</span>
                                                </div>
                                            </td>
                                            <td width="100" valign="top" style="padding-bottom: 20px; padding-top: 5px;">
                                                <strong {!! $s_label !!}>Subject:</strong>
                                            </td>
                                            <td valign="top" style="padding-bottom: 20px; padding-top: 5px;">
                                                <span style="color: #4b5563; font-size: 14px;">{{ $enquiry->subject }}</span>
                                            </td>
                                        </tr>
                                        @endif
                                        <tr>
                                            <td width="40" valign="top">
                                                <div style="width: 28px; height: 28px; background-color: #ecfdf5; border-radius: 6px; text-align: center; line-height: 28px;">
                                                    <!-- Safe Email Icon: Mail/Message -->
                                                    <span {!! $s_mail_icon !!}>&#9993;</span>
                                                </div>
                                            </td>
                                            <td width="100" valign="top" style="padding-top: 5px;">
                                                <strong {!! $s_label !!}>Message:</strong>
                                            </td>
                                            <td valign="top" style="padding-top: 5px;">
                                                <span style="color: #4b5563; font-size: 14px; line-height: 1.6;">
                                                    {!! nl2br(e($enquiry->message)) !!}
                                                </span>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                
                                <!-- Signature -->
                                <table border="0" cellspacing="0" cellpadding="0" style="margin-top: 40px;">
                                    <tr>
                                        <td width="50" valign="middle">
                                            <div style="width: 40px; height: 40px; background-color: #ecfdf5; border-radius: 8px; text-align: center; line-height: 40px;">
                                                <!-- Safe Email Icon: User -->
                                                <span {!! $s_user_icon !!}>&#128100;</span>
                                            </div>
                                        </td>
                                        <td valign="middle">
                                            <span style="color: #4b5563; font-size: 14px;">Best Regards,</span><br>
                                            <strong {!! $s_sig_name !!}>{{ $companyName }} Team</strong>
                                        </td>
                                    </tr>
                                </table>

                            </div>
                        </td>
                    </tr>

                    <!-- Footer Info (Changed to 3 Columns) -->
                    <tr>
                        <td style="background-color: #f8fafc; padding: 30px 10px; border-top: 1px solid #e2e8f0;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    {{-- 
                                    <!-- Phone -->
                                    <td width="33.33%" align="center" style="border-right: 1px solid #e2e8f0; padding: 0 5px;">
                                        <!-- Safe Email Icon: Phone -->
                                        <span {!! $s_footer_icon !!}>&#9742;</span>
                                        <strong {!! $s_footer_label !!}>Phone</strong>
                                        <span style="color: #64748b; font-size: 11px;">{{ $company->phone_number ?? '+1 234 567 8900' }}</span>
                                    </td>
                                    --}}
                                    
                                    <!-- Email -->
                                    <td width="33.33%" align="center" style="border-right: 1px solid #e2e8f0; padding: 0 5px;">
                                        <!-- Safe Email Icon: Envelope -->
                                        <span {!! $s_footer_icon !!}>&#9993;</span>
                                        <strong {!! $s_footer_label !!}>Email</strong>
                                        <span style="color: #64748b; font-size: 11px;">
                                            <a href="mailto:{{ $company->contact_email ?? 'info@ourcompany.com' }}" style="color: #64748b; text-decoration: none;">
                                                {{ $company->contact_email ?? 'info@ourcompany.com' }}
                                            </a>
                                        </span>
                                    </td>
                                    <!-- Website -->
                                    <td width="33.33%" align="center" style="border-right: 1px solid #e2e8f0; padding: 0 5px;">
                                        <!-- Safe Email Icon: Globe -->
                                        <span {!! $s_footer_icon !!}>&#127760;</span>
                                        <strong {!! $s_footer_label !!}>Website</strong>
                                        <span style="color: #64748b; font-size: 11px;">
                                            <a href="{{ url('/') }}" style="color: #64748b; text-decoration: none;">{{ request()->getHost() }}</a>
                                        </span>
                                    </td>
                                    <!-- Address -->
                                    <td width="33.33%" align="center" style="padding: 0 5px;">
                                        <!-- Safe Email Icon: Map Pin -->
                                        <span {!! $s_footer_icon !!}>&#128205;</span>
                                        <strong {!! $s_footer_label !!}>Address</strong>
                                        <span style="color: #64748b; font-size: 11px;">{{ $company->company_address ?? '123 Business St, City' }}</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Dark Footer (Socials & Disclaimer) -->
                    <tr>
                        <td align="center" {!! $s_footer_bg !!}>
                            <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 15px;">
                                <tr>
                                    @if(!empty($company->facebook_url))
                                    <td style="padding: 0 10px;">
                                        <a href="{{ $company->facebook_url }}" style="color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; font-family: Arial, sans-serif;">f</a>
                                    </td>
                                    @endif
                                    @if(!empty($company->twitter_url))
                                    <td style="padding: 0 10px;">
                                        <a href="{{ $company->twitter_url }}" style="color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; font-family: Arial, sans-serif;">X</a>
                                    </td>
                                    @endif
                                    @if(!empty($company->linkedin_url))
                                    <td style="padding: 0 10px;">
                                        <a href="{{ $company->linkedin_url }}" style="color: #ffffff; text-decoration: none; font-size: 18px; font-weight: bold; font-family: Arial, sans-serif;">in</a>
                                    </td>
                                    @endif
                                </tr>
                            </table>
                            <!-- <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                                This is an automated message. Please do not reply directly to this email.
                            </p> -->
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
