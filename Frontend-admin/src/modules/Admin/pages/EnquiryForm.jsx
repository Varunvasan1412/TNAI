import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Feather from 'react-feather';
import { useEnquiryStore } from '../../../store/store';

const CircuitBg = () => (
  <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-secondary/8 to-[#8CC63F]/5 blur-[130px]"/>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-primary/8 to-secondary/5 blur-[130px]"/>
    <div className="absolute top-[35%] left-[25%] w-[360px] h-[360px] rounded-full bg-[#E67E22]/4 blur-[110px]"/>
    <svg className="w-full h-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ef-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-secondary)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.9"/>
        </linearGradient>
        <filter id="ef-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect x="3%" y="6%" width="80" height="80" rx="7" stroke="url(#ef-g)" strokeWidth="2" fill="none"/>
      <rect x="88%" y="80%" width="72" height="72" rx="7" stroke="url(#ef-g)" strokeWidth="2" fill="none"/>
      <circle cx="50%" cy="45%" r="240" stroke="var(--color-secondary)" strokeWidth="1.2" strokeDasharray="10,8" fill="none"/>
      <circle cx="50%" cy="45%" r="320" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="14,12" fill="none"/>
      <circle cx="50%" cy="45%" r="400" stroke="#E67E22" strokeWidth="1" strokeDasharray="5,14" fill="none"/>
      <path d="M -80 280 L 320 280 L 400 360 L 680 360 L 760 440 L 1600 440" stroke="var(--color-secondary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 240 0 L 240 160 L 320 240 L 560 240 L 620 300 L 620 1100" stroke="#E67E22" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 1060 0 L 1060 260 L 1000 320 H 780 L 720 380 L 720 1100" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle r="4" fill="var(--color-secondary)" filter="url(#ef-glow)">
        <animateMotion dur="9s" repeatCount="indefinite" path="M -80 280 L 320 280 L 400 360 L 680 360 L 760 440 L 1600 440"/>
      </circle>
      <circle r="3.5" fill="var(--color-primary)" filter="url(#ef-glow)">
        <animateMotion dur="8s" repeatCount="indefinite" path="M 1060 0 L 1060 260 L 1000 320 H 780 L 720 380 L 720 1100"/>
      </circle>
      <circle cx="320" cy="280" r="5" fill="var(--color-secondary)"/>
      <circle cx="400" cy="360" r="5" fill="var(--color-secondary)"/>
      <path d="M 36 36 H 100 M 36 36 V 100" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 1564 36 H 1500 M 1564 36 V 100" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 36 1064 H 100 M 36 1064 V 1000" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 1564 1064 H 1500 M 1564 1064 V 1000" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  </div>
);

const getInputCls = (error) =>
  `w-full h-11 px-4 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-200 ` +
  `bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm transition-all duration-200 ` +
  (error
    ? `border border-red-400 dark:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 `
    : `border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 `) +
  `placeholder:text-gray-300`;

const disabledInputCls =
  'w-full h-11 px-4 rounded-xl text-[13px] font-medium text-gray-500 dark:text-gray-400 ' +
  'bg-gray-50/80 dark:bg-slate-700/40 backdrop-blur-sm ' +
  'border border-gray-200/50 dark:border-slate-600/30 ' +
  'cursor-not-allowed select-none';

const labelCls = 'block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.16em] mb-1.5';

const STATUS_OPTIONS = ['Open', 'Hot', 'Warm', 'Cold', 'Closed', 'Converted'];

const EnquiryForm = () => {
  const navigate = useNavigate();
  const { id }   = useParams();
  const isEdit   = Boolean(id);

  const empty = { name:'', email:'', phone:'', subject:'', message:'', followupDate:'', status:'New', remarks:'' };
  const [form,   setForm]   = useState(empty);
  const [errors, setErrors] = useState({});
  const [saved,  setSaved]  = useState(false);

  const {enquires,updateFollowup,fetchEnquires} = useEnquiryStore();

  // useEffect(() => {
  //   if (isEdit) {
  //     const enq = enquiryData.find(e => String(e.id) === String(id));
  //     if (enq) setForm({
  //       name:        enq.name         || '',
  //       email:       enq.email        || '',
  //       phone:       enq.phone        || '',
  //       subject:     enq.subject      || '',
  //       message:     enq.message      || '',
  //       followupDate:enq.followupDate || '',
  //       status:      enq.status       || 'Open',
  //       remarks:     enq.remarks      || '',
  //     });
  //   }
  // }, [id, isEdit]);

  useEffect(() => {
  fetchEnquires();
}, []);

useEffect(() => {

  if (isEdit && enquires.length > 0) {

    const enq = enquires.find(
      (e) => String(e.id) === String(id)
    );

    if (enq) {

      setForm({
        name: enq.name || "",
        email: enq.email || "",
        phone: enq.phone || "",
        subject: enq.subject || "",
        message: enq.message || "",

        followupDate: "",

        status:
          (enq.followups && enq.followups.length > 0) ? enq.followups[0].status : "Open",

        remarks: "",
      });
    }
  }

}, [id, isEdit, enquires]);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]:'' }));
  };

  const validate = () => {
    const e = {};
    if (!isEdit) {
      if (!form.name.trim()) e.name = 'Name is required';
      if (!form.email.trim()) e.email = 'Email is required';
      else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email';
      if (!form.phone.trim()) e.phone = 'Phone is required';
      else if (!/^\+?[\d\s-]{10,}$/.test(form.phone)) e.phone = 'Invalid phone number';
      if (!form.subject.trim()) e.subject = 'Subject is required';
    }
    if (!form.status) e.status = 'Status is required';
    if (!form.followupDate) e.followupDate = 'The followupdate field is required.';
    if (!form.remarks?.trim()) e.remarks = 'The remarks field is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;
  //   setSaved(true);
  //   setTimeout(() => navigate('/admin/enquiry'), 1200);
  // };

  const handleSubmit = async (e) => {

  e.preventDefault();

  if (!validate()) return;

  try {

    const payload = new FormData();

    payload.append("followupdate", form.followupDate);
    payload.append("remarks", form.remarks);
    payload.append("status", form.status);

    const response = await updateFollowup(id, payload);

    console.log(response);

    setSaved(true);

    setTimeout(() => {

      navigate("/admin/enquiry");

    }, 1200);

  } catch (error) {

    console.error(error);
  }
};

  const currentEnq = isEdit && enquires.length > 0 ? enquires.find(e => String(e.id) === String(id)) : null;
  const lastFollowupDate = currentEnq?.followups?.length > 0 ? currentEnq.followups[0].followupdate : null;
  const lastFollowupRemark = currentEnq?.followups?.length > 0 ? currentEnq.followups[0].remarks : null;

  return (
    <div className="relative space-y-7 min-h-screen pb-10">
      <CircuitBg />
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15"/>

      {/* Page header */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
            {isEdit ? 'Edit Enquiry' : 'Add Enquiry'}
          </h1>
          <div className="flex items-center gap-1.5 mt-1">
            <button onClick={() => navigate('/admin/dashboard')} className="text-[12px] font-medium text-gray-400 hover:text-secondary transition-colors">CRM</button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300"/>
            <button onClick={() => navigate('/admin/enquiry')} className="text-[12px] font-medium text-gray-400 hover:text-secondary transition-colors">Enquiry</button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300"/>
            <span className="text-[12px] font-bold text-secondary">{isEdit ? 'Edit' : 'Add'}</span>
          </div>
        </div>
        <button onClick={() => navigate('/admin/enquiry')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold
                     text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm
                     border border-gray-200/60 dark:border-slate-600/40
                     hover:border-secondary/40 hover:text-secondary shadow-sm transition-all duration-200">
          <Feather.ArrowLeft className="w-4 h-4"/> Back
        </button>
      </div>

      {/* Form card */}
      <motion.div className="relative z-10"
        initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.4, ease:'easeOut' }}>
        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl overflow-hidden bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15"
               style={{ boxShadow:'0 8px 40px rgba(52,152,219,0.10)' }}>

            <div className="h-[3px] w-full"
                 style={{ background:'linear-gradient(90deg, var(--color-secondary), var(--color-primary), #8CC63F)' }}/>

            <div className="p-6 lg:p-8 space-y-6">

              {/* Row 1: Name | Email | Phone */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className={labelCls}>Customer Name {!isEdit && <span className="text-red-400">*</span>}</label>
                  <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                    disabled={isEdit}
                    className={isEdit ? disabledInputCls : getInputCls(errors.name)}/>
                  {!isEdit && errors.name && <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.name}</p>}
                </div>
                <div>
                  <label className={labelCls}>Email Address {!isEdit && <span className="text-red-400">*</span>}</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    disabled={isEdit}
                    className={isEdit ? disabledInputCls : getInputCls(errors.email)}/>
                  {!isEdit && errors.email && <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.email}</p>}
                </div>
                <div>
                  <label className={labelCls}>Phone {!isEdit && <span className="text-red-400">*</span>}</label>
                  <input type="text" value={form.phone} onChange={e => set('phone', e.target.value)}
                    disabled={isEdit}
                    className={isEdit ? disabledInputCls : getInputCls(errors.phone)}/>
                  {!isEdit && errors.phone && <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.phone}</p>}
                </div>
              </div>

              {/* Row 2: Subject */}
              <div className="w-full">
                <div>
                  <label className={labelCls}>Subject {!isEdit && <span className="text-red-400">*</span>}</label>
                  <input type="text" value={form.subject} onChange={e => set('subject', e.target.value)}
                    disabled={isEdit}
                    className={isEdit ? disabledInputCls : getInputCls(errors.subject)}/>
                  {!isEdit && errors.subject && <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.subject}</p>}
                </div>

              </div>

              {/* Row 3: Message */}
              <div>
                <label className={labelCls}>Message</label>
                <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={5}
                  disabled={isEdit}
                  className={isEdit 
                    ? "w-full px-4 py-3 text-[13px] font-medium text-gray-500 dark:text-gray-400 bg-gray-50/80 dark:bg-slate-700/40 backdrop-blur-sm border border-gray-200/50 dark:border-slate-600/30 rounded-xl cursor-not-allowed resize-none select-none"
                    : `w-full px-4 py-3 text-[13px] font-medium text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl transition-all duration-200 ` +
                      (errors.message
                        ? `border border-red-400 dark:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 `
                        : `border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 `) +
                      `placeholder:text-gray-300`}/>
                {!isEdit && errors.message && <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.message}</p>}
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200/60 dark:border-slate-600/40"/>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]
                                   bg-white dark:bg-slate-800">
                    Followup Details
                  </span>
                </div>
              </div>

              {/* Row 4: Followup Date | Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Followup Date</label>
                  <input type="date" value={form.followupDate} onChange={e => set('followupDate', e.target.value)}
                    className={getInputCls(errors.followupDate) + ' cursor-pointer'}/>
                  {errors.followupDate && <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.followupDate}</p>}
                </div>
                <div>
                  <label className={labelCls}>
                    Followup Status <span className="text-red-400">*</span>
                  </label>
                  <select value={form.status} onChange={e => {
                    const newStatus = e.target.value;
                    set('status', newStatus);
                    if (newStatus === 'Converted') {
                      set('followupDate', new Date().toISOString().split('T')[0]);
                    }
                  }}
                    className={getInputCls(errors.status) + ' cursor-pointer'}>
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.status && <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.status}</p>}
                </div>
              </div>

              {/* Row 5: Remarks */}
              <div>
                <label className={labelCls}>Remarks</label>
                <textarea value={form.remarks} onChange={e => set('remarks', e.target.value)}
                  placeholder="Enter remarks or follow-up notes..." rows={4}
                  className={`w-full px-4 py-3 text-[13px] font-medium text-gray-700 dark:text-gray-200 ` +
                             `bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl resize-none transition-all duration-200 ` +
                             (errors.remarks
                               ? `border border-red-400 dark:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 `
                               : `border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/50 `) +
                             `placeholder:text-gray-300`}/>
                {errors.remarks && <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.remarks}</p>}

                {isEdit && lastFollowupRemark && (
                  <div className="mt-4 p-4 rounded-xl bg-gray-50/80 dark:bg-slate-700/40 border border-gray-200/50 dark:border-slate-600/30">
                    <p className="text-[11px] font-black text-secondary dark:text-secondary uppercase tracking-[0.16em] mb-2">Previous Followup Log</p>
                    <p className="text-[13px] text-gray-700 dark:text-gray-200 font-medium mb-1">
                      <span className="text-gray-400 mr-2">Date:</span> {lastFollowupDate}
                    </p>
                    <p className="text-[13px] text-gray-700 dark:text-gray-200 font-medium">
                      <span className="text-gray-400 mr-2">Remark:</span> {lastFollowupRemark}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 lg:px-8 py-5
                            bg-gray-50/60 dark:bg-slate-800/30
                            border-t border-gray-100/60 dark:border-slate-700/40">
              <button type="button" onClick={() => navigate('/admin/enquiry')}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-[13px] font-bold text-white
                           transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
                style={{ background:'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)', boxShadow:'0 6px 20px rgba(231,76,60,0.30)' }}>
                <Feather.X className="w-4 h-4"/> Cancel
              </button>
              <button type="submit" disabled={saved}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-[13px] font-bold text-white
                           transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-70"
                style={{ background:'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-primary) 100%)', boxShadow:'0 6px 20px rgba(52,152,219,0.30)' }}>
                {saved
                  ? <><Feather.CheckCircle className="w-4 h-4"/>{isEdit ? 'Updated!' : 'Saved!'}</>
                  : <><Feather.Save className="w-4 h-4"/>{isEdit ? 'Update Enquiry' : 'Save Enquiry'}</>}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EnquiryForm;
