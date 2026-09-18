import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Feather from 'react-feather';
import { useProductCategoryStore, useProductSubcategoryStore } from '../../../store/store';

const SubcategoryView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    singleSubcategory,
    fetchSingleSubcategory,
    loading,
  } = useProductSubcategoryStore();

  const { categories, fetchCategories, } = useProductCategoryStore();

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchSingleSubcategory(id);
    }
  }, [id]);

  const sub = singleSubcategory;

  console.log("Sub :", sub);

const getCategoryName = (id) => {

  const category = categories.find(
    c => String(c.id) === String(id)
  );

  return category?.category_name || "—";
};

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Feather.Loader
            className="w-10 h-10 animate-spin text-primary mx-auto mb-3"
          />

          <p className="text-sm font-semibold text-gray-500">
            Loading subcategory...
          </p>
        </div>
      </div>
    );
  }


  if (!sub) return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Feather.Layers className="w-12 h-12 text-gray-300" />
      <p className="font-bold text-gray-500">Subcategory not found</p>
      <button onClick={() => navigate('/products/subcategories')}
        className="px-5 py-2 rounded-xl text-sm font-bold text-white"
        style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
        Back to Subcategories
      </button>
    </div>
  );

  const meta = [
    {
      icon: Feather.Layers,
      label: 'Subcategory',
      value: sub.sub_category_name,
    },

    {
      icon: Feather.Tag,
      label: 'Category',
      value: getCategoryName(sub.category_id) || '—',
    },

    {
      icon: Feather.Activity,
      label: 'Status',
      value: sub.status === 1
        ? 'Active'
        : 'Inactive',
    },

    {
      icon: Feather.Calendar,
      label: 'Created',
      value: new Date(
        sub.created_at
      ).toLocaleDateString(
        'en-US',
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }
      ),
    },

    {
      icon: Feather.Hash,
      label: 'ID',
      value:
        `#SUB-${String(sub.id)
          .slice(-4)
          .padStart(4, '0')}`,
    },
  ];


  return (
    <div className="relative space-y-6 min-h-screen pb-10">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-primary/8 to-[#8CC63F]/5 blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/8 to-primary/5 blur-[130px]" />
      </div>
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Subcategory Detail</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <button onClick={() => navigate('/products/dashboard')}
              className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">
              Products
            </button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300" />
            <button onClick={() => navigate('/products/subcategories')}
              className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">
              Subcategories
            </button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-[12px] font-bold text-primary">View</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/products/subcategories/edit/${sub.id}`)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white
                       transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))', boxShadow: '0 4px 14px rgba(49,151,96,0.25)' }}>
            <Feather.Edit2 className="w-4 h-4" /> Edit
          </button>
          <button onClick={() => navigate('/products/subcategories')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold
                       text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm
                       border border-gray-200/60 hover:border-primary/40 hover:text-primary
                       shadow-sm transition-all duration-200">
            <Feather.ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>

      <motion.div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>

        {/* Left: icon hero + meta */}
        <div className="lg:col-span-1 space-y-4">

          {/* Hero card */}
          <div className="rounded-2xl overflow-hidden bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-1"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.08)' }}>
            <div className="w-full h-[180px] rounded-xl flex flex-col items-center justify-center gap-3"
              style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
                <Feather.Layers className="w-9 h-9 text-white" />
              </div>
              <div className="text-center">
                <p className="text-white font-black text-[15px]">{sub.sub_category_name}</p>
                <p className="text-white/70 text-[12px] font-medium mt-0.5">{getCategoryName(sub.category_id)}</p>
              </div>
            </div>
          </div>

          {/* Meta card */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-5 space-y-4"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
            <div className="h-[3px] -mt-5 -mx-5 mb-5 rounded-t-2xl"
              style={{ background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }} />
            {meta.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(49,151,96,0.10)' }}>
                  <Icon className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
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
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(52,152,219,0.12)', color: 'var(--color-secondary)' }}>
                {getCategoryName(sub.category_id)}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(49,151,96,0.12)', color: 'var(--color-primary)' }}>
                Subcategory
              </span>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${sub.status === 1 ? 'bg-primary/10 text-primary' : 'bg-[#E67E22]/10 text-[#E67E22]'
                }`}>
                {sub.status === 1
                  ? 'Active'
                  : 'Inactive'}
              </span>
            </div>
            <h2 className="text-[22px] font-black text-gray-800 dark:text-white leading-snug tracking-tight">
              {sub.sub_category_name}
            </h2>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100/60 dark:border-slate-700/40">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-black"
                style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                {sub.sub_category_name?.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-[12px] font-semibold text-gray-500">{getCategoryName(sub.category_id)}</span>
              <span className="text-gray-300">·</span>
              <span className="text-[12px] text-gray-400">{new Date(sub.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-6"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.18em] mb-4">Description</p>
            <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.85] font-medium whitespace-pre-wrap">
              {sub.sub_category_description || 'No description provided.'}
            </p>
          </div>

          {/* Divisions card — only if hasDivisions */}
          {sub.divisions?.length > 0 && (
            <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                            backdrop-blur-2xl border border-white/80 dark:border-white/15 p-6"
              style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                  <Feather.Grid className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.18em]">
                  Divisions ({sub.divisions.length})
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {sub.divisions.map((div, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 22 }}
                    className="flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-xl
                               bg-gradient-to-r from-primary/8 to-secondary/6
                               border border-primary/20 dark:border-primary/15">
                    <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                      <Feather.Grid className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-[13px] font-bold text-gray-700 dark:text-gray-200">{div.division_name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Action strip */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65
                          backdrop-blur-2xl border border-white/80 dark:border-white/15 p-5"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-[12px] font-semibold text-gray-400">
                ID: <span className="font-black text-gray-600 dark:text-gray-300">
                  #SUB-{String(sub.id).slice(-4).padStart(4, '0')}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => navigate(`/products/subcategories/edit/${sub.id}`)}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold text-white
                             transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))', boxShadow: '0 4px 14px rgba(49,151,96,0.28)' }}>
                  <Feather.Edit2 className="w-3.5 h-3.5" /> Edit Subcategory
                </button>
                <button onClick={() => navigate('/products/subcategories')}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold
                             text-gray-600 bg-gray-100/70 hover:bg-gray-200/70 transition-all">
                  <Feather.List className="w-3.5 h-3.5" /> All Subcategories
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubcategoryView;
