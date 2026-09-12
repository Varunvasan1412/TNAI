import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Feather from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import ModuleSelectionHeader from '../../components/Layout/ModuleSelectionHeader';
import CircuitBg from '../../components/ui/CircuitBg';
import { getCompanyProfile, updateCompanyProfile } from '../../api/companyApi';
import toast from 'react-hot-toast';
import { useCompany } from '../../context/CompanyContext';
import Spinner from '../../components/ui/Spinner';

/* ─── animation presets ──────────────────────────────────────────────── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
});

const TABS = [
  { key: 'general', label: 'General Details', icon: Feather.Info },
  { key: 'branding', label: 'Branding & Theme', icon: Feather.Layout },
  { key: 'email', label: 'Email Settings', icon: Feather.Mail },
  { key: 'others', label: 'Advanced & Others', icon: Feather.Settings },
];

const getImageUrl = (path, defaultPath) => {
  if (!path) return defaultPath;
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('/assets')) {
    return path;
  }
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'https://crm.rsistore.in';
  return `${baseUrl}/${path.replace(/^\//, '')}`;
};

const CompanyProfile = () => {
  const { refetchCompanyData } = useCompany();
  const [activeTab, setActiveTab] = useState('general');
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Lifted state for all form fields
  const [formData, setFormData] = useState({
    company_name: '',
    contact_email: '',
    phone_number: '',
    company_address: '',
    primary_color: '#319760',
    secondary_color: '#3498DB',
    smtp_sender_name: '',
    smtp_email_address: '',
    smtp_password: '',
    timezone: 'Asia/Kolkata',
    linkedin_url: '',
    twitter_url: '',
    facebook_url: '',
    main_logo: null,
    favicon: null,
    logo_url: '/assets/images/logo.jpg',
    favicon_url: '/assets/images/favicon1.svg'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const data = await getCompanyProfile();
        const comp = data?.data || data || null;
        setCompany(comp);
        if (comp) {
          setFormData({
            company_name: comp.name || comp.company_name || 'Ahattrickz India Pvt. Ltd.',
            contact_email: comp.email || comp.contact_email || 'contact@ahattrickz.com',
            phone_number: comp.phone || comp.phone_number || '+91 98765 43210',
            company_address: comp.address || comp.company_address || '123 Business Avenue, Tech Park, New Delhi, India',
            primary_color: comp.primary_color || '#319760',
            secondary_color: comp.secondary_color || '#3498DB',
            smtp_sender_name: comp.smtp_sender_name || 'Ahattrickz Support',
            smtp_email_address: comp.smtp_email_address || 'noreply@ahattrickz.com',
            smtp_password: comp.smtp_password || 'secret_api_key_123',
            timezone: comp.timezone || 'Asia/Kolkata',
            linkedin_url: comp.linkedin_url || '',
            twitter_url: comp.twitter_url || '',
            facebook_url: comp.facebook_url || '',
            main_logo: null,
            favicon: null,
            logo_url: getImageUrl(comp.main_logo || comp.logo || '/assets/images/logo.jpg'),
            favicon_url: getImageUrl(comp.favicon || '/assets/images/favicon.png')
          });
        }
      } catch (error) {
        console.error("Failed to fetch company profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        // Skip null/undefined/empty strings, and skip our temporary preview URLs
        if (value !== null && value !== undefined && value !== '' && key !== 'logo_url' && key !== 'favicon_url') {
          payload.append(key, value);
        }
      });

      await updateCompanyProfile(payload);
      toast.success('Company profile updated successfully!');

      // Reload the page to ensure all contexts and UI elements fully reflect the new data
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Failed to update company profile:", error.response?.data || error);
      const errorData = error.response?.data;
      if (errorData?.errors) {
        const errorMessages = Object.values(errorData.errors).flat().join('\n');
        toast.error(`Validation Error:\n${errorMessages}`);
      } else {
        toast.error(errorData?.message || 'Failed to update company profile.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#EBF5FB] via-[#E8F8F5] to-[#FEF9E7]">
        <Spinner size="xl" variant="primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative font-sans overflow-x-hidden
                    bg-gradient-to-br from-[#EBF5FB] via-[#E8F8F5] to-[#FEF9E7]">

      {/* Circuit schematic background */}
      <CircuitBg />

      {/* Ambient glow blobs */}
      <div className="fixed -top-16 left-10 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/10 to-[#8CC63F]/10 blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-secondary/10 to-primary/8 blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[40%] left-[35%] w-[400px] h-[400px] rounded-full bg-[#E67E22]/5 blur-[130px] pointer-events-none z-0" />

      {/* Header */}
      <ModuleSelectionHeader />

      {/* Main Content */}
      <main className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="space-y-6 max-w-[1200px] mx-auto"
        >
          {/* ── Page header row ── */}
          <motion.div {...fade(0)} className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-2xl font-black text-gray-800 tracking-tight">Company Profile</h4>
              <nav className="flex items-center gap-1.5 mt-1.5 text-[13px]">
                <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-primary transition-colors font-medium">
                  Back
                </button>
                <Feather.ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>Settings</span>
              </nav>
            </div>
            <motion.button
              onClick={handleSubmit}
              disabled={saving}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 h-11 px-5 rounded-xl text-[14px] font-bold text-white transition-all shadow-[0_4px_14px_rgba(49,151,96,0.28)] hover:shadow-[0_6px_20px_rgba(49,151,96,0.35)] ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}
            >
              {saving ? <Feather.Loader className="w-4 h-4 animate-spin" /> : <Feather.Save className="w-4 h-4" />}
              {saving ? 'Saving...' : 'Save Changes'}
            </motion.button>
          </motion.div>

          {/* ── Tabs ── */}
          <motion.div {...fade(0.05)}>
            <div className="flex items-center gap-1 border-b border-gray-200 dark:border-slate-700 overflow-x-auto no-scrollbar pb-[1px]">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative flex items-center gap-2 px-5 py-3.5 text-[13px] font-bold whitespace-nowrap transition-colors
                  ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="company-profile-tab-bar"
                        className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full"
                        style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ── Tab content ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {activeTab === 'general' && <GeneralTab formData={formData} onChange={handleChange} />}
              {activeTab === 'branding' && <BrandingTab formData={formData} onChange={handleChange} />}
              {activeTab === 'email' && <EmailTab formData={formData} onChange={handleChange} />}
              {activeTab === 'others' && <OthersTab formData={formData} onChange={handleChange} />}
            </motion.div>
          </AnimatePresence>

          {/* ── Banner (Moved to bottom) ── */}
          <motion.div
            {...fade(0.12)}
            className="relative rounded-2xl overflow-hidden p-6 sm:p-8 border border-white/20 mt-4"
            style={{ background: 'linear-gradient(135deg, #1a1f2f 0%, #2a3042 55%, #3a3e96 100%)' }}
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
              <svg className="absolute right-0 top-0 h-full w-96" viewBox="0 0 288 320" fill="none">
                <path d="M288 0 Q200 160 288 320" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M260 0 Q140 160 220 320" stroke="white" strokeWidth="1" fill="none" />
              </svg>
              <div className="absolute top-0 right-10 w-64 h-64 rounded-full bg-primary blur-[100px] opacity-20" />
              <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-secondary blur-[100px] opacity-20" />
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-2xl p-2 flex items-center justify-center shadow-2xl shrink-0 overflow-hidden">
                <img 
                  src={formData.logo_url || "/assets/images/logo.jpg"} 
                  alt="Company Logo" 
                  className="w-full h-auto object-contain" 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/logo.jpg'; }}
                />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">White Label Settings</h2>
                <p className="text-white/70 font-medium text-[13px] mt-1 max-w-xl leading-relaxed">
                  Customize your platform's appearance, company details, and branding. These settings apply globally and overwrite the default theme.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   GENERAL TAB
