import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Feather from 'react-feather';
import { getCategoryById, createCategory, updateCategory } from '../data/categoryData';
import { useProductCategoryStore } from '../../../store/store';
import toast from 'react-hot-toast';

/* ── Circuit background ──────────────────────────────────────────────── */
const CircuitBg = () => (
  <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full
                    bg-gradient-to-bl from-primary/8 to-[#8CC63F]/5 blur-[130px]" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full
                    bg-gradient-to-tr from-secondary/8 to-primary/5 blur-[130px]" />
    <div className="absolute top-[35%] left-[25%] w-[360px] h-[360px] rounded-full
                    bg-[#E67E22]/4 blur-[110px]" />
    <svg className="w-full h-full opacity-[0.18]" viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cf-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.9" />
        </linearGradient>
        <filter id="cf-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect x="3%" y="6%" width="80" height="80" rx="7" stroke="url(#cf-g)" strokeWidth="2" fill="none" />
      <rect x="4%" y="7%" width="62" height="62" rx="4" fill="var(--color-primary)" opacity="0.06" />
      <rect x="88%" y="80%" width="72" height="72" rx="7" stroke="url(#cf-g)" strokeWidth="2" fill="none" />
      <circle cx="50%" cy="45%" r="240" stroke="var(--color-secondary)" strokeWidth="1.2" strokeDasharray="10,8" fill="none" />
      <circle cx="50%" cy="45%" r="320" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="14,12" fill="none" />
      <circle cx="50%" cy="45%" r="400" stroke="#E67E22" strokeWidth="1" strokeDasharray="5,14" fill="none" />
      <path d="M -80 280 L 320 280 L 400 360 L 680 360 L 760 440 L 1600 440"
        stroke="var(--color-secondary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M -80 300 L 310 300 L 390 380 L 670 380 L 750 460 L 1600 460"
        stroke="var(--color-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 240 0 L 240 160 L 320 240 L 560 240 L 620 300 L 620 1100"
        stroke="#E67E22" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 1060 0 L 1060 260 L 1000 320 H 780 L 720 380 L 720 1100"
        stroke="var(--color-primary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle r="4" fill="var(--color-secondary)" filter="url(#cf-glow)">
        <animateMotion dur="9s" repeatCount="indefinite"
          path="M -80 280 L 320 280 L 400 360 L 680 360 L 760 440 L 1600 440" />
      </circle>
      <circle r="3.5" fill="var(--color-primary)" filter="url(#cf-glow)">
        <animateMotion dur="8s" repeatCount="indefinite"
          path="M 240 0 L 240 160 L 320 240 L 560 240 L 620 300 L 620 1100" />
      </circle>
      <path d="M 36 36 H 100 M 36 36 V 100" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 1564 36 H 1500 M 1564 36 V 100" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 36 1064 H 100 M 36 1064 V 1000" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 1564 1064 H 1500 M 1564 1064 V 1000" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  </div>
);

/* ── Shared input/label styles ───────────────────────────────────────── */
const getInputCls = (error) =>
  `w-full h-11 px-4 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-200 ` +
  `bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm transition-all duration-200 ` +
  (error
    ? `border border-red-400 dark:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400/30 focus:border-red-400 `
    : `border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 `) +
  `placeholder:text-gray-300`;

const labelCls = 'block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.16em] mb-1.5';

/* ─────────────────────────────────────────────────────────────────────── */
const CategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const fileRef = useRef(null);

  const empty = {
    category_name: '',
    category_description: '',
    status: 1,
    log_status: 1,
    image: null,
    imagePreview: null,
  };
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const {
    createCategory,
    updateCategory,
    fetchSingleCategory,
    singleCategory,
  } = useProductCategoryStore();

  /* Pre-fill for edit */
  // useEffect(() => {
  //   if (isEdit) {
  //     const existing = getCategoryById(id);
  //     if (existing) {
  //       setForm({
  //         name: existing.name || '',
  //         description: existing.description || '',
  //         status: existing.status || 'Active',
  //         image: null,
  //         imagePreview: existing.image || null,
  //       });
  //     }
  //   }
  // }, [id, isEdit]);

  useEffect(() => {
    if (isEdit) {
      fetchSingleCategory(id);
    }
  }, [id]);

  useEffect(() => {
    if (isEdit && singleCategory) {
      setForm({
        category_name: singleCategory.category_name || '',
        category_description:
          singleCategory.category_description || '',
        status: singleCategory.status || 1,
        log_status: singleCategory.log_status || 1,
        image: null,
        imagePreview:  singleCategory.category_image ? `${import.meta.env.VITE_API_BASE_URL}/${singleCategory.category_image}` : null,
      });
    } else if (!isEdit) {
      setForm(empty);
    }
  }, [singleCategory, isEdit]);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    set('image', file);
    set('imagePreview', url);
  };

  const validate = () => {
    const e = {};
    if (!form.category_name?.trim()) e.category_name = 'Category name is required';
    if (!form.category_description?.trim()) e.category_description = 'Description is required';
    if (!isEdit && !form.image) e.image = 'Category image is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {

      const formData = new FormData();

      formData.append(
        "category_name",
        form.category_name.trim()
      );

      formData.append(
        "category_description",
        form.category_description.trim()
      );

      formData.append("status", form.status);

      formData.append("log_status", 1);

      if (form.image) {
        formData.append(
          "category_image",
          form.image
        );
      }

      if (isEdit) {

        await updateCategory(id, formData);

        toast.success(
          "Category updated successfully"
        );

      } else {

        await createCategory(formData);

        toast.success(
          "Category created successfully"
        );
      }

      setSaved(true);

      setTimeout(() => {
        navigate("/products/categories");
      }, 1000);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="relative space-y-7 min-h-screen pb-10">
      <CircuitBg />

      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* Page header */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
            {isEdit ? 'Edit Category' : 'Add Category'}
          </h1>
          <div className="flex items-center gap-1.5 mt-1">
            <button onClick={() => navigate('/products/dashboard')}
              className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">
              Products
            </button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300" />
            <button onClick={() => navigate('/products/categories')}
              className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">
              Categories
            </button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-[12px] font-bold text-primary">
              {isEdit ? 'Edit' : 'Add'}
            </span>
          </div>
        </div>

        <button onClick={() => navigate('/products/categories')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold
                     text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm
                     border border-gray-200/60 dark:border-slate-600/40
                     hover:border-secondary/40 hover:text-secondary shadow-sm transition-all duration-200">
          <Feather.ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Form card */}
      <motion.div className="relative z-10"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}>

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

              {/* Row 1: Name | Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Category Name */}
                <div className="md:col-span-2">
                  <label className={labelCls}>
                    Category Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.category_name}
                    onChange={e => set('category_name', e.target.value)}
                    placeholder="e.g. Electronics"
                    maxLength={80}
                    className={getInputCls(errors.category_name)}
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    {errors.category_name
                      ? <p className="text-[11px] text-red-400 font-semibold">{errors.category_name}</p>
                      : <span />}
                    <span className="text-[10px] text-gray-400 ml-auto">{form.category_name.length}/80</span>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className={labelCls}>
                    Status <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.status}
                    onChange={e => set('status', Number(e.target.value))}
                    className={getInputCls(errors.status)}
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Description + Image */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                {/* Description — 3 cols */}
                <div className="lg:col-span-3">
                  <label className={labelCls}>
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={form.category_description}
                    onChange={e => set('category_description', e.target.value)}
                    placeholder="Enter category description..."
                    rows={10}
                    maxLength={500}
                    className={
                      `w-full px-4 py-3 text-[13px] font-medium text-gray-700 dark:text-gray-200 ` +
                      `bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm ` +
                      `rounded-xl resize-none transition-all duration-200 placeholder:text-gray-300 ` +
                      (errors.category_description
                        ? `border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/30 `
                        : `border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 `)
                    }
                  />
                  <div className="flex items-center justify-between mt-1.5">
                    {errors.category_description
                      ? <p className="text-[11px] text-red-400 font-semibold">{errors.category_description}</p>
                      : <span />}
                    <span className="text-[10px] text-gray-400 ml-auto">{form.category_description.length}/500</span>
                  </div>
                </div>

                {/* Image upload — 2 cols */}
                <div className="lg:col-span-2">
                  <label className={labelCls}>
                    Category Image {!isEdit && <span className="text-red-400">*</span>}
                  </label>

                  <div
                    onClick={() => fileRef.current?.click()}
                    className={
                      `relative w-full rounded-xl overflow-hidden cursor-pointer border-2 border-dashed ` +
                      `transition-all duration-200 group ` +
                      (errors.image
                        ? `border-red-400 hover:border-red-500 `
                        : `border-gray-200/80 dark:border-slate-600/50 hover:border-primary/60 `)
                    }
                    style={{ height: '230px' }}
                  >
                    {form.imagePreview ? (
                      <>
                        <img src={form.imagePreview} alt="Preview" className="w-full h-full object-cover" />
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
                                        flex items-center justify-center shadow-sm
                                        group-hover:scale-105 transition-transform duration-200">
                          <Feather.Image className="w-6 h-6 text-gray-300" />
                        </div>
                        <div className="text-center">
                          <p className="text-[13px] font-bold text-gray-500 dark:text-gray-400">
                            Click to upload image
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">JPG, JPEG, PNG — max 5MB</p>
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
                    <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.image}</p>
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

            {/* Footer: Cancel + Save */}
            <div className="flex items-center justify-between px-6 lg:px-8 py-5
                            bg-gray-50/60 dark:bg-slate-800/30
                            border-t border-gray-100/60 dark:border-slate-700/40">
              <button
                type="button"
                onClick={() => navigate('/products/categories')}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl
                           text-[13px] font-bold text-white
                           transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)', boxShadow: '0 6px 20px rgba(231,76,60,0.30)' }}>
                <Feather.X className="w-4 h-4" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={saved}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl
                           text-[13px] font-bold text-white
                           transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]
                           disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)', boxShadow: '0 6px 20px rgba(49,151,96,0.30)' }}>
                {saved ? (
                  <>
                    <Feather.CheckCircle className="w-4 h-4" />
                    {isEdit ? 'Updated!' : 'Saved!'}
                  </>
                ) : (
                  <>
                    <Feather.Save className="w-4 h-4" />
                    {isEdit ? 'Update Category' : 'Save Category'}
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

export default CategoryForm;
