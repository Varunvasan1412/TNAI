import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/Layout/AuthLayout';
import { Input, Button, Alert } from '../../components/ui';

const AuthRecoverPw = () => {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your Email and instructions will be sent to you!"
      showCarousel={false} // Maybe hide carousel for simple pages or keep it
    >
      <div className="space-y-6">
        <Alert variant="success" className="text-center">
          Instructions will be sent to your email!
        </Alert>

        <form className="space-y-5">
          <Input
            type="email"
            label="Email"
            placeholder="Enter email"
            id="email"
            required
          />

          <Button className="w-full h-11 text-base font-semibold" type="submit">
            Reset Password
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember it ?{' '}
            <Link 
              to="/login" 
              className="font-semibold text-primary hover:text-primary-700 transition-colors"
            >
              Sign In here
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AuthRecoverPw;
