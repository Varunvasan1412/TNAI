import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Feather from 'react-feather';
import JoditEditor from 'jodit-react';
import './blogForm.css'
import { useBlogStore } from '../../../store/store';
import { deleteBlogImageApi } from '../../../api/blogApi';
import toast from 'react-hot-toast';

/* ── Circuit background (same pattern as Blog list page) ─────────────── */
const CircuitBg = () => (
  <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full
                    bg-gradient-to-bl from-primary/8 to-[#8CC63F]/5 blur-[130px]" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full
                    bg-gradient-to-tr from-secondary/8 to-primary/5 blur-[130px]" />
    <div className="absolute top-[35%] left-[25%] w-[360px] h-[360px] rounded-full
                    bg-[#E67E22]/4 blur-[110px]" />
    <svg className="w-full h-full opacity-[0.18]" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bf-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.9" />
        </linearGradient>
        <filter id="bf-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect x="3%" y="6%" width="80" height="80" rx="7" stroke="url(#bf-g)" strokeWidth="2" fill="none" />
      <rect x="4%" y="7%" width="62" height="62" rx="4" fill="var(--color-primary)" opacity="0.06" />
      <path d="M 8 81  H 48" stroke="var(--color-primary)" strokeWidth="1.8" />
      <path d="M 8 108 H 48" stroke="var(--color-primary)" strokeWidth="1.8" />
      <path d="M 112 5 V 54" stroke="var(--color-secondary)" strokeWidth="1.8" />
      <path d="M 160 5 V 54" stroke="var(--color-secondary)" strokeWidth="1.8" />
      <rect x="88%" y="80%" width="72" height="72" rx="7" stroke="url(#bf-g)" strokeWidth="2" fill="none" />
      <circle cx="50%" cy="45%" r="240" stroke="var(--color-secondary)" strokeWidth="1.2" strokeDasharray="10,8" fill="none" />
      <circle cx="50%" cy="45%" r="320" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="14,12" fill="none" />
      <circle cx="50%" cy="45%" r="400" stroke="#E67E22" strokeWidth="1" strokeDasharray="5,14" fill="none" />
      <path d="M -80 280 L 320 280 L 400 360 L 680 360 L 760 440 L 1600 440" stroke="var(--color-secondary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M -80 300 L 310 300 L 390 380 L 670 380 L 750 460 L 1600 460" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 240 0 L 240 160 L 320 240 L 560 240 L 620 300 L 620 1100" stroke="#E67E22" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 1060 0 L 1060 260 L 1000 320 H 780 L 720 380 L 720 1100" stroke="var(--color-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle r="4" fill="var(--color-secondary)" filter="url(#bf-glow)">
        <animateMotion dur="9s" repeatCount="indefinite"
          path="M -80 280 L 320 280 L 400 360 L 680 360 L 760 440 L 1600 440" />
      </circle>
      <circle r="3.5" fill="var(--color-primary)" filter="url(#bf-glow)">
        <animateMotion dur="8s" repeatCount="indefinite"
          path="M 240 0 L 240 160 L 320 240 L 560 240 L 620 300 L 620 1100" />
      </circle>
      <circle r="3.5" fill="#E67E22" filter="url(#bf-glow)">
        <animateMotion dur="11s" repeatCount="indefinite"
          path="M 1060 0 L 1060 260 L 1000 320 H 780 L 720 380 L 720 1100" />
      </circle>
      <circle cx="320" cy="280" r="5" fill="var(--color-secondary)" />
      <circle cx="400" cy="360" r="5" fill="var(--color-secondary)" />
      <circle cx="680" cy="360" r="5" fill="var(--color-secondary)" />
      <circle cx="320" cy="240" r="4.5" fill="#E67E22" />
      <circle cx="560" cy="240" r="4.5" fill="#E67E22" />
      <circle cx="1000" cy="320" r="4.5" fill="var(--color-primary)" />
      <path d="M 36 36 H 100 M 36 36 V 100" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 1564 36 H 1500 M 1564 36 V 100" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 36 1064 H 100 M 36 1064 V 1000" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 1564 1064 H 1500 M 1564 1064 V 1000" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

/* ── Shared input style ───────────────────────────────────────────────── */
const getInputCls = (error) =>
  `w-full h-11 px-4 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-200 ` +
  `bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm transition-all duration-200 ` +
  (error
    ? `border border-red-400 dark:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 `
    : `border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 `) +
  `placeholder:text-gray-300`;

const labelCls = 'block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.16em] mb-1.5';

/* ─────────────────────────────────────────────────────────────────────── */

const joditConfig = {
  readonly: false,
  placeholder: "Enter blog description and content...",
  minHeight: 350,
  enableDragAndDropFileToEditor: true,
  uploader: {
    insertImageAsBase64URI: true
  },
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  defaultActionOnPaste: "insert_as_html",
  style: {
    background: 'rgba(255, 255, 255, 0.7)',
  }
};

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const fileRef = useRef(null);
  const multiFileRef = useRef(null);

  const { createBlog, updateBlog, fetchSingleBlog, singleBlog, loading } = useBlogStore();

  const empty = {
    author: '', title: '', status: 'Published', short_description: '', description: '',
    image: null, imagePreview: null, multiImages: [], multiImagesPreview: [], existingImages: []
  };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  /* Pre-fill for edit */
  // useEffect(() => {
  //   if (isEdit) {
  //     const post = blogPosts.find(p => String(p.id) === String(id));
  //     if (post) {
  //       setForm({
  //         author: post.author,
  //         title: post.title,
  //         // category:     post.category,
  //         status: post.status,
  //         description: post.description || '',
  //         image: null,
  //         imagePreview: null,
  //       });
  //     }
  //   }
  // }, [id, isEdit]);

  useEffect(() => {
    if (isEdit) {
      fetchSingleBlog(id);
    }
  }, [id]);

  useEffect(() => {

    if (singleBlog && isEdit) {

      setForm({
        author: singleBlog.author_name || "",
        title: singleBlog.blog_title || "",

        status:
          singleBlog.status === 1
            ? "Published"
            : "Draft",

        short_description:
          singleBlog.short_description || "",

        description:
          singleBlog.blog_description || "",

        image: null,

        imagePreview:
          singleBlog.blog_image
            ? `${import.meta.env.VITE_API_BASE_URL}/${singleBlog.blog_image}`
            : null,
            
        existingImages: singleBlog.images || [],
      });
    }

  }, [singleBlog]);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      e.target.value = '';
      return;
    }

    set('image', file);
    set('imagePreview', URL.createObjectURL(file));
  };

  const handleMultiImage = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const validFiles = [];
    const validPreviews = [];
    let hasError = false;

    files.forEach(file => {
      if (file.size > 3 * 1024 * 1024) {
        hasError = true;
      } else {
        validFiles.push(file);
        validPreviews.push(URL.createObjectURL(file));
      }
    });

    if (hasError) {
      toast.error('Some images exceeded the 3MB limit and were skipped');
    }

    set('multiImages', [...(form.multiImages || []), ...validFiles]);
    set('multiImagesPreview', [...(form.multiImagesPreview || []), ...validPreviews]);
    e.target.value = '';
  };

  const removeMultiImage = (index) => {
    const newFiles = [...(form.multiImages || [])];
    const newPreviews = [...(form.multiImagesPreview || [])];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    set('multiImages', newFiles);
    set('multiImagesPreview', newPreviews);
  };

  const removeExistingImage = async (index, imageId) => {
    if (!imageId) return;
    
    try {
      const response = await deleteBlogImageApi(imageId);
      toast.success(response?.message || 'Image deleted successfully');
      
      const newImages = [...(form.existingImages || [])];
      newImages.splice(index, 1);
      set('existingImages', newImages);
    } catch (error) {
      toast.error('Failed to delete image');
      console.error('Delete image error:', error);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.author?.trim()) e.author = 'Author name is required';
    if (!form.title?.trim()) e.title = 'Blog title is required';
    if (!form.description || !form.description.trim() || form.description === '<p><br></p>') e.description = 'Description is required';
    if (!isEdit && !form.image) e.image = 'Blog image is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const payload = {
        author_name: form.author,
        blog_title: form.title,
        short_description: form.short_description,
        blog_description: form.description,
        status: form.status === "Published" ? 1 : 0,
        type: "blog",
        log_status: 1
      };

      // Main image
      if (form.image) {
        payload.blog_image = await fileToBase64(form.image);
      }

      // Additional images
      if (form.multiImages && form.multiImages.length > 0) {
        const base64Images = await Promise.all(
          form.multiImages.map(img => fileToBase64(img))
        );
        payload.additional_images = base64Images;
      }
      let response;
      if (isEdit) {
        response = await updateBlog(id, payload);
      } else {
        response = await createBlog(payload);
      }

      toast.success(
        response.message ||
        (isEdit
          ? "Blog updated successfully"
          : "Blog created successfully")
      );

      setSaved(true);

      setTimeout(() => {
        navigate("/admin/blog");
      }, 1200);

    } catch (error) {

      console.log("FULL ERROR:", error.response);

      console.log("ERROR DATA:", error.response?.data);

      console.log(
        "VALIDATION ERRORS:",
        error.response?.data?.errors
      );

      // toast.error(
      //   error.response?.data?.message ||
      //   "Failed to create blog"
      // );
      const validationErrors =
        error.response?.data?.errors;

      if (validationErrors) {

        const firstError =
          Object.values(validationErrors)[0][0];

        toast.error(firstError);

      } else {

        toast.error(
          error.response?.data?.message ||
          "Failed to create blog"
        );
      }

      console.error(error);
    }
  };

  // const categories = ['Research', 'Industry', 'Trends', 'Technical', 'Platform'];
  const statuses = ['Published', 'Draft'];

  return (
    <div className="relative space-y-7 min-h-screen pb-10">
      <CircuitBg />

      {/* Glass overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* ── Page header ──────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
            {isEdit ? 'Edit Blog Post' : 'Add Blog Post'}
          </h1>
          <div className="flex items-center gap-1.5 mt-1">
            <button onClick={() => navigate('/admin/dashboard')}
              className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">
              CRM
            </button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300" />
            <button onClick={() => navigate('/admin/blog')}
              className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">
              Blog
            </button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-[12px] font-bold text-primary">
              {isEdit ? 'Edit' : 'Add'}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate('/admin/blog')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold
                     text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm
                     border border-gray-200/60 dark:border-slate-600/40
                     hover:border-secondary/40 hover:text-secondary shadow-sm transition-all duration-200">
          <Feather.ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* ── Form card ────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl overflow-hidden
                          bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl
                          border border-white/80 dark:border-white/15"
            style={{ boxShadow: '0 8px 40px rgba(49,151,96,0.10)' }}>

            {/* Gradient accent top line */}
            <div className="h-[3px] w-full"
              style={{ background: 'linear-gradient(90deg, var(--color-primary), #8CC63F, var(--color-secondary))' }} />

            <div className="p-6 lg:p-8 space-y-6">

              {/* ── Row 1: Author | Title | Status ─────────────────── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Author Name */}
                <div>
                  <label className={labelCls}>
                    Author Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.author}
                    onChange={e => set('author', e.target.value)}
                    placeholder="Enter author name"
                    maxLength={60}
                    className={getInputCls(errors.author)}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    {errors.author
                      ? <p className="text-[11px] text-red-400 font-semibold">{errors.author}</p>
                      : <span />}
                    <span className="text-[10px] text-gray-400 ml-auto">
                      {form.author.length}/60
                    </span>
                  </div>
                </div>

                {/* Blog Title */}
                <div>
                  <label className={labelCls}>
                    Blog Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={e => set('title', e.target.value)}
                    placeholder="Enter blog title"
                    maxLength={120}
                    className={getInputCls(errors.title)}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    {errors.title
                      ? <p className="text-[11px] text-red-400 font-semibold">{errors.title}</p>
                      : <span />}
                    <span className="text-[10px] text-gray-400 ml-auto">
                      {form.title.length}/120
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className={labelCls}>
                    Status <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.status}
                    onChange={e => set('status', e.target.value)}
                    className={getInputCls(errors.status)}
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* ── Row 2: Category ────────────────────────────────── */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className={labelCls}>Category</label>
                  <select
                    value={form.category}
                    onChange={e => set('category', e.target.value)}
                    className={inputCls}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div> */}

              {/* ── Row 2: Short Description ───────────────────────── */}
              <div>
                <label className={labelCls}>
                  Short Description (max 100 characters)
                </label>
                <textarea
                  value={form.short_description}
                  onChange={e => set('short_description', e.target.value.slice(0, 100))}
                  placeholder="Enter a brief summary (max 100 characters)..."
                  rows={2}
                  maxLength={100}
                  className={`w-full px-4 py-3 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-gray-300 resize-none transition-all duration-200`}
                />
                <div className="flex justify-end mt-1">
                  <span className={`text-[10px] font-semibold ${form.short_description.length >= 100 ? 'text-red-400' : 'text-gray-400'}`}>
                    {form.short_description.length}/100
                  </span>
                </div>
              </div>

              {/* ── Row 3: Description + Image ─────────────────────── */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* Description — 3 cols */}
                <div className="lg:col-span-3">
                  <label className={labelCls}>
                    Description <span className="text-red-400">*</span>
                  </label>

                  {/* Toolbar */}
                  {/* <div className="flex items-center gap-1 px-3 py-2 mb-0
                                  bg-white/60 dark:bg-slate-800/50 backdrop-blur-sm
                                  border border-gray-200/60 dark:border-slate-600/40
                                  rounded-t-xl border-b-0">
                    {[
                      { icon: Feather.Bold,        title: 'Bold'        },
                      { icon: Feather.Italic,      title: 'Italic'      },
                      { icon: Feather.Link,        title: 'Link'        },
                      { icon: Feather.List,        title: 'Bullet List' },
                      { icon: Feather.AlignLeft,   title: 'Align Left'  },
                    ].map(({ icon: Icon, title }) => (
                      <button key={title} type="button" title={title}
                        className="w-7 h-7 rounded-lg flex items-center justify-center
                                   text-gray-400 hover:text-primary hover:bg-primary/10
                                   transition-all duration-150">
                        <Icon className="w-3.5 h-3.5" />
                      </button>
                    ))}
                    <div className="h-4 w-px bg-gray-200 dark:bg-slate-600 mx-1" />
                    <select className="text-[11px] text-gray-500 dark:text-gray-400 bg-transparent
                                       border-none outline-none cursor-pointer font-medium">
                      <option>Paragraph</option>
                      <option>Heading 1</option>
                      <option>Heading 2</option>
                    </select>
                  </div>

                  <textarea
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    placeholder="Enter blog description and content..."
                    rows={10}
                    className="w-full px-4 py-3 text-[13px] font-medium
                               text-gray-700 dark:text-gray-200
                               bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm
                               border border-gray-200/70 dark:border-slate-600/50
                               rounded-b-xl
                               focus:outline-none focus:ring-2 focus:ring-primary/30
                               focus:border-primary/50
                               placeholder:text-gray-300
                               resize-none transition-all duration-200"
                  /> */}
                  <JoditEditor
                    value={form.description}
                    className="custom-jodit"
                    config={joditConfig}
                    onBlur={(newContent) => set('description', newContent)}
                    onChange={(newContent) => set('description', newContent)}
                  />
                  {errors.description && (
                    <p className="text-[11px] text-red-400 font-semibold mt-1.5">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Image upload — 2 cols */}
                <div className="lg:col-span-2">
                  <label className={labelCls}>
                    Blog Image {(!isEdit) && <span className="text-red-400">*</span>}
                  </label>

                  {/* Preview / Drop zone */}
                  <div
                    onClick={() => fileRef.current?.click()}
                    className={`relative w-full rounded-xl overflow-hidden cursor-pointer border-2 border-dashed transition-all duration-200 group ` +
                      (errors.image ? `border-red-400 hover:border-red-500 ` : `border-gray-200/80 dark:border-slate-600/50 hover:border-primary/60 `)}
                    style={{ height: '230px' }}
                  >
                    {form.imagePreview ? (
                      <>
                        <img
                          src={form.imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex items-center justify-center
                                        bg-black/40 opacity-0 group-hover:opacity-100
                                        transition-opacity duration-200">
                          <div className="flex items-center gap-2 text-white text-sm font-bold">
                            <Feather.RefreshCw className="w-4 h-4" />
                            Change Image
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3
                                      bg-gray-50/60 dark:bg-slate-800/40">
                        <div className="w-14 h-14 rounded-2xl bg-white/80 dark:bg-slate-700/60
                                        border border-gray-200/60 dark:border-slate-600/40
                                        flex items-center justify-center
                                        shadow-sm group-hover:scale-105 transition-transform duration-200">
                          <Feather.Image className="w-6 h-6 text-gray-300" />
                        </div>
                        <div className="text-center">
                          <p className="text-[13px] font-bold text-gray-500 dark:text-gray-400">
                            Click to upload image
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            JPG, JPEG, PNG — max 5MB
                          </p>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg text-[11px] font-bold text-white
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                          Browse File
                        </div>
                      </div>
                    )}
                  </div>

                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpg,image/jpeg,image/png"
                    onChange={handleImage}
                    className="hidden"
                  />
                  {errors.image && (
                    <p className="text-[11px] text-red-400 font-semibold mt-1.5">
                      {errors.image}
                    </p>
                  )}

                  {form.image && (
                    <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-xl
                                    bg-primary/8 border border-primary/20">
                      <Feather.CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="text-[11px] font-semibold text-primary truncate">
                        {form.image.name}
                      </span>
                      <button type="button"
                        onClick={() => { set('image', null); set('imagePreview', null); }}
                        className="ml-auto text-gray-400 hover:text-red-400 transition-colors shrink-0">
                        <Feather.X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Additional Images (Optional) ───────────────────────── */}
            <div className="px-6 lg:px-8 pb-8">
              <label className={labelCls}>
                Additional Images
              </label>

              <div
                onClick={() => multiFileRef.current?.click()}
                className="relative w-full rounded-xl overflow-hidden cursor-pointer border-2 border-dashed transition-all duration-200 group border-gray-200/80 dark:border-slate-600/50 hover:border-primary/60 flex items-center justify-center bg-gray-50/60 dark:bg-slate-800/40 p-6"
              >
                <div className="text-center flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-slate-700/60 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200 mb-3">
                    <Feather.Image className="w-5 h-5 text-gray-300" />
                  </div>
                  <p className="text-[13px] font-bold text-gray-500 dark:text-gray-400">
                    Click to add multiple images
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    JPG, JPEG, PNG — max 3MB each
                  </p>
                </div>
              </div>

              <input
                ref={multiFileRef}
                type="file"
                multiple
                accept="image/jpg,image/jpeg,image/png"
                onChange={handleMultiImage}
                className="hidden"
              />

              {isEdit && form.existingImages?.length > 0 && (
                <div className="mt-6 mb-4">
                  <p className="text-[12px] font-bold text-gray-500 mb-2">Existing Additional Images</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {form.existingImages.map((img, i) => {
                      const imagePath = img.image_path || img.path || img.url || img;
                      const src = typeof imagePath === 'string' && imagePath.startsWith('http') 
                        ? imagePath 
                        : `${import.meta.env.VITE_API_BASE_URL}/${imagePath}`;
                      
                      return (
                        <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 aspect-square">
                          <img src={src} alt={`existing ${i}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(i, img.id)}
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Feather.X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {form.multiImagesPreview?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {form.multiImagesPreview.map((preview, i) => (
                    <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 aspect-square">
                      <img src={preview} alt={`preview ${i}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeMultiImage(i)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Feather.X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Footer: Cancel + Save/Update ─────────────────────── */}
            <div className="flex items-center justify-between px-6 lg:px-8 py-5
                            bg-gray-50/60 dark:bg-slate-800/30
                            border-t border-gray-100/60 dark:border-slate-700/40">

              <button
                type="button"
                onClick={() => navigate('/admin/blog')}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl
                           text-[13px] font-bold text-white
                           transition-all duration-200
                           hover:-translate-y-0.5 active:scale-[0.97]"
                style={{
                  background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)',
                  boxShadow: '0 6px 20px rgba(231,76,60,0.30)',
                }}>
                <Feather.X className="w-4 h-4" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || saved}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl
                           text-[13px] font-bold text-white
                           transition-all duration-200
                           hover:-translate-y-0.5 active:scale-[0.97]
                           disabled:opacity-70"
                style={{
                  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                  boxShadow: '0 6px 20px rgba(49,151,96,0.30)',
                }}>
                {loading ? (
                  <>
                    <Feather.Loader className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : saved ? (
                  <>
                    <Feather.CheckCircle className="w-4 h-4" />
                    {isEdit ? 'Updated!' : 'Saved!'}
                  </>
                ) : (
                  <>
                    <Feather.Save className="w-4 h-4" />
                    {isEdit ? 'Update Post' : 'Save Post'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BlogForm;
