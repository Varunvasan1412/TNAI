import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Feather from 'react-feather';
import { useChatbotStore } from '../../../store/chatbotStore';

/* ── Brand colors ────────────────────────────────────────────────────── */
const CLR = {
  green:  'var(--color-primary)',
  blue:   'var(--color-secondary)',
  orange: '#E67E22',
  lime:   '#8CC63F',
  purple: '#9B59B6',
  red:    '#E74C3C',
  teal:   '#1ABC9C',
};

/* ── Local helpers (mirrors ChatBot.jsx) ─────────────────────────────── */
const getInitials = (name = '') =>
  name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

const GRADIENTS = [
  ['#1d7a52', '#1a6fa8'],
  ['#6b3fa0', '#a0285a'],
  ['#a07020', '#a04420'],
  ['#107898', '#1040a0'],
  ['#1a7a50', '#0a6a60'],
];
const getGradient = (name = '') => GRADIENTS[(name.charCodeAt(0) || 0) % GRADIENTS.length];

const formatMsgTime = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  if (d.toDateString() === now.toDateString())
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

/* Decorative trend sparkline ending at real current value */
const generateTrend = (endVal, steps = 12) => {
  const start = Math.max(0, Math.round(endVal * 0.5));
  return Array.from({ length: steps }, (_, i) => {
    const progress = i / (steps - 1);
    const base = start + (endVal - start) * progress;
    const zigzag = Math.sin(i * 1.5) * Math.max(1, endVal * 0.12);
    return Math.max(0, Math.round(base + zigzag));
  });
};

/* Compute avg admin first-response time across all sessions (in minutes) */
const computeAvgResponseTime = (sessions) => {
  const times = [];
  sessions.forEach(s => {
    const msgs = [...(s.messages || [])].sort((a, b) => a.id - b.id);
    const firstUser  = msgs.find(m => m.sender_type === 'user');
    const firstAdmin = msgs.find(m => m.sender_type === 'admin' && m.id > (firstUser?.id || 0));
    if (firstUser?.created_at && firstAdmin?.created_at) {
      const diff = (new Date(firstAdmin.created_at) - new Date(firstUser.created_at)) / 60000;
      if (diff > 0 && diff < 1440) times.push(diff); // ignore >24h outliers
    }
  });
  if (!times.length) return null;
  const avg = times.reduce((s, t) => s + t, 0) / times.length;
  return avg < 1 ? `${Math.round(avg * 60)}s` : `${Math.round(avg)}m`;
};

/* Group today's messages into 2-hour slots for the activity chart */
const computeActivityData = (sessions) => {
  const slotStarts = [6, 8, 10, 12, 14, 16, 18];
  const counts = new Array(slotStarts.length).fill(0);
  const today = new Date().toDateString();
  sessions.forEach(s =>
    (s.messages || []).forEach(m => {
      if (!m.created_at) return;
      const d = new Date(m.created_at);
      if (d.toDateString() !== today) return;
      const h = d.getHours();
      for (let i = slotStarts.length - 1; i >= 0; i--) {
        if (h >= slotStarts[i]) { counts[i]++; break; }
      }
    })
  );
  return counts;
};

