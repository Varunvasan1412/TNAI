import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card, CardHeader, CardBody, CardTitle,
  Badge, PageTitle, Button,
  Avatar, TableContainer, THead, TBody, TR, TH, TD,
  StatCard, DataTablePagination,
} from '../../../components/ui';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';

/* ── Data (shared from data file) ───────────────────────────────────── */

import { useBlogStore } from '../../../store/store';

const catVariant = { Research: 'soft-primary', Industry: 'soft-info', Trends: 'soft-warning', Technical: 'soft-success', Platform: 'soft-secondary' };
const statVariant = { Published: 'soft-success', Draft: 'soft-warning' };



/* ── Delete Confirmation Modal ───────────────────────────────────────── */
const DeleteModal = ({ post, onConfirm, onCancel, isDeleting }) => (
  <AnimatePresence>
    {post && (
      <>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onCancel}
          className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.82, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 16 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="fixed inset-0 z-101 flex items-center justify-center p-4 pointer-events-none"
        >
          <div className="pointer-events-auto w-full max-w-md
                          rounded-2xl overflow-hidden
                          bg-white/90 dark:bg-slate-800/90
                          backdrop-blur-2xl
                          border border-white/80 dark:border-white/15
                          shadow-[0_24px_60px_rgba(0,0,0,0.18)]">

            {/* Red accent bar */}
            <div className="h-1 w-full"
              style={{ background: 'linear-gradient(90deg, #ef4444, #f97316)' }} />

            <div className="p-7">
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.12)' }}>
                  {/* Outer glow ring */}
                  <motion.div
                    animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.15, 0.5] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-2xl"
                    style={{ background: 'rgba(239,68,68,0.18)' }}
                  />
                  <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </motion.div>
              </div>

              {/* Text */}
              <div className="text-center mb-5">
                <h3 className="text-[17px] font-black text-gray-800 dark:text-white mb-2">
                  Delete Blog Post?
                </h3>
                <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  This action is permanent and cannot be undone.
                  The post will be removed immediately.
                </p>
              </div>

              {/* Post preview pill */}
              <div className="mb-6 px-4 py-3 rounded-xl
                              bg-gray-50 dark:bg-slate-700/50
                              border border-gray-100 dark:border-slate-600/50
                              flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(239,68,68,0.12)' }}>
                  <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-[12px] font-bold text-gray-600 dark:text-gray-300 truncate">
                  {post.blog_title}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  disabled={isDeleting}
                  className="flex-1 h-11 rounded-xl text-[13px] font-bold
                             text-gray-600 dark:text-gray-300
                             bg-gray-100/80 dark:bg-slate-700/60
                             border border-gray-200/60 dark:border-slate-600/50
                             hover:bg-gray-200/70 dark:hover:bg-slate-600/70
                             transition-all duration-200 active:scale-[0.97] disabled:opacity-50">
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={isDeleting}
                  className="flex-1 h-11 rounded-xl text-[13px] font-bold text-white
                             transition-all duration-200 active:scale-[0.97]
                             hover:-translate-y-0.5
                             shadow-[0_4px_14px_rgba(239,68,68,0.35)]
                             hover:shadow-[0_6px_20px_rgba(239,68,68,0.50)]
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
const Blog = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const filters = ['All', 'Published', 'Draft'];
  const { blogs, fetchBlogs, deleteBlog } = useBlogStore();

  const blogStats = [
    { label: 'Total Posts', icon: Feather.BookOpen, color: 'var(--color-primary)', bg: 'rgba(49,151,96,0.10)', value: blogs.length },
    { label: 'Published', icon: Feather.CheckCircle, color: 'var(--color-secondary)', bg: 'rgba(52,152,219,0.10)', value: blogs.filter(b => b.status === 1).length },
    { label: 'Drafts', icon: Feather.Edit3, color: '#E67E22', bg: 'rgba(230,126,34,0.10)', value: blogs.filter(b => b.status === 0).length },
    { label: 'Authors', icon: Feather.Users, color: '#8CC63F', bg: 'rgba(140,198,63,0.10)', value: [...new Set(blogs.map(b => b.author_name).filter(Boolean))].length },
  ];

  useEffect(() => {
    fetchBlogs();
  }, [])

  // const filtered = blogs.filter(p => {
  //   const q = search.toLowerCase();
  //   return (
  //     (p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
  //     (filter === 'All' || p.status === filter)
  //   );
  // });

  const filtered = blogs.filter((p) => {
    const q = search.toLowerCase();

    return (
      (
        p?.blog_title?.toLowerCase()?.includes(q) ||
        p?.author_name?.toLowerCase()?.includes(q)
        // p?.category?.toLowerCase()?.includes(q)
      ) &&
      (filter === "All" ||
        (filter === "Published" && p?.status === 1) ||
        (filter === "Draft" && p?.status === 0))
    );
  });

  const sortedBlogs = [...filtered].sort(
  (a, b) =>
    new Date(b.created_at) - new Date(a.created_at)
);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = sortedBlogs.slice((page - 1) * perPage, page * perPage);

  const handlePerPage = (val) => { setPerPage(val); setPage(1); };
  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleFilter = (val) => { setFilter(val); setPage(1); };



  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteBlog(deleteTarget.id);
      toast.success('Blog deleted successfully');
      setDeleteTarget(null);
      fetchBlogs();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete blog');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative space-y-7 min-h-screen">

      {/* Full circuit background removed as it is global now */}

      {/* Glass overlay — light frost so circuit stays readable at medium level */}
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* ── Page title ────────────────────────────────────────────────── */}
      <div className="relative z-10">
        <PageTitle
          title="Blog Management"
          breadcrumbs={[
            { label: 'CRM', path: '/admin/dashboard' },
            { label: 'Blog', active: true },
          ]}
        />
      </div>

      {/* ── Stat cards ────────────────────────────────────────────────── */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {blogStats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* ── Table card ────────────────────────────────────────────────── */}
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

              {/* Row 1: title + filter pills + search + Add button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
                <CardTitle>All Blog Posts</CardTitle>

                {/* Right controls */}
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
                  <div className="flex items-center gap-1.5 p-1 rounded-xl
                                  bg-gray-100/70 dark:bg-slate-700/50">
                    {filters.map(f => (
                      <button key={f} onClick={() => handleFilter(f)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${filter === f
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
                      placeholder="Search posts..."
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

                  {/* Add Blog button */}
                  <button
                    onClick={() => navigate('/admin/blog/add')}
                    className="flex items-center gap-1.5 h-9 px-4
                               text-white text-[13px] font-bold rounded-xl
                               transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]
                               shadow-[0_4px_14px_rgba(49,151,96,0.30)]
                               hover:shadow-[0_6px_20px_rgba(49,151,96,0.40)]"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                    <Feather.Plus className="w-3.5 h-3.5" />
                    Add Blog
                  </button>
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
                  <TH>Author</TH>
                  <TH>Image</TH>
                  <TH>Title</TH>
                  <TH>Created Date</TH>
                  <TH>Status</TH>
                  <TH className="text-right">Actions</TH>
                </TR>
              </THead>

              <TBody>
                {paginated.map((post, idx) => (
                  <motion.tr key={post.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b last:border-0 border-gray-100/60 dark:border-slate-700/30
                               relative transition-all duration-200 group/row
                               hover:shadow-[inset_3px_0_0_var(--color-primary)]"
                    style={{}}
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

                    {/* Author */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center
                                        text-white text-[11px] font-black shrink-0"
                          // style={{ background: `linear-gradient(135deg, ${post.img.from}, ${post.img.to})` }}
                          style={{
                            background: "linear-gradient(135deg,var(--color-primary),var(--color-secondary))"
                          }}>
                          {post.author_name?.charAt(0) || "A"}
                        </div>
                        <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                          {post.author_name}
                        </span>
                      </div>
                    </td>

                    {/* Image */}
                    {/* <td className="px-4 py-3.5">
                      <div className="w-16 h-11 rounded-xl overflow-hidden shrink-0 relative shadow-sm"
                        style={{ background: `linear-gradient(135deg, ${post.img.from}, ${post.img.to})` }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Feather.Image className="w-4 h-4 text-white/70" />
                        </div> */}
                    {/* Shine overlay */}
                    {/* <div className="absolute top-0 left-0 right-0 h-1/2
                                        bg-gradient-to-b from-white/20 to-transparent rounded-t-xl"/>
                      </div>
                    </td> */}

                    {/* Image */}
                    <td className="px-4 py-3.5">
                      <div className="w-16 h-11 rounded-xl overflow-hidden shrink-0 relative shadow-sm">
                        <img
                          src={post.blog_image ? `${import.meta.env.VITE_API_BASE_URL}/${post.blog_image}` : ''}
                          alt={post.blog_title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Title */}
                    <td className="px-4 py-3.5 max-w-[240px]">
                      <p className="text-[13px] font-bold text-gray-800 dark:text-white
                                    truncate leading-snug">
                        {post.blog_title}
                      </p>
                    </td>

                    {/* Category */}
                    {/* <td className="px-4 py-3.5">
                      <Badge variant={catVariant[post.category] || 'soft-secondary'} size="sm">
                        {post.category}
                      </Badge>
                    </td> */}

                    {/* Date */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <Feather.Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="text-[12px] font-medium text-gray-500">{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      {/* <Badge variant={statVariant[post.status]} size="sm"> */}
                      <Badge variant={post.status === 1 ? "soft-success" : "soft-warning"} size="sm">
                        {post.status === 1 ? "Published" : "Draft"}
                      </Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button title="View" onClick={() => navigate(`/admin/blog/view/${post.id}`)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center
                                     text-gray-400 hover:text-secondary
                                     hover:bg-secondary/10 transition-all duration-150">
                          <Feather.Eye className="w-[15px] h-[15px]" />
                        </button>
                        <button title="Edit"
                          onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center
                                     text-gray-400 hover:text-primary
                                     hover:bg-primary/10 transition-all duration-150">
                          <Feather.Edit2 className="w-[15px] h-[15px]" />
                        </button>
                        <button title="Delete"
                          onClick={() => setDeleteTarget(post)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center
                                     text-gray-400 hover:text-red-500
                                     hover:bg-red-50 dark:hover:bg-red-900/20
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
                          <Feather.BookOpen className="w-7 h-7 text-gray-300" />
                        </div>
                        <p className="text-sm font-bold text-gray-500">No Blogs found</p>
                        <p className="text-xs text-gray-400">Try adjusting your search</p>
                      </div>
                    </td>
                  </tr>
                )}
              </TBody>
            </TableContainer>

            <DataTablePagination page={page} totalPages={totalPages} total={filtered.length}
              perPage={perPage} onPage={setPage} />
          </CardBody>
        </Card>
      </motion.div>

      <DeleteModal
        post={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => !isDeleting && setDeleteTarget(null)}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default Blog;