═══════════════════════════════════════════════════════════════════════ */
const GeneralTab = ({ formData, onChange }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex items-center gap-3 bg-gray-50/50 dark:bg-slate-800/50">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Feather.Info className="w-4 h-4 text-primary" />
          </div>
          <h5 className="text-[15px] font-black text-gray-800 dark:text-white">General Details</h5>
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField name="company_name" label="Company Name" placeholder="Ahattrickz India" value={formData.company_name} onChange={onChange} />
            <InputField name="contact_email" label="Contact Email" type="email" placeholder="info@company.com" value={formData.contact_email} onChange={onChange} />
            <InputField name="phone_number" label="Phone Number" placeholder="+1 234 567 8900" value={formData.phone_number} onChange={onChange} />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Company Address</label>
            <textarea name="company_address" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none" value={formData.company_address} onChange={onChange} />
          </div>
        </div>
      </div>
      <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6">
        <h5 className="text-[15px] font-black text-gray-800 dark:text-white mb-4">Quick Preview</h5>
        <div className="p-4 rounded-xl border border-gray-100 dark:border-slate-600 bg-gray-50 dark:bg-slate-900">
          <p className="text-[12px] text-gray-400 font-bold uppercase tracking-wider mb-1">Generated Invoice Header</p>
          <h4 className="text-lg font-bold text-gray-800 dark:text-white">{formData.company_name}</h4>
          <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
            {formData.company_address}<br />
            {formData.contact_email}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   BRANDING TAB
═══════════════════════════════════════════════════════════════════════ */
import { useRef } from 'react';

const BrandingTab = ({ formData, onChange }) => {
  const [logoPreview, setLogoPreview] = useState(formData.logo_url || '/assets/images/logo.jpg');
  const [faviconPreview, setFaviconPreview] = useState(formData.favicon_url || '/assets/images/favicon.png');

  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

  const handleFileChange = (e, setPreview, name) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      if (onChange) {
        onChange({ target: { name, value: file } });
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex items-center gap-3 bg-gray-50/50 dark:bg-slate-800/50">
          <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
            <Feather.Image className="w-4 h-4 text-secondary" />
          </div>
          <h5 className="text-[15px] font-black text-gray-800 dark:text-white">Logos & Icons</h5>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-start gap-5">
            <input
              type="file"
              ref={logoInputRef}
              className="hidden"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={(e) => handleFileChange(e, setLogoPreview, 'main_logo')}
            />
            <div
              onClick={() => logoInputRef.current?.click()}
              className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-600 flex items-center justify-center bg-gray-50 dark:bg-slate-900 shrink-0 overflow-hidden group relative cursor-pointer hover:border-primary transition-colors"
            >
              <img
                src={logoPreview}
                alt=""
                className="w-16 object-contain"
                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/logo.jpg'; }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Feather.UploadCloud className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h6 className="text-[13px] font-bold text-gray-800 dark:text-white">Main Application Logo</h6>
              <p className="text-[11px] text-gray-400 mt-1 mb-3">Recommended size: 200x50px. Format: PNG, SVG with transparent background.</p>
              <button
                onClick={() => logoInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-[12px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                Upload New
              </button>


            </div>
          </div>

          <div className="flex items-start gap-5">
            <input
              type="file"
              ref={faviconInputRef}
              className="hidden"
              accept="image/png, image/x-icon"
              onChange={(e) => handleFileChange(e, setFaviconPreview, 'favicon')}
            />
            <div
              onClick={() => faviconInputRef.current?.click()}
              className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-600 flex items-center justify-center bg-gray-50 dark:bg-slate-900 shrink-0 overflow-hidden group relative cursor-pointer hover:border-secondary transition-colors"
            >
              <img
                src={faviconPreview}
                alt=""
                className="w-10 object-contain"
                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/favicon.png'; }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Feather.UploadCloud className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h6 className="text-[13px] font-bold text-gray-800 dark:text-white">Favicon (Browser Tab Icon)</h6>
              <p className="text-[11px] text-gray-400 mt-1 mb-3">Recommended size: 32x32px. Format: ICO or PNG.</p>
              <button
                onClick={() => faviconInputRef.current?.click()}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-600 text-[12px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                Upload New
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex items-center gap-3 bg-gray-50/50 dark:bg-slate-800/50">
          <div className="w-8 h-8 rounded-lg bg-[#E67E22]/10 flex items-center justify-center">
            <Feather.Droplet className="w-4 h-4 text-[#E67E22]" />
          </div>
          <h5 className="text-[15px] font-black text-gray-800 dark:text-white">Theme Colors</h5>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Primary Color</label>
              <div className="flex items-center gap-3 p-2 rounded-xl border border-gray-200 dark:border-slate-600 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
                <div className="relative w-8 h-8 rounded-lg shadow-sm overflow-hidden shrink-0 border border-black/10">
                  <input name="primary_color" type="color" className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer" value={formData.primary_color} onChange={onChange} />
                </div>
                <input name="primary_color" type="text" className="w-full bg-transparent text-sm font-bold text-gray-700 dark:text-gray-200 focus:outline-none uppercase" value={formData.primary_color.toUpperCase()} onChange={onChange} />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Secondary Color</label>
              <div className="flex items-center gap-3 p-2 rounded-xl border border-gray-200 dark:border-slate-600 focus-within:ring-2 focus-within:ring-secondary/30 transition-all">
                <div className="relative w-8 h-8 rounded-lg shadow-sm overflow-hidden shrink-0 border border-black/10">
                  <input name="secondary_color" type="color" className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer" value={formData.secondary_color} onChange={onChange} />
                </div>
                <input name="secondary_color" type="text" className="w-full bg-transparent text-sm font-bold text-gray-700 dark:text-gray-200 focus:outline-none uppercase" value={formData.secondary_color.toUpperCase()} onChange={onChange} />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-gray-100 dark:border-slate-700 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mb-3">Live Button Preview</p>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-transform hover:-translate-y-0.5" style={{ background: `linear-gradient(90deg, ${formData.primary_color}, ${formData.secondary_color})`, boxShadow: `0 4px 12px ${formData.primary_color}40` }}>Primary Action</button>
              <button className="px-5 py-2.5 rounded-lg text-sm font-bold transition-colors border" style={{ color: formData.primary_color, background: `${formData.primary_color}1a`, borderColor: `${formData.primary_color}33` }}>Secondary Action</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   EMAIL TAB
═══════════════════════════════════════════════════════════════════════ */
const EmailTab = ({ formData, onChange }) => (
  <div className="max-w-4xl bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
    <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between bg-gray-50/50 dark:bg-slate-800/50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#9B59B6]/10 flex items-center justify-center">
          <Feather.Send className="w-4 h-4 text-[#9B59B6]" />
        </div>
        <h5 className="text-[15px] font-black text-gray-800 dark:text-white">SMTP & Email Configuration</h5>
      </div>
      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-100 text-green-600">Connected</span>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <InputField name="smtp_sender_name" label="Sender Name" placeholder="e.g. Ahattrickz Support" value={formData.smtp_sender_name} onChange={onChange} />
        <InputField name="smtp_email_address" label="Email Address" type="email" placeholder="noreply@ahattrickz.com" value={formData.smtp_email_address} onChange={onChange} />
      </div>
      <div className="my-6 border-t border-gray-100 dark:border-slate-700 border-dashed"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField name="smtp_password" label="Password" type="password" placeholder="••••••••" value={formData.smtp_password} onChange={onChange} />
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════
   OTHERS TAB
═══════════════════════════════════════════════════════════════════════ */
const OthersTab = ({ formData, onChange }) => (
  <div className="max-w-4xl bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
    <div className="p-5 border-b border-gray-100 dark:border-slate-700 flex items-center gap-3 bg-gray-50/50 dark:bg-slate-800/50">
      <div className="w-8 h-8 rounded-lg bg-[#5156be]/10 flex items-center justify-center">
        <Feather.Sliders className="w-4 h-4 text-[#5156be]" />
      </div>
      <h5 className="text-[15px] font-black text-gray-800 dark:text-white">Localization & Socials</h5>
    </div>
    <div className="p-6">
      <div className="grid grid-cols-1 gap-5 mb-8">
        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Default Timezone</label>
          <select name="timezone" value={formData.timezone} onChange={onChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900/50 text-sm font-semibold text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
            <option value="Asia/Kolkata">(GMT+05:30) Asia/Kolkata</option>
            <option value="Europe/London">(GMT+00:00) Europe/London</option>
            <option value="America/New_York">(GMT-05:00) America/New_York</option>
          </select>
        </div>
      </div>

      <h6 className="text-[13px] font-bold text-gray-800 dark:text-white mb-4">Social Media Links</h6>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/10 flex items-center justify-center shrink-0"><Feather.Linkedin className="w-4 h-4 text-[#0A66C2]" /></div>
          <input name="linkedin_url" type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:border-[#0A66C2]" placeholder="LinkedIn URL" value={formData.linkedin_url} onChange={onChange} />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1DA1F2]/10 flex items-center justify-center shrink-0"><Feather.Twitter className="w-4 h-4 text-[#1DA1F2]" /></div>
          <input name="twitter_url" type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:border-[#1DA1F2]" placeholder="Twitter URL" value={formData.twitter_url} onChange={onChange} />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1877F2]/10 flex items-center justify-center shrink-0"><Feather.Facebook className="w-4 h-4 text-[#1877F2]" /></div>
          <input name="facebook_url" type="text" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:border-[#1877F2]" placeholder="Facebook URL" value={formData.facebook_url} onChange={onChange} />
        </div>
      </div>
    </div>
  </div>
);

/* ── Common Input Component ── */
const InputField = ({ label, type = "text", placeholder, value, onChange, name }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div>
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
      <div className="relative">
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900/50 text-sm font-semibold text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white dark:focus:bg-slate-800 transition-all pr-12"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {showPassword ? <Feather.EyeOff className="w-4 h-4" /> : <Feather.Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
