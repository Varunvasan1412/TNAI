import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import { Button } from '../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../lib/utils';

const AuthEmailVerification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);

    const handleChange = (idx, val) => {
        if (isNaN(val)) return;
        const newOtp = [...otp];
        newOtp[idx] = val.substring(val.length - 1);
        setOtp(newOtp);

        // Auto focus next
        if (val && idx < 5) {
            const next = document.getElementById(`otp-digit-${idx + 1}`);
            if (next) next.focus();
        }
    };

    const handleKeyDown = (idx, e) => {
        if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
            const prev = document.getElementById(`otp-digit-${idx - 1}`);
            if (prev) prev.focus();
        }
    };

    return (
        <AuthLayout
            title="Email Verification"
            subtitle="Please enter the 6-digit code sent to your email address to complete your registration."
        >
            <div className="space-y-8">
                <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <Feather.Mail className="w-8 h-8" />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-2 sm:gap-3 justify-center">
                        {otp.map((val, idx) => (
                            <input 
                                key={idx}
                                id={`otp-digit-${idx}`}
                                type="text" 
                                className={cn(
                                    "w-11 h-12 sm:w-14 sm:h-16 text-center text-xl font-black rounded-xl border-2 transition-all outline-none",
                                    val 
                                        ? "border-primary bg-primary/5 text-primary" 
                                        : "border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-white focus:border-primary/50"
                                )}
                                maxLength={1} 
                                value={val} 
                                onChange={e => handleChange(idx, e.target.value)}
                                onKeyDown={e => handleKeyDown(idx, e)}
                                autoComplete="one-time-code"
                            />
                        ))}
                    </div>
                    
                    <p className="text-center text-xs font-medium text-gray-500">
                        Code sent to <span className="text-gray-800 dark:text-white font-bold">example@minia.com</span>
                    </p>
                </div>

                <div className="space-y-4">
                    <Button 
                        className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20" 
                        onClick={() => navigate('/dashboard')}
                    >
                        Verify Email
                    </Button>
                    
                    <div className="text-center space-y-2 pt-2">
                        <p className="text-sm text-gray-500 font-medium">
                            Did not receive the code?{' '}
                            <button className="text-primary font-bold hover:underline">Resend Code</button>
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                            <Link to="/login" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex items-center justify-center gap-2">
                                <Feather.ArrowLeft className="w-4 h-4" />
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default AuthEmailVerification;
