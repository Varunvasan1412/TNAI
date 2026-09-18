import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import { Button } from '../../components/ui';
import * as Feather from 'react-feather';

const AuthLogout = () => {
  useEffect(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('authUser');
  }, []);

  return (
    <AuthLayout
      title="Log Out"
      subtitle="You are safely logged out of Minia."
      showCarousel={false}
    >
      <div className="text-center space-y-8">
        <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Feather.LogOut className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
            You are Logged Out
          </h4>
          <p className="text-gray-500 dark:text-gray-400">
            Thank you for using Minia. Have a great day!
          </p>
        </div>

        <div className="pt-4">
          <Link to="/login" replace>
            <Button className="w-full h-11 text-base font-semibold">
              Sign In Again
            </Button>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AuthLogout;
