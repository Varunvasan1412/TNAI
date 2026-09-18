import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card, CardHeader, CardBody, CardTitle,
  Badge, PageTitle, StatCard,
  TableContainer, THead, TBody, TR, TH, TD,
  DataTablePagination,
} from '../../../components/ui';
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

const STATUS_BADGE = {
  New:          'soft-info',
  Contacted:    'soft-warning',
  Qualified:    'soft-success',
  Closed:       'soft-secondary',
  Unqualified:  'soft-danger',
  Converted:    'soft-success',
};

const STATUS_COLOR = {
  New: 'var(--color-secondary)', Contacted: '#E67E22',
  Qualified: '#8CC63F', Closed: '#6B7280', Unqualified: '#E74C3C', Converted: 'var(--color-primary)',
};
const STATUS_BG = {
  New: 'rgba(52,152,219,0.12)', Contacted: 'rgba(230,126,34,0.12)',
  Qualified: 'rgba(140,198,63,0.12)', Closed: 'rgba(107,114,128,0.12)',
  Unqualified: 'rgba(231,76,60,0.12)', Converted: 'rgba(49,151,96,0.12)',
};

/* ── Delete Modal ────────────────────────────────────────────────────── */
const DeleteModal = ({ item, onConfirm, onCancel, isDeleting }) => (
  <AnimatePresence>
    {item && (
      <>
        <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }} onClick={onCancel}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" />
        <motion.div key="md"
          initial={{ opacity: 0, scale: 0.82, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-md rounded-2xl overflow-hidden
                          bg-white/90 dark:bg-slate-800/90 backdrop-blur-2xl
                          border border-white/80 dark:border-white/15
                          shadow-[0_24px_60px_rgba(0,0,0,0.18)]">
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #ef4444, #f97316)' }} />
            <div className="p-7">
              <div className="flex justify-center mb-5">
                <motion.div initial={{ scale: 0, rotate: -15 }} animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.12)' }}>
                  <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-2xl" style={{ background: 'rgba(239,68,68,0.18)' }} />
                  <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.div>
              </div>
              <div className="text-center mb-5">
                <h3 className="text-[17px] font-black text-gray-800 dark:text-white mb-2">Delete Enquiry?</h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  This action is permanent and cannot be undone.
                </p>
              </div>
              <div className="mb-6 px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700/50
                              border border-gray-100 dark:border-slate-600/50 flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(239,68,68,0.12)' }}>
                  <Feather.ShoppingBag className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-gray-700 dark:text-gray-200 truncate">{item?.product_name}</p>
                  <p className="text-[11px] text-gray-400 truncate">{item?.name}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={onCancel} disabled={isDeleting}
                  className="flex-1 h-11 rounded-xl text-[13px] font-bold
                             text-gray-600 dark:text-gray-300
                             bg-gray-100/80 dark:bg-slate-700/60 border border-gray-200/60 dark:border-slate-600/50
                             hover:bg-gray-200/70 dark:hover:bg-slate-600/70
                             transition-all duration-200 active:scale-[0.97] disabled:opacity-50">
                  Cancel
                </button>
                <button onClick={onConfirm} disabled={isDeleting}
                  className="flex-1 h-11 rounded-xl text-[13px] font-bold text-white
                             transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5
                             shadow-[0_4px_14px_rgba(239,68,68,0.35)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.50)]
                             disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}>
                  {isDeleting ? <Spinner /> : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);


/* ── Helper: get latest status ───────────────────────────────────────── */
const VALID_STATUSES = new Set(STATUS_OPTIONS);

const getLatestStatus = (enq) => {
  const s = enq?.followups?.length > 0 ? enq.followups[0].status : 'New';
  return VALID_STATUSES.has(s) ? s : 'New';
};

const getLatestFollowupDate = (enq) =>
  enq?.current_followup_date || enq?.followups?.[0]?.followupdate || null;

