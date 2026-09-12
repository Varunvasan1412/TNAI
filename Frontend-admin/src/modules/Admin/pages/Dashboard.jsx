import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import * as Feather from 'react-feather';

/* ── Project color palette ─────────────────────────────────────────── */
const CLR = {
  green: 'var(--color-primary)',
  blue: 'var(--color-secondary)',
  orange: '#E67E22',
  lime: '#8CC63F',
};

/* ── TNAI Theme Background ──────────────────────────────────────────── */
const TnaiBg = () => (
  <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden bg-[#F8FAFC]">
    <svg className="absolute bottom-0 w-full h-[60vh] opacity-[0.05]" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill="var(--color-primary)" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    <svg className="absolute top-0 w-full h-[40vh] opacity-[0.03]" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill="var(--color-secondary)" fillOpacity="1" d="M0,64L80,85.3C160,107,320,149,480,165.3C640,181,800,171,960,144C1120,117,1280,75,1360,53.3L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
    </svg>
  </div>
);

/* ── Animated counter hook ───────────────────────────────────────────── */
const useCounter = (target, delay = 0) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (target === 0) return;
      const steps = Math.max(30, Math.min(80, target));
      const increment = Math.ceil(target / steps);
      const interval = 900 / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { setCount(target); clearInterval(timer); }
        else setCount(current);
      }, interval);
      return () => clearInterval(timer);
    }, delay * 1000 + 200);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return count;
};