/* ── Ambient circuit background ─────────────────────────────────────── */
const CircuitBg = () => (
  <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full
                    bg-gradient-to-bl from-primary/8 to-[#8CC63F]/5 blur-[130px]" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full
                    bg-gradient-to-tr from-secondary/8 to-primary/5 blur-[130px]" />
    <div className="absolute top-[40%] left-[30%] w-[360px] h-[360px] rounded-full
                    bg-[#E67E22]/4 blur-[110px]" />
    <svg className="w-full h-full opacity-[0.15]" viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cb-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.9" />
        </linearGradient>
        <filter id="cb-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect x="3%" y="6%" width="88" height="88" rx="8" stroke="url(#cb-g)" strokeWidth="2.5" fill="none" />
      <rect x="4.5%" y="7.5%" width="68" height="68" rx="5" fill="var(--color-primary)" opacity="0.07" />
      <rect x="89%" y="80%" width="80" height="80" rx="8" stroke="url(#cb-g)" strokeWidth="2.5" fill="none" />
      <circle cx="50%" cy="48%" r="260" stroke="var(--color-secondary)" strokeWidth="1.2" strokeDasharray="10,8" fill="none" />
      <circle cx="50%" cy="48%" r="340" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="14,12" fill="none" />
      <circle cx="50%" cy="48%" r="420" stroke="#E67E22" strokeWidth="1.2" strokeDasharray="5,14" fill="none" />
      <path d="M -80 300 L 340 300 L 420 380 L 700 380 L 780 460 L 1600 460"
        stroke="var(--color-secondary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M -80 320 L 330 320 L 410 400 L 690 400 L 770 480 L 1600 480"
        stroke="var(--color-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 260 0 L 260 180 L 340 260 L 580 260 L 640 320 L 640 1100"
        stroke="#E67E22" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 1080 0 L 1080 280 L 1020 340 H 800 L 740 400 L 740 1100"
        stroke="var(--color-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle r="4" fill="var(--color-secondary)" filter="url(#cb-glow)">
        <animateMotion dur="9s" repeatCount="indefinite"
          path="M -80 300 L 340 300 L 420 380 L 700 380 L 780 460 L 1600 460" />
      </circle>
      <circle r="3.5" fill="var(--color-primary)" filter="url(#cb-glow)">
        <animateMotion dur="7s" repeatCount="indefinite"
          path="M -80 320 L 330 320 L 410 400 L 690 400 L 770 480 L 1600 480" />
      </circle>
      <circle r="4" fill="#E67E22" filter="url(#cb-glow)">
        <animateMotion dur="11s" repeatCount="indefinite"
          path="M 260 0 L 260 180 L 340 260 L 580 260 L 640 320 L 640 1100" />
      </circle>
      <path d="M 36 36 H 110 M 36 36 V 110" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 1564 36 H 1490 M 1564 36 V 110" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

/* ── Animated counter ────────────────────────────────────────────────── */
const useCounter = (target, delay = 0) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const num = parseInt(target) || 0;
      if (num === 0) return;
      const steps = Math.max(20, Math.min(60, num));
      const increment = Math.ceil(num / steps);
      const interval = 800 / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= num) { setCount(num); clearInterval(timer); }
        else setCount(current);
      }, interval);
      return () => clearInterval(timer);
    }, delay * 1000 + 200);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return count;
};

/* ── Mini sparkline ──────────────────────────────────────────────────── */
const Sparkline = ({ data, color, id }) => {
  const W = 90, H = 38;
  const min = Math.min(...data), max = Math.max(...data);
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
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3.5" fill={color} />
    </svg>
  );
};

/* ── Stat card ───────────────────────────────────────────────────────── */
const StatCard = ({ title, value, sub, color, bg, icon: Icon, sparkData, delay, sparkId, isText }) => {
  const count = useCounter(value, delay);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden cursor-default select-none
                 bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl
                 border border-white/80 dark:border-white/10
                 shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                 hover:-translate-y-1.5 transition-all duration-300"
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 48px ${color}28, 0 4px 16px ${color}14`; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 rounded-t-2xl"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}50)` }} />
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full
                      group-hover:scale-125 transition-transform duration-500"
        style={{ background: color, opacity: 0.07 }} />
      <div className="relative p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center
                          group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
            style={{ background: bg }}>
            <Icon className="w-[18px] h-[18px]" style={{ color }} />
          </div>
          <p className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 leading-tight">{title}</p>
        </div>
        <h3 className="text-[28px] font-black leading-none text-gray-800 dark:text-white mb-3">
          {isText ? (value || '—') : count.toLocaleString()}
        </h3>
        <div className="flex items-end justify-between gap-3">
          <p className="text-[11px] font-semibold pb-1" style={{ color }}>{sub}</p>
          <Sparkline data={sparkData} color={color} id={sparkId} />
        </div>
      </div>
    </motion.div>
  );
};

/* ── Glass card ──────────────────────────────────────────────────────── */
const GCard = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className={`rounded-2xl overflow-hidden
               bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl
               border border-white/80 dark:border-white/10
               shadow-[0_2px_14px_rgba(0,0,0,0.06)] ${className}`}
  >
    {children}
  </motion.div>
);

/* ── Section header ──────────────────────────────────────────────────── */
const SecHeader = ({ title, onView, viewLabel = 'Open Chat' }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-[14px] font-black text-gray-800 dark:text-white">{title}</h3>
    {onView && (
      <button onClick={onView}
        className="text-[12px] font-bold transition-colors hover:opacity-70 flex items-center gap-1"
        style={{ color: CLR.green }}>
        {viewLabel} <Feather.ArrowRight className="w-3.5 h-3.5" />
      </button>
    )}
  </div>
);

