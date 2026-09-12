import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import { Button } from '../../components/ui';
import * as Feather from 'react-feather';

const AuthConfirmMail = () => {
    return (
        <AuthLayout
            title="Check Your Email"
            subtitle="We've sent a verification link to your inbox. Please follow the link to activate your account."
        >
            <div className="space-y-8 text-center">
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-success/10 text-success flex items-center justify-center animate-bounce">
                        <Feather.Mail className="w-10 h-10" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white">Verify Your Account</h4>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed px-4">
                        A confirmation email has been sent to <span className="text-gray-800 dark:text-white font-black">example@minia.com</span>.
                        Please check your spam folder if you don't see it within a few minutes.
                    </p>
                </div>

                <div className="pt-4 space-y-4">
                    <Button variant="primary" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20" as={Link} to="/login">
                        Back to Sign In
                    </Button>
                    
                    <div className="text-center">
                        <p className="text-sm text-gray-500 font-medium">
                            Did not receive an email?{' '}
                            <button className="text-primary font-bold hover:underline">Resend Email</button>
                        </p>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
};

export default AuthConfirmMail;
