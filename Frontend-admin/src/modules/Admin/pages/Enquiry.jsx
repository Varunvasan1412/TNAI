import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardBody, CardTitle, Badge, PageTitle } from '../../../components/ui';
import * as Feather from 'react-feather';
import { useEnquiryStore } from '../../../store/store';
import toast from 'react-hot-toast';

/* ── Circuit background ─────────────────────────────────────────────── */
const CircuitBg = () => (
  <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-secondary/8 to-[#8CC63F]/5 blur-[130px]" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/8 to-secondary/5 blur-[130px]" />
    <div className="absolute top-[40%] left-[30%] w-[360px] h-[360px] rounded-full bg-[#E67E22]/4 blur-[110px]" />
    <svg className="w-full h-full opacity-[0.18]" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="eq-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.9" />
        </linearGradient>
        <filter id="eq-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect x="3%" y="6%" width="88" height="88" rx="8" stroke="url(#eq-g)" strokeWidth="2.5" fill="none" />
      <rect x="4.5%" y="7.5%" width="68" height="68" rx="5" fill="var(--color-secondary)" opacity="0.07" />
      <path d="M 8 81  H 48" stroke="var(--color-secondary)" strokeWidth="2" />
      <path d="M 8 108 H 48" stroke="var(--color-secondary)" strokeWidth="2" />
      <path d="M 112 5 V 54" stroke="var(--color-primary)" strokeWidth="2" />
      <rect x="89%" y="80%" width="80" height="80" rx="8" stroke="url(#eq-g)" strokeWidth="2.5" fill="none" />
      <circle cx="50%" cy="48%" r="260" stroke="var(--color-secondary)" strokeWidth="1.2" strokeDasharray="10,8" fill="none" />
      <circle cx="50%" cy="48%" r="340" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="14,12" fill="none" />
      <circle cx="50%" cy="48%" r="420" stroke="#E67E22" strokeWidth="1" strokeDasharray="5,14" fill="none" />
      <path d="M -80 300 L 340 300 L 420 380 L 700 380 L 780 460 L 1600 460" stroke="var(--color-secondary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M -80 320 L 330 320 L 410 400 L 690 400 L 770 480 L 1600 480" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 260 0 L 260 180 L 340 260 L 580 260 L 640 320 L 640 1100" stroke="#E67E22" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 1080 0 L 1080 280 L 1020 340 H 800 L 740 400 L 740 1100" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle r="4" fill="var(--color-secondary)" filter="url(#eq-glow)">
        <animateMotion dur="9s" repeatCount="indefinite" path="M -80 300 L 340 300 L 420 380 L 700 380 L 780 460 L 1600 460" />
      </circle>
      <circle r="3.5" fill="var(--color-primary)" filter="url(#eq-glow)">
        <animateMotion dur="7s" repeatCount="indefinite" path="M -80 320 L 330 320 L 410 400 L 690 400 L 770 480 L 1600 480" />
      </circle>
      <circle r="4" fill="#E67E22" filter="url(#eq-glow)">
        <animateMotion dur="11s" repeatCount="indefinite" path="M 260 0 L 260 180 L 340 260 L 580 260 L 640 320 L 640 1100" />
      </circle>
      <circle cx="340" cy="300" r="5" fill="var(--color-secondary)" />
      <circle cx="420" cy="380" r="5" fill="var(--color-secondary)" />
      <circle cx="700" cy="380" r="5" fill="var(--color-secondary)" />
      <circle cx="340" cy="260" r="4.5" fill="#E67E22" />
      <path d="M 36 36 H 110 M 36 36 V 110" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 1564 36 H 1490 M 1564 36 V 110" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 36 1064 H 110 M 36 1064 V 990" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 1564 1064 H 1490 M 1564 1064 V 990" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

/* ── Animated stat card ──────────────────────────────────────────────── */
const StatCard = ({ label, value, icon: Icon, color, bg, delay = 0 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(value ?? 0);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden cursor-default select-none
                 bg-white/85 dark:bg-slate-800/70
                 backdrop-blur-2xl
                 border border-white/80 dark:border-white/10
                 shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                 hover:-translate-y-2
                 transition-all duration-300"
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 48px ${color}28, 0 4px 16px ${color}14`; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; }}
    >
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full
                   group-hover:scale-110 transition-transform duration-500"
        style={{ background: color, opacity: 0.07 }}
      />
      <div
        className="absolute -top-4 -right-4 w-20 h-20 rounded-full"
        style={{ background: color, opacity: 0.04 }}
      />
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full
                   transition-all duration-500 rounded-b-2xl"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
      />
      <div className="relative p-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5
                     group-hover:scale-110 group-hover:rotate-3
                     transition-transform duration-300"
          style={{ background: bg }}
        >
          <Icon className="w-[18px] h-[18px]" style={{ color }} />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5">
          {label}
        </p>
        <h3 className="text-[30px] font-black leading-none text-gray-800 dark:text-white">
          {count}
        </h3>
      </div>
    </motion.div>
  );
};

const STATUS_CONFIG = {
  New: { color: 'var(--color-secondary)', bg: 'rgba(52,152,219,0.12)' },
  Open: { color: 'var(--color-secondary)', bg: 'rgba(52,152,219,0.12)' },
  Hot: { color: '#E74C3C', bg: 'rgba(231,76,60,0.12)' },
  Warm: { color: '#E67E22', bg: 'rgba(230,126,34,0.12)' },
  Cold: { color: '#9B59B6', bg: 'rgba(155,89,182,0.12)' },
  Closed: { color: '#6B7280', bg: 'rgba(107,114,128,0.12)' },
  Converted: { color: 'var(--color-primary)', bg: 'rgba(49,151,96,0.12)' },
};

const StatusBadge = ({ status }) => {
  const cfg =
  STATUS_CONFIG[status] || {
    color: 'var(--color-secondary)',
    bg: 'rgba(52,152,219,0.12)'
  };
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.12em]"
      style={{ background: cfg.bg, color: cfg.color }}>
      {status}
    </span>
  );
};

/* ── Delete Confirmation Modal ───────────────────────────────────────── */
const DeleteModal = ({ enq, onConfirm, onCancel, isDeleting }) => (
  <AnimatePresence>
    {enq && (
      <>
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onCancel}
          className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm"
        />
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.82, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="fixed inset-0 z-101 flex items-center justify-center p-4 pointer-events-none"
        >
          <div className="pointer-events-auto w-full max-w-md
                          rounded-2xl overflow-hidden
                          bg-white/90 dark:bg-slate-800/90
                          backdrop-blur-2xl
                          border border-white/80 dark:border-white/15
                          shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <div className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, #ef4444, #f97316)' }} />
            <div className="p-7">
              <div className="flex justify-center mb-5">
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.12)' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: 'rgba(239,68,68,0.18)' }}
                  />
                  <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.div>
              </div>
              <div className="text-center mb-5">
                <h3 className="text-[17px] font-black text-gray-800 dark:text-white mb-2">Delete Enquiry?</h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  This action is permanent and cannot be undone.
                  The enquiry will be removed immediately.
                </p>
              </div>
              <div className="mb-6 px-4 py-3 rounded-xl
                              bg-gray-50 dark:bg-slate-700/50
                              border border-gray-100 dark:border-slate-600/50">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(239,68,68,0.12)' }}>
                    <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <p className="text-[12px] font-black text-gray-700 dark:text-gray-200 truncate">
                    {enq.name}
                  </p>
                </div>
                <p className="text-[11px] text-gray-400 truncate pl-10">{enq.subject}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  disabled={isDeleting}
                  className="flex-1 h-11 rounded-xl text-[13px] font-bold
                             text-gray-600 dark:text-gray-300
                             bg-gray-100/80 dark:bg-slate-700/60
                             border border-gray-200/60 dark:border-slate-600/50
                             hover:bg-gray-200/70 dark:hover:bg-slate-600/70
                             transition-all duration-200 active:scale-[0.97] disabled:opacity-50">
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isDeleting}
                  className="flex-1 h-11 rounded-xl text-[13px] font-bold text-white
                             transition-all duration-200 active:scale-[0.97]
                             hover:-translate-y-0.5
                             shadow-[0_4px_14px_rgba(239,68,68,0.35)]
                             hover:shadow-[0_6px_20px_rgba(239,68,68,0.50)]
                             disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}>
                  {isDeleting ? (
                    <svg className="animate-spin w-4 h-4 text-white mx-auto" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ── Convert to Lead Confirmation Modal ─────────────────────────────── */
const ConvertToLeadModal = ({ enq, onConfirm, onCancel }) => (
  <AnimatePresence>
    {enq && (
      <>
        <motion.div
          key="ctl-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onCancel}
          className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm"
        />
        <motion.div
          key="ctl-modal"
          initial={{ opacity: 0, scale: 0.82, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="fixed inset-0 z-101 flex items-center justify-center p-4 pointer-events-none"
        >
          <div className="pointer-events-auto w-full max-w-md
                          rounded-2xl overflow-hidden
                          bg-white/90 dark:bg-slate-800/90
                          backdrop-blur-2xl
                          border border-white/80 dark:border-white/15
                          shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <div className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }} />
            <div className="p-7">
              <div className="flex justify-center mb-5">
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(49,151,96,0.12)' }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: 'rgba(49,151,96,0.18)' }}
                  />
                  <Feather.RefreshCw className="w-7 h-7" style={{ color: 'var(--color-primary)' }} />
                </motion.div>
              </div>
              <div className="text-center mb-5">
                <h3 className="text-[17px] font-black text-gray-800 dark:text-white mb-2">Convert to Lead?</h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  This enquiry will be converted into a lead and moved to the Leads module.
                </p>
              </div>
              <div className="mb-6 px-4 py-3 rounded-xl
                              bg-gray-50 dark:bg-slate-700/50
                              border border-gray-100 dark:border-slate-600/50">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(49,151,96,0.12)' }}>
                    <Feather.User className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <p className="text-[12px] font-black text-gray-700 dark:text-gray-200 truncate">
                    {enq.name}
                  </p>
                </div>
                <p className="text-[11px] text-gray-400 truncate pl-10">{enq.subject}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 h-11 rounded-xl text-[13px] font-bold
                             text-gray-600 dark:text-gray-300
                             bg-gray-100/80 dark:bg-slate-700/60
                             border border-gray-200/60 dark:border-slate-600/50
                             hover:bg-gray-200/70 dark:hover:bg-slate-600/70
                             transition-all duration-200 active:scale-[0.97]">
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 h-11 rounded-xl text-[13px] font-bold text-white
                             transition-all duration-200 active:scale-[0.97]
                             hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', boxShadow: '0 4px 14px rgba(49,151,96,0.35)' }}>
                  Convert
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ── Pagination component ────────────────────────────────────────────── */
const Pagination = ({ page, totalPages, total, perPage, onPage }) => {
  const from = Math.min((page - 1) * perPage + 1, total);
  const to = Math.min(page * perPage, total);

  const pages = [];
  const delta = 1;
  for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) pages.push(i);
  if (pages[0] > 2) pages.unshift('...');
  if (pages[0] > 1) pages.unshift(1);
  if (pages[pages.length - 1] < totalPages - 1) pages.push('...');
  if (pages[pages.length - 1] < totalPages) pages.push(totalPages);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3.5
                    border-t border-gray-100/60 dark:border-slate-700/40">
      <p className="text-[12px] font-medium text-gray-400">
        Showing <span className="font-bold text-gray-600 dark:text-gray-300">{from}</span> to{' '}
        <span className="font-bold text-gray-600 dark:text-gray-300">{to}</span> of{' '}
        <span className="font-bold text-gray-600 dark:text-gray-300">{total}</span> entries
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => onPage(page - 1)} disabled={page === 1}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400
                     hover:bg-primary/10 hover:text-primary
                     disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <Feather.ChevronLeft className="w-4 h-4" />
        </button>
        {pages.map((p, i) =>
          p === '...'
            ? <span key={`d${i}`} className="w-8 h-8 flex items-center justify-center text-[12px] text-gray-400">…</span>
            : <button key={p} onClick={() => onPage(p)}
              className={`w-8 h-8 rounded-lg text-[12px] font-bold transition-all ${p === page ? 'text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              style={p === page ? { background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' } : {}}>
              {p}
            </button>
        )}
        <button onClick={() => onPage(page + 1)} disabled={page === totalPages || totalPages === 0}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400
                     hover:bg-primary/10 hover:text-primary
                     disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <Feather.ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const avatarColors = [
  { from: 'var(--color-primary)', to: '#8CC63F' }, { from: 'var(--color-secondary)', to: '#2980B9' },
  { from: '#E67E22', to: '#D35400' }, { from: '#9B59B6', to: '#8E44AD' },
  { from: '#1ABC9C', to: '#16A085' }, { from: '#E74C3C', to: '#C0392B' },
];

/* ─────────────────────────────────────────────────────────────────────── */
const Enquiry = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [convertTarget, setConvertTarget] = useState(null);

  const { enquires, fetchEnquires, deleteEnquiry,convertToLead } = useEnquiryStore();

  useEffect(() => { fetchEnquires(); }, []);

  /* Live stats from store */
  // const enquiryStats = [
  //   { label: 'Total',  icon: Feather.MessageCircle, color: 'var(--color-primary)', bg: 'rgba(49,151,96,0.10)',   value: enquires.length },
  //   { label: 'Open',   icon: Feather.Bell,          color: 'var(--color-secondary)', bg: 'rgba(52,152,219,0.10)',  value: enquires.filter(e => e.status === 'Open').length },
  //   { label: 'Hot',    icon: Feather.Zap,           color: '#E74C3C', bg: 'rgba(231,76,60,0.10)',   value: enquires.filter(e => e.status === 'Hot').length },
  //   { label: 'Closed', icon: Feather.Archive,       color: '#6B7280', bg: 'rgba(107,114,128,0.10)', value: enquires.filter(e => e.status === 'Closed').length },
  // ];

  const enquiryStats = [

    {
      label: 'Total Enquiry',
      icon: Feather.MessageCircle,
      color: 'var(--color-primary)',
      bg: 'rgba(49,151,96,0.10)',
      value: enquires.length
    },

    {
      label: 'Open',
      icon: Feather.Bell,
      color: 'var(--color-secondary)',
      bg: 'rgba(52,152,219,0.10)',
      value: enquires.filter((e) => {
        const status = e.followups && e.followups.length > 0 ? e.followups[0].status : 'Open';
        return status === 'Open';
      }).length,
    },

    {
      label: 'Hot',
      icon: Feather.Zap,
      color: '#E74C3C',
      bg: 'rgba(231,76,60,0.10)',
      value: enquires.filter((e) => {
        const status = e.followups && e.followups.length > 0 ? e.followups[0].status : 'Open';
        return status === 'Hot';
      }).length,
    },

    {
      label: 'Closed',
      icon: Feather.Archive,
      color: '#6B7280',
      bg: 'rgba(107,114,128,0.10)',
      value: enquires.filter((e) => {
        const status = e.followups && e.followups.length > 0 ? e.followups[0].status : 'Open';
        return status === 'Closed';
      }).length,
    },

  ];

  const filtered = enquires.filter(e => {
    const q = search.toLowerCase();
    const matchSearch =
      e.name?.toLowerCase().includes(q) ||
      e.email?.toLowerCase().includes(q) ||
      e.subject?.toLowerCase().includes(q);
    
    const currentStatus = e.followups && e.followups.length > 0 ? e.followups[0].status : 'Open';
    const matchStatus = statusFilter === 'All' || currentStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handlePerPage = (val) => { setPerPage(val); setPage(1); };
  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleStatusFilter = (val) => { setStatusFilter(val); setPage(1); };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteEnquiry(deleteTarget.id);
      toast.success('Enquiry deleted successfully');
      setDeleteTarget(null);
      fetchEnquires();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete enquiry');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConvertToLead = async () => {

  if (!convertTarget) return;

  try {

    const id = convertTarget.id;

    await convertToLead(id);

    setConvertTarget(null);

    fetchEnquires();

    navigate('/admin/leads');

  } catch (error) {

    console.error(error);
  }
};

  return (
    <div className="relative space-y-7 min-h-screen">
      <CircuitBg />
      <div className="fixed inset-0 z-1 pointer-events-none
                      bg-linear-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* Page title */}
      <div className="relative z-10">
        <PageTitle title="Enquiry Management"
          breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'Enquiry', active: true }]} />
      </div>

      {/* ── Stat cards ────────────────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {enquiryStats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Table card */}
      <motion.div className="relative z-10"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}>
        <Card className="overflow-hidden bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl
                         border border-white/80 dark:border-white/15"
          style={{ boxShadow: '0 8px 32px rgba(52,152,219,0.09)' }}>

          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
              <CardTitle>All Enquiries</CardTitle>
              <div className="flex items-center gap-2 flex-wrap">

                {/* Show entries */}
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">Show</span>
                  <select value={perPage} onChange={e => handlePerPage(Number(e.target.value))}
                    className="h-9 w-20 px-2 rounded-xl text-[13px] font-bold text-gray-600 dark:text-gray-200
                               bg-gray-100/70 dark:bg-slate-700/50
                               border border-gray-200/60 dark:border-slate-600/60
                               focus:outline-none focus:ring-2 focus:ring-secondary/25 cursor-pointer">
                    {[5, 10, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">entries</span>
                </div>

                <div className="h-5 w-px bg-gray-200 dark:bg-slate-600" />

                {/* Status filter */}
                <div className="flex items-center gap-1.5">
                  <Feather.Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <select value={statusFilter} onChange={e => handleStatusFilter(e.target.value)}
                    className="h-9 w-32 px-2 rounded-xl text-[13px] font-bold text-gray-600 dark:text-gray-200
                               bg-gray-100/70 dark:bg-slate-700/50
                               border border-gray-200/60 dark:border-slate-600/60
                               focus:outline-none focus:ring-2 focus:ring-secondary/25 cursor-pointer">
                    {['All', 'Open', 'Hot', 'Warm', 'Cold', 'Closed', 'Converted'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="h-5 w-px bg-gray-200 dark:bg-slate-600" />

                {/* Search */}
                <div className="relative">
                  <input type="text" placeholder="Search enquiries..." value={search}
                    onChange={e => handleSearch(e.target.value)}
                    className="h-9 w-52 pl-9 pr-3 rounded-xl text-[13px]
                               bg-gray-100/70 dark:bg-slate-700/50
                               border border-gray-200/60 dark:border-slate-600/60
                               focus:outline-none focus:ring-2 focus:ring-secondary/25
                               transition-all placeholder:text-gray-400"/>
                  <Feather.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100/80 dark:border-slate-700/50 bg-gray-50/50 dark:bg-slate-800/30">
                    {['S.No', 'Customer', 'Email', 'Subject', 'Followup Date', 'Status', 'Created Date', 'Actions'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-black text-gray-400
                                             uppercase tracking-[0.14em] whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((enq, idx) => {
                    const ac = avatarColors[(enq.id - 1) % avatarColors.length];
                    return (
                      <motion.tr key={enq.id}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 }}
                        className="border-b last:border-0 border-gray-100/60 dark:border-slate-700/30
                                   transition-all duration-200 hover:shadow-[inset_3px_0_0_var(--color-secondary)]"
                        onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, rgba(52,152,219,0.06) 0%, rgba(52,152,219,0.01) 40%, transparent 100%)'}
                        onMouseLeave={e => e.currentTarget.style.background = ''}>

                        {/* S.No */}
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg
                                           text-[11px] font-black bg-gray-100 dark:bg-slate-700
                                           text-gray-500 dark:text-gray-400">
                            {String((page - 1) * perPage + idx + 1).padStart(2, '0')}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="px-4 py-3.5">
                          <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            {enq.name}
                          </span>
                        </td>

                        {/* Email */}
                        <td className="px-4 py-3.5">
                          <span className="text-[12px] font-medium text-gray-500 dark:text-gray-400">
                            {enq.email}
                          </span>
                        </td>

                        {/* Subject */}
                        <td className="px-4 py-3.5 max-w-[200px]">
                          <p className="text-[13px] font-bold text-gray-800 dark:text-white truncate">
                            {enq.subject}
                          </p>
                        </td>



                        {/* Followup Date */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <Feather.Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="text-[12px] font-medium text-gray-500 whitespace-nowrap">
                              {enq.followups && enq.followups.length > 0 ? enq.followups[0].followupdate : (enq.current_followup_date || '—')}
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3.5">
                          <StatusBadge status={enq.followups && enq.followups.length > 0 ? enq.followups[0].status : 'Open'} />
                        </td>

                        {/* Created Date */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <Feather.Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="text-[12px] font-medium text-gray-500 whitespace-nowrap">
                              {new Date(
                                enq.created_at || enq.createdDate || enq.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1">
                            <button title="View" onClick={() => navigate(`/admin/enquiry/view/${enq.id}`)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center
                                         text-gray-400 hover:text-secondary hover:bg-secondary/10 transition-all duration-150">
                              <Feather.Eye className="w-[15px] h-[15px]" />
                            </button>
                            <button title="Edit" onClick={() => navigate(`/admin/enquiry/edit/${enq.id}`)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center
                                         text-gray-400 hover:text-primary hover:bg-primary/10 transition-all duration-150">
                              <Feather.Edit2 className="w-[15px] h-[15px]" />
                            </button>

                            <button title="Delete" onClick={() => setDeleteTarget(enq)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center
                                         text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-150">
                              <Feather.Trash2 className="w-[15px] h-[15px]" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}

                  {paginated.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-20 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                            <Feather.MessageCircle className="w-7 h-7 text-gray-300" />
                          </div>
                          <p className="text-sm font-bold text-gray-500">No enquiries found</p>
                          <p className="text-xs text-gray-400">Try adjusting your search or filter</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <Pagination page={page} totalPages={totalPages} total={filtered.length}
              perPage={perPage} onPage={setPage} />
          </CardBody>
        </Card>
      </motion.div>

      <DeleteModal
        enq={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => !isDeleting && setDeleteTarget(null)}
        isDeleting={isDeleting}
      />

      <ConvertToLeadModal
        enq={convertTarget}
        onConfirm={handleConvertToLead}
        onCancel={() => setConvertTarget(null)}
      />
    </div>
  );
};

export default Enquiry;
