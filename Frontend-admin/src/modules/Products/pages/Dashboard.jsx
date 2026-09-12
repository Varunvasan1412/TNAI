import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as Feather from 'react-feather';
import { useProductStore, useProductCategoryStore, useProductSubcategoryStore } from '../../../store/store';

const IMG_BASE = import.meta.env.VITE_API_BASE_URL + '/';

const CLR = {
  blue: 'var(--color-secondary)',
  navy: '#2980B9',
  teal: '#1ABC9C',
  orange: '#E67E22',
  green: '#27AE60',
  purple: '#9B59B6',
  red: '#E74C3C',
};

const DONUT_COLORS = [CLR.blue, CLR.teal, CLR.green, CLR.orange, CLR.purple, CLR.red, CLR.navy];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* ── Ambient background ──────────────────────────────────────────────── */
const AmbientBg = () => (
  <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full
                    bg-gradient-to-bl from-secondary/8 to-[#2980B9]/5 blur-[130px]" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full
                    bg-gradient-to-tr from-[#1ABC9C]/8 to-secondary/5 blur-[130px]" />
    <div className="absolute top-[40%] left-[30%] w-[360px] h-[360px] rounded-full
                    bg-[#E67E22]/4 blur-[110px]" />
    <svg className="w-full h-full opacity-[0.12]" viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pdb-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2980B9" stopOpacity="0.9" />
        </linearGradient>
        <filter id="pdb-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect x="3%" y="6%" width="88" height="88" rx="8" stroke="url(#pdb-g)" strokeWidth="2.5" fill="none" />
      <rect x="4.5%" y="7.5%" width="68" height="68" rx="5" fill="var(--color-secondary)" opacity="0.07" />
      <rect x="89%" y="80%" width="80" height="80" rx="8" stroke="url(#pdb-g)" strokeWidth="2.5" fill="none" />
      <circle cx="50%" cy="48%" r="260" stroke="var(--color-secondary)" strokeWidth="1.2" strokeDasharray="10,8" fill="none" />
      <circle cx="50%" cy="48%" r="340" stroke="#2980B9" strokeWidth="1" strokeDasharray="14,12" fill="none" />
      <circle cx="50%" cy="48%" r="420" stroke="#E67E22" strokeWidth="1.2" strokeDasharray="5,14" fill="none" />
      <path d="M -80 300 L 340 300 L 420 380 L 700 380 L 780 460 L 1600 460"
        stroke="var(--color-secondary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M -80 320 L 330 320 L 410 400 L 690 400 L 770 480 L 1600 480"
        stroke="#2980B9" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 260 0 L 260 180 L 340 260 L 580 260 L 640 320 L 640 1100"
        stroke="#E67E22" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 1080 0 L 1080 280 L 1020 340 H 800 L 740 400 L 740 1100"
        stroke="var(--color-secondary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle r="4" fill="var(--color-secondary)" filter="url(#pdb-glow)">
        <animateMotion dur="9s" repeatCount="indefinite"
          path="M -80 300 L 340 300 L 420 380 L 700 380 L 780 460 L 1600 460" />
      </circle>
      <circle r="3.5" fill="#2980B9" filter="url(#pdb-glow)">
        <animateMotion dur="7s" repeatCount="indefinite"
          path="M -80 320 L 330 320 L 410 400 L 690 400 L 770 480 L 1600 480" />
      </circle>
      <circle r="4" fill="#E67E22" filter="url(#pdb-glow)">
        <animateMotion dur="11s" repeatCount="indefinite"
          path="M 260 0 L 260 180 L 340 260 L 580 260 L 640 320 L 640 1100" />
      </circle>
      <path d="M 36 36 H 110 M 36 36 V 110" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 1564 36 H 1490 M 1564 36 V 110" stroke="#2980B9" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

/* ── Animated counter ───────────────────────────────────────────────── */
const useCounter = (target, delay = 0) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (target === 0) { setCount(0); return; }
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

/* ── Mini sparkline ─────────────────────────────────────────────────── */
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
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3.5" fill={color} />
    </svg>
  );
};

/* ── Stat card ──────────────────────────────────────────────────────── */
const StatCard = ({ title, value, format, trend, color, bg, icon: Icon, sparkData, delay, sparkId }) => {
  const count = useCounter(value, delay);
  const isPositive = trend.startsWith('+');
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center
                            group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
              style={{ background: bg }}>
              <Icon className="w-[18px] h-[18px]" style={{ color }} />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.15em] text-gray-400 leading-tight">
              {title}
            </p>
          </div>
          <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full shrink-0 ${isPositive
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
              : 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400'
            }`}>
            {trend}
          </span>
        </div>
        <h3 className="text-[28px] font-black leading-none text-gray-800 dark:text-white mb-4">
          {format ? format(count) : count.toLocaleString()}
        </h3>
        <div className="flex items-end justify-between gap-3">
          <p className="text-[11px] font-medium text-gray-400 leading-snug pb-1">vs last month</p>
          {sparkData.length >= 2 && <Sparkline data={sparkData} color={color} id={sparkId} />}
        </div>
      </div>
    </motion.div>
  );
};

/* ── Products Added bar chart (real monthly data) ───────────────────── */
const ProductsChart = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const VW = 580, VH = 200;
  const PL = 40, PR = 16, PT = 16, PB = 28;
  const cW = VW - PL - PR;
  const cH = VH - PT - PB;
  const maxRaw = Math.max(...data.map(d => d.value), 1);
  const niceMax = Math.ceil(maxRaw / 5) * 5 || 5;
  const step = Math.max(1, Math.ceil(niceMax / 4));
  const yGrid = [0, step, step * 2, step * 3, niceMax];
  const barW = (cW / data.length) * 0.55;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full" style={{ height: '200px' }}>
        <defs>
          <linearGradient id="pbar-active" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="1" />
            <stop offset="100%" stopColor="#2980B9" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="pbar-normal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        {yGrid.map((v, gi) => {
          const y = PT + cH - (v / niceMax) * cH;
          return (
            <g key={gi}>
              <line x1={PL} y1={y} x2={VW - PR} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,5" opacity="0.8" />
              <text x={PL - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#94a3b8">{v}</text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const x = PL + (i / data.length) * cW + (cW / data.length - barW) / 2;
          const barH = Math.max((d.value / niceMax) * cH, d.value > 0 ? 3 : 0);
          const y = PT + cH - barH;
          const isHovered = hoveredIdx === i;
          return (
            <g key={i} onMouseEnter={() => setHoveredIdx(i)} onMouseLeave={() => setHoveredIdx(null)} style={{ cursor: 'pointer' }}>
              <rect x={x} y={y} width={barW} height={barH} rx="4"
                fill={isHovered ? 'url(#pbar-active)' : 'url(#pbar-normal)'}
                style={{ transition: 'fill 0.2s' }} />
              {isHovered && (
                <g>
                  <rect x={x + barW / 2 - 28} y={y - 30} width="56" height="22" rx="5" fill="#1e293b" opacity="0.9" />
                  <text x={x + barW / 2} y={y - 15} textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">
                    {d.value} added
                  </text>
                </g>
              )}
              <text x={x + barW / 2} y={VH - 4} textAnchor="middle" fontSize="9.5" fill="#94a3b8">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* ── Category donut chart (real data) ───────────────────────────────── */
const CategoryDonut = ({ segments, total }) => {
  const r = 68, cx = 96, cy = 96;
  const circ = 2 * Math.PI * r;
  let cumPct = 0;

  if (segments.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-8">
        <div className="w-48 h-48 rounded-full border-[24px] border-gray-100 dark:border-slate-700/50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-[20px] font-black text-gray-300">0</p>
            <p className="text-[10px] text-gray-300">Products</p>
          </div>
        </div>
        <p className="text-[12px] text-gray-400">No category data yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <svg width="192" height="192" viewBox="0 0 192 192">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="24" opacity="0.5" />
          {segments.map((seg, i) => {
            const dash = (seg.pct / 100) * circ;
            const rotation = -90 + (cumPct / 100) * 360;
            cumPct += seg.pct;
            return (
              <motion.circle
                key={i}
                cx={cx} cy={cy} r={r}
                fill="none"
                stroke={seg.color}
                strokeWidth="24"
                strokeDasharray={`${dash} ${circ - dash}`}
                initial={{ strokeDasharray: `0 ${circ}` }}
                animate={{ strokeDasharray: `${dash} ${circ - dash}` }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${cx}px ${cy}px` }}
              />
            );
          })}
          <circle cx={cx} cy={cy} r="45" fill="white" className="dark:fill-slate-800" />
          <text x={cx} y={cy - 7} textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e293b" className="dark:fill-white">{total}</text>
          <text x={cx} y={cy + 12} textAnchor="middle" fontSize="10" fill="#94a3b8">Products</text>
        </svg>
      </div>
      <div className="w-full space-y-2.5">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: seg.color }} />
              <span className="text-[12px] font-semibold text-gray-600 dark:text-gray-300">{seg.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-black text-gray-700 dark:text-gray-200">{seg.pct}%</span>
              <span className="text-[11px] text-gray-400 min-w-[36px] text-right">({seg.count})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Thumbnail for a product's first image ───────────────────────────── */
const DASH_IMG_BASE = (import.meta.env.VITE_API_BASE_URL || IMG_BASE).replace(/\/$/, '');
const isDash3D = (p = '') => /\.(glb|gltf|obj|fbx|stl|usdz)(\?.*)?$/i.test(p);

const ProductThumb = ({ images, alt }) => {
  const [err, setErr] = React.useState(false);

  const { src, is3D } = React.useMemo(() => {
    const img = images?.[0];
    if (!img) return { src: null, is3D: false };
    const path = typeof img === 'string' ? img : (img.image_path || '');
    const resolved = typeof img === 'string'
      ? img
      : (img.image_path ? `${DASH_IMG_BASE}/${img.image_path}` : null);
    return { src: resolved, is3D: isDash3D(path) };
  }, [images]);

  if (!src || err || is3D) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polygon points="12,2 22,7 12,12 2,7" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
          <polygon points="2,7 2,17 12,22 12,12" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
          <polygon points="22,7 22,17 12,22 12,12" fill="rgba(255,255,255,0.30)" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setErr(true)}
    />
  );
};

