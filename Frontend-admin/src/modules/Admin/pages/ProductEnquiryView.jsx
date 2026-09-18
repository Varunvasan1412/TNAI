import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PageTitle, Badge } from '../../../components/ui';
import * as Feather from 'react-feather';
import { useProductEnquiryStore } from '../../../store/store';
import toast from 'react-hot-toast';

/* ── Spinner ─────────────────────────────────────────────────────────── */
const Spinner = ({ cls = 'w-4 h-4 text-white' }) => (
  <svg className={`animate-spin ${cls}`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);

/* ── Status config ───────────────────────────────────────────────────── */
const STATUS_OPTIONS = ['New', 'Contacted', 'Qualified', 'Closed', 'Unqualified', 'Converted'];
const VALID_STATUSES = new Set(STATUS_OPTIONS);

const STATUS_STYLE = {
  New:         { color: 'var(--color-secondary)', bg: 'rgba(52,152,219,0.12)'  },
  Contacted:   { color: '#E67E22', bg: 'rgba(230,126,34,0.12)'  },
  Qualified:   { color: '#8CC63F', bg: 'rgba(140,198,63,0.12)'  },
  Closed:      { color: '#6B7280', bg: 'rgba(107,114,128,0.12)' },
  Unqualified: { color: '#E74C3C', bg: 'rgba(231,76,60,0.12)'   },
  Converted:   { color: 'var(--color-primary)', bg: 'rgba(49,151,96,0.12)'   },
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_STYLE[status] || STATUS_STYLE.New;
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.12em]"
      style={{ background: cfg.bg, color: cfg.color }}>
      {status}
    </span>
  );
};

