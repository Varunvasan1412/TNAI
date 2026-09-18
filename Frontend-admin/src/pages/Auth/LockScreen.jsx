import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import { Input, Button, Avatar } from '../../components/ui';
import * as Feather from 'react-feather';

const AuthLockScreen = () => {
    return (
        <AuthLayout
            title="Lock Screen"
            subtitle="Enter your password to unlock the screen!"
        >
            <div className="text-center mb-8">
                <div className="relative inline-block">
                    <Avatar 
                        src="/assets/images/users/avatar-4.jpg" 
                        name="Admin" 
                        size="xl" 
                        className="ring-4 ring-primary/10 shadow-2xl"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                        <Feather.Lock className="w-3 h-3" />
                    </div>
                </div>
                <h5 className="mt-4 text-lg font-bold text-gray-800 dark:text-white">Admin</h5>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">System Administrator</p>
            </div>

            <form className="space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Password</label>
                    </div>
                    <Input 
                        type="password" 
                        placeholder="••••••••" 
                        icon={Feather.Key}
                        className="h-12 bg-gray-50 dark:bg-slate-800/50"
                    />
                </div>

                <Button className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20" type="submit">
                    Unlock Account
                </Button>

                <div className="text-center pt-4">
                    <p className="text-sm text-gray-500 font-medium">
                        Not you?{' '}
                        <Link to="/login" className="text-primary font-bold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </form>
        </AuthLayout>
    );
};

export default AuthLockScreen;
