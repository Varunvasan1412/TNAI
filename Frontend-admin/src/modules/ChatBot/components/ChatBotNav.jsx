import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, MessageSquare, Grid } from 'react-feather';
import { useAuthStore } from '../../../store/store';

const BrandLogoSVG = ({ className = 'w-8 h-8' }) => (
  <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="2"  width="24" height="12" rx="1" fill="var(--color-primary)" />
    <rect x="46" y="2"  width="12" height="12" rx="1" fill="#E67E22" />
    <rect x="46" y="16" width="12" height="22" rx="1" fill="var(--color-secondary)" />
    <rect x="24" y="20" width="23" height="9"  rx="1" transform="rotate(-45 24 20)" fill="#8CC63F" />
  </svg>
);

const nav = [
  { label: 'Dashboard', path: '/chat-bot',      icon: Grid },
  { label: 'Chat Bot',  path: '/chat-bot/chat', icon: MessageSquare   },
];

const ChatBotNav = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { user: storeUser, logout } = useAuthStore();

  const localUser   = (() => { try { return JSON.parse(localStorage.getItem('authUser') || '{}'); } catch { return {}; } })();
  const user        = storeUser || localUser;
  const displayName = user?.username || user?.name || user?.email?.split('@')[0] || 'Admin';
  const initials    = displayName.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[64px]
                       bg-white/60 backdrop-blur-2xl
                       border-b border-white/70
                       shadow-[0_4px_24px_rgba(49,151,96,0.07)]">
      {/* Brand gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-[3px]
                      bg-gradient-to-r from-primary via-[#8CC63F] to-secondary" />

      <div className="flex items-center justify-between h-full px-6 lg:px-10 max-w-[1400px] mx-auto">

        {/* Left: Logo + nav */}
        <div className="flex items-center gap-8">
          <Link to="/module-selection" className="flex items-center gap-2.5 group">
            <BrandLogoSVG className="w-7 h-7 group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-black text-[#1E293B] tracking-wider">RSI STORE</span>
              <span className="text-[9px] font-bold text-secondary tracking-[0.25em] uppercase mt-0.5">Chat Bot</span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {nav.map(({ label, path, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <Link key={path} to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold
                              transition-all duration-200
                              ${active
                                ? 'text-white shadow-[0_4px_14px_rgba(49,151,96,0.30)]'
                                : 'text-gray-500 hover:text-primary hover:bg-primary/8'
                              }`}
                  style={active ? { background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' } : {}}>
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: User + logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl
                          bg-white/60 border border-white/70
                          shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center
                            text-white font-black text-[11px]
                            shadow-[0_3px_10px_rgba(49,151,96,0.28)]"
                 style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
              {initials}
            </div>
            <div className="hidden md:flex flex-col leading-none">
              <span className="text-[12px] font-bold text-[#1E293B]">{displayName}</span>
              <span className="text-[9px] font-bold text-primary tracking-[0.2em] uppercase mt-0.5">Agent</span>
            </div>
          </div>

          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                       text-[12px] font-bold text-red-500 hover:text-white
                       bg-red-50/80 hover:bg-red-500
                       border border-red-200/60 hover:border-red-500
                       transition-all duration-200 group">
            <LogOut className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ChatBotNav;
