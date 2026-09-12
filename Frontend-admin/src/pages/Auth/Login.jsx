import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'react-feather';
import { useAuthStore } from '../../store/store';
const BrandLogoSVG = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Horizontal emerald green rectangle on top-left */}
    <rect x="20" y="2" width="24" height="12" rx="1" fill="var(--color-primary)" />

    {/* Orange square on top-right */}
    <rect x="46" y="2" width="12" height="12" rx="1" fill="#E67E22" />

    {/* Sky blue vertical rectangle on bottom-right */}
    <rect x="46" y="16" width="12" height="22" rx="1" fill="var(--color-secondary)" />

    {/* Diagonal lime green rectangle pointing top-right */}
    <rect x="24" y="20" width="23" height="9" rx="1" transform="rotate(-45 24 20)" fill="#8CC63F" />
  </svg>
);

// Advanced high-density vector circuit schematic background with glowing, flowing data particles
const HighTechCircuitBackground = () => (
  <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
    {/* Soft glowing ambient backgrounds */}
    <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-secondary/5 to-primary/5 blur-[120px]"/>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/5 to-secondary/5 blur-[120px]"/>
    
    <svg className="w-full h-full opacity-[0.4]" xmlns="http://www.w3.org/2000/svg">
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

// SVG Social Icons for instant load and sharp vector display
const GoogleSVG = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

const GitHubSVG = () => (
  <svg className="w-5 h-5 text-[#24292F]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const FacebookSVG = () => (
  <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

import { useCompany } from '../../context/CompanyContext';

const Login = () => {
  const navigate = useNavigate();
  const { companyData } = useCompany();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, user, loading, error } = useAuthStore();
  const passwordRef = useRef(null);

  // No auto-redirect — user must log in manually

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login({ email, password });

    if (success) {
      navigate('/module-selection', { replace: true });
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden w-full flex items-center justify-center bg-gradient-to-br from-[#EBF5FB] via-[#E8F8F5] to-[#FEF9E7] relative overflow-hidden font-sans p-4 sm:p-6 md:p-8">

      {/* High-density animated circuit schematic background */}
      <HighTechCircuitBackground />

      {/* Grand glowing ambient light/neon backlighting effects behind content container */}
      {/* Glow 1 (Emerald/Teal Glow on top-left behind card) */}
      <div className="absolute -top-10 left-10 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-primary/12 to-[#8CC63F]/12 blur-[100px] pointer-events-none"></div>

      {/* Glow 2 (Sky Blue/Teal Glow on bottom-right behind pedestal) */}
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-secondary/15 to-primary/12 blur-[100px] pointer-events-none"></div>

      {/* Glow 3 (Warm Orange accent glow in the center) */}
      <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full bg-[#E67E22]/6 blur-[120px] pointer-events-none"></div>

      {/* Main Glassmorphic Container Box (Wraps BOTH the login layout card and the 3D model) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto rounded-[28px] sm:rounded-[36px] lg:rounded-[48px] shadow-[0_32px_80px_rgba(49,151,96,0.12)] bg-white/45 backdrop-blur-2xl
border-2 border-primary/40 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-12 overflow-hidden">

        {/* Left Column: Translucent Login Card (Brand customized clean style) */}
        <div className="w-full max-w-[420px] md:max-w-[300px] lg:max-w-[360px] xl:max-w-[420px] md:w-[300px] lg:w-[360px] xl:w-[410px] bg-white/90
backdrop-blur-md border border-white/70 shadow-[0_16px_40px_rgba(52,152,219,0.04)] rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 md:p-8 relative overflow-hidden shrink-0">

          {/* Brand border highlight bar at the top of the card using the brand green and blue */}
          <div className="absolute top-0 left-0 right-0 h-[4.5px] bg-gradient-to-r from-primary to-secondary"></div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full"
          >
            {/* Header: Exact Geometric Logo & Brand Name */}
            <div className="flex justify-center mb-6">
              <span className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-widest text-center w-full block drop-shadow-sm">TNAI</span>
            </div>

            {/* Login Header */}
            <h2 className="text-3xl font-extrabold text-[#2C3E50] mb-5 tracking-tight">Login</h2>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-5 overflow-hidden"
                >
                  <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border border-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] sm:text-xs font-bold text-gray-500 tracking-wide pl-1">Email</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); passwordRef.current?.focus(); } }}
                    className="w-full rounded-xl py-3.5 px-4 text-gray-700 bg-white placeholder:text-gray-300 font-semibold text-[13px] sm:text-[14px] focus:outline-none focus:ring-2 focus:ring-primary transition-all border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                    placeholder="username@gmail.com"
                    autoFocus
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] sm:text-xs font-bold text-gray-500 tracking-wide pl-1">Password</label>
                <div className="relative group">
                  <input
                    ref={passwordRef}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSubmit(e); } }}
                    className="w-full rounded-xl py-3.5 px-4 pr-11 text-gray-700 bg-white placeholder:text-gray-300 font-semibold text-[13px] sm:text-[14px] focus:outline-none focus:ring-2 focus:ring-primary transition-all border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot Password in Brand Blue */}
              <div className="text-right">
                <Link to="#" className="text-[11px] sm:text-xs font-bold text-secondary hover:text-[#1F6EB0] transition-colors">
                  Forgot Password?
                </Link>
              </div>

              {/* Sign In Button in Premium Brand Gradient (Green to Blue) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-primary text-white font-bold text-[14px] sm:text-[15px] tracking-wide transition-all transform hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(49,151,96,0.2)] hover:shadow-[0_12px_24px_rgba(49,151,96,0.3)] active:scale-[0.98] disabled:opacity-60 flex justify-center items-center gap-2"
                >
                  {loading ? 'Sign in...' : 'Sign in'}
                </button>
              </div>
            </form>



            {/* Footer Text in Brand Green */}
            {/* <div className="text-center mt-6">
              <p className="text-[12px] sm:text-[13px] font-medium text-gray-500">
                Don't have an account yet?{' '}
                <Link to="/register" className="font-extrabold text-primary hover:underline transition-colors">
                  Register for free
                </Link>
              </p>
            </div> */}
          </motion.div>
        </div>

        {/* Right Column: 3D Exploded Electrode Stack sitting on Holographic Pedestal (Showcase composition) */}
        <div className="