/* ── Recent Conversations list ───────────────────────────────────────── */
const RecentConversations = ({ data, navigate }) => {
  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 gap-2" style={{ color: '#94a3b8' }}>
        <Feather.MessageSquare className="w-8 h-8 opacity-20" />
        <p className="text-[12px] font-semibold">No conversations yet</p>
      </div>
    );
  }
  return (
    <div className="space-y-1">
      {data.map((c, i) => (
        <motion.div key={c.id}
          initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.07, duration: 0.35 }}
          onClick={() => navigate('/chat-bot/conversations')}
          className="flex items-center gap-3 px-3 py-2.5 -mx-3 rounded-xl cursor-pointer
                     hover:bg-gray-50/80 dark:hover:bg-slate-700/40 transition-all duration-200 group">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[11px] font-black
                            group-hover:scale-105 transition-transform duration-200"
              style={{ background: `linear-gradient(135deg, ${c.color.from}, ${c.color.to})` }}>
              {c.initials}
            </div>
            <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white
                              ${c.status === 'online' ? 'bg-primary' : 'bg-gray-300'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-gray-800 dark:text-white leading-none truncate">
              {c.name}
            </p>
            <p className="text-[10px] text-gray-400 mt-0.5 truncate">{c.lastMessage}</p>
          </div>
          <div className="text-right shrink-0 hidden sm:flex flex-col items-end gap-1">
            <span className="text-[10px] text-gray-400">{c.time}</span>
            <span className={`text-[9px] font-black uppercase tracking-wider ${
              c.status === 'online' ? 'text-primary' : 'text-gray-300'
            }`}>{c.status}</span>
          </div>
          {c.unread > 0 && (
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
              {c.unread > 9 ? '9+' : c.unread}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

/* ── Conversation status donut ───────────────────────────────────────── */
const ConversationDonut = ({ data }) => {
  const online  = data.filter(c => c.status === 'online').length;
  const offline = data.filter(c => c.status !== 'online').length;
  const unread  = data.filter(c => c.unread > 0).length;
  const total   = data.length || 1;

  const segments = [
    { label: 'Online',     value: online,  color: CLR.green  },
    { label: 'Offline',    value: offline, color: CLR.orange },
    { label: 'Has Unread', value: unread,  color: CLR.blue   },
  ].filter(s => s.value > 0);

  const r = 62, cx = 88, cy = 88;
  const circ = 2 * Math.PI * r;
  let cumPct = 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width="176" height="176" viewBox="0 0 176 176">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="22" opacity="0.5" />
          {segments.map((seg, i) => {
            const pct = (seg.value / total) * 100;
            const dash = (pct / 100) * circ;
            const rotation = -90 + (cumPct / 100) * 360;
            cumPct += pct;
            return (
              <motion.circle key={i} cx={cx} cy={cy} r={r}
                fill="none" stroke={seg.color} strokeWidth="22"
                strokeDasharray={`${dash} ${circ - dash}`}
                initial={{ strokeDasharray: `0 ${circ}` }}
                animate={{ strokeDasharray: `${dash} ${circ - dash}` }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${cx}px ${cy}px` }}
              />
            );
          })}
          <circle cx={cx} cy={cy} r="42" fill="white" className="dark:fill-slate-800" />
          <text x={cx} y={cy - 7} textAnchor="middle" fontSize="19" fontWeight="900"
            fill="#1e293b" className="dark:fill-white">{data.length}</text>
          <text x={cx} y={cy + 11} textAnchor="middle" fontSize="9" fill="#94a3b8">Contacts</text>
        </svg>
      </div>
      <div className="w-full space-y-2">
        {segments.length === 0 ? (
          <p className="text-[12px] text-center text-gray-400">No contacts yet</p>
        ) : segments.map((seg, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: seg.color }} />
              <span className="text-[12px] font-semibold text-gray-600 dark:text-gray-300">{seg.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-black text-gray-700 dark:text-gray-200">
                {Math.round((seg.value / total) * 100)}%
              </span>
              <span className="text-[11px] text-gray-400 min-w-7 text-right">({seg.value})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Agent status panel ──────────────────────────────────────────────── */
const AgentStatus = ({ isOnline, onToggle, loading, navigate }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-3 p-3.5 rounded-xl border"
      style={{
        background: isOnline ? 'rgba(49,151,96,0.06)' : 'rgba(231,76,60,0.06)',
        borderColor: isOnline ? 'rgba(49,151,96,0.2)' : 'rgba(231,76,60,0.2)',
      }}>
      <div className={`w-2.5 h-2.5 rounded-full shrink-0 animate-pulse ${isOnline ? 'bg-green-400' : 'bg-red-400'}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-[12px] font-black ${isOnline ? 'text-green-600' : 'text-red-500'}`}>
          You are {isOnline ? 'ONLINE' : 'OFFLINE'}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">
          {isOnline ? 'Clients can see you as available for live support' : 'Clients can only leave messages'}
        </p>
      </div>
    </div>
    <button
      onClick={() => onToggle(!isOnline)}
      disabled={loading}
      className="w-full py-2.5 rounded-xl text-[13px] font-bold text-white
                 hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
      style={{
        background: isOnline
          ? 'linear-gradient(135deg, #E74C3C, #C0392B)'
          : 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
        boxShadow: isOnline
          ? '0 6px 18px rgba(231,76,60,0.28)'
          : '0 6px 18px rgba(49,151,96,0.28)',
      }}>
      {loading ? 'Updating…' : (isOnline ? 'Go Offline' : 'Go Online')}
    </button>
    <button onClick={() => navigate('/chat-bot/conversations')}
      className="w-full py-2 rounded-xl text-[12px] font-bold transition-all duration-200 hover:opacity-80"
      style={{ color: CLR.green, background: `${CLR.green}10`, border: `1px solid ${CLR.green}22` }}>
      Open Chat →
    </button>
  </div>
);

/* ── Message activity bars ───────────────────────────────────────────── */
const ActivityChart = ({ data }) => {
  const hours  = ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm'];
  const values = data;
  const maxV   = Math.max(...values, 5) * 1.1; // Add 10% headroom and base scale of 5
  const [hov, setHov] = useState(null);
  const VW = 420, VH = 140;
  const PL = 28, PR = 12, PT = 32, PB = 22; // Increased PT from 12 to 32 to fit tooltips
  const cW = VW - PL - PR, cH = VH - PT - PB;
  const barW = (cW / values.length) * 0.55;

  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full overflow-visible" style={{ height: '140px' }}>
      <defs>
        <linearGradient id="act-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="act-n" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.06" />
        </linearGradient>
      </defs>
      {values.map((v, i) => {
        const x    = PL + (i / values.length) * cW + (cW / values.length - barW) / 2;
        const barH = Math.max((v / maxV) * cH, 3);
        const y    = PT + cH - barH;
        return (
          <g key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ cursor: 'pointer' }}>
            <rect x={x} y={y} width={barW} height={barH} rx="3"
              fill={hov === i ? 'url(#act-a)' : 'url(#act-n)'}
              style={{ transition: 'fill 0.2s' }} />
            {hov === i && (
              <g>
                <rect x={x + barW / 2 - 22} y={y - 26} width="44" height="20" rx="4" fill="#1e293b" opacity="0.9" />
                <text x={x + barW / 2} y={y - 12} textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">{v} msgs</text>
              </g>
            )}
            <text x={x + barW / 2} y={VH - 4} textAnchor="middle" fontSize="8.5" fill="#94a3b8">{hours[i]}</text>
          </g>
        );
      })}
    </svg>
  );
};

/* ── Quick action button ─────────────────────────────────────────────── */
const QuickAction = ({ icon: Icon, label, color, bg, onClick, delay }) => (
  <motion.button
    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4 }}
    whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="flex flex-col items-center gap-2.5 px-5 py-4 rounded-2xl
               bg-white/85 dark:bg-slate-800/70 backdrop-blur-xl
               border border-white/80 dark:border-white/10
               shadow-[0_2px_12px_rgba(0,0,0,0.06)]
               hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)]
               transition-all duration-200 cursor-pointer flex-1"
  >
    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
      <Icon className="w-5 h-5" style={{ color }} />
    </div>
    <span className="text-[12px] font-bold text-gray-600 dark:text-gray-300 text-center leading-tight">{label}</span>
  </motion.button>
);

/* ═══════════════════════════════════════════════════════════════════════
   Main ChatBot Dashboard
═══════════════════════════════════════════════════════════════════════ */
const Dashboard = () => {
  const navigate = useNavigate();

  const {
    isOnline, statusLoading,
    sessions, sessionsLoading,
    unreadCounts,
    fetchSessions, toggleStatus,
  } = useChatbotStore();

  /* Refresh on mount and every 15 seconds (lighter than chat's 3s) */
  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 15000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Derived real-time values ─────────────────────────────────────── */
  const onlineCount  = sessions.filter(s => s.is_user_online).length;
  const unreadTotal  = Object.values(unreadCounts).reduce((sum, n) => sum + n, 0);
  const unreadChats  = sessions.filter(s => (unreadCounts[s.id] || 0) > 0).length;
  const avgRespTime  = useMemo(() => computeAvgResponseTime(sessions), [sessions]);
  const activityData = useMemo(() => computeActivityData(sessions), [sessions]);

  /* Map sessions → conversation display format (sorted newest first) */
  const conversationsData = useMemo(() => (
    [...sessions]
      .sort((a, b) => {
        const aMax = Math.max(0, ...(a.messages || []).map(m => m.id));
        const bMax = Math.max(0, ...(b.messages || []).map(m => m.id));
        return bMax - aMax;
      })
      .map(s => {
        const msgs    = s.messages || [];
        const lastMsg = msgs.length ? msgs.reduce((p, c) => (c.id > p.id ? c : p)) : null;
        const [from, to] = getGradient(s.name);
        return {
          id:          s.id,
          name:        s.name,
          initials:    getInitials(s.name),
          color:       { from, to },
          status:      s.is_user_online ? 'online' : 'offline',
          lastMessage: lastMsg?.files?.length ? '📎 Attachment' : (lastMsg?.message || 'No messages yet'),
          time:        formatMsgTime(lastMsg?.created_at),
          unread:      unreadCounts[s.id] || 0,
        };
      })
  ), [sessions, unreadCounts]);

  /* Sparkline data — decorative trend ending at real current value */
  const sparklines = useMemo(() => ({
    conv:   generateTrend(sessions.length),
    active: generateTrend(onlineCount),
    unread: generateTrend(unreadTotal),
    resp:   [5, 4, 4, 3, 4, 3, 3, 2.5, 3, 2.5, 2, 2],
  }), [sessions.length, onlineCount, unreadTotal]);

  /* ── Stat cards ── */
  const statCards = [
    {
      title: 'Total Conversations', value: sessions.length,
      sub: `${sessionsLoading && !sessions.length ? 'Loading…' : sessions.length + ' sessions total'}`,
      color: CLR.green, bg: `${CLR.green}18`,
      icon: Feather.MessageSquare, sparkId: 'conv',
      sparkData: sparklines.conv,
    },
    {
      title: 'Active Now', value: onlineCount,
      sub: `${onlineCount} user${onlineCount !== 1 ? 's' : ''} online`,
      color: CLR.blue, bg: `${CLR.blue}18`,
      icon: Feather.Users, sparkId: 'active',
      sparkData: sparklines.active,
    },
    {
      title: 'Unread Messages', value: unreadTotal,
      sub: `${unreadChats} conversation${unreadChats !== 1 ? 's' : ''} pending`,
      color: CLR.orange, bg: `${CLR.orange}18`,
      icon: Feather.Bell, sparkId: 'unread',
      sparkData: sparklines.unread,
    },
    {
      title: 'Avg Response Time', value: avgRespTime,
      sub: avgRespTime ? 'first reply time' : 'no data yet',
      color: CLR.lime, bg: `${CLR.lime}18`,
      icon: Feather.Clock, sparkId: 'resp',
      sparkData: sparklines.resp,
      isText: true,
    },
  ];

  /* ── Quick actions ── */
  const quickActions = [
    { icon: Feather.MessageCircle, label: 'Open Chat',       color: CLR.green,  bg: `${CLR.green}18`,  path: '/chat-bot/conversations'      },
    { icon: Feather.Users,         label: 'All Contacts',    color: CLR.blue,   bg: `${CLR.blue}18`,   path: '/chat-bot/conversations'      },
    { icon: Feather.Bell,          label: 'Unread Messages', color: CLR.orange, bg: `${CLR.orange}18`, path: '/chat-bot/conversations'      },
    { icon: Feather.Wifi,          label: isOnline ? 'Go Offline' : 'Go Online', color: CLR.teal, bg: `${CLR.teal}18`, path: '/chat-bot/conversations' },
    { icon: Feather.BarChart2,     label: 'Analytics',       color: CLR.purple, bg: `${CLR.purple}18`, path: '/chat-bot/dashboard' },
  ];

  /* ─────────────────────────────────────────────────────────────── */
  return (
    <div className="relative space-y-6 min-h-screen pb-10">

      <CircuitBg />
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <h2 className="text-[22px] font-black text-gray-800 dark:text-white tracking-tight">
              ChatBot Dashboard
            </h2>
            <p className="text-[13px] text-gray-400 mt-1">
              Monitor conversations, agent activity and response times in real time.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Live indicator */}
            {/* <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl
                            bg-white/80 dark:bg-slate-800/60 backdrop-blur-md
                            border border-white/80 dark:border-white/10 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-bold text-green-600">Live</span>
            </div> */}
            <motion.div
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                         bg-white/80 dark:bg-slate-800/60 backdrop-blur-md
                         border border-white/80 dark:border-white/10 shadow-sm">
              <Feather.Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-[13px] font-bold text-gray-600 dark:text-gray-300">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Stat cards ───────────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* ── Row 1: Recent Conversations + Contacts Breakdown ─────── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">

        <GCard className="p-5" delay={0.3}>
          <SecHeader title="Recent Conversations" onView={() => navigate('/chat-bot/conversations')} />
          <RecentConversations data={conversationsData} navigate={navigate} />
        </GCard>

        <GCard className="p-5" delay={0.38}>
          <h3 className="text-[14px] font-black text-gray-800 dark:text-white mb-4">Contact Status Breakdown</h3>
          <ConversationDonut data={conversationsData} />
        </GCard>
      </div>

      {/* ── Row 2: Message Activity + Agent Status ────────────────── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

        <GCard className="p-5" delay={0.44}>
          <div className="flex items-center justify-between mb-1">
            <div>
              <h3 className="text-[14px] font-black text-gray-800 dark:text-white">Message Activity</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Messages per hour today</p>
            </div>
            <span className="px-3 py-1.5 rounded-xl text-[12px] font-bold
                             bg-gray-100/80 dark:bg-slate-700/50 text-gray-600 dark:text-gray-300">
              Today
            </span>
          </div>
          <ActivityChart data={activityData} />

          {/* Quick overview mini stats */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700/40 grid grid-cols-3 gap-3">
            {[
              { label: 'Online',         value: onlineCount,       color: CLR.green  },
              { label: 'Unread',         value: unreadTotal,       color: CLR.orange },
              { label: 'Total Contacts', value: sessions.length,   color: CLR.blue   },
            ].map((m, i) => (
              <div key={i} className="flex flex-col gap-1 p-3 rounded-xl" style={{ background: `${m.color}0d` }}>
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">{m.label}</span>
                <span className="text-[20px] font-black" style={{ color: m.color }}>{m.value}</span>
              </div>
            ))}
          </div>
        </GCard>

        <GCard className="p-5" delay={0.5}>
          <SecHeader title="Agent Status" />
          <AgentStatus
            isOnline={isOnline}
            onToggle={toggleStatus}
            loading={statusLoading}
            navigate={navigate}
          />

          {/* Unread by contact */}
          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700/40">
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-wider mb-3">Unread by Contact</p>
            {conversationsData.filter(c => c.unread > 0).length === 0 ? (
              <p className="text-[12px] text-gray-400 text-center py-2">All caught up! 🎉</p>
            ) : (
              <div className="space-y-2">
                {conversationsData.filter(c => c.unread > 0).map((c, i) => (
                  <motion.div key={c.id}
                    initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.07 }}
                    onClick={() => navigate('/chat-bot/conversations')}
                    className="flex items-center gap-2.5 cursor-pointer group px-2 py-1.5 rounded-lg
                               hover:bg-gray-50/80 transition-all">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-black shrink-0"
                      style={{ background: `linear-gradient(135deg, ${c.color.from}, ${c.color.to})` }}>
                      {c.initials}
                    </div>
                    <span className="text-[12px] font-semibold text-gray-700 dark:text-gray-200 flex-1 truncate">
                      {c.name}
                    </span>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-black shrink-0"
                      style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                      {c.unread > 9 ? '9+' : c.unread}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </GCard>
      </div>

      {/* ── Quick Actions ─────────────────────────────────────────── */}
      {/* <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.56 }}
          className="text-[11px] font-black text-gray-400 uppercase tracking-[0.18em] mb-3">
          Quick Actions
        </motion.p>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((a, i) => (
            <QuickAction key={a.label} {...a} delay={0.58 + i * 0.06}
              onClick={() => navigate(a.path)} />
          ))}
        </div>
      </div> */}

    </div>
  );
};

export default Dashboard;
