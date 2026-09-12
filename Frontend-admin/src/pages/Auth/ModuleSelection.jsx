import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, ShoppingCart, Package, CheckSquare,
  Truck, DollarSign, BarChart2, Briefcase,
  ArrowRight, Lock,
  MessageCircle,
} from 'react-feather';
import ModuleSelectionHeader from '../../components/Layout/ModuleSelectionHeader';

/* ── Module registry ────────────────────────────────────────────────── */
const modules = [
  {
    id: 1,
    name: 'Admin',
    icon: Users,
    from: 'var(--color-primary)', to: '#8CC63F',
    glow: 'rgba(49,151,96,0.30)',
    desc: 'Manage members, institutions, content and core portal data.',
    path: '/admin/dashboard',
    active: true,
  },
  {
    id: 3,
    name: 'Chat Bot',
    icon: MessageCircle,
    from: '#F39C12',
    to: '#E67E22',
    glow: 'rgba(243,156,18,0.30)',
    desc: 'AI-powered assistant for instant responses, customer support, and smart conversations.',
    path: '/chat-bot/dashboard',
    active: true,
  },
  /*
  {
    id: 4,
    name: 'Inventory',
    icon: Package,
    from: '#8CC63F', to: 'var(--color-primary)',
    glow: 'rgba(140,198,63,0.30)',
    desc: 'Stock levels, raw materials & warehousing.',
    path: '/inventory',
    active: false,
  },
  {
    id: 5,
    name: 'Quality',
    icon: CheckSquare,
    from: '#E67E22', to: '#D35400',
    glow: 'rgba(230,126,34,0.30)',
    desc: 'QC checks, compliance & batch testing.',
    path: '/quality',
    active: false,
  },
  {
    id: 6,
    name: 'Dispatch',
    icon: Truck,
    from: '#E74C3C', to: '#C0392B',
    glow: 'rgba(231,76,60,0.30)',
    desc: 'Shipments, logistics & delivery tracking.',
    path: '/dispatch',
    active: false,
  },
  {
    id: 7,
    name: 'Accounts',
    icon: DollarSign,
    from: '#9B59B6', to: '#8E44AD',
    glow: 'rgba(155,89,182,0.30)',
    desc: 'Billing, ledgers & financial statements.',
    path: '/accounts',
    active: false,
  },
  {
    id: 8,
    name: 'Reports',
    icon: BarChart2,
    from: '#1ABC9C', to: '#16A085',
    glow: 'rgba(26,188,156,0.30)',
    desc: 'Analytics, dashboards & export tools.',
    path: '/reports',
    active: false,
  },
  {
    id: 9,
    name: 'HR',
    icon: Briefcase,
    from: '#F39C12', to: '#E67E22',
    glow: 'rgba(243,156,18,0.30)',
    desc: 'Payroll, attendance & employee records.',
    path: '/hr',
    active: false,
  },
  */
];

