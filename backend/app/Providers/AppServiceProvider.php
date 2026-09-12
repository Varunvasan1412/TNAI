<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Cache the company settings for 1 hour to prevent DB connection limits
        try {
            $company = \Illuminate\Support\Facades\Cache::remember('company_settings', 3600, function () {
                return \App\Modules\Company\Models\Company::first();
            });
            
            if ($company) {
                // Set SMTP Credentials
                if ($company->smtp_email_address && $company->smtp_password) {
                    \Illuminate\Support\Facades\Config::set('mail.mailers.smtp.username', $company->smtp_email_address);
                    \Illuminate\Support\Facades\Config::set('mail.mailers.smtp.password', $company->smtp_password);
                    \Illuminate\Support\Facades\Config::set('mail.from.address', $company->smtp_email_address);
                }
                
                // Set Sender Name
                if ($company->smtp_sender_name) {
                    \Illuminate\Support\Facades\Config::set('mail.from.name', $company->smtp_sender_name);
                }
            }
        } catch (\Exception $e) {
            // If the database isn't migrated yet or is down, fail silently so the app doesn't crash
        }
    }
}
