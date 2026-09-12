
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  CheckCircle,
  AlertCircle,
} from 'react-feather';
import electrodeStackImg from '../../assets/electrode_stack.png';

/* ── Brand geometric logo (matches Login exactly) ──────────────────── */
const BrandLogoSVG = ({ className = 'w-10 h-10' }) => (
  <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="2"  width="24" height="12" rx="1" fill="var(--color-primary)" />
    <rect x="46" y="2"  width="12" height="12" rx="1" fill="#E67E22" />
    <rect x="46" y="16" width="12" height="22" rx="1" fill="var(--color-secondary)" />
    <rect x="24" y="20" width="23" height="9"  rx="1" transform="rotate(-45 24 20)" fill="#8CC63F" />
  </svg>
);

/* ── Animated electronic / circuit schematic background ─────────────── */
const CircuitBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
    <svg className="w-full h-full opacity-[0.11]" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="var(--color-primary)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.8" />
        </linearGradient>
        <filter id="rg-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Central chip schematic */}
      <rect x="6%" y="12%" width="100" height="100" rx="8" stroke="url(#rg-grad)" strokeWidth="3.5" fill="none" />
      <rect x="8%" y="14%" width="84"  height="84"  rx="5" fill="var(--color-primary)" opacity="0.08" />
      <path d="M 1% 15%   H 6%" stroke="var(--color-primary)" strokeWidth="2.5" />
      <path d="M 1% 18.5% H 6%" stroke="var(--color-primary)" strokeWidth="2.5" />
      <path d="M 1% 22%   H 6%" stroke="var(--color-primary)" strokeWidth="2.5" />
      <path d="M 11%  2% V 12%" stroke="var(--color-secondary)" strokeWidth="2.5" />
      <path d="M 14.5% 2% V 12%" stroke="var(--color-secondary)" strokeWidth="2.5" />

      {/* Electrode-grid rings */}
      <circle cx="50%" cy="35%" r="200" stroke="var(--color-secondary)" strokeWidth="1.5" strokeDasharray="8,6"   fill="none" />
      <circle cx="50%" cy="35%" r="250" stroke="var(--color-primary)" strokeWidth="1.2" strokeDasharray="14,10"  fill="none" />
      <circle cx="50%" cy="35%" r="300" stroke="#E67E22" strokeWidth="1.5" strokeDasharray="4,12"   fill="none" />
      <circle cx="90%" cy="75%" r="140" stroke="var(--color-secondary)" strokeWidth="1.2" strokeDasharray="6,6"    fill="none" />
      <circle cx="90%" cy="75%" r="180" stroke="var(--color-primary)" strokeWidth="1.5" strokeDasharray="10,8"   fill="none" />

      {/* High-speed bus lines */}
      <path d="M -50 420 L 400 420 L 480 500 L 780 500 L 840 560 L 1500 560" stroke="var(--color-secondary)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M -50 435 L 390 435 L 470 515 L 770 515 L 830 575 L 1500 575" stroke="var(--color-primary)" strokeWidth="2"   fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 320 0 L 320 140 L 380 200 L 620 200 L 680 260 L 680 900"   stroke="#E67E22" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 1200 0 L 1200 240 L 1140 300 H 900 L 840 360 L 840 900"    stroke="var(--color-primary)" strokeWidth="2"   fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Data particles flowing along paths */}
      <circle r="4.5" fill="var(--color-secondary)" filter="url(#rg-glow)">
        <animateMotion dur="8s"   repeatCount="indefinite" path="M -50 420 L 400 420 L 480 500 L 780 500 L 840 560 L 1500 560" />
      </circle>
      <circle r="4"   fill="var(--color-primary)" filter="url(#rg-glow)">
        <animateMotion dur="7s"   repeatCount="indefinite" path="M -50 435 L 390 435 L 470 515 L 770 515 L 830 575 L 1500 575" />
      </circle>
      <circle r="4.5" fill="#E67E22" filter="url(#rg-glow)">
        <animateMotion dur="9s"   repeatCount="indefinite" path="M 320 0 L 320 140 L 380 200 L 620 200 L 680 260 L 680 900" />
      </circle>
      <circle r="4"   fill="var(--color-primary)" filter="url(#rg-glow)">
        <animateMotion dur="7.5s" repeatCount="indefinite" path="M 1200 0 L 1200 240 L 1140 300 H 900 L 840 360 L 840 900" />
      </circle>

      {/* Junction pads */}
      <circle cx="400" cy="420" r="5.5" fill="var(--color-secondary)" />
      <circle cx="480" cy="500" r="5.5" fill="var(--color-secondary)" />
      <circle cx="780" cy="500" r="5.5" fill="var(--color-secondary)" />
      <circle cx="840" cy="560" r="5.5" fill="var(--color-secondary)" />
      <circle cx="380" cy="200" r="5"   fill="#E67E22" />
      <circle cx="620" cy="200" r="5"   fill="#E67E22" />
      <circle cx="1140" cy="300" r="4.5" fill="var(--color-primary)" />
      <circle cx="840"  cy="360" r="4.5" fill="var(--color-primary)" />

      {/* Corner technical borders */}
      <path d="M 40 40 H 140 M 40 40 V 140"           stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 1460 40 H 1360 M 1460 40 V 140"       stroke="var(--color-secondary)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 40 860 H 140 M 40 860 V 760"          stroke="var(--color-secondary)" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 1460 860 H 1360 M 1460 860 V 760"     stroke="var(--color-primary)" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────── */
