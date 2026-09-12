import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Feather from 'react-feather';
import { useProductCategoryStore } from '../../../store/store';


const CircuitBg = () => (
  <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-primary/8 to-[#8CC63F]/5 blur-[130px]"/>
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/8 to-primary/5 blur-[130px]"/>
    <svg className="w-full h-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cv-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.9"/>
        </linearGradient>
        <filter id="cv-glow">
          <feGaussianBlur stdDeviation="2" result="blur"/>
          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
        </filter>
      </defs>
      <rect x="3%" y="6%" width="80" height="80" rx="7" stroke="url(#cv-g)" strokeWidth="2" fill="none"/>
      <circle cx="50%" cy="48%" r="260" stroke="var(--color-secondary)" strokeWidth="1.2" strokeDasharray="10,8" fill="none"/>
      <circle cx="50%" cy="48%" r="340" stroke="var(--color-primary)" strokeWidth="1" strokeDasharray="14,12" fill="none"/>
      <path d="M -80 300 L 340 300 L 420 380 L 700 380 L 780 460 L 1600 460"
            stroke="var(--color-primary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M 260 0 L 260 180 L 340 260 L 580 260 L 640 320 L 640 1100"
            stroke="#E67E22" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle r="4" fill="var(--color-primary)" filter="url(#cv-glow)">
        <animateMotion dur="9s" repeatCount="indefinite"
          path="M -80 300 L 340 300 L 420 380 L 700 380 L 780 460 L 1600 460"/>
      </circle>
      <path d="M 36 36 H 100 M 36 36 V 100" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 1564 36 H 1500 M 1564 36 V 100" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 36 1064 H 100 M 36 1064 V 1000" stroke="var(--color-secondary)" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M 1564 1064 H 1500 M 1564 1064 V 1000" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" fill="none"/>
    </svg>
  </div>
);

const CategoryView = () => {
  const navigate     = useNavigate();
  const { id }       = useParams();

  const {
  singleCategory,
  fetchSingleCategory,
  loading,
} = useProductCategoryStore();

  useEffect(() => {
  if (id) {
    fetchSingleCategory(id);
  }
}, [id]);

const cat = singleCategory;

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Feather.Loader className="w-10 h-10 animate-spin text-primary mx-auto mb-3" />
        <p className="text-sm font-semibold text-gray-500">
          Loading category...
        </p>
      </div>
    </div>
  );
}

  if (!cat) return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Feather.Tag className="w-12 h-12 text-gray-300"/>
      <p className="font-bold text-gray-500">Category not found</p>
      <button onClick={() => navigate('/products/categories')}
        className="px-5 py-2 rounded-xl text-sm font-bold text-white"
        style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
        Back to Categories
      </button>
    </div>
  );

  const meta = [
    { icon: Feather.Tag,      label: 'Category Name', value: cat.category_name          },
    { icon: Feather.Activity, label: 'Status',        value: cat.status  === 1 ? 'Active' : "Inactive"      },
    { icon: Feather.Calendar, label: 'Created',       value: new Date(cat.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) },
    { icon: Feather.Hash,     label: 'Category ID',   value: `#CAT-${String(cat.id).slice(-4).padStart(4,'0')}` },
  ];

  return (
    <div className="relative space-y-6 min-h-screen pb-10">
      <CircuitBg />
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15"/>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Category Detail</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <button onClick={() => navigate('/products/dashboard')}
              className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">
              Products
            </button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300"/>
            <button onClick={() => navigate('/products/categories')}
              className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">
              Categories
            </button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300"/>
            <span className="text-[12px] font-bold text-primary">View</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/products/categories/edit/${cat.id}`)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white
                       transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))', boxShadow:'0 4px 14px rgba(49,151,96,0.25)' }}>
            <Feather.Edit2 className="w-4 h-4"/> Edit
          </button>
          <button onClick={() => navigate('/products/categories')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold
                       text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm
                       border border-gray-200/60 hover:border-primary/40 hover:text-primary
                       shadow-sm transition-all duration-200">
            <Feather.ArrowLeft className="w-4 h-4"/> Back
          </button>
        </div>
      </div>

      <motion.div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.4 }}>

        {/* Left: image + meta */}
        <div className="lg:col-span-1 space-y-4">

          {/* Image card */}
          <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-800/65 p-3">
            {cat.category_image ? (
              <img src={`${import.meta.env.VITE_API_BASE_URL}/${cat.category_image}`} alt={cat.category_name}
                   className="w-full h-[220px] object-cover rounded-xl"/>
            ) : (
              <div className="w-full h-[220px] rounded-xl flex flex-col items-center justify-center gap-3"
                   style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Feather.Tag className="w-7 h-7 text-white"/>
                </div>
                <span className="text-[13px] font-bold text-white/80">No image uploaded</span>
              </div>
            )}
          </div>

          {/* Meta card */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-5 space-y-4"
               style={{ boxShadow:'0 8px 32px rgba(49,151,96,0.06)' }}>
            <div className="h-[3px] -mt-5 -mx-5 mb-5 rounded-t-2xl"
                 style={{ background:'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }}/>
            {meta.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                     style={{ background:'rgba(49,151,96,0.10)' }}>
                  <Icon className="w-4 h-4" style={{ color:'var(--color-primary)' }}/>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{label}</p>
                  <p className="text-[13px] font-bold text-gray-700 dark:text-gray-200">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: content */}
        <div className="lg:col-span-2 space-y-4">

          {/* Title card */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-6"
               style={{ boxShadow:'0 8px 32px rgba(49,151,96,0.06)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background:'rgba(49,151,96,0.12)', color:'var(--color-primary)' }}>
                Category
              </span>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                cat.status === 1
                  ? 'bg-primary/10 text-primary'
                  : 'bg-[#E67E22]/10 text-[#E67E22]'
              }`}>
                {cat.status === 1 ? 'Active' : 'Inactive'}
              </span>
            </div>
            <h2 className="text-[22px] font-black text-gray-800 dark:text-white leading-snug tracking-tight">
              {cat.category_name}
            </h2>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100/60 dark:border-slate-700/40">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-black"
                   style={{ background:'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                {cat.category_name?.slice(0,2).toUpperCase()}
              </div>
              <span className="text-[12px] font-semibold text-gray-500">{cat.category_name}</span>
              <span className="text-gray-300">·</span>
              <span className="text-[12px] text-gray-400">
                {new Date(cat.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-6"
               style={{ boxShadow:'0 8px 32px rgba(49,151,96,0.06)' }}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.18em] mb-4">Description</p>
            <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.85] font-medium whitespace-pre-wrap">
              {cat.category_description || 'No description provided.'}
            </p>
          </div>

          {/* Action strip */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-5"
               style={{ boxShadow:'0 8px 32px rgba(49,151,96,0.06)' }}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-[12px] font-semibold text-gray-400">
                ID: <span className="font-black text-gray-600 dark:text-gray-300">
                  #CAT-{String(cat.id).slice(-4).padStart(4,'0')}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => navigate(`/products/categories/edit/${cat.id}`)}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold text-white
                             transition-all hover:-translate-y-0.5"
                  style={{ background:'linear-gradient(135deg,var(--color-primary),var(--color-secondary))', boxShadow:'0 4px 14px rgba(49,151,96,0.28)' }}>
                  <Feather.Edit2 className="w-3.5 h-3.5"/> Edit Category
                </button>
                <button onClick={() => navigate('/products/categories')}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold
                             text-gray-600 bg-gray-100/70 hover:bg-gray-200/70 transition-all">
                  <Feather.List className="w-3.5 h-3.5"/> All Categories
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CategoryView;
