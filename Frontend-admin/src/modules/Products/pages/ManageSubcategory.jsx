import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Feather from 'react-feather';
import {
  Card, CardHeader, CardBody, CardTitle,
  Badge, PageTitle, StatCard,
  TableContainer, THead, TBody, TR, TH, TD,
  DataTablePagination,
} from '../../../components/ui';
import { getSubcategories, deleteSubcategory } from '../data/subcategoryData';
import { getCategories } from '../data/categoryData';
import { useProductCategoryStore, useProductSubcategoryStore } from '../../../store/store';
import toast from 'react-hot-toast';

/* ── Delete modal ───────────────────────────────────────────────────── */
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
                  <Feather.Trash2 className="w-7 h-7 text-red-500" />
                </motion.div>
              </div>
              <div className="text-center mb-5">
                <h3 className="text-[17px] font-black text-gray-800 dark:text-white mb-2">Delete Subcategory?</h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  This action is permanent and cannot be undone.
                </p>
              </div>
              <div className="mb-6 px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-700/50
                              border border-gray-100 dark:border-slate-600/50 flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(239,68,68,0.12)' }}>
                  <Feather.Layers className="w-3.5 h-3.5 text-red-500" />
                </div>
                <p className="text-[12px] font-bold text-gray-600 dark:text-gray-300 truncate">{item?.sub_category_name}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={onCancel} disabled={isDeleting}
                  className="flex-1 h-11 rounded-xl text-[13px] font-bold text-gray-600 dark:text-gray-300
                             bg-gray-100/80 dark:bg-slate-700/60 border border-gray-200/60 dark:border-slate-600/50
                             hover:bg-gray-200/70 dark:hover:bg-slate-600/70 transition-all active:scale-[0.97] disabled:opacity-50">
                  Cancel
                </button>
                <button onClick={onConfirm} disabled={isDeleting}
                  className="flex-1 h-11 rounded-xl text-[13px] font-bold text-white
                             transition-all active:scale-[0.97] hover:-translate-y-0.5
                             shadow-[0_4px_14px_rgba(239,68,68,0.35)]
                             disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)' }}>
                  {isDeleting ? (
                    <svg className="animate-spin w-4 h-4 text-white mx-auto" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

/* ─────────────────────────────────────────────────────────────────────── */
const ManageSubcategory = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);


  const { subcategories, fetchSubcategories, deleteSubcategory } = useProductSubcategoryStore();
  const { categories, fetchCategories, } = useProductCategoryStore();

  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, [])

  console.log("Subcategory :", subcategories);

  const getCategoryName = (id) => {

    const category = categories.find(
      c => String(c.id) === String(id)
    );

    return category?.category_name || "—";
  };


  const stats = [
    { label: 'Total Subcategories', icon: Feather.Layers, color: 'var(--color-primary)', bg: 'rgba(49,151,96,0.10)', value: subcategories.length },
    {
      label: 'Active',
      icon: Feather.CheckCircle,
      color: 'var(--color-secondary)',
      bg: 'rgba(52,152,219,0.10)',
      value: subcategories.filter(
        s => s.status === 1
      ).length
    },

    {
      label: 'Inactive',
      icon: Feather.PauseCircle,
      color: '#E67E22',
      bg: 'rgba(230,126,34,0.10)',
      value: subcategories.filter(
        s => s.status === 0
      ).length
    },

    {
      label: 'With Divisions',
      icon: Feather.Grid,
      color: '#8CC63F',
      bg: 'rgba(140,198,63,0.10)',
      value: subcategories.filter(
        s => s.divisions?.length > 0
      ).length
    },
  ];

  const filtered = subcategories.filter(s => {
    const q = search.toLowerCase();

    return (
      (
        s.sub_category_name
          ?.toLowerCase()
          .includes(q)

        ||

        s.category?.category_name
          ?.toLowerCase()
          .includes(q)

        ||

        s.sub_category_description
          ?.toLowerCase()
          .includes(q)
      )

      &&

      (
        catFilter === 'All'

        ||

        s.category?.category_name === catFilter
      )

      &&

      (
        statusFilter === 'All' || (statusFilter === 'Active' && s.status === 1) || (statusFilter === 'Inactive' && s.status === 0)
      )
    );
  });


  const sortedSubcategories = [...filtered].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const totalPages = Math.max(
    1,
    Math.ceil(sortedSubcategories.length / perPage)
  );
  const paginated = sortedSubcategories.slice((page - 1) * perPage, page * perPage);

  const reset = (fn) => { fn(); setPage(1); };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteSubcategory(deleteTarget.id);
      toast.success('Subcategory deleted successfully');
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete subcategory');
    } finally {
      setIsDeleting(false);
    }
  };


  const catOptions = ['All',
    ...Array.from(
      new Set(
        subcategories
          .map(s => s.category?.category_name).filter(Boolean)
      )
    )
  ];


  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* Page title */}
      <div className="relative z-10">
        <PageTitle
          title="Subcategory Management"
          breadcrumbs={[
            { label: 'Products', path: '/products/dashboard' },
            { label: 'Subcategories', active: true },
          ]}
        />
      </div>

      {/* Stat cards */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Table card */}
      <motion.div className="relative z-10"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}>

        <Card className="overflow-hidden bg-white/75 dark:bg-slate-800/65
                         backdrop-blur-2xl border border-white/80 dark:border-white/15"
          style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.09)' }}>

          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
              <CardTitle>All Subcategories</CardTitle>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Entries */}
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">Show</span>
                  <select value={perPage} onChange={e => reset(() => setPerPage(Number(e.target.value)))}
                    className="h-9 w-20 px-2 rounded-xl text-[13px] font-bold text-gray-600 dark:text-gray-200
                               bg-gray-100/70 dark:bg-slate-700/50
                               border border-gray-200/60 dark:border-slate-600/60
                               focus:outline-none focus:ring-2 focus:ring-primary/25 cursor-pointer">
                    {[5, 10, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">entries</span>
                </div>

                <div className="h-5 w-px bg-gray-200 dark:bg-slate-600" />

                {/* Category filter */}
                <select value={catFilter} onChange={e => reset(() => setCatFilter(e.target.value))}
                  className="h-9 px-3 rounded-xl text-[12px] font-bold text-gray-600 dark:text-gray-200
                             bg-gray-100/70 dark:bg-slate-700/50
                             border border-gray-200/60 dark:border-slate-600/60
                             focus:outline-none focus:ring-2 focus:ring-primary/25 cursor-pointer">
                  {catOptions.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
                </select>

                {/* Status pills */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100/70 dark:bg-slate-700/50">
                  {['All', 'Active', 'Inactive'].map(f => (
                    <button key={f} onClick={() => reset(() => setStatusFilter(f))}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${statusFilter === f
                        ? 'bg-white dark:bg-slate-600 text-primary shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                        }`}>
                      {f}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative">
                  <input type="text" placeholder="Search subcategories..." value={search}
                    onChange={e => reset(() => setSearch(e.target.value))}
                    className="h-9 w-52 pl-9 pr-3 rounded-xl text-[13px]
                               bg-gray-100/70 dark:bg-slate-700/50
                               border border-gray-200/60 dark:border-slate-600/60
                               focus:outline-none focus:ring-2 focus:ring-primary/25
                               transition-all placeholder:text-gray-400" />
                  <Feather.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                </div>

                {/* Add */}
                <button onClick={() => navigate('/products/subcategories/add')}
                  className="flex items-center gap-1.5 h-9 px-4 text-white text-[13px] font-bold rounded-xl
                             transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]
                             shadow-[0_4px_14px_rgba(49,151,96,0.30)]"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                  <Feather.Plus className="w-3.5 h-3.5" />
                  Add Subcategory
                </button>
              </div>
            </div>
          </CardHeader>

          <CardBody className="p-0">
            <TableContainer className="rounded-none border-0 shadow-none">
              <THead>
                <TR>
                  <TH className="w-14 text-center">S.No</TH>
                  <TH>Subcategory</TH>
                  <TH>Category</TH>
                  <TH>Description</TH>
                  <TH>Divisions</TH>
                  <TH>Created Date</TH>
                  <TH>Status</TH>
                  <TH className="text-right">Actions</TH>
                </TR>
              </THead>

              <TBody>
                {paginated.map((sub, idx) => (
                  <motion.tr key={sub.id}
                    initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b last:border-0 border-gray-100/60 dark:border-slate-700/30
                               transition-all duration-200 group/row
                               hover:shadow-[inset_3px_0_0_var(--color-primary)]"
                    onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, rgba(49,151,96,0.06) 0%, rgba(49,151,96,0.01) 40%, transparent 100%)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}>

                    {/* S.No */}
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg
                                       text-[11px] font-black bg-gray-100 dark:bg-slate-700
                                       text-gray-500 dark:text-gray-400">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center
                                        text-white text-[11px] font-black shrink-0"
                          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                          {sub.sub_category_name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          {sub.sub_category_name}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold
                                       bg-secondary/10 text-secondary">
                        <Feather.Tag className="w-3 h-3" />
                        {getCategoryName(sub.category_id)}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="px-4 py-3.5 max-w-[220px]">
                      <p className="text-[12px] text-gray-500 dark:text-gray-400 truncate leading-snug">
                        {sub.sub_category_description || '—'}
                      </p>
                    </td>

                    {/* Divisions */}
                    <td className="px-4 py-3.5">
                      {sub.divisions?.length > 0 ? (
                        <div className="flex flex-wrap gap-1 max-w-[160px]">
                          {sub.divisions.slice(0, 3).map((d, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-bold
                                                     bg-primary/10 text-primary border border-primary/20">
                              {d.division_name}
                            </span>
                          ))}
                          {sub.divisions.length > 3 && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-400">
                              +{sub.divisions.length - 3}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-gray-300 font-medium">—</span>
                      )}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <Feather.Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="text-[12px] font-medium text-gray-500">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <Badge variant={sub.status === 1 ? 'soft-success' : 'soft-warning'} size="sm">
                        {sub.status === 1 ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button title="View" onClick={() => navigate(`/products/subcategories/view/${sub.id}`)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center
                                     text-gray-400 hover:text-secondary hover:bg-secondary/10
                                     transition-all duration-150">
                          <Feather.Eye className="w-[15px] h-[15px]" />
                        </button>
                        <button title="Edit" onClick={() => navigate(`/products/subcategories/edit/${sub.id}`)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center
                                     text-gray-400 hover:text-primary hover:bg-primary/10
                                     transition-all duration-150">
                          <Feather.Edit2 className="w-[15px] h-[15px]" />
                        </button>
                        <button title="Delete" onClick={() => setDeleteTarget(sub)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center
                                     text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20
                                     transition-all duration-150">
                          <Feather.Trash2 className="w-[15px] h-[15px]" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}

                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                          <Feather.Layers className="w-7 h-7 text-gray-300" />
                        </div>
                        <p className="text-sm font-bold text-gray-500">No subcategories found</p>
                        <p className="text-xs text-gray-400">Try adjusting your filters or add a new subcategory</p>
                      </div>
                    </td>
                  </tr>
                )}
              </TBody>
            </TableContainer>

            <DataTablePagination
              page={page} totalPages={totalPages} total={sortedSubcategories.length}
              perPage={perPage} onPage={setPage}
            />
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

export default ManageSubcategory;
