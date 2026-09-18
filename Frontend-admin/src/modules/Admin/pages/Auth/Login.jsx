import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'react-feather';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect away from login page
  useEffect(() => {
    if (localStorage.getItem('auth_token')) {
      navigate('/module-selection', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock successful login to bypass backend check since user has no credentials/backend
    setTimeout(() => {
      localStorage.setItem('auth_token', 'mock_token_12345');
      localStorage.setItem('authUser', JSON.stringify({ name: 'Admin User', email: username || 'admin@ahattrickz.com' }));
      navigate('/module-selection', { replace: true });
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#D6EAF8] relative overflow-hidden font-sans p-4 sm:p-6 lg:p-8">

      {/* Abstract Background Elements representing Hydrogen/Atoms/Tech */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 sm:w-96 sm:h-96 bg-[#8CC63F] opacity-20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-secondary opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] right-[15%] w-40 h-40 sm:w-64 sm:h-64 border-[20px] sm:border-[40px] border-white/30 rounded-full opacity-50 shadow-2xl mix-blend-overlay"></div>
      <div className="absolute bottom-[20%] left-[10%] w-24 h-24 sm:w-32 sm:h-32 border-[10px] sm:border-[20px] border-[#8CC63F]/30 rounded-full opacity-50 shadow-2xl mix-blend-overlay"></div>

      {/* Main Unified Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col lg:flex-row rounded-3xl sm:rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] bg-white/40 backdrop-blur-2xl border border-white/60 overflow-hidden">

        {/* Left Side: Branding and Messaging */}
        <div className="flex-1 lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Logo Placeholder */}
          <div className="mb-8 sm:mb-12 relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex flex-col items-center justify-center shadow-sm">
              <span className="text-xl sm:text-[28px] font-black text-[#8CC63F] tracking-tighter leading-none" style={{ fontFamily: 'Arial' }}>rs<span className="text-secondary">i</span></span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-[#2C3E50] leading-none tracking-wide">ahattrickz.com</span>
              <span className="text-[9px] sm:text-[10px] text-[#34495E] font-medium tracking-widest uppercase mt-1">supports research</span>
            </div>
          </div>

          <div className="relative z-10 space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2C3E50] leading-tight">
              Explore Ahattrickz's advanced <span className="text-[#F39C12]">IT & CLOUD</span> <span className="text-[#F39C12]">TESTING</span> solutions
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#34495E] font-medium leading-relaxed max-w-lg">
              Designed for <span className="text-secondary font-bold">R&D</span> applications, enabling scientists and engineers to optimize green hydrogen <span className="text-[#8CC63F] font-bold">PRODUCTION</span> technologies.
            </p>
          </div>

          {/* Abstract atom orbits SVG decoration */}
          <svg className="absolute bottom-[-15%] right-[-15%] w-[120%] opacity-[0.06] pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="#2C3E50" strokeWidth="2" d="M100,50 a50,25 0 1,0 0,100 a50,25 0 1,0 0,-100" transform="rotate(30 100 100)" />
            <path fill="none" stroke="#2C3E50" strokeWidth="2" d="M100,50 a50,25 0 1,0 0,100 a50,25 0 1,0 0,-100" transform="rotate(90 100 100)" />
            <path fill="none" stroke="#2C3E50" strokeWidth="2" d="M100,50 a50,25 0 1,0 0,100 a50,25 0 1,0 0,-100" transform="rotate(150 100 100)" />
            <circle cx="100" cy="100" r="10" fill="#2C3E50" />
            <circle cx="140" cy="75" r="4" fill="var(--color-secondary)" />
            <circle cx="60" cy="125" r="5" fill="#8CC63F" />
            <circle cx="100" cy="150" r="3" fill="#F39C12" />
          </svg>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-16 bg-white relative z-20 shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-xl sm:text-2xl font-black text-[#2C3E50] mb-2">Welcome Back!</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-6 sm:mb-8">Please enter your credentials to access the R&D portal.</p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="bg-red-50 text-red-600 p-3 sm:p-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 border border-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="space-y-1 sm:space-y-1.5">
                <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Email Address</label>
                <div className="relative group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl py-3 sm:py-3.5 px-4 sm:px-5 text-gray-700 placeholder:text-gray-400 font-medium text-[13px] sm:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8CC63F] focus:bg-white transition-all border border-gray-200 bg-gray-50"
                    placeholder="name@ahattrickz.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                  <Link to="#" className="text-[10px] sm:text-xs font-bold hover:underline text-secondary">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl py-3 sm:py-3.5 px-4 sm:px-5 text-gray-700 placeholder:text-gray-400 font-medium text-[13px] sm:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8CC63F] focus:bg-white transition-all border border-gray-200 bg-gray-50"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8CC63F] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-3.5 rounded-xl text-white font-black text-[14px] sm:text-[15px] tracking-wide transition-all transform hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] disabled:opacity-60 flex justify-center items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #8CC63F 0%, #76A832 100%)',
                    boxShadow: '0 8px 25px rgba(140,198,63,0.25)',
                  }}
                >
                  {loading ? 'Authenticating...' : 'Login to Dashboard'}
                  {!loading && <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>}
                </button>
              </div>
            </form>

            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-[12px] sm:text-[13px] font-medium text-gray-500">
                Don't have an account?{' '}
                <Link to="/register" className="font-bold hover:underline text-[#8CC63F]">
                  Request Access
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
