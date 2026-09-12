import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Feather from 'react-feather';
import { useTheme } from '../../../context/ThemeContext';
import { cn } from '../../../lib/utils';
import menuItems from '../config/menuItems';
import ModuleSwitcher from '../../../components/Layout/ModuleSwitcher';
import LogoutModal from '../../../components/ui/LogoutModal';
import { useAuthStore } from '../../../store/store';
/* ─────────────────────────────────────────────
   Header Dropdown (synchronized with Header)
   ───────────────────────────────────────────── */

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
      'hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-primary',
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

/* ─────────────────────────────────────────────
   Horizontal Navigation Menu
   ───────────────────────────────────────────── */

const HorizontalNavItem = ({ item, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path === currentPath || (item.path && item.path !== '/' && currentPath.startsWith(item.path + '/'));

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  if (!hasChildren) {
    return (
      <li>
        <Link
          to={item.path || '#'}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 text-sm font-bold whitespace-nowrap rounded-xl mx-1 transition-all',
            isActive
              ? 'text-white shadow-[0_4px_14px_rgba(49,151,96,0.28)]'
              : 'text-gray-500 dark:text-gray-400 hover:bg-primary/10 dark:hover:bg-emerald-900/20 hover:text-primary dark:hover:text-emerald-400'
          )}
          style={isActive ? { background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' } : {}}
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span>{item.label}</span>
        </Link>
      </li>
    );
  }

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-4 py-2.5 text-sm font-bold whitespace-nowrap rounded-xl mx-1 transition-all',
          isOpen || isActive
            ? 'text-white shadow-[0_4px_14px_rgba(49,151,96,0.28)]'
            : 'text-gray-500 dark:text-gray-400 hover:bg-primary/10 dark:hover:bg-emerald-900/20 hover:text-primary dark:hover:text-emerald-400'
        )}
        style={isOpen || isActive ? { background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' } : {}}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span>{item.label}</span>
        <Feather.ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-1 z-50 min-w-[220px] p-1.5 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-gray-100 dark:border-slate-700"
          >
            {item.children.map((child) => (
              <HorizontalSubItem key={child.id} item={child} currentPath={currentPath} onClose={() => setIsOpen(false)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

const HorizontalSubItem = ({ item, currentPath, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path === currentPath || (item.path && item.path !== '/' && currentPath.startsWith(item.path + '/'));

  if (!hasChildren) {
    return (
      <Link
        to={item.path || '#'}
        onClick={onClose}
        className={cn(
          'flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors',
          isActive
            ? 'text-primary bg-primary/10 dark:text-emerald-400 dark:bg-emerald-900/20'
            : 'text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-emerald-900/20 hover:text-primary dark:hover:text-emerald-400'
        )}
      >
        <span>{item.label}</span>
        {item.badge && (
          <span className="px-1.5 py-0.5 text-[9px] font-black bg-danger text-white rounded-md">
            {item.badge.text}
          </span>
        )}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors",
          isOpen ? "bg-primary/10 dark:bg-emerald-900/20 text-primary dark:text-emerald-400" : "text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
        )}
      >
        <span>{item.label}</span>
        <Feather.ChevronRight className="w-3.5 h-3.5" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full top-0 ml-1 min-w-[200px] p-1.5 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-gray-100 dark:border-slate-700"
          >
            {item.children.map((child) => (
              <HorizontalSubItem key={child.id} item={child} currentPath={currentPath} onClose={onClose} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { useCompany } from '../../../context/CompanyContext';

const HeaderHorizontal = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { layoutMode, toggleTheme, toggleRightSidebar } = useTheme();
  const { companyData } = useCompany();

  const authUser = React.useMemo(() => {
    try {
      const stored = localStorage.getItem('authUser');
      return stored ? JSON.parse(stored) : {};
    } catch { return {}; }
  }, []);
  const userName = authUser.name || authUser.username || authUser.email || 'Shawn L.';

  const { logout } = useAuthStore();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleConfirmLogout = async () => {
    await logout();
    setIsLogoutOpen(false);
    navigate('/login', { replace: true });
  };

  const navItems = menuItems.filter((item) => !item.isTitle);

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-[100] h-16',
        'bg-white/80 dark:bg-slate-800/80 backdrop-blur-md',
        'border-b border-gray-100 dark:border-slate-700',
        'transition-all duration-300',
      )}>
        <div className="flex items-center justify-between h-full px-4 lg:px-8">
          {/* Left */}
          <div className="flex items-center gap-4 lg:gap-6 flex-1 min-w-0">
            <Link to="/chat-bot/dashboard" className="flex items-center gap-2.5 flex-shrink-0">
              <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-widest ml-2">TNAI</span>
            </Link>

            <button
              className="lg:hidden p-2 rounded-xl text-gray-500 hover:bg-primary/10 hover:text-primary dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <Feather.X className="w-5 h-5" /> : <Feather.Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block ml-2 lg:ml-4 flex-1 min-w-0 overflow-x-auto no-scrollbar">
              <ul className="flex items-center w-max">
                {navItems.map((item) => (
                  <HorizontalNavItem key={item.id} item={item} currentPath={location.pathname} />
                ))}
              </ul>
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1 flex-shrink-0 ml-4">
            <div className="hidden sm:block mr-2">
              <ModuleSwitcher isSidebar={false} />
            </div>


            <HeaderDropdown
              align="right"
              width="w-80"
              trigger={(toggle) => (
                <HeaderIconButton onClick={toggle} badge="5">
                  <Feather.Bell className="w-5 h-5" />
                </HeaderIconButton>
              )}
            >
              {(close) => (
                <>
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                    <h6 className="text-sm font-bold text-gray-800 dark:text-white">Notifications</h6>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto p-4 text-center">
                    <p className="text-xs text-gray-500 font-medium italic">No unread notifications</p>
                  </div>
                </>
              )}
            </HeaderDropdown>

            <HeaderIconButton onClick={toggleRightSidebar}>
              <Feather.Settings className="w-5 h-5" />
            </HeaderIconButton>

            <HeaderDropdown
              align="right"
              width="w-52"
              trigger={(toggle) => (
                <button
                  onClick={toggle}
                  className="flex items-center gap-2 h-10 px-2 ml-1 rounded-xl hover:bg-primary/10 dark:hover:bg-emerald-900/20 transition-colors"
                >
                  <img src="/assets/images/users/avatar-1.jpg" alt="Avatar" className="w-8 h-8 rounded-lg object-cover ring-2 ring-white dark:ring-slate-800" />
                  <span className="hidden xl:block text-xs font-bold text-gray-800 dark:text-white">{userName}</span>
                  <Feather.ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden xl:block" />
                </button>
              )}
            >
              {(close) => (
                <div className="p-1.5 space-y-0.5">
                  <Link to="/apps-contacts-profile" onClick={close} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400 rounded-lg transition-colors">
                    <Feather.User className="w-4 h-4 text-gray-400" /> My Profile
                  </Link>
                  <div className="my-1 border-t border-gray-100 dark:border-slate-700" />
                  <button onClick={() => { close(); setIsLogoutOpen(true); }} className="flex items-center gap-3 px-3 py-2 text-sm font-bold w-full text-left text-danger hover:bg-danger/10 rounded-lg transition-colors">
                    <Feather.LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </HeaderDropdown>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-[99] lg:hidden bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 shadow-2xl max-h-[calc(100vh-64px)] overflow-y-auto"
          >
            <ul className="p-4 space-y-1">
              {navItems.map((item) => (
                <MobileNavItem key={item.id} item={item} currentPath={location.pathname} onClose={() => setIsMobileMenuOpen(false)} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <LogoutModal 
        isOpen={isLogoutOpen} 
        onClose={() => setIsLogoutOpen(false)} 
        onConfirm={handleConfirmLogout} 
      />
    </>
  );
};

const MobileNavItem = ({ item, currentPath, onClose, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path === currentPath || (item.path && item.path !== '/' && currentPath.startsWith(item.path + '/'));
  const pl = depth === 0 ? 'px-4' : (depth === 1 ? 'pl-10 pr-4' : 'pl-14 pr-4');

  if (!hasChildren) {
    return (
      <li>
        <Link
          to={item.path || '#'}
          onClick={onClose}
          className={cn(
            'flex items-center gap-3 py-3 text-sm font-bold rounded-xl transition-all',
            pl,
            isActive ? 'text-white shadow-[0_4px_14px_rgba(49,151,96,0.28)]' : 'text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400'
          )}
          style={isActive ? { background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' } : {}}
        >
          {Icon && <Icon className="w-4 h-4" />}
          <span>{item.label}</span>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full py-3 text-sm font-bold rounded-xl transition-all',
          pl,
          'text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400'
        )}
      >
        <span className="flex items-center gap-3">
          {Icon && <Icon className="w-4 h-4" />}
          {item.label}
        </span>
        <Feather.ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-1 space-y-1"
          >
            {item.children.map((child) => (
              <MobileNavItem key={child.id} item={child} currentPath={location.pathname} onClose={onClose} depth={depth + 1} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default HeaderHorizontal;
