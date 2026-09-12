import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Feather from 'react-feather';
import { useEnquiryStore } from '../../../store/store';

const CircuitBg = () => (
  <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-secondary/8 to-[#8CC63F]/5 blur-[130px]"/>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/8 to-secondary/5 blur-[130px]"/>
    <svg className="w-full h-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ev-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.9"/>
        </linearGradient>
        <filter id="ev-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect x="3%" y="6%" width="80" height="80" rx="7" stroke="url(#ev-g)" strokeWidth="2" fill="none"/>
      <circle cx="50%" cy="48%" r="260" stroke="var(--color-secondary)" strokeWidth="1.2" strokeDasharray="10,8" fill="none"/>
      <circle cx="50%" cy="48%" r="340" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="14,12" fill="none"/>
      <path d="M -80 300 L 340 300 L 420 380 L 700 380 L 780 460 L 1600 460" stroke="var(--color-secondary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 260 0 L 260 180 L 340 260 L 580 260 L 640 320 L 640 1100" stroke="#E67E22" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle r="4" fill="var(--color-secondary)" filter="url(#ev-glow)">
        <animateMotion dur="9s" repeatCount="indefinite" path="M -80 300 L 340 300 L 420 380 L 700 380 L 780 460 L 1600 460"/>
      </circle>
      <circle cx="340" cy="300" r="5" fill="var(--color-secondary)"/>
      <path d="M 36 36 H 100 M 36 36 V 100" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 1564 36 H 1500 M 1564 36 V 100" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 36 1064 H 100 M 36 1064 V 1000" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 1564 1064 H 1500 M 1564 1064 V 1000" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  </div>
);

const STATUS_CONFIG = {
  Open:   { color:'var(--color-secondary)', bg:'rgba(52,152,219,0.12)'  },
  Hot:    { color:'#E74C3C', bg:'rgba(231,76,60,0.12)'   },
  Warm:   { color:'#E67E22', bg:'rgba(230,126,34,0.12)'  },
  Cold:   { color:'#9B59B6', bg:'rgba(155,89,182,0.12)'  },
  Closed: { color:'#6B7280', bg:'rgba(107,114,128,0.12)' },
  Converted: { color: 'var(--color-primary)', bg: 'rgba(49,151,96,0.12)' },
};

const avatarColors = [
  ['var(--color-primary)','#8CC63F'],['var(--color-secondary)','#2980B9'],['#E67E22','#D35400'],
  ['#9B59B6','#8E44AD'],['#1ABC9C','#16A085'],['#E74C3C','#C0392B'],
];

const readFieldCls =
  'w-full h-11 px-4 rounded-xl text-[13px] font-medium text-gray-600 dark:text-gray-300 ' +
  'bg-gray-50/80 dark:bg-slate-700/40 border border-gray-200/50 dark:border-slate-600/30 ' +
  'flex items-center';

const labelCls = 'block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.16em] mb-1.5';

const EnquiryView = () => {
  const navigate = useNavigate();
  const { id }   = useParams();
  
  const { enquires, fetchEnquires } = useEnquiryStore();

  useEffect(() => {
    fetchEnquires();
  }, []);

  const enq = enquires.find(e => String(e.id) === String(id));

  if (!enq) return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Feather.AlertCircle className="w-12 h-12 text-gray-300"/>
      <p className="font-bold text-gray-500">Enquiry not found</p>
      <button onClick={() => navigate('/admin/enquiry')}
        className="px-5 py-2 rounded-xl text-sm font-bold text-white"
        style={{ background:'linear-gradient(135deg,var(--color-secondary),var(--color-primary))' }}>
        Back to Enquiry
      </button>
    </div>
  );

  const currentStatus = (enq.followups && enq.followups.length > 0) ? enq.followups[0].status : (enq.status || 'Open');
  const currentFollowupDate = (enq.followups && enq.followups.length > 0) ? enq.followups[0].followupdate : (enq.current_followup_date || enq.followupDate || '—');
  const currentRemarks = (enq.followups && enq.followups.length > 0) ? enq.followups[0].remarks : (enq.remarks || '—');

  const [af, at] = avatarColors[(enq.id - 1) % avatarColors.length];
  const sc = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.Open;

  return (
    <div className="relative space-y-6 min-h-screen pb-10">
      <CircuitBg />
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15"/>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Enquiry Details</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <button onClick={() => navigate('/admin/dashboard')} className="text-[12px] font-medium text-gray-400 hover:text-secondary transition-colors">CRM</button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300"/>
            <button onClick={() => navigate('/admin/enquiry')} className="text-[12px] font-medium text-gray-400 hover:text-secondary transition-colors">Enquiry</button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300"/>
            <span className="text-[12px] font-bold text-secondary">View</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/admin/enquiry/edit/${enq.id}`)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white
                       transition-all hover:-translate-y-0.5"
            style={{ background:'linear-gradient(135deg,var(--color-primary),var(--color-secondary))', boxShadow:'0 4px 14px rgba(49,151,96,0.25)' }}>
            <Feather.Edit2 className="w-4 h-4"/> Edit
          </button>
          <button onClick={() => navigate('/admin/enquiry')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold
                       text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm
                       border border-gray-200/60 hover:border-secondary/40 hover:text-secondary
                       shadow-sm transition-all duration-200">
            <Feather.ArrowLeft className="w-4 h-4"/> Back
          </button>
        </div>
      </div>

      <motion.div className="relative z-10"
        initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.4 }}>

        <div className="rounded-2xl overflow-hidden bg-white/75 dark:bg-slate-800/65
                        backdrop-blur-2xl border border-white/80 dark:border-white/15"
             style={{ boxShadow:'0 8px 40px rgba(52,152,219,0.10)' }}>

          <div className="h-[3px] w-full"
               style={{ background:'linear-gradient(90deg, var(--color-secondary), var(--color-primary), #8CC63F)' }}/>

          <div className="p-6 lg:p-8 space-y-6">

            {/* Row 1: Customer avatar + meta */}
            <div className="flex items-center gap-5 pb-5 border-b border-gray-100/60 dark:border-slate-700/40">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center
                              text-white text-xl font-black shrink-0 shadow-lg"
                   style={{ background:`linear-gradient(135deg, ${af}, ${at})` }}>
                {enq.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-black text-gray-800 dark:text-white">{enq.name}</h2>
                <p className="text-[13px] text-gray-500 mt-0.5">{enq.email}</p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.12em]"
                      style={{ background:sc.bg, color:sc.color }}>
                  {currentStatus}
                </span>
              </div>
            </div>

            {/* Row 2: Name | Email | Phone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className={labelCls}>Customer Name</label>
                <div className={readFieldCls}>{enq.name}</div>
              </div>
              <div>
                <label className={labelCls}>Email Address</label>
                <div className={readFieldCls}>{enq.email}</div>
              </div>
              <div>
                <label className={labelCls}>Phone</label>
                <div className={readFieldCls}>{enq.phone || '—'}</div>
              </div>
            </div>

            {/* Row 3: Subject & Lead Source */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Subject</label>
                <div className={readFieldCls}>{enq.subject}</div>
              </div>
              <div>
                <label className={labelCls}>Lead Source</label>
                <div className={readFieldCls}>{enq.lead_source || enq.source || '—'}</div>
              </div>
            </div>
    
            {/* Row 4: Message */}
            <div>
              <label className={labelCls}>Message</label>
              <div className="w-full px-4 py-3 rounded-xl text-[13px] font-medium
                              text-gray-600 dark:text-gray-300 leading-relaxed
                              bg-gray-50/80 dark:bg-slate-700/40
                              border border-gray-200/50 dark:border-slate-600/30
                              min-h-[100px]">
                {enq.message}
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200/60 dark:border-slate-600/40"/>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]
                                 bg-white dark:bg-slate-800">
                  Follow-up Info
                </span>
              </div>
            </div>

            {/* Row 5: Followup Date | Enquiry ID | Created Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className={labelCls}>Followup Date</label>
                <div className="flex items-center gap-2 h-11 px-4 rounded-xl text-[13px] font-medium
                                text-gray-600 dark:text-gray-300
                                bg-gray-50/80 dark:bg-slate-700/40
                                border border-gray-200/50 dark:border-slate-600/30">
                  <Feather.Clock className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                  {currentFollowupDate}
                </div>
              </div>
              <div>
                <label className={labelCls}>Created Date</label>
                <div className="flex items-center gap-2 h-11 px-4 rounded-xl text-[13px] font-medium
                                text-gray-600 dark:text-gray-300
                                bg-gray-50/80 dark:bg-slate-700/40
                                border border-gray-200/50 dark:border-slate-600/30">
                  <Feather.Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                  {enq.createdDate || enq.created_at || enq.createdAt || '—'}
                </div>
              </div>
              <div>
                <label className={labelCls}>Enquiry No</label>
                <div className="flex items-center gap-2 h-11 px-4 rounded-xl text-[13px] font-medium
                                text-gray-600 dark:text-gray-300
                                bg-gray-50/80 dark:bg-slate-700/40
                                border border-gray-200/50 dark:border-slate-600/30">
                  <Feather.Hash className="w-3.5 h-3.5 text-gray-400 shrink-0"/>
                  {enq.enquiry_no || `#ENQ-${String(enq.id).padStart(4,'0')}`}
                </div>
              </div>
            </div>

            {/* Row 6: Followup Status | Remarks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Followup Status</label>
                <div className="flex items-center gap-2 h-11 px-4 rounded-xl text-[13px] font-medium
                                text-gray-600 dark:text-gray-300
                                bg-gray-50/80 dark:bg-slate-700/40
                                border border-gray-200/50 dark:border-slate-600/30">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: sc.color }}/>
                  {currentStatus}
                </div>
              </div>
              <div>
                <label className={labelCls}>Remarks</label>
                <div className={readFieldCls}>
                  {currentRemarks}
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnquiryView;