const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword]               = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError]                             = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.agree) {
      setError('Please accept the Terms & Conditions');
      return;
    }

    localStorage.setItem(
      'authUser',
      JSON.stringify({ username: formData.username, email: formData.email })
    );
    navigate('/login');
  };

  /* shared input class — py-2.5 keeps inputs compact so all 4 fit without scroll */
  const inputCls = `
    w-full rounded-xl py-2.5 px-4
    text-gray-700 bg-white placeholder:text-gray-300
    font-semibold text-[13px]
    focus:outline-none focus:ring-2 focus:ring-primary
    transition-all border border-gray-100
    shadow-[0_2px_8px_rgba(0,0,0,0.01)]
  `;

  /* ── RENDER ─────────────────────────────────────────────────────────── */
  return (
    <div className="h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#EBF5FB] via-[#E8F8F5] to-[#FEF9E7] relative font-sans p-3 sm:p-5 md:p-7">

      {/* Electronic circuit schematic background */}
      <CircuitBackground />

      {/* Ambient neon glow blobs */}
      <div className="absolute -top-10 right-10 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-primary/12 to-[#8CC63F]/12 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-secondary/15 to-primary/12 blur-[100px] pointer-events-none" />
      <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full bg-[#E67E22]/6 blur-[120px] pointer-events-none" />

      {/* ── Main glassmorphic container ─────────────────────────────── */}
      <div className="
        relative z-10
        w-full max-w-7xl mx-auto
        h-full
        rounded-[28px] sm:rounded-[36px] lg:rounded-[48px]
        shadow-[0_32px_80px_rgba(49,151,96,0.12)]
        bg-white/45 backdrop-blur-2xl border border-white/60
        px-4 sm:px-6 md:px-8 lg:px-10
        py-4 sm:py-5 md:py-6
        flex flex-col md:flex-row
        items-center justify-between
        gap-6 lg:gap-8
        overflow-hidden
      ">

        {/* ── LEFT: Electrode image showcase ─────────────────────────── */}
        <div className="
          hidden md:flex
          flex-1 h-full items-center justify-center
          relative select-none
        ">
          {/* Warm backdrop glow */}
          <div className="absolute w-[360px] h-[360px] bg-white/20 blur-3xl rounded-full pointer-events-none" />

          {/* Holographic pedestal */}
          <div className="
            absolute bottom-[10%] sm:bottom-[12%] md:bottom-[15%] lg:bottom-[18%]
            w-[180px] sm:w-[240px] md:w-[300px] lg:w-[320px]
            h-[45px] sm:h-[60px] lg:h-[70px]
            pointer-events-none z-0
          ">
            <div className="absolute inset-0 bg-secondary/10 blur-xl rounded-full transform scale-110" />
            <div className="absolute inset-x-8 inset-y-4 border border-primary/30 rounded-full shadow-[0_0_10px_rgba(49,151,96,0.2)] transform rotate-x-60" />
            <motion.div
              animate={{ scale: [0.95, 1.08, 0.95], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-14 inset-y-6 border-[1.5px] border-[#8CC63F]/50 rounded-full transform rotate-x-60"
            />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-secondary to-primary opacity-30 blur-md rounded-full" />
          </div>

          {/* Rising energy particles */}
          {[
            { delay: 0,   left: '30%', color: 'bg-amber-400',  shadow: '#F59E0B', dur: 5.5, dx: [0, 15, -10, 0] },
            { delay: 1.5, left: '65%', color: 'bg-[#E67E22]',  shadow: '#E67E22', dur: 6,   dx: [0, -20, 15, 0] },
            { delay: 3,   left: '48%', color: 'bg-amber-300',  shadow: '#FCD34D', dur: 4.8, dx: [0, 10, -15, 0] },
          ].map((p, i) => (
            <motion.div
              key={i}
              animate={{ y: [20, -120], x: p.dx, opacity: [0, 0.9, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: p.dur, repeat: Infinity, ease: 'easeOut', delay: p.delay }}
              className={`absolute bottom-[25%] w-2 h-2 ${p.color} rounded-full z-20 pointer-events-none`}
              style={{ left: p.left, boxShadow: `0 0 8px ${p.shadow}` }}
            />
          ))}

          {/* Light beam upward */}
          <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-48 h-64 bg-gradient-to-t from-secondary/10 via-primary/3 to-transparent opacity-60 blur-xl pointer-events-none rounded-t-full" />

          {/* Floating electrode image */}
          <motion.div
            animate={{ y: [0, -18, 0], rotateY: [0, 3, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-20 w-full md:max-w-[150px] lg:max-w-[260px] xl:max-w-[500px] flex items-center justify-center mx-auto"
          >
            {/* Glow halo */}
            <div className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] lg:w-[320px] lg:h-[320px] bg-gradient-to-r from-primary/20 to-secondary/20 blur-[100px] rounded-full" />

            {/* Floating rings */}
            <div className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px] border border-secondary/20 rounded-full animate-pulse" />
            <div className="absolute w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[280px] lg:h-[280px] border border-primary/20 rounded-full animate-pulse" />

            <img
              src={electrodeStackImg}
              alt="Electrode Stack"
              className="relative z-10 w-full object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.25)] hover:scale-105 transition-all duration-500"
              style={{
                filter: 'drop-shadow(0px 25px 40px rgba(52,152,219,0.25)) contrast(1.08) saturate(1.1)',
                mixBlendMode: 'multiply',
              }}
            />

            {/* Floating accent particles */}
            <div className="absolute top-[10%] left-[15%] w-3 h-3 bg-[#8CC63F] rounded-full blur-[2px] animate-bounce" />
            <div className="absolute bottom-[20%] right-[18%] w-2 h-2 bg-secondary rounded-full blur-[1px] animate-ping" />
            <div className="absolute top-[30%] right-[10%] w-2 h-2 bg-[#E67E22] rounded-full blur-[1px] animate-pulse" />
          </motion.div>

          {/* Left-side caption below the image */}
         
        </div>

        {/* ── RIGHT: Registration form card ──────────────────────────── */}
        <div className="
          w-full max-w-[420px]
          md:max-w-[300px] lg:max-w-[360px] xl:max-w-[420px]
          md:w-[300px] lg:w-[360px] xl:w-[410px]
          bg-white/90 backdrop-blur-md
          border border-white/70
          shadow-[0_16px_40px_rgba(52,152,219,0.04)]
          rounded-[24px] sm:rounded-[28px]
          p-5 sm:p-6
          relative overflow-hidden shrink-0
        ">

          {/* Brand gradient top bar */}
          <div className="absolute top-0 left-0 right-0 h-[4.5px] bg-gradient-to-r from-primary via-[#8CC63F] to-secondary" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full"
          >
            {/* Logo + brand */}
            <div className="mb-3 flex items-center gap-3">
              <BrandLogoSVG className="w-8 h-8 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-black text-[#2C3E50] tracking-wider leading-none">RSI STORE</span>
                <span className="text-[9px] font-bold text-secondary tracking-widest uppercase mt-0.5">Research Platform</span>
              </div>
            </div>

            <h2 className="text-[22px] font-extrabold text-[#2C3E50] tracking-tight">Create Account</h2>
            <p className="text-[12px] font-medium text-gray-500 mt-0.5 mb-3">
              Already a member?{' '}
              <Link to="/login" className="font-extrabold text-primary hover:underline">
                Sign in
              </Link>
            </p>

            {/* Error banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-semibold flex items-center gap-2 border border-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5">

              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 tracking-wide pl-1">Username</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    required
                    className={`${inputCls} pl-10`}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 tracking-wide pl-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@ahattrickz.com"
                    required
                    className={`${inputCls} pl-10`}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 tracking-wide pl-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    required
                    className={`${inputCls} pl-10 pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 tracking-wide pl-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    required
                    className={`${inputCls} pl-10 pr-11`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Feature bullets */}
              <div className="flex gap-4 pt-1">
                {[
                  'Secure platform access',
                  'Collaborate with teams',
                ].map((txt) => (
                  <div key={txt} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                    {txt}
                  </div>
                ))}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="mt-0.5 accent-primary"
                />
                <span className="text-[12px] text-gray-500 leading-relaxed">
                  I agree to the{' '}
                  <span className="font-semibold text-secondary">Terms & Conditions</span>
                </span>
              </label>

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="
                    w-full py-3.5 rounded-xl
                    bg-gradient-to-r from-primary to-secondary
                    hover:from-[#277E4F] hover:to-[#2980B9]
                    text-white font-bold text-[14px] sm:text-[15px] tracking-wide
                    transition-all transform hover:-translate-y-0.5
                    shadow-[0_8px_20px_rgba(49,151,96,0.2)]
                    hover:shadow-[0_12px_24px_rgba(49,151,96,0.3)]
                    active:scale-[0.98]
                    flex justify-center items-center gap-2
                  "
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