/* ── Recent products (real data, top 4 by created_at) ───────────────── */
const RecentProducts = ({ products, categories, navigate }) => {
  const palette = [CLR.blue, CLR.teal, CLR.orange, CLR.purple, CLR.green, CLR.navy];

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-10 text-center">
        <Feather.Package className="w-8 h-8 text-gray-200" />
        <p className="text-[13px] font-semibold text-gray-400">No products yet</p>
        <p className="text-[11px] text-gray-300">Add your first product to see it here</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {products.map((p, i) => {
        const cat = categories.find(c => String(c.id) === String(p.category_id));
        const isActive = p.status === 1;
        const color = palette[i % palette.length];

        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.07, duration: 0.4 }}
            onClick={() => navigate('/products/manage')}
            className="flex items-center gap-3 px-3 py-2.5 -mx-3 rounded-xl
                       hover:bg-gray-50/80 dark:hover:bg-slate-700/40
                       transition-all duration-200 cursor-pointer group"
          >
            {/* Image / icon */}
            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0
                            group-hover:scale-105 transition-transform duration-200"
              style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}>
              <ProductThumb images={p.images} alt={p.product_name} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-gray-800 dark:text-white leading-none truncate">
                {p.product_name}
              </p>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider mt-0.5">
                {cat?.category_name || '—'}
              </p>
            </div>

            {/* Date */}
            {p.created_at && (
              <span className="text-[10px] text-gray-400 shrink-0 hidden md:block">
                {new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}

            {/* Status badge */}
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black shrink-0 ${isActive
                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                : 'bg-gray-100 text-gray-400 dark:bg-slate-700 dark:text-slate-400'
              }`}>
              {isActive ? 'Active' : 'Inactive'}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ── Status breakdown (active vs inactive) ──────────────────────────── */
const StatusBreakdown = ({ products }) => {
  const active = products.filter(p => p.status === 1).length;
  const inactive = products.filter(p => p.status !== 1).length;
  const total = products.length || 1;
  const activePct = Math.round((active / total) * 100);
  const inactivePct = Math.round((inactive / total) * 100);

  const bars = [
    { label: 'Active', count: active, pct: activePct, color: CLR.teal, icon: Feather.CheckCircle },
    { label: 'Inactive', count: inactive, pct: inactivePct, color: CLR.orange, icon: Feather.PauseCircle },
  ];

  return (
    <div className="space-y-5">
      {bars.map((s, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${s.color}18` }}>
                <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-700 dark:text-gray-200 leading-none">{s.label}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{s.count} products</p>
              </div>
            </div>
            <span className="text-[12px] font-black text-gray-700 dark:text-gray-200">{s.pct}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 dark:bg-slate-700/60 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${s.pct}%` }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}80)` }}
            />
          </div>
        </motion.div>
      ))}

      {/* Category & subcategory mini counts */}
    </div>
  );
};

