import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Feather from 'react-feather';
import { useProductCategoryStore, useProductSubcategoryStore } from '../../../store/store';
import toast from 'react-hot-toast';

/* ── Styles ─────────────────────────────────────────────────────────── */
const getInputCls = (error) =>
  `w-full h-11 px-4 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-200 ` +
  `bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm transition-all duration-200 ` +
  (error
    ? `border border-red-400 dark:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400/30 `
    : `border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 `) +
  `placeholder:text-gray-300`;

const labelCls = 'block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.16em] mb-1.5';

/* ─────────────────────────────────────────────────────────────────────── */
const SubcategoryForm = () => {
  const navigate  = useNavigate();
  const { id }    = useParams();
  const isEdit    = Boolean(id);
  const divRef    = useRef(null);

  const {
  categories,
  fetchCategories,
} = useProductCategoryStore();

const {
  createSubcategory,
  updateSubcategory,
  fetchSingleSubcategory,
  singleSubcategory,
} = useProductSubcategoryStore();


  const empty = {
  categoryId: '',
  name: '',
  description: '',
  status: 1,
  hasDivisions: false,
  divisions: [],
};

  const [form, setForm]       = useState(empty);
  const [errors, setErrors]   = useState({});
  const [divInput, setDivInput] = useState('');
  const [saved, setSaved]     = useState(false);

 
useEffect(() => {

  fetchCategories();

  if (isEdit) {
    fetchSingleSubcategory(id);
  }

}, [id]);

useEffect(() => {

  if (isEdit && singleSubcategory) {

    setForm({
      categoryId:
        String(singleSubcategory.category_id || ''),

      name:
        singleSubcategory.sub_category_name || '',

      description:
        singleSubcategory.sub_category_description || '',

      status:
        singleSubcategory.status || 1,

      hasDivisions:
        singleSubcategory.divisions?.length > 0,

      divisions: singleSubcategory.divisions?.map(d => d.division_name) || [],
    });

  } else if (!isEdit) {
    setForm(empty);
  }

}, [singleSubcategory, isEdit]);



  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    const cat   = categories.find(c => String(c.id) === catId);
    setForm(f => ({ ...f, categoryId: catId, categoryName: cat ? cat.category_name : '' }));
    if (errors.categoryId) setErrors(e => ({ ...e, categoryId: '' }));
  };

  const addDivision = () => {
    const val = divInput.trim();
    if (!val) return;
    if (form.divisions.includes(val)) return;
    set('divisions', [...form.divisions, val]);
    setDivInput('');
    divRef.current?.focus();
  };

  const removeDivision = (idx) => {
    set('divisions', form.divisions.filter((_, i) => i !== idx));
  };

  const handleDivKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addDivision(); }
  };

  const validate = () => {
    const e = {};
    if (!form.categoryId)      e.categoryId  = 'Please select a category';
    if (!form.name?.trim())    e.name        = 'Subcategory name is required';
    if (!form.description?.trim()) e.description = 'Description is required';
    if (form.hasDivisions && form.divisions.length === 0)
      e.divisions = 'Add at least one division or uncheck the checkbox';
    setErrors(e);
    return Object.keys(e).length === 0;
  };


