import React from 'react';
import { Routes, Route, Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import * as Feather from 'react-feather';
import MainLayout from '../components/Layout/MainLayout';
import { Button } from '../components/ui';
import CircuitBg from '../components/ui/CircuitBg';

import adminRoutes from '../modules/Admin/routes/index';
import chatBotRoutes from '../modules/ChatBot/routes/index';
import productsRoutes from '../modules/Products/routes/index';

// Dashboard
import Dashboard from '../pages/Dashboard/Index';

// Apps
import BlogDetail from '../pages/Apps/BlogDetail';
import BlogGrid from '../pages/Apps/BlogGrid';
import BlogList from '../pages/Apps/BlogList';

// Auth
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import RecoverPw from '../pages/Auth/RecoverPw';
import LockScreen from '../pages/Auth/LockScreen';
import Logout from '../pages/Auth/Logout';
import ConfirmMail from '../pages/Auth/ConfirmMail';
import EmailVerification from '../pages/Auth/EmailVerification';
import TwoStepVerification from '../pages/Auth/TwoStepVerification';
import ModuleSelection from '../pages/Auth/ModuleSelection';
import AcceptInvite from '../pages/Auth/AcceptInvite';

// Settings
import CompanyProfile from '../pages/Settings/CompanyProfile';


// ── Error Pages (100% Tailwind) ──

// ── Error Pages (100% Tailwind) ──

const Page404 = () => {
  const location = useLocation();
  const getDashboardPath = () => {
    if (location.pathname.startsWith('/admin')) return '/admin/dashboard';
    if (location.pathname.startsWith('/chat-bot')) return '/chat-bot/dashboard';
    return '/dashboard';
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center p-6 overflow-hidden">
      <CircuitBg />
      <div className="text-center max-w-md relative z-10">
        <h1 className="text-[120px] font-black leading-none tracking-tighter opacity-20" style={{ color: 'var(--color-secondary)' }}>404</h1>
        <div className="-mt-12 relative z-10">
          <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-4">Page Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link
            to={getDashboardPath()}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-[14px] font-bold text-white shadow-[0_4px_14px_rgba(49,151,96,0.28)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' }}
          >
            <Feather.Home className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

const Page500 = () => (
  <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center p-6">
    <div className="text-center max-w-md">
      <h1 className="text-[120px] font-black text-danger leading-none tracking-tighter opacity-20">500</h1>
      <div className="-mt-12 relative z-10">
        <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-4">Internal Server Error</h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium mb-8">
          Something went wrong on our server. We are working to fix this as soon as possible.
        </p>
        <Button variant="primary" className="h-12 px-8 font-bold shadow-lg shadow-primary/20" asChild>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  </div>
);

const W = ({ children }) => <MainLayout>{children}</MainLayout>;

// Guard: redirect unauthenticated users to /login
const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};


const AppRoutes = () => {
  return (
    <Routes>
      {/* Root → login (always) */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      {/* Public auth routes — always accessible */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/accept-invite" element={<AcceptInvite />} />
      <Route path="/auth-register" element={<Register />} />
      <Route path="/auth-recoverpw" element={<RecoverPw />} />
      <Route path="/auth-lock-screen" element={<LockScreen />} />
      <Route path="/auth-logout" element={<Logout />} />
      <Route path="/auth-confirm-mail" element={<ConfirmMail />} />
      <Route path="/auth-email-verification" element={<EmailVerification />} />
      <Route path="/auth-two-step-verification" element={<TwoStepVerification />} />

      {/* Protected routes — must be logged in */}
      <Route element={<ProtectedRoute />}>
        <Route path="/module-selection" element={<ModuleSelection />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/dashboard" element={<W><Dashboard /></W>} />
        <Route path="/layouts-horizontal" element={<W><Dashboard /></W>} />
        {/* Admin Module Routes */}
        {adminRoutes}
        {/* ChatBot Module Routes */}
        {chatBotRoutes}
        {/* Products Module Routes */}
        {productsRoutes}
      </Route>

      {/* Error Pages */}
      <Route path="/pages-404" element={<Page404 />} />
      <Route path="/pages-500" element={<Page500 />} />

      {/* Catch-all */}
      <Route path="/apps-blog-detail" element={<W><BlogDetail /></W>} />
      <Route path="/apps-blog-grid" element={<W><BlogGrid /></W>} />
      <Route path="/apps-blog-list" element={<W><BlogList /></W>} />

      {/* Catch-all */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