/* ─────────────────────────────────────────────────────────────────────── */
const ProductEnquiry = () => {
  const navigate = useNavigate();
  const [search, setSearch]         = useState('');
  const [filter, setFilter]         = useState('All');
  const [perPage, setPerPage]       = useState(10);
  const [page, setPage]             = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const { enquiries, fetchEnquiries, deleteEnquiry, updateEnquiry } = useProductEnquiryStore();

  useEffect(() => { fetchEnquiries(); }, []);

  const filters = ['All', ...STATUS_OPTIONS];

  const stats = [
    { label: 'Total Enquiries', icon: Feather.ShoppingBag, color: 'var(--color-primary)', bg: 'rgba(49,151,96,0.10)',  value: enquiries.length },
    { label: 'New',             icon: Feather.Bell,        color: 'var(--color-secondary)', bg: 'rgba(52,152,219,0.10)', value: enquiries.filter(e => getLatestStatus(e) === 'New').length },
    { label: 'Converted',       icon: Feather.CheckCircle, color: '#8CC63F', bg: 'rgba(140,198,63,0.10)', value: enquiries.filter(e => getLatestStatus(e) === 'Converted' || e.convert === 1).length },
    { label: 'Closed',          icon: Feather.Archive,     color: '#6B7280', bg: 'rgba(107,114,128,0.10)', value: enquiries.filter(e => getLatestStatus(e) === 'Closed').length },
  ];

  const filtered = enquiries.filter(e => {
    const q = search.toLowerCase();
    const matchSearch =
      e.product_name?.toLowerCase().includes(q) ||
      e.name?.toLowerCase().includes(q) ||
      e.email?.toLowerCase().includes(q) ||
      e.company?.toLowerCase().includes(q);
    const status = getLatestStatus(e);
    const matchFilter = filter === 'All' || status === filter;
    return matchSearch && matchFilter;
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const totalPages = Math.max(1, Math.ceil(sorted.length / perPage));
  const paginated  = sorted.slice((page - 1) * perPage, page * perPage);

  const handlePerPage = (val) => { setPerPage(val); setPage(1); };
  const handleSearch  = (val) => { setSearch(val);  setPage(1); };
  const handleFilter  = (val) => { setFilter(val);  setPage(1); };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteEnquiry(deleteTarget.id);
      toast.success('Product enquiry deleted successfully');
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete enquiry');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (enquiryId, newStatus) => {
    setUpdatingId(enquiryId);
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      await updateEnquiry(enquiryId, { status: newStatus, followupdate: currentDate });
      toast.success('Status updated');
      fetchEnquiries();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* Page title */}
      <div className="relative z-10">
        <PageTitle
          title="Product Enquiries"
          breadcrumbs={[
            { label: 'CRM', path: '/admin/dashboard' },
            { label: 'Product Enquiry', active: true },
          ]}
        />
      </div>

      {/* Stat cards */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.08} />)}
      </div>

      {/* Table card */}
      <motion.div className="relative z-10"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}>

        <Card className="overflow-hidden
                         bg-white/75 dark:bg-slate-800/65
                         backdrop-blur-2xl
                         border border-white/80 dark:border-white/15"
          style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.09)' }}>

          {/* Card header */}
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
                <CardTitle>All Product Enquiries</CardTitle>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Show entries */}
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">Show</span>
                    <select value={perPage} onChange={e => handlePerPage(Number(e.target.value))}
                      className="h-9 w-20 px-2 rounded-xl text-[13px] font-bold text-gray-600 dark:text-gray-200
                                 bg-gray-100/70 dark:bg-slate-700/50
                                 border border-gray-200/60 dark:border-slate-600/60
                                 focus:outline-none focus:ring-2 focus:ring-primary/25 cursor-pointer">
                      {[5, 10, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">entries</span>
                  </div>

                  <div className="h-5 w-px bg-gray-200 dark:bg-slate-600" />

                  {/* Filter pills */}
                  <div className="flex items-center gap-1 p-1 rounded-xl
                                  bg-gray-100/70 dark:bg-slate-700/50 flex-wrap">
                    {['All', 'New', 'Contacted', 'Qualified', 'Closed', 'Converted'].map(f => (
                      <button key={f} onClick={() => handleFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${filter === f
                          ? 'bg-white dark:bg-slate-600 text-primary shadow-sm'
                          : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                          }`}>
                        {f}
                      </button>
                    ))}
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search enquiries..."
                      value={search}
                      onChange={e => handleSearch(e.target.value)}
                      className="h-9 w-52 pl-9 pr-3 rounded-xl text-[13px]
                                 bg-gray-100/70 dark:bg-slate-700/50
                                 border border-gray-200/60 dark:border-slate-600/60
                                 focus:outline-none focus:ring-2 focus:ring-primary/25
                                 transition-all placeholder:text-gray-400"
                    />
                    <Feather.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Table */}
          <CardBody className="p-0">
            <TableContainer className="rounded-none border-0 shadow-none">
              <THead>
                <TR>
                  <TH className="w-14 text-center">S.No</TH>
                  <TH>Customer</TH>
                  <TH>Product</TH>
                  <TH>Category</TH>
                  <TH>Topic</TH>
                  <TH>Follow-up Date</TH>
                  <TH>Status</TH>
                  <TH className="text-right">Actions</TH>
                </TR>
              </THead>

              <TBody>
                {paginated.map((enq, idx) => {
                  const status     = getLatestStatus(enq);
                  const followupDt = getLatestFollowupDate(enq);
                  return (
                    <motion.tr key={enq.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                      className="border-b last:border-0 border-gray-100/60 dark:border-slate-700/30
                                 relative transition-all duration-200 group/row
                                 hover:shadow-[inset_3px_0_0_var(--color-primary)]"
                      onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, rgba(49,151,96,0.06) 0%, rgba(49,151,96,0.01) 40%, transparent 100%)'}
                      onMouseLeave={e => e.currentTarget.style.background = ''}>

                      {/* S.No */}
                      <td className="px-4 py-3.5 text-center">
                        <span className="inline-flex items-center justify-center
                                         w-7 h-7 rounded-lg text-[11px] font-black
                                         bg-gray-100 dark:bg-slate-700
                                         text-gray-500 dark:text-gray-400">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center
                                          text-white text-[11px] font-black shrink-0"
                            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                            {enq.name?.charAt(0)?.toUpperCase() || 'C'}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              {enq.name}
                            </p>
                            <p className="text-[10px] text-gray-400 truncate max-w-[130px]">{enq.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Product */}
                      <td className="px-4 py-3.5">
                        <p className="text-[13px] font-bold text-gray-800 dark:text-white leading-snug">
                          {enq.product_name || '—'}
                        </p>
                        {enq.part_number_sku && (
                          <p className="text-[10px] text-gray-400 mt-0.5">{enq.part_number_sku}</p>
                        )}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3.5">
                        <p className="text-[13px] font-bold text-gray-800 dark:text-white leading-snug">
                          {enq.category || enq.category_id || '—'}
                        </p>
                        {(enq.sub_category || enq.subcategory) && (
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {enq.sub_category || enq.subcategory}
                          </p>
                        )}
                      </td>

                      {/* Topic */}
                      <td className="px-4 py-3.5">
                        <span className="text-[12px] font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {enq.topic || '—'}
                        </span>
                      </td>

                      {/* Follow-up Date */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <Feather.Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="text-[12px] font-medium text-gray-500">
                            {followupDt
                              ? new Date(followupDt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                              : '—'}
                          </span>
                        </div>
                      </td>

                      {/* Status — inline dropdown */}
                      <td className="px-4 py-3.5">
                        <div className="relative inline-flex items-center">
                          <select
                            value={status}
                            onChange={e => handleStatusChange(enq.id, e.target.value)}
                            disabled={updatingId === enq.id}
                            className="appearance-none pl-2.5 pr-7 py-1.5 rounded-xl text-[11px] font-bold
                                       border cursor-pointer transition-all duration-150
                                       focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{
                              background: STATUS_BG[status] || 'rgba(107,114,128,0.12)',
                              color: STATUS_COLOR[status] || '#6B7280',
                              borderColor: `${STATUS_COLOR[status] || '#6B7280'}35`,
                            }}
                          >
                            {STATUS_OPTIONS.map(s => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                          <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                            {updatingId === enq.id
                              ? <Spinner cls="w-3 h-3" />
                              : <Feather.ChevronDown className="w-3 h-3" style={{ color: STATUS_COLOR[status] || '#6B7280' }} />
                            }
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button title="View"
                            onClick={() => navigate(`/admin/product-enquiry/view/${enq.id}`)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center
                                       text-gray-400 hover:text-secondary
                                       hover:bg-secondary/10 transition-all duration-150">
                            <Feather.Eye className="w-[15px] h-[15px]" />
                          </button>
                          <button title="Delete"
                            onClick={() => setDeleteTarget(enq)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center
                                       text-gray-400 hover:text-red-500
                                       hover:bg-red-50 dark:hover:bg-red-900/20
                                       transition-all duration-150">
                            <Feather.Trash2 className="w-[15px] h-[15px]" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}

                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                          <Feather.ShoppingBag className="w-7 h-7 text-gray-300" />
                        </div>
                        <p className="text-sm font-bold text-gray-500">No product enquiries found</p>
                        <p className="text-xs text-gray-400">Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                )}
              </TBody>
            </TableContainer>

            <DataTablePagination page={page} totalPages={totalPages} total={sorted.length}
              perPage={perPage} onPage={setPage} />
          </CardBody>
        </Card>
      </motion.div>

      <DeleteModal
        item={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => !isDeleting && setDeleteTarget(null)}
        isDeleting={isDeleting}
      />

    </div>
  );
};

export default ProductEnquiry;