hidden
md:flex
flex-1
items-center
justify-center
relative
select-none
xl:mt-0
"
        >

          {/* Subtle warm backdrop glow behind stack */}
          <div className="absolute w-[360px] h-[360px] bg-white/20 blur-3xl rounded-full pointer-events-none"></div>

          {/* Interactive Glowing Holographic Showcase Pedestal */}
          <div className="
absolute
bottom-[10%]
sm:bottom-[12%]
md:bottom-[15%]
lg:bottom-[18%]
sm:bottom-[20%]
w-[180px]
sm:w-[240px]
md:w-[300px]
lg:w-[320px]
h-[45px]
sm:h-[60px]
lg:h-[70px]
pointer-events-none
z-0
">
            {/* Pedestal Outer Glow Ellipse */}
            <div className="absolute inset-0 bg-secondary/10 blur-xl rounded-full transform scale-110"></div>

            {/* Primary Glowing Ring 1 */}
            {/* <div className="absolute inset-x-2 inset-y-2 border-2 border-secondary/40 rounded-full shadow-[0_0_15px_rgba(52,152,219,0.3)] transform rotate-x-60"></div> */}

            {/* Concentric Inner Ring 2 */}
            <div className="absolute inset-x-8 inset-y-4 border border-primary/30 rounded-full shadow-[0_0_10px_rgba(49,151,96,0.2)] transform rotate-x-60"></div>

            {/* Pulsing Concentric Center Ring 3 */}
            <motion.div
              animate={{
                scale: [0.95, 1.08, 0.95],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-14 inset-y-6 border-[1.5px] border-[#8CC63F]/50 rounded-full transform rotate-x-60"
            ></motion.div>

            {/* Glowing Center Spot */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-secondary to-primary opacity-30 blur-md rounded-full"></div>
          </div>

          {/* Golden Floating Energy Sparkles/Particles rising from Pedestal */}
          {/* Particle 1 */}
          <motion.div
            animate={{
              y: [20, -120],
              x: [0, 15, -10, 0],
              opacity: [0, 0.9, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeOut" }}
            className="absolute bottom-[25%] left-[30%] w-2 h-2 bg-amber-400 rounded-full z-20 pointer-events-none shadow-[0_0_8px_#F59E0B]"
          ></motion.div>

          {/* Particle 2 */}
          <motion.div
            animate={{
              y: [30, -150],
              x: [0, -20, 15, 0],
              opacity: [0, 0.8, 0],
              scale: [0.6, 1, 0.6]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
            className="absolute bottom-[25%] right-[28%] w-1.5 h-1.5 bg-[#E67E22] rounded-full z-20 pointer-events-none shadow-[0_0_6px_#E67E22]"
          ></motion.div>

          {/* Particle 3 */}
          <motion.div
            animate={{
              y: [40, -100],
              x: [0, 10, -15, 0],
              opacity: [0, 0.7, 0],
              scale: [0.7, 1.1, 0.7]
            }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeOut", delay: 3 }}
            className="absolute bottom-[25%] left-[45%] w-2 h-2 bg-amber-300 rounded-full z-20 pointer-events-none shadow-[0_0_8px_#FCD34D]"
          ></motion.div>

          {/* Showcase light beams extending upwards */}
          <div className="absolute bottom-[25%] left-1/2 -translate-x-1/2 w-48 h-64 bg-gradient-to-t from-secondary/10 via-primary/3 to-transparent opacity-60 blur-xl pointer-events-none rounded-t-full"></div>

          {/* Exploded Electrode Stack Image, showcase oriented with background blended out seamlessly */}
          <motion.div
            className="
relative
z-20
w-full
md:max-w-[150px]
lg:max-w-[260px]
xl:max-w-[500px]
flex
items-center
justify-center
mx-auto
"
          >

            {/* Main Glow */}
            <div className="
absolute
w-[180px]
h-[180px]
sm:w-[240px]
sm:h-[240px]
md:w-[300px]
md:h-[300px]
lg:w-[320px]
lg:h-[320px]
bg-gradient-to-r
from-primary/20
to-secondary/20
blur-[100px]
rounded-full
">
            </div>

            {/* Floating Rings */}
            <div className="absolute w-[180px] h-[180px]
sm:w-[240px] sm:h-[240px]
md:w-[300px] md:h-[300px]
lg:w-[340px] lg:h-[340px] border border-secondary/20 rounded-full animate-pulse"></div>
            <div className="absolute w-[140px] h-[140px]
sm:w-[200px] sm:h-[200px]
md:w-[250px] md:h-[250px]
lg:w-[280px] lg:h-[280px] border border-primary/20 rounded-full animate-pulse"></div>

            {/* Image */}
            <img
              src="/assets/images/login.png"
              alt="Login Showcase"
              className="
      relative z-10
      w-full
      rounded-[24px]
      border-2 border-primary
      object-cover
      drop-shadow-[0_35px_60px_rgba(0,0,0,0.25)]
      hover:scale-105
      transition-all
      duration-500
    "
              style={{
                filter:
                  "drop-shadow(0px 25px 40px rgba(52,152,219,0.25)) contrast(1.08) saturate(1.1)",
                mixBlendMode: "multiply",
              }}
            />

            {/* Floating Particles */}
            <div className="absolute top-[10%] left-[15%] w-3 h-3 bg-[#8CC63F] rounded-full blur-[2px] animate-bounce"></div>
            <div className="absolute bottom-[20%] right-[18%] w-2 h-2 bg-secondary rounded-full blur-[1px] animate-ping"></div>
            <div className="absolute top-[30%] right-[10%] w-2 h-2 bg-[#E67E22] rounded-full blur-[1px] animate-pulse"></div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default Login;

