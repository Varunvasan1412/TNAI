import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight, User, Mail, Lock } from 'react-feather';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('auth_token', 'mock_token_12345');
      localStorage.setItem('authUser', JSON.stringify({ name: username || 'User', email }));
      navigate('/module-selection', { replace: true });
      setLoading(false);
    }, 500);
  };

  const inputBase =
    'w-full rounded-xl py-3.5 pl-11 pr-4 text-[#1E293B] placeholder:text-gray-400 text-[14px] font-medium transition-all duration-200 outline-none border bg-[#F8FAFC]';
  const inputIdle = 'border-gray-200 shadow-sm';
  const inputFocused = 'border-[#8CC63F] ring-4 ring-[#8CC63F]/10 shadow-md bg-white';

  return (
    // Full-Bleed Split Screen Layout (No floating card)
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white font-sans overflow-hidden">
      
      {/* ── LEFT PANEL: Form (Full Height, Scrollable) ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center min-h-screen overflow-y-auto relative z-20">
        
        {/* Subtle background decoration on the form side */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8CC63F] to-secondary"></div>
        
        <div className="w-full max-w-[440px] mx-auto p-8 sm:p-12 lg:p-16 flex flex-col justify-center min-h-full">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-[20px] font-black tracking-tighter leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                  <span className="text-[#8CC63F]">rs</span>
                  <span className="text-secondary">i</span>
                </span>
              </div>
              <div>
                <p className="text-[16px] font-bold text-[#2C3E50] tracking-wide leading-none">ahattrickz.com</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Research Portal</p>
              </div>
            </div>

            <h2 className="text-[28px] sm:text-[32px] font-black text-[#1E293B] mb-2 tracking-tight">Create your account</h2>
            <p className="text-[14px] text-gray-500 font-medium mb-8">
              Already a member?{' '}
              <Link to="/login" className="font-bold text-[#8CC63F] hover:underline">
                Sign in securely
              </Link>
            </p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-6 overflow-hidden"
                >
                  <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-[13px] font-bold flex items-center gap-2 border border-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider pl-1">Email Address</label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'email' ? 'text-[#8CC63F]' : 'text-gray-400'}`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBase} ${focusedField === 'email' ? inputFocused : inputIdle}`}
                    placeholder="name@ahattrickz.com"
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider pl-1">Username</label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'username' ? 'text-[#8CC63F]' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBase} ${focusedField === 'username' ? inputFocused : inputIdle}`}
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider pl-1">Password</label>
                <div className="relative">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focusedField === 'password' ? 'text-[#8CC63F]' : 'text-gray-400'}`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBase} pr-12 ${focusedField === 'password' ? inputFocused : inputIdle}`}
                    placeholder="Create a strong password"
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

              {/* Features List */}
              <div className="pt-2">
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-3 text-[13px] text-gray-600 font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#8CC63F]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-[#8CC63F]" />
                    </div>
                    Access to exclusive green hydrogen testing tools.
                  </li>
                  <li className="flex items-start gap-3 text-[13px] text-gray-600 font-medium">
                    <div className="w-5 h-5 rounded-full bg-[#8CC63F]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-3 h-3 text-[#8CC63F]" />
                    </div>
                    Collaborate with leading R&D engineers globally.
                  </li>
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-white font-bold text-[15px] tracking-wide transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 group"
                  style={{
                    background: 'linear-gradient(135deg, #8CC63F 0%, #6faa28 100%)',
                    boxShadow: '0 8px 25px rgba(140,198,63,0.3)',
                  }}
                >
                  {loading ? 'Setting up account...' : 'Complete Registration'}
                  {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>

              {/* Terms */}
              <div className="pt-6 border-t border-gray-100">
                <p className="text-center text-[12px] text-gray-400 font-medium leading-relaxed">
                  By joining, you acknowledge that you have read and agree to our{' '}
                  <Link to="#" className="text-secondary hover:underline font-bold">Terms of Service</Link> and{' '}
                  <Link to="#" className="text-secondary hover:underline font-bold">Privacy Policy</Link>.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL: Edge-to-Edge Image ── */}
      <div className="hidden lg:block lg:w-1/2 relative bg-[#0F172A] min-h-screen border-l border-gray-100">
        <img 
          src="/assets/images/rsi_hydrogen_lab.png" 
          alt="Ahattrickz Tech Hub" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[30s] ease-in-out hover:scale-110" 
        />
        
        {/* Soft, immersive gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0F172A]/20"></div>
        
        {/* Marketing Text */}
        <div className="absolute bottom-0 left-0 w-full p-16 xl:p-24 text-left z-10 flex flex-col justify-end h-full">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
           >
             <h2 className="text-4xl xl:text-5xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl leading-tight">
                Pioneer the future of <br/>
                <span className="text-[#8CC63F] bg-clip-text text-transparent bg-gradient-to-r from-[#8CC63F] to-[#A3E450]">Green Hydrogen.</span>
             </h2>
             <p className="text-lg text-gray-200 font-medium max-w-lg drop-shadow-lg leading-relaxed">
                Step into a world-class network of scientists and engineers. Unlock precision testing, collaborate on breakthroughs, and accelerate your R&D today.
             </p>
           </motion.div>
        </div>
      </div>
      
    </div>
  );
};

export default Register;
