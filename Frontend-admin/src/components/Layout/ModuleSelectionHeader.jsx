import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, LogOut, ChevronRight, Grid, ChevronDown, Briefcase } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/store';
import { useCompany } from '../../context/CompanyContext';
import LogoutModal from '../ui/LogoutModal';/* ── Live clock ─────────────────────────────────────────────────────── */
const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const hh = pad(time.getHours());
  const mm = pad(time.getMinutes());
  const ss = pad(time.getSeconds());
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
  const date = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div className="hidden md:flex items-center gap-3
                    px-4 py-2.5 rounded-2xl
                    bg-white/60 border border-white/80
                    shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      <Clock className="w-4 h-4 text-primary shrink-0" />
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-[15px] font-black text-[#1E293B] tracking-widest">
            {hh}<span className="text-primary animate-pulse mx-px">:</span>{mm}<span className="text-primary animate-pulse mx-px">:</span>{ss}
          </span>
          <span className="text-[9px] font-black text-primary tracking-wider">{ampm}</span>
        </div>
        <span className="text-[9px] font-semibold text-gray-400 tracking-widest uppercase mt-0.5">{date}</span>
      </div>
    </div>
  );
};

/* ── Brand SVG ──────────────────────────────────────────────────────── */
const BrandLogoSVG = ({ className = 'w-9 h-9' }) => (
  <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="2" width="24" height="12" rx="1" fill="var(--color-primary)" />
    <rect x="46" y="2" width="12" height="12" rx="1" fill="#E67E22" />
    <rect x="46" y="16" width="12" height="22" rx="1" fill="var(--color-secondary)" />
    <rect x="24" y="20" width="23" height="9" rx="1" transform="rotate(-45 24 20)" fill="#8CC63F" />
  </svg>
);

/* ── Separator ──────────────────────────────────────────────────────── */
const Sep = () => (
  <div className="hidden sm:block h-8 w-px bg-gradient-to-b from-transparent via-gray-200/80 to-transparent" />
);

/* ── Dropdown Component ─────────────────────────────────────────────── */
const Dropdown = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative inline-flex">
      {trigger(() => setIsOpen(!isOpen), isOpen)}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-2 z-50 w-52 rounded-xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden"
          >
            {typeof children === 'function' ? children(() => setIsOpen(false)) : children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Header ─────────────────────────────────────────────────────────── */
const ModuleSelectionHeader = () => {
  const navigate = useNavigate();
  const { companyData } = useCompany();

  const { user: storeUser, logout } = useAuthStore();

  const localUser = (() => {
    try { return JSON.parse(localStorage.getItem('authUser') || '{}'); } catch { return {}; }
  })();
  const user = storeUser || localUser;
  const displayName = user?.username || user?.name || user?.email?.split('@')[0] || 'Admin';
  const initials = displayName.slice(0, 2).toUpperCase();
  const userRole = user?.role || user?.user_type || 'Administrator';

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogoutClick = () => setIsLogoutOpen(true);

  const handleConfirmLogout = async () => {
    await logout();           // calls API + clears localStorage + removes axios header
    setIsLogoutOpen(false);
    navigate('/login', { replace: true });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] h-[70px]
                 bg-white/55 backdrop-blur-2xl
                 border-b border-white/70
                 shadow-[0_8px_32px_rgba(49,151,96,0.07)]
                 transition-all duration-300"
    >
      {/* Brand gradient top stripe */}
      <div className="absolute top-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-primary via-[#8CC63F] to-secondary" />

      <div className="flex items-center justify-between h-full
                      px-6 sm:px-8 lg:px-14 max-w-[1400px] mx-auto">

        {/* ── LEFT ──────────────────────────────────────────────── */}
        <div className="flex items-center gap-5">

          {/* Brand logo + name */}
          <Link to="/module-selection" className="flex items-center gap-3 group outline-none">
            <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-widest ml-2">TNAI</span>
          </Link>



          <Sep />

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[12px] font-medium text-gray-400">Home</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <div className="flex items-center gap-2 px-3 py-1.5
                            bg-gradient-to-r from-primary/10 to-secondary/8
                            border border-primary/20 rounded-lg">
              <Grid className="w-3 h-3 text-primary" />
              <span className="text-[11px] font-black text-primary tracking-[0.16em] uppercase">
                Module Selection
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-5">

          {/* Clock */}
          <LiveClock />

          <Sep />

          {/* User info */}
          {(() => {
            const UserInfoContent = ({ withChevron }) => (
              <>
                <div className="relative shrink-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center
                               text-white font-black text-[13px] tracking-wide
                               shadow-[0_4px_14px_rgba(49,151,96,0.28)]"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' }}
                  >
                    {initials}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-[11px] h-[11px] rounded-full
                                   bg-primary ring-2 ring-white shadow-sm" />
                </div>
                <div className="hidden md:flex flex-col leading-none text-left">
                  <span className="text-[13px] font-bold text-[#1E293B]">{displayName}</span>
                  <span className="text-[9px] font-bold text-primary tracking-[0.22em] uppercase mt-[3px]">
                    {userRole}
                  </span>
                </div>
                {withChevron && <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block ml-1" />}
              </>
            );

            return (
              <Dropdown
                trigger={(toggle) => (
                  <button 
                    onClick={toggle}
                    className="flex items-center gap-3 hover:bg-gray-50/80 p-1.5 pr-2 rounded-2xl transition-all duration-200"
                  >
                    <UserInfoContent withChevron />
                  </button>
                )}
              >
                {(close) => (
                  <div className="p-1.5 space-y-0.5">
                    <Link
                      to="/company-profile"
                      onClick={close}
                      className="flex items-center gap-3 px-3 py-2 text-[13px] font-bold text-gray-700 hover:text-primary hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      Company Profile
                    </Link>
                  </div>
                )}
              </Dropdown>
            );
          })()}

          <Sep />

          {/* Logout */}
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-2 px-4 py-2.5
                       text-[12px] font-bold tracking-wide
                       text-red-500 hover:text-white
                       bg-red-50/80 hover:bg-red-500
                       border border-red-200/60 hover:border-red-500
                       rounded-xl
                       shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                       hover:shadow-[0_6px_20px_rgba(239,68,68,0.22)]
                       transition-all duration-200 group"
          >
            <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5 shrink-0" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </header>
  );
};

export default ModuleSelectionHeader;