/* ── Shared circuit background (matches Login / Register) ────────────── */
const CircuitBackground = () => (
  <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
    {/* Soft glowing ambient backgrounds */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-secondary/5 to-primary/5 blur-[120px]"/>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/5 to-secondary/5 blur-[120px]"/>
    
    <svg className="w-full h-full opacity-[0.35]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="var(--color-primary)" opacity="0.15" />
        </pattern>
        <linearGradient id="inst-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
      
      {/* Structural Dot Grid Background */}
      <rect width="100%" height="100%" fill="url(#dotGrid)" />
      
      {/* Abstract Structural Arches / Pillars (Left Side) */}
      <path d="M 150 1200 L 150 300 Q 150 150 350 150 L 550 150 Q 750 150 750 300 L 750 1200" stroke="url(#inst-g)" strokeWidth="1.5" fill="none" opacity="0.6" strokeDasharray="12 6" />
      <path d="M 220 1200 L 220 380 Q 220 230 420 230 L 480 230 Q 680 230 680 380 L 680 1200" stroke="url(#inst-g)" strokeWidth="2" fill="none" opacity="0.3" />
      
      {/* Concentric Circles representing Community/Institution reach (Right Side) */}
      <circle cx="85%" cy="25%" r="400" stroke="url(#inst-g)" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="8 8" />
      <circle cx="85%" cy="25%" r="280" stroke="url(#inst-g)" strokeWidth="2" fill="none" opacity="0.2" />
      <circle cx="85%" cy="25%" r="160" stroke="url(#inst-g)" strokeWidth="1.5" fill="none" opacity="0.5" />
      
      {/* Base Foundation Lines */}
      <path d="M 0 85% L 100% 85%" stroke="var(--color-primary)" strokeWidth="2" fill="none" opacity="0.15" />
      <path d="M 0 88% L 100% 88%" stroke="var(--color-secondary)" strokeWidth="1" fill="none" opacity="0.15" />
      <path d="M 0 91% L 100% 91%" stroke="var(--color-primary)" strokeWidth="3" fill="none" opacity="0.08" />
    </svg>
  </div>
);

/* ── Module card ─────────────────────────────────────────────────────── */
const ModuleCard = ({ mod, index, onClick }) => {
  const Icon = mod.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: 'easeOut' }}
      onClick={() => mod.active && onClick(mod.path)}
      className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border
        ${mod.active
          ? 'cursor-pointer border-white/40 hover:-translate-y-1.5 hover:shadow-2xl'
          : 'cursor-not-allowed border-white/20 opacity-60'}
        bg-white/25 backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.08)]
        transition-all duration-300`}
    >
      {/* Top accent gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, ${mod.from}, ${mod.to})` }}
      />

      {/* Hover glow layer */}
      {mod.active && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"
          style={{ background: `radial-gradient(ellipse at 30% 0%, ${mod.glow}, transparent 70%)` }}
        />
      )}

      <div className="relative z-10 p-5 sm:p-6 lg:p-7 flex flex-col h-full">

        {/* Icon + arrow row */}
        <div className="flex items-start justify-between mb-4 sm:mb-5">

          {/* Icon bubble */}
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `linear-gradient(135deg, ${mod.from}, ${mod.to})` }}
          >
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>

          {/* Arrow / lock badge */}
          {mod.active ? (
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/40 border border-white/50 flex items-center justify-center text-gray-500 group-hover:text-white transition-all duration-300"
              style={{ '--tw-bg-opacity': 1 }}
            >
              <motion.div
                className="flex items-center justify-center"
                animate={{}}
                whileHover={{ x: 2 }}
              >
                <ArrowRight className="w-4 h-4 group-hover:text-white transition-colors"
                  style={{ color: mod.from }} />
              </motion.div>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-400/20 border border-gray-300/30">
              <Lock className="w-2.5 h-2.5 text-gray-400" />
              <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Soon</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h3
          className="text-lg sm:text-xl font-black tracking-tight text-[#1E293B] mb-1.5 transition-colors duration-300"
          style={mod.active ? {} : {}}
        >
          {mod.name}
        </h3>

        {/* Description */}
        <p className="text-[12px] sm:text-[13px] text-gray-500 font-medium leading-relaxed flex-1">
          {mod.desc}
        </p>

        {/* Active launch strip */}
        {mod.active && (
          <div className="mt-4 pt-4 border-t border-white/30 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: mod.from }}>
              Launch Module
            </span>
            <div
              className="h-1 w-16 rounded-full opacity-60"
              style={{ background: `linear-gradient(90deg, ${mod.from}, ${mod.to})` }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ── Page ────────────────────────────────────────────────────────────── */
const ModuleSelection = () => {
  const navigate = useNavigate();

  const handleModuleClick = (path) => {
    navigate(path || '/dashboard');
  };

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('authUser') || '{}'); } catch { return {}; }
  })();
  const displayName = user.username || user.name || 'Admin';

  return (
    <div className="min-h-screen w-full relative font-sans overflow-x-hidden
                    bg-gradient-to-br from-[#EBF5FB] via-[#E8F8F5] to-[#FEF9E7]">

      {/* Circuit schematic background */}
      <CircuitBackground />

      {/* Ambient glow blobs — fixed so they don't scroll */}
      <div className="fixed -top-16 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/10 to-[#8CC63F]/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-secondary/10 to-primary/8 blur-[140px] pointer-events-none" />
      <div className="fixed top-[40%] left-[35%] w-[400px] h-[400px] rounded-full bg-[#E67E22]/5 blur-[130px] pointer-events-none" />

      {/* Existing header (fixed, stays on top) */}
      <ModuleSelectionHeader />

      {/* ── Page content ──────────────────────────────────────────────── */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* ── Hero section ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center mb-10 sm:mb-14"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                            bg-white/50 backdrop-blur-md border border-white/60
                            shadow-[0_4px_16px_rgba(49,151,96,0.10)] mb-5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-black text-primary uppercase tracking-[0.22em]">
                Welcome back, {displayName}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E293B] tracking-tight leading-tight">
              Select a{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Module
              </span>{' '}
              to Start
            </h1>

            <p className="mt-4 text-[13px] sm:text-[15px] text-gray-500 font-medium max-w-xl mx-auto leading-relaxed">
              Choose the application module you'd like to manage today.
              Each module is fully integrated across the TNAI platform.
            </p>
          </motion.div>

          {/* ── Stats strip ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 sm:mb-14"
          >
            {[
              { label: 'Active Modules', value: `${modules.filter(m => m.active).length}` },
              { label: 'Total Modules', value: `${modules.length}` },
            ].map((s) => (
              <div key={s.label}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl
                           bg-white/40 backdrop-blur-md border border-white/50
                           shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <span className="text-[18px] sm:text-[22px] font-black text-[#1E293B]">{s.value}</span>
                <span className="text-[11px] sm:text-[12px] font-semibold text-gray-400">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* ── Module grid ───────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {modules.map((mod, i) => (
              <ModuleCard
                key={mod.id}
                mod={mod}
                index={i}
                onClick={handleModuleClick}
              />
            ))}
          </div>

          {/* ── Footer note ───────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center text-[12px] text-gray-400 font-medium mt-12"
          >
            Need help?{' '}
            <span className="text-primary font-bold cursor-pointer hover:underline">Support Center</span>
            {' '}·{' '}
            <span className="text-primary font-bold cursor-pointer hover:underline">Documentation</span>
          </motion.p>
        </div>
      </main>
    </div>
  );
};

export default ModuleSelection;