const handleSubmit = async (e) => {

  e.preventDefault();

  if (!validate()) return;

  try {

    const formData = new FormData();

    formData.append(
      "category_id",
      Number(form.categoryId)
    );

    formData.append(
      "sub_category_name",
      form.name.trim()
    );

    formData.append(
      "sub_category_description",
      form.description.trim()
    );

    formData.append(
      "status",
      form.status
    );

    formData.append(
      "log_status",
      1
    );

    // divisions
    if (form.hasDivisions) {

      form.divisions.forEach((div, index) => {

        formData.append(
          `divisions[${index}][division_name]`,
          div
        );

        formData.append(
          `divisions[${index}][status]`,
          1
        );

        formData.append(
          `divisions[${index}][log_status]`,
          1
        );
      });
    }

    if (isEdit) {

      await updateSubcategory(id, formData);

      toast.success(
        "Subcategory updated successfully"
      );

    } else {

      await createSubcategory(formData);

      toast.success(
        "Subcategory created successfully"
      );
    }

    setSaved(true);

    setTimeout(() => {
      navigate("/products/subcategories");
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
      {/* Ambient bg */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-primary/8 to-[#8CC63F]/5 blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/8 to-primary/5 blur-[130px]" />
      </div>
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* Page header */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
            {isEdit ? 'Edit Subcategory' : 'Add Subcategory'}
          </h1>
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
            <span className="text-[12px] font-bold text-primary">{isEdit ? 'Edit' : 'Add'}</span>
          </div>
        </div>
        <button onClick={() => navigate('/products/subcategories')}
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

            {/* Gradient accent */}
            <div className="h-[3px] w-full"
                 style={{ background: 'linear-gradient(90deg, var(--color-primary), #8CC63F, var(--color-secondary))' }} />

            <div className="p-6 lg:p-8 space-y-6">

              {/* Row 1: Category | Name | Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Category dropdown */}
                <div>
                  <label className={labelCls}>
                    Category <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.categoryId}
                      onChange={handleCategoryChange}
                      className={getInputCls(errors.categoryId) + ' pr-9 appearance-none cursor-pointer'}
                    >
                      <option value="">Select category...</option>
                      {categories
                        .filter(c => c.status === 1)
                        .map(c => (
                          <option key={c.id} value={String(c.id)}>{c.category_name}</option>
                        ))}
                    </select>
                    <Feather.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.categoryId && (
                    <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.categoryId}</p>
                  )}
                </div>

                {/* Subcategory Name */}
                <div>
                  <label className={labelCls}>
                    Subcategory Name <span className="text-red-400">*</span>
                  </label>
                  <input type="text" value={form.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="e.g. Microcontrollers"
                    maxLength={80}
                    className={getInputCls(errors.name)} />
                  {errors.name && (
                    <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.name}</p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className={labelCls}>
                    Status <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select value={form.status}  onChange={e => set('status', Number(e.target.value))}
                      className={getInputCls('') + ' pr-9 appearance-none cursor-pointer'}>
                      <option value={1}>Active</option>
<option value={0}>Inactive</option>
                    </select>
                    <Feather.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 2: Description */}
              <div>
                <label className={labelCls}>
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea value={form.description}
                  onChange={e => set('description', e.target.value)}
                  placeholder="Enter subcategory description..."
                  rows={4}
                  maxLength={500}
                  className={
                    `w-full px-4 py-3 text-[13px] font-medium text-gray-700 dark:text-gray-200 ` +
                    `bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm ` +
                    `rounded-xl resize-none transition-all duration-200 placeholder:text-gray-300 ` +
                    (errors.description
                      ? `border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/30 `
                      : `border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 `)
                  }
                />
                <div className="flex items-center justify-between mt-1.5">
                  {errors.description
                    ? <p className="text-[11px] text-red-400 font-semibold">{errors.description}</p>
                    : <span />}
                  <span className="text-[10px] text-gray-400 ml-auto">{form.description.length}/500</span>
                </div>
              </div>

              {/* Row 3: Divisions section */}
              <div>
                {/* Divider */}
                <div className="h-px bg-gray-100/80 dark:bg-slate-700/40 mb-5" />

                {/* Checkbox toggle */}
                <label className="inline-flex items-center gap-3 cursor-pointer group select-none">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.hasDivisions}
                      onChange={e => {
                        set('hasDivisions', e.target.checked);
                        if (!e.target.checked) set('divisions', []);
                      }}
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full transition-all duration-300 border-2
                                    ${form.hasDivisions
                                        ? 'border-primary'
                                        : 'bg-gray-200 dark:bg-slate-600 border-transparent'}`}
                         style={form.hasDivisions ? { background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' } : {}}>
                      <div className={`absolute top-[2px] w-4 h-4 rounded-full bg-white shadow-md
                                       transition-all duration-300
                                       ${form.hasDivisions ? 'left-[22px]' : 'left-[2px]'}`} />
                    </div>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-700 dark:text-gray-200 leading-none">
                      This subcategory has divisions
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      e.g. UG, PG, Certificate — classify products further within this subcategory
                    </p>
                  </div>
                </label>

                {/* Divisions input panel */}
                <AnimatePresence>
                  {form.hasDivisions && (
                    <motion.div
                      key="divs"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden">

                      <div className="rounded-2xl border border-primary/20 dark:border-primary/15
                                      bg-primary/4 dark:bg-primary/5 p-5 space-y-4">

                        {/* Section header */}
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                               style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                            <Feather.Grid className="w-3 h-3 text-white" />
                          </div>
                          <p className="text-[12px] font-black uppercase tracking-widest text-primary">
                            Add Divisions
                          </p>
                        </div>

                        {/* Input + Add button */}
                        <div className="flex gap-2">
                          <input
                            ref={divRef}
                            type="text"
                            value={divInput}
                            onChange={e => setDivInput(e.target.value)}
                            onKeyDown={handleDivKeyDown}
                            placeholder="Type division name and press Enter or click Add..."
                            className="flex-1 h-10 px-4 rounded-xl text-[13px] font-medium
                                       bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm
                                       border border-gray-200/70 dark:border-slate-600/50
                                       focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50
                                       placeholder:text-gray-300 transition-all"
                          />
                          <button type="button" onClick={addDivision}
                            className="flex items-center gap-1.5 h-10 px-4 rounded-xl text-[12px] font-bold text-white
                                       transition-all hover:-translate-y-0.5 active:scale-[0.97] shrink-0"
                            style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))', boxShadow:'0 4px 12px rgba(49,151,96,0.25)' }}>
                            <Feather.Plus className="w-3.5 h-3.5" />
                            Add
                          </button>
                        </div>

                        {/* Divisions list */}
                        {form.divisions.length > 0 ? (
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
                              {form.divisions.length} division{form.divisions.length !== 1 ? 's' : ''} added
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {form.divisions.map((div, i) => (
                                <motion.div
                                  key={`${div}-${i}`}
                                  initial={{ opacity: 0, scale: 0.7 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.7 }}
                                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                                  className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl
                                             bg-white/90 dark:bg-slate-800/80
                                             border border-primary/25 dark:border-primary/20
                                             shadow-sm group/chip">
                                  <div className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                                       style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                                    <Feather.Grid className="w-2.5 h-2.5 text-white" />
                                  </div>
                                  <span className="text-[12px] font-bold text-gray-700 dark:text-gray-200">
                                    {div}
                                  </span>
                                  <button type="button" onClick={() => removeDivision(i)}
                                    className="w-4 h-4 rounded flex items-center justify-center ml-0.5
                                               text-gray-300 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
                                               transition-all duration-150">
                                    <Feather.X className="w-3 h-3" />
                                  </button>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 py-5 rounded-xl
                                          bg-white/50 dark:bg-slate-800/30 border border-dashed border-gray-200 dark:border-slate-600/40">
                            <Feather.Grid className="w-5 h-5 text-gray-300" />
                            <p className="text-[12px] text-gray-400">No divisions yet — type a name above and click Add</p>
                          </div>
                        )}

                        {errors.divisions && (
                          <p className="text-[11px] text-red-400 font-semibold">{errors.divisions}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 lg:px-8 py-5
                            bg-gray-50/60 dark:bg-slate-800/30
                            border-t border-gray-100/60 dark:border-slate-700/40">
              <button type="button" onClick={() => navigate('/products/subcategories')}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-[13px] font-bold text-white
                           transition-all hover:-translate-y-0.5 active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #E74C3C, #C0392B)', boxShadow:'0 6px 20px rgba(231,76,60,0.30)' }}>
                <Feather.X className="w-4 h-4" />
                Cancel
              </button>

              <button type="submit" disabled={saved}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-[13px] font-bold text-white
                           transition-all hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', boxShadow:'0 6px 20px rgba(49,151,96,0.30)' }}>
                {saved ? (
                  <><Feather.CheckCircle className="w-4 h-4" />{isEdit ? 'Updated!' : 'Saved!'}</>
                ) : (
                  <><Feather.Save className="w-4 h-4" />{isEdit ? 'Update Subcategory' : 'Save Subcategory'}</>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SubcategoryForm;