/* ── Section wrapper ─────────────────────────────────────────────────── */
const Section = ({ icon: Icon, title, color, delay = 0, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="rounded-2xl bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl
               border border-white/80 dark:border-white/10
               shadow-[0_4px_16px_rgba(0,0,0,0.06)] overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100/70 dark:border-slate-700/50">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: `${color}18` }}>
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <h3 className="text-[13px] font-black text-gray-800 dark:text-white">{title}</h3>
    </div>
    <div className="px-6 py-5">{children}</div>
  </motion.div>
);

/* ── Field ───────────────────────────────────────────────────────────── */
const Field = ({ label, value, full = false }) => (
  <div className={full ? 'col-span-full' : ''}>
    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1">{label}</p>
    <p className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 break-words">
      {value || <span className="text-gray-300 dark:text-slate-600 italic">—</span>}
    </p>
  </div>
);

/* ── Update Status Modal ─────────────────────────────────────────────── */
const FollowupModal = ({ enq, onConfirm, onCancel, isSaving }) => {
  const [form, setForm] = useState({ followupdate: '', remarks: '', status: 'New', convert: 0 });

  useEffect(() => {
    if (enq) {
      const latest = enq.followups?.[0];
      setForm({
        followupdate: latest?.followupdate || enq.current_followup_date || '',
        remarks: latest?.remarks || '',
        status: latest?.status || 'New',
        convert: enq.convert || 0,
      });
    }
  }, [enq]);

  const s = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <AnimatePresence>
      {enq && (
        <>
          <motion.div key="fb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} onClick={onCancel}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" />
          <motion.div key="fm"
            initial={{ opacity: 0, scale: 0.82, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <div className="pointer-events-auto w-full max-w-md rounded-2xl overflow-hidden
                            bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl
                            border border-white/80 dark:border-white/15
                            shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }} />
              <div className="p-7">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.08 }}
                    className="relative w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(49,151,96,0.12)' }}>
                    <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.1, 0.4] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-2xl" style={{ background: 'rgba(49,151,96,0.15)' }} />
                    <Feather.RefreshCw className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                  </motion.div>
                  <div>
                    <h3 className="text-[16px] font-black text-gray-800 dark:text-white">Update Status</h3>
                    <p className="text-[11px] text-gray-400 truncate max-w-[240px]">{enq?.product_name}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1.5">Follow-up Date</label>
                    <input type="date" value={form.followupdate} onChange={e => s('followupdate', e.target.value)}
                      className="w-full h-10 px-3 rounded-xl text-[13px] font-medium
                                 bg-gray-50 dark:bg-slate-700/60 border border-gray-200/70 dark:border-slate-600/50
                                 text-gray-700 dark:text-gray-200
                                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1.5">Status</label>
                    <select value={form.status} onChange={e => s('status', e.target.value)}
                      className="w-full h-10 px-3 rounded-xl text-[13px] font-bold
                                 bg-gray-50 dark:bg-slate-700/60 border border-gray-200/70 dark:border-slate-600/50
                                 text-gray-700 dark:text-gray-200
                                 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all cursor-pointer">
                      {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1.5">Remarks</label>
                    <textarea value={form.remarks} onChange={e => s('remarks', e.target.value)}
                      rows={3} placeholder="Add remarks..."
                      className="w-full px-3 py-2.5 rounded-xl text-[13px] font-medium resize-none
                                 bg-gray-50 dark:bg-slate-700/60 border border-gray-200/70 dark:border-slate-600/50
                                 text-gray-700 dark:text-gray-200 placeholder:text-gray-300
                                 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all" />
                  </div>

                  <div className="flex items-center justify-between px-4 py-3 rounded-xl
                                  bg-gray-50 dark:bg-slate-700/40 border border-gray-100 dark:border-slate-600/40">
                    <div>
                      <p className="text-[12px] font-bold text-gray-700 dark:text-gray-200">Convert to Lead</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Mark this enquiry as a converted lead</p>
                    </div>
                    <button onClick={() => s('convert', form.convert === 1 ? 0 : 1)}
                      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${form.convert === 1 ? 'bg-primary' : 'bg-gray-200 dark:bg-slate-600'}`}>
                      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 ${form.convert === 1 ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={onCancel} disabled={isSaving}
                    className="flex-1 h-11 rounded-xl text-[13px] font-bold text-gray-600 dark:text-gray-300
                               bg-gray-100/80 dark:bg-slate-700/60 border border-gray-200/60 dark:border-slate-600/50
                               hover:bg-gray-200/70 transition-all duration-200 active:scale-[0.97] disabled:opacity-50">
                    Cancel
                  </button>
                  <button onClick={() => onConfirm(form)} disabled={isSaving}
                    className="flex-1 h-11 rounded-xl text-[13px] font-bold text-white
                               transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5
                               shadow-[0_4px_14px_rgba(49,151,96,0.35)]
                               disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                    {isSaving ? <Spinner /> : 'Save Update'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────────────────────────────── */
const ProductEnquiryView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleEnquiry, fetchSingleEnquiry, updateEnquiry, loading } = useProductEnquiryStore();
  const [followupOpen, setFollowupOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => { fetchSingleEnquiry(id); }, [id]);

  const enq = singleEnquiry?.id === Number(id) ? singleEnquiry : null;

  const rawStatus = enq?.followups?.length > 0 ? enq.followups[0].status : 'New';
  const latestStatus = VALID_STATUSES.has(rawStatus) ? rawStatus : 'New';

  const formatDate = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatDateTime = (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const handleSaveFollowup = async (formData) => {
    setIsSaving(true);
    try {
      await updateEnquiry(Number(id), formData);
      toast.success('Status updated successfully');
      setFollowupOpen(false);
      fetchSingleEnquiry(id);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update status');
    } finally {
      setIsSaving(false);
    }
  };

  /* ── Loading skeleton ────────────────────────────────────────────── */
  if (loading && !enq) {
    return (
      <div className="relative min-h-screen space-y-6">
        <div className="fixed inset-0 z-[1] pointer-events-none
                        bg-gradient-to-br from-white/20 via-white/15 to-white/10
                        dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />
        <div className="relative z-10">
          <PageTitle title="Enquiry Detail"
            breadcrumbs={[
              { label: 'CRM', path: '/admin/dashboard' },
              { label: 'Product Enquiry', path: '/admin/product-enquiry' },
              { label: 'View', active: true },
            ]} />
        </div>
        <div className="relative z-10 flex items-center justify-center py-32">
          <Spinner cls="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

  if (!loading && !enq) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: 'rgba(49,151,96,0.09)' }}>
            <Feather.ShoppingBag className="w-7 h-7" style={{ color: 'var(--color-primary)' }} />
          </div>
          <p className="text-[14px] font-bold text-gray-500">Enquiry not found</p>
          <button onClick={() => navigate('/admin/product-enquiry')}
            className="mt-4 px-5 py-2 rounded-xl text-[12px] font-bold text-white"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
            Back to Enquiries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative space-y-6 min-h-screen">
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* Page title */}
      <div className="relative z-10">
        <PageTitle
          title="Enquiry Detail"
          breadcrumbs={[
            { label: 'CRM', path: '/admin/dashboard' },
            { label: 'Product Enquiry', path: '/admin/product-enquiry' },
            { label: 'View', active: true },
          ]}
        />
      </div>

      <div className="relative z-10 space-y-5">

        {/* ── Header card ────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl overflow-hidden bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl
                     border border-white/80 dark:border-white/10
                     shadow-[0_8px_32px_rgba(49,151,96,0.09)]">
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }} />
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-white text-[18px] font-black"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
              {enq.name?.charAt(0)?.toUpperCase() || 'C'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-[17px] font-black text-gray-800 dark:text-white">{enq.name}</h2>
                <StatusBadge status={latestStatus} />
                {enq.convert === 1 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.1em]"
                    style={{ background: 'rgba(49,151,96,0.12)', color: 'var(--color-primary)' }}>
                    <Feather.CheckCircle className="w-2.5 h-2.5" /> Converted
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] text-gray-400">
                  <Feather.Mail className="w-3 h-3" />{enq.email}
                </span>
                {enq.phone_number && (
                  <span className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Feather.Phone className="w-3 h-3" />{enq.phone_number}
                  </span>
                )}
                <span className="flex items-center gap-1 text-[11px] text-gray-400">
                  <Feather.Calendar className="w-3 h-3" />{formatDate(enq.created_at)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {/* <button onClick={() => setFollowupOpen(true)}
                className="flex items-center gap-1.5 px-4 h-9 rounded-xl text-[12px] font-bold text-white
                           transition-all hover:-translate-y-0.5 active:scale-[0.97]
                           shadow-[0_4px_14px_rgba(49,151,96,0.30)]"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                <Feather.RefreshCw className="w-3.5 h-3.5" />
                Update Status
              </button> */}
              <button onClick={() => navigate('/admin/product-enquiry')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold
                       text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm
                       border border-gray-200/60 hover:border-secondary/40 hover:text-secondary
                       shadow-sm transition-all duration-200">
                <Feather.ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Main grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Left: Product + Customer + Message */}
          <div className="lg:col-span-2 space-y-5">

            <Section icon={Feather.Package} title="Product Information" color="var(--color-primary)" delay={0.06}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                <Field label="Product Name" value={enq.product_name || '—'} />
                <Field label="Part Number / SKU" value={enq.part_number_sku || enq.part_no || '—'} />
                <Field label="Category" value={enq.category || enq.category_id || '—'} />
                <Field label="Subcategory" value={enq.sub_category || enq.subcategory || '—'} />
              </div>
            </Section>

            <Section icon={Feather.User} title="Customer Details" color="var(--color-secondary)" delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                <Field label="Full Name" value={enq.name} />
                <Field label="Email" value={enq.email} />
                <Field label="Phone" value={enq.phone_number || enq.phone} />
                <Field label="Topic" value={enq.topic || '—'} />
              </div>
            </Section>

            {enq.message && (
              <Section icon={Feather.MessageSquare} title="Message" color="#E67E22" delay={0.14}>
                <p className="text-[13px] text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {enq.message}
                </p>
              </Section>
            )}

            {(enq.product?.key_features || enq.key_features || enq.product_features) && (
              <Section icon={Feather.List} title="Product Key Features" color="var(--color-primary)" delay={0.16}>
                <div className="space-y-2">
                  {(() => {
                    let features = enq.product?.key_features || enq.key_features || enq.product_features;
                    if (typeof features === 'string') {
                      try { features = JSON.parse(features); } catch (e) { features = {}; }
                    }
                    if (Array.isArray(features)) {
                      return features.map((kf, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gray-50/80 dark:bg-slate-800/50">
                          <span className="text-[13px] font-bold text-gray-700 dark:text-gray-300">{kf.feature_name || kf.title || kf.key || kf.label || kf.name}</span>
                          <span className="text-[13px] font-black text-primary text-right mt-1 sm:mt-0">{kf.value}</span>
                        </div>
                      ));
                    } else if (typeof features === 'object' && features !== null) {
                      return Object.entries(features).map(([key, val], i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-gray-50/80 dark:bg-slate-800/50">
                          <span className="text-[13px] font-bold text-gray-700 dark:text-gray-300">{key}</span>
                          <span className="text-[13px] font-black text-primary text-right mt-1 sm:mt-0">{String(val)}</span>
                        </div>
                      ));
                    }
                    return null;
                  })()}
                </div>
              </Section>
            )}
          </div>

          {/* Right: Meta + Followup history */}
          <div className="space-y-5">

            {/* Record meta */}
            <Section icon={Feather.Info} title="Record Details" color="#6B7280" delay={0.08}>
              <div className="space-y-4">
                <Field label="Enquiry ID" value={`#${enq.id}`} />

                {/* <Field label="Current Follow-up" value={formatDate(enq.current_followup_date)} /> */}
                <Field label="Created" value={formatDateTime(enq.created_at)} />
                <Field label="Last Updated" value={formatDateTime(enq.updated_at)} />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1">Current Status</p>
                  <StatusBadge status={latestStatus} />
                </div>
                {enq.convert === 1 && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{ background: 'rgba(49,151,96,0.10)' }}>
                    <Feather.CheckCircle className="w-4 h-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                    <p className="text-[11px] font-bold" style={{ color: 'var(--color-primary)' }}>Converted to Lead</p>
                  </div>
                )}
              </div>
            </Section>

            {/* Followup history */}
            <Section icon={Feather.Clock} title={`Follow-up History (${enq.followups?.length || 0})`} color="#9B59B6" delay={0.12}>
              {(!enq.followups || enq.followups.length === 0) ? (
                <div className="flex flex-col items-center gap-2 py-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(155,89,182,0.10)' }}>
                    <Feather.Clock className="w-4 h-4" style={{ color: '#9B59B6' }} />
                  </div>
                  <p className="text-[12px] font-bold text-gray-400">No follow-ups yet</p>
                </div>
              ) : (
                <div className="max-h-[420px] overflow-y-auto pr-1 space-y-3">
                  {enq.followups.map((fu, i) => {
                    const fuStatus = VALID_STATUSES.has(fu.status) ? fu.status : 'New';
                    const cfg = STATUS_STYLE[fuStatus] || STATUS_STYLE.New;
                    return (
                      <motion.div key={fu.id}
                        initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="relative pl-4 pb-3 last:pb-0">
                        {i < enq.followups.length - 1 && (
                          <div className="absolute left-[7px] top-5 bottom-0 w-px bg-gray-100 dark:bg-slate-700" />
                        )}
                        <div className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"
                          style={{ background: cfg.color }} />
                        <div className="rounded-xl px-3 py-2.5 border border-gray-100/60 dark:border-slate-700/40"
                          style={{ background: `${cfg.color}08` }}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em]"
                              style={{ background: cfg.bg, color: cfg.color }}>
                              {fuStatus}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {formatDate(fu.followupdate)}
                            </span>
                          </div>
                          {fu.remarks && (
                            <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed mt-1">
                              {fu.remarks}
                            </p>
                          )}
                          <p className="text-[9px] text-gray-400 mt-1.5">{formatDateTime(fu.created_at)}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </Section>
          </div>
        </div>
      </div>

      <FollowupModal
        enq={followupOpen ? enq : null}
        onConfirm={handleSaveFollowup}
        onCancel={() => !isSaving && setFollowupOpen(false)}
        isSaving={isSaving}
      />
    </div>
  );
};

export default ProductEnquiryView;
