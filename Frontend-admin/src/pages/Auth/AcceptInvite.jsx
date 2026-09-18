import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, Key, Lock, CheckCircle } from 'react-feather';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../api/axios';

// Premium Animated Background with floating glass panes and tech nodes
const PremiumAnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#F4F7FB]">
    {/* Base Gradient Glowing Orbs */}
    <motion.div 
      animate={{ scale: [1, 1.15, 1], x: [0, 40, 0], y: [0, 20, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-15%] left-[-10%] w-[55%] h-[60%] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-[100px] rounded-full mix-blend-multiply"
    />
    <motion.div 
      animate={{ scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, -30, 0] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-secondary/15 via-secondary/5 to-transparent blur-[120px] rounded-full mix-blend-multiply"
    />
    
    {/* Sophisticated Tech Grid */}
    <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)]"></div>

    {/* Big Floating Glass Panels (Parallax Effect) */}
    <motion.div 
      animate={{ y: [-15, 15, -15], rotate: [12, 15, 12] }} 
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[12%] right-[10%] lg:right-[15%] w-64 h-72 sm:w-80 sm:h-96 bg-white/20 backdrop-blur-2xl border border-white/50 rounded-[40px] shadow-[0_16px_40px_rgba(0,0,0,0.04)] z-0"
    />
    
    <motion.div 
      animate={{ y: [15, -15, 15], rotate: [-12, -15, -12] }} 
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-[10%] left-[8%] lg:left-[12%] w-56 h-64 sm:w-72 sm:h-80 bg-white/25 backdrop-blur-xl border border-white/60 rounded-[36px] shadow-[0_16px_40px_rgba(0,0,0,0.06)] z-0"
    />
    
    <motion.div 
      animate={{ y: [0, 20, 0], rotate: [45, 55, 45] }} 
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-[35%] left-[25%] w-24 h-24 bg-gradient-to-tr from-primary/15 to-transparent backdrop-blur-md border border-white/50 rounded-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.03)] z-0"
    />

    <motion.div 
      animate={{ y: [0, -25, 0], rotate: [-25, -15, -25] }} 
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="absolute bottom-[35%] right-[25%] w-32 h-32 bg-gradient-to-bl from-secondary/15 to-transparent backdrop-blur-lg border border-white/40 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04)] z-0"
    />

    {/* Floating Tech Icons / Particles */}
    <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[18%]">
      <Lock className="w-10 h-10 text-primary/20" />
    </motion.div>
    <motion.div animate={{ y: [0, 25, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute bottom-[22%] right-[18%]">
      <Key className="w-12 h-12 text-secondary/20" />
    </motion.div>
    <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} className="absolute top-[45%] right-[30%] hidden lg:block">
      <CheckCircle className="w-8 h-8 text-[#8CC63F]/20" />
    </motion.div>
  </div>
);

const ValidationItem = ({ isValid, text }) => (
  <div className={`flex items-center gap-1.5 text-[12px] font-semibold transition-colors duration-300 ${isValid ? 'text-[#2ab57d]' : 'text-slate-400'}`}>
    <CheckCircle className={`w-3.5 h-3.5 transition-opacity duration-300 ${isValid ? 'opacity-100' : 'opacity-40'}`} />
    {text}
  </div>
);

const AcceptInvite = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [step, setStep] = useState(1); // 1 = OTP, 2 = Set Password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(120); // 2 minutes initial countdown
  const [resending, setResending] = useState(false);

  // Step 1 State
  const [otp, setOtp] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [tempAuthToken, setTempAuthToken] = useState(null);

  const passwordValidations = {
    length: newPassword.length >= 8 && newPassword.length <= 64,
    uppercase: /[A-Z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[\W_]/.test(newPassword),
  };
  const isPasswordValid = Object.values(passwordValidations).every(Boolean);

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing invitation token.');
    }
  }, [token]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResendOtp = async () => {
    if (cooldown > 0 || !token) return;
    
    setResending(true);
    setError('');
    try {
      await axiosInstance.post('/api/roles/users/invitations/resend-otp', { token });
      toast.success('A new OTP has been sent to your email.');
      setCooldown(120);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return setError('Please enter the OTP.');

    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/api/roles/users/invitations/verify-otp', { token, otp });
      const accessToken = response.data?.data?.access_token || response.data?.access_token;
      
      if (accessToken) {
        setTempAuthToken(accessToken);
        // Overwrite the global token in localStorage so axios interceptor automatically picks it up
        localStorage.setItem('token', accessToken);
      }
      
      toast.success('OTP verified successfully!');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      return setError('Please ensure your password meets all requirements.');
    }
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match.');
    }

    setLoading(true);
    setError('');
    try {
      await axiosInstance.post('/api/roles/users/change-password', {
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      }, {
        headers: {
          Authorization: tempAuthToken ? `Bearer ${tempAuthToken}` : undefined
        }
      });
      toast.success('Password set successfully! You can now login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to set password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden w-full flex items-center justify-center bg-[#F8FAFC] relative overflow-hidden font-sans p-4 sm:p-6 md:p-8">
      <PremiumAnimatedBackground />

      <div className="relative z-10 w-full max-w-[480px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white/80 backdrop-blur-2xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[32px] p-8 sm:p-10 relative overflow-hidden"
        >
          {/* Subtle top border highlight */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient"></div>

          <div className="flex justify-center mb-8">
            <span className="text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-widest text-center w-full block drop-shadow-sm">TNAI</span>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight text-center">
            {step === 1 ? 'Verify Invitation' : 'Secure Account'}
          </h2>
          <p className="text-center text-slate-500 text-[15px] mb-8 font-medium leading-relaxed px-4">
            {step === 1 
              ? 'We sent a 6-digit code to your email. Enter it below to accept your invitation.'
              : 'Choose a strong password to complete your account setup.'}
          </p>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-3 border border-red-100 shadow-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step === 1 ? (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleVerifyOtp} 
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600 tracking-wide pl-1">ONE-TIME PASSWORD</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                    <Key className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full rounded-2xl py-4 pl-12 pr-4 text-slate-800 bg-slate-50/50 hover:bg-slate-50 placeholder:text-slate-300 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all border border-slate-200 shadow-sm text-center tracking-[0.3em]"
                    placeholder="------"
                    maxLength={6}
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || !token}
                  className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[15px] tracking-wide transition-all transform hover:-translate-y-1 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] active:scale-[0.98] disabled:opacity-60 disabled:hover:translate-y-0 flex justify-center items-center gap-2"
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
              </div>

              <div className="text-center mt-4">
                <p className="text-[13px] font-medium text-slate-500">
                  Didn't receive the code?{' '}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={cooldown > 0 || resending}
                    className={`font-bold transition-colors ${
                      cooldown > 0 || resending 
                        ? 'text-slate-400 cursor-not-allowed' 
                        : 'text-primary hover:text-primary/80'
                    }`}
                  >
                    {resending 
                      ? 'Sending...' 
                      : cooldown > 0 
                        ? `Resend in ${Math.floor(cooldown / 60).toString().padStart(2, '0')}:${(cooldown % 60).toString().padStart(2, '0')}` 
                        : 'Resend Code'}
                  </button>
                </p>
              </div>
            </motion.form>
          ) : (
            <motion.form 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSetPassword} 
              className="space-y-5"
            >
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-slate-600 tracking-wide pl-1">NEW PASSWORD</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-2xl py-4 pl-12 pr-12 text-slate-800 bg-slate-50/50 hover:bg-slate-50 placeholder:text-slate-300 font-bold text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all border border-slate-200 shadow-sm"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {/* Real-time validation checklist */}
                <div className="pt-1.5 px-1 grid grid-cols-2 gap-y-1.5 gap-x-2">
                  <ValidationItem isValid={passwordValidations.length} text="8-64 characters" />
                  <ValidationItem isValid={passwordValidations.uppercase} text="1 uppercase letter" />
                  <ValidationItem isValid={passwordValidations.number} text="1 number" />
                  <ValidationItem isValid={passwordValidations.special} text="1 special character" />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-[13px] font-bold text-slate-600 tracking-wide pl-1">CONFIRM PASSWORD</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-2xl py-4 pl-12 pr-12 text-slate-800 bg-slate-50/50 hover:bg-slate-50 placeholder:text-slate-300 font-bold text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all border border-slate-200 shadow-sm"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[15px] tracking-wide transition-all transform hover:-translate-y-1 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] active:scale-[0.98] disabled:opacity-60 disabled:hover:translate-y-0 flex justify-center items-center gap-2"
                >
                  {loading ? 'Securing Account...' : 'Set Password & Login'}
                </button>
              </div>
            </motion.form>
          )}

          <div className="text-center mt-8">
            <Link to="/login" className="text-[13px] font-bold text-slate-400 hover:text-primary transition-colors">
              Return to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AcceptInvite;