/* ── Glass card wrapper ─────────────────────────────────────────────── */
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

const SecHeader = ({ title, onView }) => (
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-[14px] font-black text-gray-800 dark:text-white">{title}</h3>
    {onView && (
      <button onClick={onView}
        className="text-[12px] font-bold transition-colors duration-200 hover:opacity-80"
        style={{ color: CLR.blue }}>
        View All
      </button>
    )}
  </div>
);

/* ═══════════════════════════════════════════════════════════════════
   Main Dashboard
═══════════════════════════════════════════════════════════════════ */
const ProductsDashboard = () => {
  const navigate = useNavigate();

  const { products, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useProductCategoryStore();
  const { subcategories, fetchSubcategories } = useProductSubcategoryStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSubcategories();
  }, []);

  /* ── Derived metrics ──────────────────────────────────────────── */
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 1).length;
  const totalCategories = categories.filter(c => c.status === 1).length;
  const totalSubs = subcategories.length;

  /* ── Monthly additions (current year) ─────────────────────────── */
  const currentYear = new Date().getFullYear();
  const monthlyAdded = Array(12).fill(0);
  products.forEach(p => {
    if (!p.created_at) return;
    const d = new Date(p.created_at);
    if (d.getFullYear() === currentYear) monthlyAdded[d.getMonth()]++;
  });
  const monthlyData = MONTH_LABELS.map((label, i) => ({ label, value: monthlyAdded[i] }));

  /* Cumulative sparkline for total/active stat cards */
  const cumulative = monthlyAdded.reduce((acc, v) => {
    acc.push((acc[acc.length - 1] || 0) + v);
    return acc;
  }, []);
  const totalSpark = cumulative.length >= 2 ? cumulative : [0, totalProducts];
  const activeSpark = totalSpark.map(v => Math.round(v * (activeProducts / (totalProducts || 1))));

  /* ── Category donut segments ──────────────────────────────────── */
  const catCountMap = {};
  products.forEach(p => {
    const key = String(p.category_id);
    catCountMap[key] = (catCountMap[key] || 0) + 1;
  });
  const sortedCats = Object.entries(catCountMap)
    .map(([catId, count]) => {
      const cat = categories.find(c => String(c.id) === catId);
      return { label: cat?.category_name || 'Unknown', count };
    })
    .sort((a, b) => b.count - a.count);

  const top5 = sortedCats.slice(0, 5);
  const othersSum = sortedCats.slice(5).reduce((s, x) => s + x.count, 0);
  if (othersSum > 0) top5.push({ label: 'Others', count: othersSum });

  const donutTotal = top5.reduce((s, x) => s + x.count, 0) || 1;
  const donutSegments = top5.map((s, i) => ({
    ...s,
    pct: Math.round((s.count / donutTotal) * 100),
    color: DONUT_COLORS[i % DONUT_COLORS.length],
  }));

  /* ── Recent products (top 4 by created_at desc) ───────────────── */
  const recentProducts = [...products]
    .filter(p => p.created_at)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 4);

  /* ── Stat cards ───────────────────────────────────────────────── */
  const statCards = [
    {
      title: 'Total Products', value: totalProducts,
      format: v => v.toLocaleString(),
      trend: `+${monthlyAdded[new Date().getMonth()]} this month`,
      color: CLR.blue, bg: `${CLR.blue}18`,
      icon: Feather.Package, sparkId: 'total',
      sparkData: totalSpark,
    },
    {
      title: 'Categories', value: totalCategories,
      format: v => v.toLocaleString(),
      trend: totalCategories > 0 ? `+${totalCategories}` : '0',
      color: CLR.teal, bg: `${CLR.teal}18`,
      icon: Feather.Tag, sparkId: 'cats',
      sparkData: Array.from({ length: 12 }, (_, i) =>
        Math.max(1, Math.round(totalCategories * (0.5 + i * 0.045)))),
    },
    {
      title: 'Subcategories', value: totalSubs,
      format: v => v.toLocaleString(),
      trend: totalSubs > 0 ? `+${totalSubs}` : '0',
      color: CLR.purple, bg: `${CLR.purple}18`,
      icon: Feather.Layers, sparkId: 'subcats',
      sparkData: Array.from({ length: 12 }, (_, i) =>
        Math.max(1, Math.round(totalSubs * (0.5 + i * 0.045)))),
    },
    {
      title: 'Active Products', value: activeProducts,
      format: v => v.toLocaleString(),
      trend: totalProducts > 0
        ? `${Math.round((activeProducts / totalProducts) * 100)}% active`
        : '0% active',
      color: CLR.green, bg: `${CLR.green}18`,
      icon: Feather.CheckCircle, sparkId: 'active',
      sparkData: activeSpark.length >= 2 ? activeSpark : [0, activeProducts],
    },
  ];

  return (
    <div className="relative space-y-6 min-h-screen">
      <AmbientBg />
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* Welcome header */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div>
            <h2 className="text-[22px] font-black text-gray-800 dark:text-white tracking-tight">
              Products Overview
            </h2>
            <p className="text-[13px] text-gray-400 mt-1">
              Manage your product catalog, categories, and inventory.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/products/manage/add')}
              className="flex items-center gap-1.5 h-9 px-4 text-white text-[13px] font-bold rounded-xl
                             transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]
                             shadow-[0_4px_14px_rgba(49,151,96,0.30)]"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
            >
              <Feather.Plus className="w-4 h-4" />
              Add Product
            </motion.button> */}
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
          </div>
        </motion.div>
      </div>

      {/* Stat cards */}
      <div className="relative z-10 grid grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((s, i) => (
          <StatCard key={s.title} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Main grid */}
      <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1fr_288px] gap-6">

        {/* Left: charts + recent */}
        <div className="space-y-6">

          {/* Row 1: Bar chart + Category donut */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
            <GCard className="p-5" delay={0.32}>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="text-[14px] font-black text-gray-800 dark:text-white">Products Added</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Monthly additions in {currentYear}</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold
                                bg-gray-100/80 dark:bg-slate-700/50 text-gray-600 dark:text-gray-300">
                  {currentYear}
                </div>
              </div>
              <ProductsChart data={monthlyData} />
            </GCard>

            <GCard className="p-5" delay={0.4}>
              <h3 className="text-[14px] font-black text-gray-800 dark:text-white mb-4">By Category</h3>
              <CategoryDonut segments={donutSegments} total={totalProducts} />
            </GCard>
          </div>

          {/* Row 2: Recent Products + Status Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
            <GCard className="p-5" delay={0.48}>
              <SecHeader title="Recent Products" onView={() => navigate('/products/manage')} />
              <RecentProducts
                products={recentProducts}
                categories={categories}
                navigate={navigate}
              />
            </GCard>

            <GCard className="p-5" delay={0.52}>
              <SecHeader title="Product Status" />
              <StatusBreakdown products={products} />

              {/* Mini stats */}
              {products.length > 0 && (
                <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-700/40 grid grid-cols-2 gap-3">
                  {[
                    { label: 'Categories', value: totalCategories, color: CLR.teal, icon: Feather.Tag },
                    { label: 'Subcategories', value: totalSubs, color: CLR.purple, icon: Feather.Layers },
                  ].map((m, i) => (
                    <div key={i} className="flex flex-col gap-1 p-3 rounded-xl"
                      style={{ background: `${m.color}0d` }}>
                      <div className="flex items-center gap-1.5">
                        <m.icon className="w-3 h-3" style={{ color: m.color }} />
                        <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">{m.label}</span>
                      </div>
                      <span className="text-[20px] font-black" style={{ color: m.color }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </GCard>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">

          {/* Quick Actions */}
          <GCard className="p-5" delay={0.36}>
            <SecHeader title="Quick Actions" />
            <div className="space-y-2">
              {[
                { label: 'Add New Product', icon: Feather.Package, path: '/products/manage/add', color: CLR.blue },
                { label: 'Add New Category', icon: Feather.Tag, path: '/products/categories', color: CLR.teal },
                { label: 'Add Subcategory', icon: Feather.Layers, path: '/products/subcategories', color: CLR.purple },
                { label: 'View All Products', icon: Feather.List, path: '/products/manage', color: CLR.navy },
              ].map((action, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.4 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(action.path)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                             hover:bg-gray-50/80 dark:hover:bg-slate-700/40
                             transition-all duration-200 text-left group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                                  group-hover:scale-110 transition-transform duration-200"
                    style={{ background: `${action.color}18` }}>
                    <action.icon className="w-4 h-4" style={{ color: action.color }} />
                  </div>
                  <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">
                    {action.label}
                  </span>
                  <Feather.ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-gray-400 transition-colors" />
                </motion.button>
              ))}
            </div>
          </GCard>

          {/* Top Categories */}
          {donutSegments.length > 0 && (
            <GCard className="p-5" delay={0.44}>
              <SecHeader title="Top Categories" />
              <div className="space-y-3">
                {donutSegments.slice(0, 4).map((seg, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.07, duration: 0.4 }}
                    className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: `${seg.color}18` }}>
                      <Feather.Tag className="w-3 h-3" style={{ color: seg.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[12px] font-bold text-gray-700 dark:text-gray-200 truncate">{seg.label}</span>
                        <span className="text-[11px] font-black ml-2 shrink-0" style={{ color: seg.color }}>{seg.pct}%</span>
                      </div>
                      <div className="h-1 bg-gray-100 dark:bg-slate-700/60 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${seg.pct}%` }}
                          transition={{ delay: 0.65 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                          style={{ background: seg.color }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsDashboard;