/* ── Mini sparkline SVG ──────────────────────────────────────────────── */
const Sparkline = ({ data, color, id }) => {
  const W = 90, H = 38;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - ((v - min) / range) * (H * 0.82) - H * 0.09,
  }));
  const linePath = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
    const prev = pts[i - 1];
    const cpx = prev.x + (p.x - prev.x) * 0.5;
    return `${acc} C ${cpx.toFixed(2)} ${prev.y.toFixed(2)} ${cpx.toFixed(2)} ${p.y.toFixed(2)} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
  }, '');
  const areaPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;
  const gradId = `sp-${id}`;
  return (
    <svg width={W} height={H} className="overflow-visible shrink-0">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y}
        r="3.5" fill={color} />
    </svg>
  );
};

/* ── Stat card (glassmorphism) ────────────────────────────────────── */
const StatCard = ({ title, value, trend, color, bg, icon: Icon, sparkData, delay, sparkId, path }) => {
  const count = useCounter(value, delay);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => path && navigate(path)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer select-none
                 bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl
                 border border-white/80 dark:border-white/10
                 shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                 hover:-translate-y-1.5 transition-all duration-300"
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 20px 48px ${color}28, 0 4px 16px ${color}14`;
      }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}50)` }} />
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full
                      group-hover:scale-125 transition-transform duration-500"
        style={{ background: color, opacity: 0.07 }} />
      <div className="relative p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center
                            group-hover:scale-110 group-hover:rotate-3
                            transition-transform duration-300"
              style={{ background: bg }}>
              <Icon className="w-[18px] h-[18px]" style={{ color }} />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 leading-tight">
              {title}
            </p>
          </div>
          <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full shrink-0
                           bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
            {trend}
          </span>
        </div>
        <h3 className="text-[28px] font-black leading-none text-gray-800 dark:text-white mb-4">
          {count.toLocaleString()}
        </h3>
        <div className="flex items-end justify-between gap-3">
          <p className="text-[11px] font-medium text-gray-400 leading-snug pb-1">vs last month</p>
          <Sparkline data={sparkData} color={color} id={sparkId} />
        </div>
      </div>
    </motion.div>
  );
};

/* ── Glass card wrapper ──────────────────────────────────────────────── */
const GCard = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className={`rounded-2xl overflow-hidden
               bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl
               border border-white/80 dark:border-white/10
               shadow-[0_2px_14px_rgba(0,0,0,0.06)]
               ${className}`}
  >
    {children}
  </motion.div>
);

/* ── Section header ──────────────────────────────────────────────────── */
const SecHeader = ({ title, subtitle, onView }) => (
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="text-[14px] font-black text-gray-800 dark:text-white">{title}</h3>
      {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
    {onView && (
      <button
        onClick={onView}
        className="text-[12px] font-bold transition-colors duration-200 hover:opacity-80"
        style={{ color: CLR.green }}
      >
        View All
      </button>
    )}
  </div>
);

/* ════════════════════════════════════════════════════════════════════════
   MAIN DASHBOARD
   ════════════════════════════════════════════════════════════════════════ */
const CRMDashboard = () => {
  const navigate = useNavigate();

  const authUserStr = localStorage.getItem('authUser');
  let userName = 'Admin';
  try {
    if (authUserStr) {
      const authUser = JSON.parse(authUserStr);
      if (authUser?.name) userName = authUser.name;
    }
  } catch (e) {}

  /* ── Stat card definitions (Institution KPIs) ── */
  const statCards = [
    {
      title: 'Total Institutions', value: 248,
      trend: '+6', color: '#0A1C40', bg: '#0A1C4018',
      icon: Feather.Briefcase, sparkId: 'inst',
      sparkData: [180, 195, 202, 210, 218, 225, 230, 235, 240, 244, 246, 248],
      path: '/admin/institutions',
    },
    {
      title: 'Students Enrolled', value: 12450,
      trend: '+320', color: '#1F3F77', bg: '#1F3F7718',
      icon: Feather.Users, sparkId: 'students',
      sparkData: [9800, 10200, 10600, 10900, 11200, 11500, 11800, 12000, 12100, 12250, 12350, 12450],
      path: '/admin/students',
    },
    {
      title: 'Upcoming Events', value: 18,
      trend: '+3', color: '#E67E22', bg: '#E67E2218',
      icon: Feather.Calendar, sparkId: 'events',
      sparkData: [8, 10, 9, 12, 11, 14, 13, 15, 14, 16, 17, 18],
      path: '/admin/events',
    },
    {
      title: 'Active SNA Units', value: 156,
      trend: '+12', color: '#1ABC9C', bg: '#1ABC9C18',
      icon: Feather.Shield, sparkId: 'sna',
      sparkData: [110, 115, 120, 125, 130, 134, 138, 142, 146, 150, 153, 156],
      path: '/admin/sna-units',
    },
  ];

  /* ── Quick Access Modules ── */
  const quickModules = [
    { label: 'Executive Members', icon: Feather.Award, path: '/admin/executive-members', color: '#0A1C40', count: 24 },
    { label: 'Newsletter', icon: Feather.Mail, path: '/admin/newsletter', color: '#1F3F77', count: 42 },
    { label: 'SNAI Articles', icon: Feather.BookOpen, path: '/admin/snai-articles', color: '#E67E22', count: 87 },
    { label: 'Photo Gallery', icon: Feather.Image, path: '/admin/gallery/albums', color: '#9B59B6', count: 36 },
    { label: 'Downloads', icon: Feather.Download, path: '/admin/downloads', color: '#1ABC9C', count: 65 },
    { label: 'Our Activities', icon: Feather.Activity, path: '/admin/activities', color: '#E74C3C', count: 53 },
    { label: 'Our Impacts', icon: Feather.Target, path: '/admin/impacts', color: '#F39C12', count: 29 },
    { label: 'Voice Concern', icon: Feather.MessageSquare, path: '/admin/voice-concern', color: '#2C3E50', count: 14 },
  ];

  /* ── Recent Events ── */
  const recentEvents = [
    { id: 1, title: 'National Nursing Conference 2026', date: 'Sep 20, 2026', venue: 'Chennai Convention Centre', status: 'Upcoming', category: 'Conference' },
    { id: 2, title: 'SNA Leadership Workshop', date: 'Sep 15, 2026', venue: 'AIIMS New Delhi', status: 'Ongoing', category: 'Workshop' },
    { id: 3, title: 'World Patient Safety Day', date: 'Sep 17, 2026', venue: 'Multiple Locations', status: 'Upcoming', category: 'Awareness' },
    { id: 4, title: 'TNAI Annual General Body Meeting', date: 'Oct 05, 2026', venue: 'Hyderabad', status: 'Upcoming', category: 'Meeting' },
  ];

  /* ── Recent News & Circulars ── */
  const recentNews = [
    { id: 1, title: 'TNAI Membership Renewal Notice 2026-27', type: 'Circular', date: 'Sep 10, 2026' },
    { id: 2, title: 'New SNA Unit Approved – Bangalore Medical College', type: 'News', date: 'Sep 08, 2026' },
    { id: 3, title: 'Guidelines for Institution Profile Updates', type: 'Circular', date: 'Sep 05, 2026' },
    { id: 4, title: 'TNAI Newsletter Vol. 48 Published', type: 'News', date: 'Sep 01, 2026' },
  ];

  /* ── Pending Approvals ── */
  const pendingApprovals = [
    { id: 1, item: 'SNA Unit – CMC Vellore', type: 'SNA Unit', submitted: 'Sep 09, 2026', status: 'Pending' },
    { id: 2, item: 'Event – Regional Nursing Seminar', type: 'Event', submitted: 'Sep 08, 2026', status: 'Pending' },
    { id: 3, item: 'Article – "Advances in Critical Care"', type: 'SNAI Article', submitted: 'Sep 07, 2026', status: 'Rework' },
    { id: 4, item: 'Newsletter – Vol. 49 Draft', type: 'Newsletter', submitted: 'Sep 06, 2026', status: 'Pending' },
  ];

  /* ── Institution Distribution ── */
  const distributionData = [
    { label: 'Nursing Colleges', count: 142, pct: 57, color: '#0A1C40' },
    { label: 'Medical Institutions', count: 48, pct: 19, color: '#1F3F77' },
    { label: 'Government Hospitals', count: 35, pct: 14, color: '#1ABC9C' },
    { label: 'Private Institutions', count: 23, pct: 10, color: '#F39C12' },
  ];

  const getStatusBg = (status) => {
    switch (status) {
      case 'Upcoming': return { bg: '#1F3F7715', color: '#1F3F77' };
      case 'Ongoing': return { bg: '#1ABC9C15', color: '#1ABC9C' };
      case 'Pending': return { bg: '#F39C1215', color: '#F39C12' };
      case 'Rework': return { bg: '#E74C3C15', color: '#E74C3C' };
      default: return { bg: '#0A1C4015', color: '#0A1C40' };
    }
  };

  /* ─────────────────────────────────────────────────────────────── */
  return (
    <div className="relative space-y-6 min-h-screen">

      {/* Ambient background */}
      <TnaiBg />
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* ── Welcome header ──────────────────────────────────────────── */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <h2 className="text-[22px] font-black text-gray-800 dark:text-white tracking-tight">
              Welcome back, {userName}! 👋
            </h2>
            <p className="text-[13px] text-gray-400 mt-1">
              Here's your institution management overview.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl self-start sm:self-auto
                                   bg-white/80 dark:bg-slate-800/60 backdrop-blur-md
                                   border border-white/80 dark:border-white/10
                                   shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Feather.Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-[13px] font-bold text-gray-600 dark:text-gray-300">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* ── Stat cards ──────────────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* ── Quick Access Modules ──────────────────────────────────── */}
      <div className="relative z-10">
        <GCard className="p-5" delay={0.28}>
          <SecHeader title="Quick Access" subtitle="Navigate to key modules" />
          <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3">
            {quickModules.map((mod) => {
              const ModIcon = mod.icon;
              return (
                <Link
                  key={mod.label}
                  to={mod.path}
                  className="group flex flex-col items-center gap-2 p-3 rounded-xl
                             hover:bg-gray-50/80 dark:hover:bg-slate-700/40
                             transition-all duration-200 text-center"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center
                               group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${mod.color}15` }}
                  >
                    <ModIcon className="w-5 h-5" style={{ color: mod.color }} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300 leading-tight">{mod.label}</span>
                  <span className="text-[9px] font-bold text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{mod.count}</span>
                </Link>
              );
            })}
          </div>
        </GCard>
      </div>

      {/* ── Main grid ────────────────────────────── */}
      <div className="relative z-10 space-y-6">

        {/* Row 1: Events + Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Upcoming Events (2/3 width) */}
          <GCard className="lg:col-span-2 p-5" delay={0.32}>
            <SecHeader title="Upcoming Events" subtitle="Conferences, workshops & institutional events" onView={() => navigate('/admin/events')} />
            <div className="space-y-1">
              {recentEvents.map((event, i) => {
                const sc = getStatusBg(event.status);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                    className="flex items-center gap-3 px-3 py-3 -mx-3 rounded-xl
                               hover:bg-gray-50/80 dark:hover:bg-slate-700/40
                               transition-all duration-200 cursor-pointer group"
                  >
                    {/* Calendar icon */}
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: '#0A1C4015' }}>
                      <Feather.Calendar className="w-4 h-4" style={{ color: '#0A1C40' }} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-gray-800 dark:text-white leading-snug truncate
                                   group-hover:text-primary transition-colors duration-200">
                        {event.title}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Feather.MapPin className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="text-[10px] text-gray-400 truncate">{event.venue}</span>
                        <span className="text-[10px] text-gray-300">•</span>
                        <span className="text-[10px] text-gray-400">{event.date}</span>
                      </div>
                    </div>

                    {/* Category */}
                    <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-gray-400
                                     bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md shrink-0">
                      {event.category}
                    </span>

                    {/* Status */}
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0"
                      style={{ background: sc.bg, color: sc.color }}>
                      {event.status}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </GCard>

          {/* Institution Distribution (1/3 width) */}
          <GCard className="p-5" delay={0.36}>
            <SecHeader title="Institution Distribution" subtitle="By category type" onView={() => navigate('/admin/institutions')} />
            <div className="space-y-5 mt-2">
              {distributionData.map(d => (
                <div key={d.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-gray-700 dark:text-white text-[12px]">{d.label}</span>
                    <span className="text-gray-400 font-mono text-[11px]">{d.count} ({d.pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${d.pct}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ background: d.color }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Institutions</p>
                    <h5 className="text-lg font-black text-gray-800 dark:text-white">248</h5>
                  </div>
                </div>
              </div>
            </div>
          </GCard>
        </div>

        {/* Row 2: News + Approvals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Latest News & Circulars */}
          <GCard className="p-5" delay={0.42}>
            <SecHeader title="Latest News & Circulars" subtitle="Recent announcements" onView={() => navigate('/admin/news-circulars')} />
            <div className="space-y-1">
              {recentNews.map((news, i) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
                  className="flex items-center gap-3 px-3 py-2.5 -mx-3 rounded-xl
                             hover:bg-gray-50/80 dark:hover:bg-slate-700/40
                             transition-all duration-200 cursor-pointer group"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    news.type === 'Circular' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'
                  }`}>
                    {news.type === 'Circular' ? <Feather.FileText className="w-4 h-4" /> : <Feather.Bell className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-gray-700 dark:text-gray-200 truncate
                                 group-hover:text-primary transition-colors">{news.title}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{news.date}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                    news.type === 'Circular' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-500'
                  }`}>
                    {news.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </GCard>

          {/* Pending Approvals */}
          <GCard className="p-5" delay={0.48}>
            <SecHeader title="Pending Approvals" subtitle="Items awaiting admin review" />
            <div className="space-y-1">
              {pendingApprovals.map((appr, i) => {
                const sc = getStatusBg(appr.status);
                return (
                  <motion.div
                    key={appr.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.07, duration: 0.4 }}
                    className="flex items-center gap-3 px-3 py-2.5 -mx-3 rounded-xl
                               hover:bg-gray-50/80 dark:hover:bg-slate-700/40
                               transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                      <Feather.Clock className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-gray-700 dark:text-gray-200 truncate">{appr.item}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{appr.type} · {appr.submitted}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0"
                      style={{ background: sc.bg, color: sc.color }}>
                      {appr.status}
                    </span>
                  </motion.div>
                );
              })}
              <div className="pt-3">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                                   bg-gray-50/80 dark:bg-slate-700/40
                                   text-[12px] font-bold text-gray-600 dark:text-gray-300
                                   hover:bg-gray-100 dark:hover:bg-slate-700/60 transition-all duration-200">
                  <Feather.CheckCircle className="w-3.5 h-3.5" /> Review All Approvals
                </button>
              </div>
            </div>
          </GCard>
        </div>

        {/* ── Statistics Banner ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="rounded-2xl p-6 md:p-8"
          style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: 'TNAI Units', value: '86', icon: Feather.Award },
              { label: 'SNA Units', value: '156', icon: Feather.Shield },
              { label: 'Total Members', value: '18,400+', icon: Feather.Users },
              { label: 'States Covered', value: '28', icon: Feather.Map },
            ].map((counter, i) => {
              const CIcon = counter.icon;
              return (
                <div key={i} className="text-center text-white">
                  <CIcon className="w-7 h-7 mx-auto mb-2 opacity-80" />
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">{counter.value}</h3>
                  <p className="text-xs font-semibold opacity-75 mt-1 uppercase tracking-wider">{counter.label}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default CRMDashboard;
