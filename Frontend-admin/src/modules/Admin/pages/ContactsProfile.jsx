import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Feather from 'react-feather';

/* ─── animation presets ──────────────────────────────────────────────── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
});

const TABS = [
  { key: 'about',       label: 'About Me',           icon: Feather.User    },
  { key: 'security',    label: 'Account & Security',  icon: Feather.Lock    },
  { key: 'preferences', label: 'Preferences',         icon: Feather.Sliders },
  { key: 'activity',    label: 'Activity Log',         icon: Feather.Clock   },
];

/* ─────────────────────────────────────────────────────────────────────── */
const ContactsProfile = () => {
  const [activeTab, setActiveTab]   = useState('about');
  const [editAbout, setEditAbout]   = useState(false);
  const [aboutText, setAboutText]   = useState(
    'Experienced developer and administrator with a passion for creating powerful digital solutions. I focus on building user-friendly applications and optimizing workflows to help businesses grow efficiently.'
  );

  /* read logged-in user from localStorage */
  const authUser = React.useMemo(() => {
    try { return JSON.parse(localStorage.getItem('authUser') || '{}'); }
    catch { return {}; }
  }, []);

  const userName     = authUser.name       || authUser.username || 'Developer Super Admin';
  const userEmail    = authUser.email      || 'super_admin@ahattrickz.com';
  const userRole     = authUser.role       || authUser.user_type || 'Super Admin';
  const userLocation = authUser.location   || authUser.country  || 'India, New Delhi';
  const joinedDate   = authUser.created_at ? new Date(authUser.created_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }) : 'Jan 15, 2024';
  const userPhone    = authUser.phone      || '+91 98765 43210';
  const userLang     = authUser.language   || 'English';
  const userTZ       = authUser.timezone   || '(GMT +05:30) Asia/Kolkata';

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.07 } } }}
      className="space-y-6 pb-10"
    >

      {/* ── Page header row ── */}
      <motion.div {...fade(0)} className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-black text-gray-800">My Profile</h4>
          <nav className="flex items-center gap-1.5 mt-1 text-sm">
            <Link to="/admin/dashboard" className="text-gray-400 hover:text-primary transition-colors font-medium">
              Dashboard
            </Link>
            <Feather.ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>Profile</span>
          </nav>
        </div>
        <motion.button
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 h-10 px-4 rounded-xl text-[13px] font-bold border-2 transition-all"
          style={{ borderColor: '#5156be', color: '#5156be' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#5156be'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5156be'; }}
        >
          <Feather.Edit2 className="w-3.5 h-3.5" />
          Edit Profile
        </motion.button>
      </motion.div>

      {/* ── Banner Card ── */}
      <motion.div
        {...fade(0.05)}
        className="relative rounded-2xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1f2f 0%, #2a3042 55%, #3a3e96 100%)' }}
      >
        {/* decorative leaf/curves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute right-0 top-0 h-full w-72 opacity-10" viewBox="0 0 288 320" fill="none">
            <path d="M288 0 Q200 160 288 320" stroke="white" strokeWidth="1.5" fill="none" />
            <path d="M260 0 Q140 160 220 320" stroke="white" strokeWidth="1" fill="none" />
            <path d="M230 0 Q80 160 150 320" stroke="white" strokeWidth="0.8" fill="none" opacity="0.6" />
            <ellipse cx="260" cy="200" rx="80" ry="140" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
          </svg>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full"
            style={{ background: 'rgba(49,151,96,0.12)' }} />
          <div className="absolute top-4 left-1/2 w-32 h-32 rounded-full"
            style={{ background: 'rgba(52,152,219,0.08)' }} />
        </div>

        <div className="relative p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Left: avatar + info */}
          <div className="flex items-center gap-6">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.12 }}
              className="relative shrink-0"
            >
              {/* Avatar ring — logo primary color */}
              <div className="w-24 h-24 rounded-full p-[3px]"
                style={{ background: 'linear-gradient(135deg, #5156be, var(--color-primary))' }}>
                <img
                  src="/assets/images/users/avatar-1.jpg"
                  alt={userName}
                  className="w-full h-full rounded-full object-cover border-4 border-[#1a1f2f]"
                />
              </div>
              {/* Online dot */}
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2"
                style={{ background: 'var(--color-primary)', borderColor: '#1a1f2f' }}
              />
            </motion.div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <h2 className="text-[22px] font-black text-white leading-none">{userName}</h2>
                {/* Verified badge — logo primary */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.25 }}
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: '#5156be' }}
                >
                  <Feather.Check className="w-3 h-3 text-white" strokeWidth={3} />
                </motion.div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[13px] text-white/70 font-medium">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider"
                  style={{ background: 'rgba(81,86,190,0.35)', color: '#a5a8f0' }}>
                  {userRole}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-1">
                <span className="flex items-center gap-1.5 text-[12px] text-white/60">
                  <Feather.Mail className="w-3.5 h-3.5" style={{ color: 'var(--color-secondary)' }} />
                  {userEmail}
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-white/60">
                  <Feather.MapPin className="w-3.5 h-3.5" style={{ color: 'var(--color-primary)' }} />
                  {userLocation}
                </span>
                <span className="flex items-center gap-1.5 text-[12px] text-white/60">
                  <Feather.Calendar className="w-3.5 h-3.5" style={{ color: '#E67E22' }} />
                  Joined on {joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Right: quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="hidden sm:block max-w-xs text-right"
          >
            <svg className="w-8 h-8 ml-auto mb-2 opacity-30" viewBox="0 0 32 32" fill="white">
              <path d="M10 8H4v8h6v8H4v-8a8 8 0 018-8zm14 0h-6v8h6v8h-6v-8a8 8 0 018-8z"/>
            </svg>
            <p className="text-[15px] font-semibold text-white/80 leading-relaxed italic">
              Building solutions that drive<br />business growth and success.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Tabs ── */}
      <motion.div {...fade(0.12)}>
        <div className="flex items-center gap-1 border-b border-gray-200 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex items-center gap-2 px-5 py-3.5 text-[13px] font-bold whitespace-nowrap transition-colors
                  ${isActive ? 'text-[#5156be]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="profile-tab-bar"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: 'linear-gradient(90deg, #5156be, var(--color-primary))' }}
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
          {activeTab === 'about' && (
            <AboutTab
              userName={userName} userEmail={userEmail} userPhone={userPhone}
              userLocation={userLocation} userLang={userLang} userTZ={userTZ}
              aboutText={aboutText} setAboutText={setAboutText}
              editAbout={editAbout} setEditAbout={setEditAbout}
            />
          )}
          {activeTab === 'security'    && <SecurityTab />}
          {activeTab === 'preferences' && <PreferencesTab />}
          {activeTab === 'activity'    && <ActivityLogTab />}
        </motion.div>
      </AnimatePresence>

    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   ABOUT ME TAB
═══════════════════════════════════════════════════════════════════════ */
const AboutTab = ({ userName, userEmail, userPhone, userLocation, userLang, userTZ, aboutText, setAboutText, editAbout, setEditAbout }) => {
  const fields = [
    { icon: Feather.User,       label: 'Full Name',     value: userName,     color: '#5156be' },
    { icon: Feather.Mail,       label: 'Email Address', value: userEmail,    color: 'var(--color-secondary)' },
    { icon: Feather.Phone,      label: 'Phone Number',  value: userPhone,    color: 'var(--color-primary)' },
    { icon: Feather.MapPin,     label: 'Location',      value: userLocation, color: '#E67E22' },
    { icon: Feather.Globe,      label: 'Language',      value: userLang,     color: 'var(--color-secondary)' },
    { icon: Feather.Clock,      label: 'Timezone',      value: userTZ,       color: '#9B59B6' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

      {/* Personal Info */}
      <motion.div
        className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: [0.22,1,0.36,1] }}
      >
        <div className="p-5 border-b border-gray-100">
          <h5 className="text-[15px] font-black text-gray-800">Personal Information</h5>
        </div>
        <div className="p-2">
          {fields.map((f, i) => (
            <InfoRow key={f.label} {...f} delay={i * 0.05} />
          ))}
        </div>
      </motion.div>

      {/* Right column */}
      <div className="lg:col-span-5 space-y-5">

        {/* About Me */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-5"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22,1,0.36,1] }}
        >
          <h5 className="text-[15px] font-black text-gray-800 mb-3">About Me</h5>
          {editAbout ? (
            <div className="space-y-3">
              <textarea
                value={aboutText}
                onChange={e => setAboutText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 text-[13px] text-gray-700 rounded-xl resize-none
                           border border-gray-200 focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': 'rgba(81,86,190,0.25)' }}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setEditAbout(false)}
                  className="flex-1 h-9 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', boxShadow: '0 4px 12px rgba(49,151,96,0.30)' }}>
                  Save
                </button>
                <button
                  onClick={() => setEditAbout(false)}
                  className="h-9 px-4 rounded-xl text-[13px] font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-[13px] text-gray-500 leading-relaxed mb-4">{aboutText}</p>
              <button
                onClick={() => setEditAbout(true)}
                className="h-8 px-4 rounded-lg text-[12px] font-bold border transition-all hover:-translate-y-0.5"
                style={{ borderColor: '#5156be', color: '#5156be' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#5156be'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5156be'; }}
              >
                Edit About
              </button>
            </>
          )}
        </motion.div>

        {/* Social Profiles */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-5"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.18, ease: [0.22,1,0.36,1] }}
        >
          <h5 className="text-[15px] font-black text-gray-800 mb-4">Social Profiles</h5>
          <div className="flex items-center gap-3">
            {[
              { icon: Feather.Linkedin, color: '#0A66C2', label: 'LinkedIn' },
              { icon: Feather.Twitter,  color: '#1DA1F2', label: 'Twitter'  },
              { icon: Feather.GitHub,   color: '#24292e', label: 'GitHub'   },
              { icon: Feather.Globe,    color: 'var(--color-primary)', label: 'Website'  },
            ].map(({ icon: Icon, color, label }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.92 }}
                title={label}
                className="w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-200"
                style={{ borderColor: `${color}30`, background: `${color}0d` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = `${color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${color}30`; e.currentTarget.style.background = `${color}0d`; }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Account Status */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-5"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.26, ease: [0.22,1,0.36,1] }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(49,151,96,0.12)' }}
              >
                <Feather.Shield className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
              </motion.div>
              <div>
                <p className="text-[14px] font-black text-gray-800">Account Status</p>
                <p className="text-[12px] text-gray-400 mt-0.5">Your account is secure and all systems are running smoothly.</p>
              </div>
            </div>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 16, delay: 0.4 }}
              className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider"
              style={{ background: 'rgba(49,151,96,0.14)', color: 'var(--color-primary)' }}
            >
              Active
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ── Info row with animated hover ────────────────────────────────────── */
const InfoRow = ({ icon: Icon, label, value, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.35, ease: 'easeOut' }}
    className="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group cursor-pointer"
    onMouseEnter={e => {
      e.currentTarget.style.background = `${color}08`;
      e.currentTarget.style.boxShadow = `inset 3px 0 0 ${color}`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = '';
      e.currentTarget.style.boxShadow = '';
    }}
  >
    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
      style={{ background: `${color}14` }}>
      <Icon className="w-4 h-4" style={{ color }} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[11px] font-black uppercase tracking-[0.14em] text-gray-400 leading-none mb-0.5">{label}</p>
      <p className="text-[13px] font-semibold text-gray-700 truncate">{value}</p>
    </div>
    <button className="w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
      style={{ background: `${color}14`, color }}>
      <Feather.Edit2 className="w-3 h-3" />
    </button>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════════════
   SECURITY TAB
═══════════════════════════════════════════════════════════════════════ */
const SecurityTab = () => {
  const items = [
    { icon: Feather.Key,         label: 'Password',           sub: 'Last changed 3 months ago',          action: 'Change', color: '#5156be' },
    { icon: Feather.Smartphone,  label: 'Two-Factor Auth',    sub: 'Adds extra security to your account', action: 'Enable', color: 'var(--color-primary)' },
    { icon: Feather.Monitor,     label: 'Active Sessions',    sub: '2 active sessions',                   action: 'Manage', color: 'var(--color-secondary)' },
    { icon: Feather.AlertCircle, label: 'Login Alerts',       sub: 'Get notified of new sign-ins',        action: 'Setup',  color: '#E67E22' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <div className="p-5 border-b border-gray-100">
          <h5 className="text-[15px] font-black text-gray-800">Security Settings</h5>
        </div>
        <div className="p-2">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.label}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group cursor-pointer"
                onMouseEnter={e => { e.currentTarget.style.background = `${item.color}08`; e.currentTarget.style.boxShadow = `inset 3px 0 0 ${item.color}`; }}
                onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: `${item.color}14` }}>
                  <Icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-gray-800">{item.label}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{item.sub}</p>
                </div>
                <button className="h-8 px-3 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all hover:-translate-y-0.5"
                  style={{ background: `${item.color}14`, color: item.color }}>
                  {item.action}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="lg:col-span-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(49,151,96,0.12)' }}>
              <Feather.ShieldOff className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <p className="text-[14px] font-black text-gray-800">Security Score</p>
              <p className="text-[11px] text-gray-400">Your account is well-protected</p>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }}
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ duration: 1.2, ease: [0.22,1,0.36,1], delay: 0.3 }}
            />
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[11px] text-gray-400 font-medium">Score</span>
            <span className="text-[13px] font-black" style={{ color: 'var(--color-primary)' }}>72 / 100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   PREFERENCES TAB
═══════════════════════════════════════════════════════════════════════ */
const PreferencesTab = () => {
  const [prefs, setPrefs] = useState({
    emailNotif: true,
    smsNotif: false,
    browserNotif: true,
    leadAlerts: true,
    enquiryAlerts: true,
    reportEmail: false,
  });
  const toggle = key => setPrefs(p => ({ ...p, [key]: !p[key] }));

  const prefItems = [
    { key: 'emailNotif',    label: 'Email Notifications',        sub: 'Receive updates via email',             color: 'var(--color-secondary)' },
    { key: 'smsNotif',      label: 'SMS Notifications',          sub: 'Receive alerts on mobile',              color: 'var(--color-primary)' },
    { key: 'browserNotif',  label: 'Browser Notifications',      sub: 'Push alerts in browser',                color: '#5156be' },
    { key: 'leadAlerts',    label: 'Lead Alerts',                 sub: 'Notify when a lead is assigned',        color: '#E67E22' },
    { key: 'enquiryAlerts', label: 'Enquiry Alerts',              sub: 'Notify on new enquiry submissions',     color: 'var(--color-secondary)' },
    { key: 'reportEmail',   label: 'Weekly Report Email',         sub: 'Summary report every Monday',          color: 'var(--color-primary)' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      <div className="p-5 border-b border-gray-100">
        <h5 className="text-[15px] font-black text-gray-800">Notification Preferences</h5>
      </div>
      <div className="p-2">
        {prefItems.map((item, i) => (
          <motion.div key={item.key}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group"
            onMouseEnter={e => { e.currentTarget.style.background = `${item.color}06`; }}
            onMouseLeave={e => { e.currentTarget.style.background = ''; }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}14` }}>
              <Feather.Bell className="w-4 h-4" style={{ color: item.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-gray-800">{item.label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{item.sub}</p>
            </div>
            {/* Toggle */}
            <motion.button
              onClick={() => toggle(item.key)}
              className="relative w-11 h-6 rounded-full transition-all duration-300 shrink-0"
              style={{ background: prefs[item.key] ? item.color : '#e5e7eb' }}
            >
              <motion.div
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm"
                animate={{ left: prefs[item.key] ? '22px' : '2px' }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   ACTIVITY LOG TAB
═══════════════════════════════════════════════════════════════════════ */
const ActivityLogTab = () => {
  const logs = [
    { icon: Feather.LogIn,         text: 'Logged in from Chrome — Mumbai, India',   time: '2 hours ago',  color: 'var(--color-primary)' },
    { icon: Feather.Edit2,         text: 'Updated enquiry #ENQ-2024-042',            time: '5 hours ago',  color: 'var(--color-secondary)' },
    { icon: Feather.UserPlus,      text: 'Added new contact: Rahul Sharma',          time: 'Yesterday',    color: '#5156be' },
    { icon: Feather.RefreshCw,     text: 'Converted enquiry to lead',                time: '2 days ago',   color: 'var(--color-primary)' },
    { icon: Feather.Trash2,        text: 'Deleted draft blog post',                  time: '3 days ago',   color: '#E74C3C' },
    { icon: Feather.Mail,          text: 'Sent follow-up email to Priya Mehta',      time: '4 days ago',   color: '#E67E22' },
    { icon: Feather.Settings,      text: 'Changed notification preferences',         time: '1 week ago',   color: '#9B59B6' },
    { icon: Feather.Key,           text: 'Password changed successfully',            time: '2 weeks ago',  color: 'var(--color-primary)' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      <div className="p-5 border-b border-gray-100">
        <h5 className="text-[15px] font-black text-gray-800">Recent Activity</h5>
      </div>
      <div className="p-2">
        {logs.map((log, i) => {
          const Icon = log.icon;
          return (
            <motion.div key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group cursor-pointer"
              onMouseEnter={e => { e.currentTarget.style.background = `${log.color}08`; e.currentTarget.style.boxShadow = `inset 3px 0 0 ${log.color}`; }}
              onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform"
                style={{ background: `${log.color}14` }}>
                <Icon className="w-4 h-4" style={{ color: log.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-700 leading-snug">{log.text}</p>
                <span className="text-[11px] font-medium text-gray-400 flex items-center gap-1 mt-0.5">
                  <Feather.Clock className="w-3 h-3" />{log.time}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactsProfile;
