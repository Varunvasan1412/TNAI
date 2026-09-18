import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Feather from 'react-feather';
import { useTheme } from '../../../context/ThemeContext';
import { cn } from '../../../lib/utils';
import ModuleSwitcher from '../../../components/Layout/ModuleSwitcher';
import { LiveTime } from '../../../components/ui';
import ChatNotificationBell from '../../../components/ui/ChatNotificationBell';
import { useAuthStore } from '../../../store/store';
import LogoutModal from '../../../components/ui/LogoutModal';
const HeaderDropdown = ({ trigger, align = 'right', width = 'w-72', children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    const onEscape = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  return (
    <div ref={ref} className={cn('relative inline-flex', className)}>
      {trigger(() => setIsOpen((o) => !o), isOpen)}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute top-full mt-2 z-50',
              'rounded-xl bg-white dark:bg-slate-800',
              'shadow-xl border border-gray-100 dark:border-slate-700',
              'overflow-hidden',
              width,
              align === 'right' ? 'right-0' : 'left-0',
            )}
          >
            {typeof children === 'function' ? children(() => setIsOpen(false)) : children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HeaderIconButton = ({ onClick, className, children, badge, ...props }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'relative inline-flex items-center justify-center',
      'w-10 h-10 rounded-lg',
      'text-gray-500 dark:text-gray-400',
      'hover:bg-primary/10 dark:hover:bg-emerald-900/20 hover:text-primary dark:hover:text-emerald-400',
      'transition-all duration-200',
      className
    )}
    {...props}
  >
    {children}
    {badge && (
      <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-[16px] px-1 text-[9px] font-black text-white bg-danger rounded-full ring-2 ring-white dark:ring-slate-800">
        {badge}
      </span>
    )}
  </button>
);

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const { toggleRightSidebar } = useTheme();

  const authUser = React.useMemo(() => {
    try {
      const stored = localStorage.getItem('authUser');
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  }, []);

  const userName = authUser.name || authUser.username || authUser.email || 'User';
  const userRole = authUser.role || authUser.user_type || 'User';
  const userLocation = authUser.location || authUser.country || 'India';

  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleConfirmLogout = async () => {
    await logout();
    setIsLogoutOpen(false);
    navigate('/login', { replace: true });
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 right-0 z-[45] h-16',
          'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md',
          'border-b border-gray-100 dark:border-slate-700',
          'transition-all duration-300',
          isSidebarOpen ? 'left-0 lg:left-[250px]' : 'left-0 lg:left-[70px]'
        )}
      >
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* ── Left Section ── */}
          <div className="flex items-center gap-3">
            <HeaderIconButton onClick={toggleSidebar} aria-label="Toggle sidebar">
              <Feather.Menu className="w-5 h-5" />
            </HeaderIconButton>

            <div className="hidden lg:flex items-center ml-2">
              <LiveTime location={userLocation} />
            </div>
          </div>

          {/* ── Right Section ── */}
          <div className="flex items-center gap-1">
            <div className="hidden sm:block mr-2">
              <ModuleSwitcher isSidebar={false} />
            </div>

            {/* Chat Notifications */}
            <ChatNotificationBell />

            {/* Settings */}
            {/* <HeaderIconButton onClick={toggleRightSidebar} aria-label="Settings">
            <Feather.Settings className="w-5 h-5" />
          </HeaderIconButton> */}

            {/* Profile */}
            <HeaderDropdown
              align="right"
              width="w-52"
              trigger={(toggle) => (
                <button
                  onClick={toggle}
                  className={cn(
                    'flex items-center gap-2 h-10 px-2 ml-1 rounded-xl transition-all duration-200',
                    'hover:bg-gray-100 dark:hover:bg-slate-700/50'
                  )}
                >
                  <div className="relative">
                    <img
                      src="/assets/images/users/avatar-1.jpg"
                      alt="Avatar"
                      className="w-8 h-8 rounded-lg object-cover ring-2 ring-white dark:ring-slate-800"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-success border-2 border-white dark:border-slate-800 rounded-full" />
                  </div>
                  <div className="hidden xl:flex flex-col items-start mr-1">
                    <span className="text-xs font-bold text-gray-800 dark:text-white leading-none">{userName}</span>
                    <span className="text-[10px] font-medium text-gray-400">{userRole}</span>
                  </div>
                  <Feather.ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden xl:block" />
                </button>
              )}
            >
              {(close) => (
                <div className="p-1.5 space-y-0.5">
                  <Link
                    to="/apps-contacts-profile"
                    onClick={close}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
                  >
                    <Feather.User className="w-4 h-4 text-gray-400" />
                    My Profile
                  </Link>
                  <div className="my-1 border-t border-gray-100 dark:border-slate-700" />
                  <button
                    onClick={() => {
                      close();
                      setIsLogoutOpen(true);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-danger hover:bg-danger/10 rounded-lg transition-colors"
                  >
                    <Feather.LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </HeaderDropdown>
          </div>
        </div>
      </header>
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Header;
