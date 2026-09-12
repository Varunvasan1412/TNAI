import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as Feather from 'react-feather';
import './productForm.css';
import { useProductCategoryStore, useProductStore, useProductSubcategoryStore } from '../../../store/store';

const SECTION_LABELS = {
  introduction: { label: 'Introduction', icon: Feather.BookOpen },
  application: { label: 'Application', icon: Feather.Cpu },
  orderInformation: { label: 'Order Information', icon: Feather.ShoppingCart },
  customization: { label: 'Customization', icon: Feather.Sliders },
  kitContents: { label: 'Kit Contents', icon: Feather.Box },
  keyFeatures: { label: 'Key Features', icon: Feather.Star },
  resources: { label: 'Resources', icon: Feather.Download },
};

// Maps API section titles → internal keys used by the renderer
const SECTION_KEY_MAP = {
  'Introduction': 'introduction',
  'Application': 'application',
  'Order Information': 'orderInformation',
  'Customization': 'customization',
  'Kit Contents': 'kitContents',
  'Key Features': 'keyFeatures',
  'Resources': 'resources',
};

// Strips server-generated timestamp prefix and hash suffix to recover a readable filename
// e.g. "1781864651_datasheet_6a3518cb341d7.pdf" → "datasheet.pdf"
const cleanServerName = (path) => {
  const raw = (path || '').split('/').pop();
  const cleaned = raw.replace(/^\d+_/, '').replace(/_[a-f0-9]{8,}(\.[^.]+)$/, '$1');
  return cleaned || raw;
};

const parseJsonTable = (str) => {
  try {
    const rows = JSON.parse(str || '[]');
    if (!Array.isArray(rows) || !rows.length) return null;
    const headers = Object.keys(rows[0]);
    return { headers, rows: rows.map(r => headers.map(h => String(r[h] ?? ''))) };
  } catch { return null; }
};

/* ── Render HTML rich text ─────────────────────────────────────────── */
const RichContent = ({ html }) => (
  <div className="product-content" dangerouslySetInnerHTML={{ __html: html }} />
);

/* ── Order Info Table ──────────────────────────────────────────────── */
const OrderTable = ({ table }) => {
  if (!table?.headers?.length) return null;
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200/60 dark:border-slate-600/50 mt-4">
      <table className="w-full">
        <thead>
          <tr style={{ background: 'linear-gradient(135deg,rgba(49,151,96,0.08),rgba(52,152,219,0.06))' }}>
            {table.headers.map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left text-[11px] font-black text-primary uppercase tracking-wider border-r last:border-r-0 border-gray-200/50">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, ri) => (
            <tr key={ri} className={`border-t border-gray-100/60 ${ri % 2 === 1 ? 'bg-gray-50/40 dark:bg-slate-800/20' : ''}`}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-2.5 text-[13px] font-medium text-gray-600 dark:text-gray-300 border-r last:border-r-0 border-gray-100/60">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const IS_3D_URL = (url) => /\.(glb|gltf|obj|fbx|stl|usdz)(\?.*)?$/i.test(url || '');

/* ─────────────────────────────────────────────────────────────────────── */
const ProductView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imgIdx, setImgIdx] = useState(0);

  const { singleProduct, fetchSingleProduct, loading, } = useProductStore();
  const { categories, fetchCategories } = useProductCategoryStore();

  const { subcategories, fetchSubcategories } = useProductSubcategoryStore();

  const prod = singleProduct;

  useEffect(() => {
    fetchCategories();

    fetchSubcategories();

    if (id) {
      fetchSingleProduct(id);
    }
  }, [id]);



  // Must be called before any early returns (Rules of Hooks)
  const { enabledSections, sectionContent } = React.useMemo(() => {
    if (!prod) return { enabledSections: [], sectionContent: {} };
    const apiSections = prod.sections || [];
    if (apiSections.length > 0) {
      const sorted = [...apiSections].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
      const keys = [];
      const content = {};
      sorted.forEach(sec => {
        const key = SECTION_KEY_MAP[sec.title] || `custom_${sec.id}`;
        const fields = (sec.fields || []).sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
        keys.push(key);
        if (key === 'orderInformation') {
          const tf = fields.find(f => f.field_type === 'text');
          const tbl = fields.find(f => f.field_type === 'table');
          content[key] = tf?.field_value || '';
          if (tbl?.field_value) content.orderInformationTable = parseJsonTable(tbl.field_value);
        } else if (key === 'resources') {
          content[key] = fields.map(f => ({
            id: f.id,
            label: f.field_label || '',
            file: (f.file_path || f.field_value)
              ? { name: f.field_value || cleanServerName(f.file_path), file_path: f.file_path || null, url: f.file_path ? `${import.meta.env.VITE_API_BASE_URL}/${f.file_path}` : null }
              : null,
          }));
        } else if (!SECTION_KEY_MAP[sec.title]) {
          // Custom section — store first field value
          const first = fields[0];
          if (first?.field_type === 'table') {
            content[key] = parseJsonTable(first.field_value);
          } else if (first?.field_type === 'image') {
            content[key] = first.file_path
              ? `${import.meta.env.VITE_API_BASE_URL}/${first.file_path}`
              : (first.field_value || null);
          } else if (first?.field_type === 'file') {
            content[key] = (first.file_path || first.field_value)
              ? { name: first.field_value || cleanServerName(first.file_path), url: first.file_path ? `${import.meta.env.VITE_API_BASE_URL}/${first.file_path}` : null }
              : null;
          } else {
            content[key] = first?.field_value || '';
          }
          // Attach title/type so renderer can use it
          content[`${key}__meta`] = { title: sec.title, type: first?.field_type };
        } else {
          content[key] = fields[0]?.field_value || '';
        }
      });
      return { enabledSections: keys, sectionContent: content };
    }
    // Old format fallback
    return {
      enabledSections: Object.entries(prod.sectionEnabled || {}).filter(([, v]) => v).map(([k]) => k),
      sectionContent: prod.sectionContent || {},
    };
  }, [prod]);

  if (loading && !prod) return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Feather.Loader className="w-8 h-8 text-primary animate-spin" />
      <p className="font-bold text-gray-500">Loading product...</p>
    </div>
  );

  if (!prod) return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <Feather.Package className="w-12 h-12 text-gray-300" />
      <p className="font-bold text-gray-500">Product not found</p>
      <button onClick={() => navigate('/products/manage')}
        className="px-5 py-2 rounded-xl text-sm font-bold text-white"
        style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
        Back to Products
      </button>
    </div>
  );

  const validImages =
    prod.images?.map((img) => {
      if (typeof img === "string") return img;
      if (img?.image_path) return `${import.meta.env.VITE_API_BASE_URL}/${img.image_path}`;
      return null;
    }).filter(Boolean) || [];

  const prodName = prod.product_name || prod.name || '';
  const categoryObj = categories.find(
    c => String(c.id) === String(prod.category_id)
  );

  const subcategoryObj = subcategories.find(
    s => String(s.id) === String(prod.subcategory_id)
  );

  const divisionObj = subcategoryObj?.divisions?.find(
    d => String(d.id) === String(prod.division_id)
  );

  const prodCat =
    categoryObj?.category_name || '';

  const prodSub =
    subcategoryObj?.sub_category_name || '';

  const prodDiv =
    divisionObj?.division_name || '';
  const prodStatus = (prod.status === 1 || prod.status === 'Active') ? 'Active' : 'Inactive';
  const prodDate = prod.created_at || prod.createdAt;
  const prodDesc = prod.product_description || prod.description || '';
  const prodKeyFeatures = prod.key_features || prod.keyFeatures || [];

  const meta = [
    { icon: Feather.Package, label: 'Product', value: prodName },
    { icon: Feather.Tag, label: 'Category', value: prodCat || '—' },
    { icon: Feather.Layers, label: 'Subcategory', value: prodSub || '—' },
    ...(prodDiv ? [{ icon: Feather.GitBranch, label: 'Division', value: prodDiv }] : []),
    { icon: Feather.Activity, label: 'Status', value: prodStatus },
    { icon: Feather.Calendar, label: 'Created', value: prodDate ? new Date(prodDate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '—' },
    { icon: Feather.Hash, label: 'Product ID', value: `#PRD-${String(prod.id).slice(-4).padStart(4, '0')}` },
    ...(prod.part_number ? [{ icon: Feather.Layers, label: 'Part No', value: prod.part_number }] : []),
  ];

  return (
    <div className="relative space-y-6 min-h-screen pb-10">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-primary/8 to-[#8CC63F]/5 blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/8 to-primary/5 blur-[130px]" />
      </div>
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-br from-white/20 via-white/15 to-white/10 dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">Product Detail</h1>
          <div className="flex items-center gap-1.5 mt-1">
            <button onClick={() => navigate('/products/dashboard')} className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">Products</button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300" />
            <button onClick={() => navigate('/products/manage')} className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">Products</button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-[12px] font-bold text-primary">View</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/products/manage/edit/${prod.id}`)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))', boxShadow: '0 4px 14px rgba(49,151,96,0.25)' }}>
            <Feather.Edit2 className="w-4 h-4" /> Edit
          </button>
          <button onClick={() => navigate('/products/manage')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-gray-600 dark:text-gray-300
                       bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200/60
                       hover:border-primary/40 hover:text-primary shadow-sm transition-all">
            <Feather.ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>
      </div>

      <motion.div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

        {/* ── Left ──────────────────────────────────────────────────── */}
        <div className="lg:col-span-1 space-y-4">

          {/* Image gallery */}
          <div className="rounded-2xl overflow-hidden bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl border border-white/80 dark:border-white/15 p-2"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.08)' }}>
            {validImages.length > 0 ? (
              <div>
                <div className="w-full rounded-xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  {IS_3D_URL(validImages[imgIdx]) ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 border border-[#5156be]/15"
                         style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg,rgba(81,86,190,0.05),rgba(52,152,219,0.07))' }}>
                      <div className="relative">
                        <div className="w-24 h-24 rounded-2xl flex items-center justify-center border border-[#5156be]/15"
                             style={{ background: 'linear-gradient(135deg,rgba(81,86,190,0.10),rgba(52,152,219,0.10))' }}>
                          <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                            <polygon points="12,2 22,7 12,12 2,7" fill="#5156be" fillOpacity="0.25" stroke="#5156be" strokeWidth="1.4"/>
                            <polygon points="2,7 2,17 12,22 12,12" fill="#5156be" fillOpacity="0.10" stroke="#5156be" strokeWidth="1.4"/>
                            <polygon points="22,7 22,17 12,22 12,12" fill="var(--color-secondary)" fillOpacity="0.25" stroke="var(--color-secondary)" strokeWidth="1.4"/>
                          </svg>
                        </div>
                        <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-md text-[9px] font-black text-white tracking-wider"
                             style={{ background: 'linear-gradient(135deg,#5156be,var(--color-secondary))' }}>
                          {validImages[imgIdx].split('.').pop()?.toUpperCase().split('?')[0]}
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-[13px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">3D Model</p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">Preview not available in browser</p>
                      </div>
                    </div>
                  ) : (
                    <img src={validImages[imgIdx]} alt={prod.name} className="w-full h-full object-cover" />
                  )}
                </div>
                {validImages.length > 1 && (
                  <div className="flex gap-2 mt-2 px-1">
                    {validImages.map((img, i) => (
                      <button key={i} onClick={() => setImgIdx(i)}
                        className={`flex-1 rounded-lg overflow-hidden border-2 transition-all ${imgIdx === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        style={{ aspectRatio: '1' }}>
                        {IS_3D_URL(img) ? (
                          <div className="w-full h-full flex items-center justify-center"
                               style={{ background: 'linear-gradient(135deg,rgba(81,86,190,0.08),rgba(52,152,219,0.08))' }}>
                            <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                              <polygon points="12,2 22,7 12,12 2,7" fill="#5156be" fillOpacity="0.25" stroke="#5156be" strokeWidth="1.5"/>
                              <polygon points="2,7 2,17 12,22 12,12" fill="#5156be" fillOpacity="0.10" stroke="#5156be" strokeWidth="1.5"/>
                              <polygon points="22,7 22,17 12,22 12,12" fill="var(--color-secondary)" fillOpacity="0.25" stroke="var(--color-secondary)" strokeWidth="1.5"/>
                            </svg>
                          </div>
                        ) : (
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full rounded-xl flex flex-col items-center justify-center gap-4 border border-primary/15 dark:border-slate-600/40"
                style={{ aspectRatio: '4/3', background: 'linear-gradient(135deg,rgba(49,151,96,0.05),rgba(52,152,219,0.05))' }}>
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center border border-primary/15"
                       style={{ background: 'linear-gradient(135deg,rgba(49,151,96,0.10),rgba(52,152,219,0.10))' }}>
                    <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                      <polygon points="12,2 22,7 12,12 2,7" fill="var(--color-primary)" fillOpacity="0.25" stroke="var(--color-primary)" strokeWidth="1.5"/>
                      <polygon points="2,7 2,17 12,22 12,12" fill="var(--color-primary)" fillOpacity="0.10" stroke="var(--color-primary)" strokeWidth="1.5"/>
                      <polygon points="22,7 22,17 12,22 12,12" fill="var(--color-secondary)" fillOpacity="0.25" stroke="var(--color-secondary)" strokeWidth="1.5"/>
                    </svg>
                  </div>
                  <div className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded-md text-[8px] font-black text-white tracking-wider"
                       style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                    3D
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <p className="text-[12px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider">3D Model</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500">GLB · GLTF · OBJ · FBX</p>
                </div>
              </div>
            )}
          </div>

          {/* 3D Model Object card */}
          {(prod.obj_file || prod.mtl_file) && (() => {
            const objUrl = prod.obj_file ? `${import.meta.env.VITE_API_BASE_URL}/${prod.obj_file}` : null;
            const mtlUrl = prod.mtl_file ? `${import.meta.env.VITE_API_BASE_URL}/${prod.mtl_file}` : null;
            const objName = prod.obj_file ? cleanServerName(prod.obj_file) : null;
            const mtlName = prod.mtl_file ? cleanServerName(prod.mtl_file) : null;
            return (
              <div className="rounded-2xl overflow-hidden bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl border border-white/80 dark:border-white/15"
                style={{ boxShadow: '0 8px 32px rgba(81,86,190,0.10)' }}>
                {/* Graph lines header */}
                <div className="relative px-5 py-4 overflow-hidden"
                  style={{ background: 'linear-gradient(135deg,rgba(81,86,190,0.07),rgba(52,152,219,0.07))' }}>
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid-3d-view" width="18" height="18" patternUnits="userSpaceOnUse">
                        <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#5156be" strokeWidth="0.4" strokeOpacity="0.25"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-3d-view)"/>
                    {/* Diagonal accent line */}
                    <line x1="0" y1="100%" x2="100%" y2="0" stroke="#5156be" strokeWidth="0.5" strokeOpacity="0.10"/>
                  </svg>
                  <div className="relative flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg,#5156be,var(--color-secondary))' }}>
                      <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                        <polygon points="12,2 22,7 12,12 2,7" fill="white" fillOpacity="0.30" stroke="white" strokeWidth="1.5"/>
                        <polygon points="2,7 2,17 12,22 12,12" fill="white" fillOpacity="0.10" stroke="white" strokeWidth="1.5"/>
                        <polygon points="22,7 22,17 12,22 12,12" fill="white" fillOpacity="0.30" stroke="white" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#5156be' }}>3D Model Object</p>
                  </div>
                </div>

                {/* OBJ + MTL files */}
                <div className="p-4 space-y-3">
                  {objName && (
                    <div className="flex items-center gap-3 p-3 rounded-xl border"
                      style={{ borderColor: 'rgba(81,86,190,0.20)', background: 'linear-gradient(135deg,rgba(81,86,190,0.04),rgba(52,152,219,0.04))' }}>
                      <div className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'linear-gradient(135deg,rgba(81,86,190,0.15),rgba(52,152,219,0.15))', border: '1px solid rgba(81,86,190,0.20)' }}>
                        <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <polygon points="12,2 22,7 12,12 2,7" fill="#5156be" fillOpacity="0.30" stroke="#5156be" strokeWidth="1.5"/>
                          <polygon points="2,7 2,17 12,22 12,12" fill="#5156be" fillOpacity="0.12" stroke="#5156be" strokeWidth="1.5"/>
                          <polygon points="22,7 22,17 12,22 12,12" fill="var(--color-secondary)" fillOpacity="0.30" stroke="var(--color-secondary)" strokeWidth="1.5"/>
                        </svg>
                        <span className="absolute -bottom-1 -right-1 text-[7px] font-black text-white px-1 py-0.5 rounded"
                          style={{ background: 'linear-gradient(135deg,#5156be,var(--color-secondary))' }}>OBJ</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">OBJ Geometry File</p>
                        <p className="text-[12px] font-semibold truncate" style={{ color: '#5156be' }}>{objName}</p>
                      </div>
                      {objUrl && (
                        <a href={objUrl} download target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 h-7 px-3 rounded-xl text-[10px] font-bold text-white shrink-0 transition-all hover:-translate-y-0.5"
                          style={{ background: 'linear-gradient(135deg,#5156be,var(--color-secondary))', boxShadow: '0 3px 10px rgba(81,86,190,0.25)' }}>
                          <Feather.Download className="w-3 h-3" /> Download
                        </a>
                      )}
                    </div>
                  )}

                  {mtlName && (
                    <div className="flex items-center gap-3 p-3 rounded-xl border"
                      style={{ borderColor: 'rgba(52,152,219,0.20)', background: 'linear-gradient(135deg,rgba(52,152,219,0.04),rgba(49,151,96,0.04))' }}>
                      <div className="relative w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: 'linear-gradient(135deg,rgba(52,152,219,0.15),rgba(49,151,96,0.15))', border: '1px solid rgba(52,152,219,0.20)' }}>
                        <Feather.Layers className="w-5 h-5" style={{ color: 'var(--color-secondary)' }} />
                        <span className="absolute -bottom-1 -right-1 text-[7px] font-black text-white px-1 py-0.5 rounded"
                          style={{ background: 'linear-gradient(135deg,var(--color-secondary),var(--color-primary))' }}>MTL</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">MTL Material File</p>
                        <p className="text-[12px] font-semibold truncate" style={{ color: 'var(--color-secondary)' }}>{mtlName}</p>
                      </div>
                      {mtlUrl && (
                        <a href={mtlUrl} download target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 h-7 px-3 rounded-xl text-[10px] font-bold text-white shrink-0 transition-all hover:-translate-y-0.5"
                          style={{ background: 'linear-gradient(135deg,var(--color-secondary),var(--color-primary))', boxShadow: '0 3px 10px rgba(52,152,219,0.25)' }}>
                          <Feather.Download className="w-3 h-3" /> Download
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Meta card */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl border border-white/80 dark:border-white/15 p-5 space-y-4"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
            <div className="h-[3px] -mt-5 -mx-5 mb-5 rounded-t-2xl"
              style={{ background: 'linear-gradient(90deg,var(--color-primary),var(--color-secondary))' }} />
            {meta.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(49,151,96,0.10)' }}>
                  <Icon className="w-4 h-4" style={{ color: 'var(--color-primary)' }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{label}</p>
                  <p className="text-[13px] font-bold text-gray-700 dark:text-gray-200 truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Sections summary */}
          {enabledSections.length > 0 && (
            <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl border border-white/80 dark:border-white/15 p-5"
              style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Content Sections</p>
              <div className="flex flex-wrap gap-2">
                {enabledSections.map(key => {
                  const { label, icon: Icon } = SECTION_LABELS[key] || {
                    label: sectionContent[`${key}__meta`]?.title || key,
                    icon: Feather.FileText,
                  };
                  return (
                    <span key={key} className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-bold text-white"
                      style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                      {Icon && <Icon className="w-3 h-3" />} {label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Datasheet card */}
          {(prod.data_sheet || prod.datasheet) && (() => {
            const ds = prod.data_sheet || prod.datasheet;
            const isStr = typeof ds === 'string';
            const fileName = isStr
              ? (prod.data_sheet_name || cleanServerName(ds))
              : (ds.original_name || ds.file_name || ds.name || 'File');
            const ext = (fileName.split('.').pop() || 'FILE').toUpperCase().slice(0, 5);
            const fileUrl = isStr
              ? `${import.meta.env.VITE_API_BASE_URL}/${ds}`
              : (ds.file_path ? `${import.meta.env.VITE_API_BASE_URL}/${ds.file_path}` : ds.url || null);
            return (
              <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl border border-white/80 dark:border-white/15 p-5"
                style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Product Datasheet</p>
                <div className="flex items-center gap-4 p-3 rounded-xl border border-primary/20"
                     style={{ background: 'linear-gradient(135deg,rgba(49,151,96,0.05),rgba(52,152,219,0.05))' }}>
                  <div className="w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0"
                       style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                    <Feather.FileText className="w-4 h-4 text-white" />
                    <span className="text-[7px] font-black text-white/80 mt-0.5 tracking-wider">{ext}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-gray-700 dark:text-gray-200 truncate">{fileName}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wider">{ext} file</p>
                  </div>
                  {fileUrl && (
                    <a href={fileUrl} target="_blank" rel="noreferrer"
                       onClick={e => e.stopPropagation()}
                       className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-[11px] font-bold text-white shrink-0
                                  transition-all hover:-translate-y-0.5 active:scale-[0.97]
                                  shadow-[0_3px_10px_rgba(49,151,96,0.25)]"
                       style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                      <Feather.Download className="w-3 h-3" /> Download
                    </a>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* ── Right ─────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Title card */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl border border-white/80 dark:border-white/15 p-6"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {prodCat && (
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(52,152,219,0.12)', color: 'var(--color-secondary)' }}>
                  {prodCat}
                </span>
              )}
              {prodSub && (
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(49,151,96,0.12)', color: 'var(--color-primary)' }}>
                  {prodSub}
                </span>
              )}
              {prodDiv && (
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(140,198,63,0.12)', color: '#8CC63F' }}>
                  {prodDiv}
                </span>
              )}
              <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${prodStatus === 'Active' ? 'bg-primary/10 text-primary' : 'bg-[#E67E22]/10 text-[#E67E22]'}`}>
                {prodStatus}
              </span>
            </div>
            <h2 className="text-[22px] font-black text-gray-800 dark:text-white leading-snug tracking-tight">
              {prodName}
            </h2>
            {prodDesc && (
              <p className="text-[14px] text-gray-500 dark:text-gray-400 mt-3 leading-relaxed font-medium">
                {prodDesc}
              </p>
            )}
          </div>

          {/* Key Features table */}
          {prodKeyFeatures.length > 0 && (
            <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl border border-white/80 dark:border-white/15 p-6"
              style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                  <Feather.List className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-[12px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-200">
                  {prod.keyFeaturesTitle || 'Key Features'}
                </p>
              </div>
              <div className="rounded-xl border border-gray-200/60 dark:border-slate-600/50 overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {prodKeyFeatures.map((kf, i) => (
                      <motion.tr key={kf.id || i}
                        initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`border-b last:border-0 border-gray-100/60 dark:border-slate-700/30 ${i % 2 === 0 ? '' : 'bg-primary/3'}`}>
                        <td className="px-4 py-2.5 w-[45%] border-r border-gray-100/60 dark:border-slate-700/30">
                          <span className="text-[12px] font-bold text-gray-600 dark:text-gray-300">{kf.feature_name || kf.name}</span>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="text-[12px] font-semibold text-primary">{kf.feature_value || kf.value || '—'}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Dynamic content sections */}
          {enabledSections.map((key, si) => {
            const isCustom = !SECTION_LABELS[key];
            const meta = sectionContent[`${key}__meta`];
            const { label, icon: Icon } = SECTION_LABELS[key] || { label: meta?.title || key, icon: Feather.FileText };
            const content = sectionContent[key];

            return (
              <motion.div key={key}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: si * 0.07 }}
                className="rounded-2xl bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl border border-white/80 dark:border-white/15 p-6"
                style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                    {Icon && <Icon className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <p className="text-[12px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-200">
                    {label}
                  </p>
                </div>

                {/* Introduction */}
                {key === 'introduction' && (
                  <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.85] font-medium">
                    {content || 'No content provided.'}
                  </p>
                )}

                {/* Rich text sections */}
                {(key === 'application' || key === 'customization' || key === 'kitContents' || key === 'keyFeatures') && (
                  content ? <RichContent html={content} /> : <p className="text-[14px] text-gray-400">No content provided.</p>
                )}

                {/* Order Information */}
                {key === 'orderInformation' && (
                  <div>
                    {content && <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-3">{content}</p>}
                    <OrderTable table={sectionContent.orderInformationTable} />
                    {!content && !sectionContent.orderInformationTable?.headers?.length && (
                      <p className="text-[14px] text-gray-400">No order information provided.</p>
                    )}
                  </div>
                )}

                {/* Custom section (from new API — not a known built-in key) */}
                {isCustom && (() => {
                  const type = meta?.type;
                  if (type === 'rich_text') return content ? <RichContent html={content} /> : <p className="text-[14px] text-gray-400">No content provided.</p>;
                  if (type === 'table' && content?.headers?.length) return <OrderTable table={content} />;
                  if (type === 'image') return content
                    ? <img src={content} alt={meta?.title || 'Image'} className="max-w-full rounded-xl object-contain" style={{ maxHeight: '360px' }} />
                    : <p className="text-[14px] text-gray-400">No image provided.</p>;
                  if (type === 'file') return content?.url
                    ? (
                      <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-primary/25 bg-primary/6 max-w-sm">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                          <Feather.FileText className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[13px] font-semibold text-primary truncate flex-1">{content.name || 'Uploaded file'}</span>
                        <a href={content.url} target="_blank" rel="noreferrer"
                          className="w-7 h-7 flex items-center justify-center rounded-lg shrink-0 text-white hover:-translate-y-0.5 transition-all"
                          style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                          <Feather.Download className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )
                    : <p className="text-[14px] text-gray-400">{content?.name || 'No file provided.'}</p>;
                  return <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-[1.85] font-medium">{typeof content === 'string' ? content : 'No content provided.'}</p>;
                })()}

                {/* Resources */}
                {key === 'resources' && (() => {
                  const resources = content;
                  if (!resources) return <p className="text-[14px] text-gray-400">No resources provided.</p>;
                  // New array format
                  if (Array.isArray(resources)) {
                    if (resources.length === 0) return <p className="text-[14px] text-gray-400">No resources provided.</p>;
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {resources.map((res, ri) => (
                          <div key={res.id ?? ri}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${res.file ? 'border-primary/25 bg-primary/6' : 'border-gray-200/60 bg-gray-50/40'}`}>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: res.file ? 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' : 'rgba(156,163,175,0.15)' }}>
                              <Feather.FileText className="w-4 h-4" style={{ color: res.file ? '#fff' : '#9ca3af' }} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{res.label || `Resource ${ri + 1}`}</p>
                              <p className={`text-[12px] font-semibold truncate ${res.file ? 'text-primary' : 'text-gray-400'}`}>
                                {res.file ? (res.file.name || 'Uploaded file') : 'Not uploaded'}
                              </p>
                            </div>
                            {res.file?.url && (
                              <a href={res.file.url} target="_blank" rel="noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="w-7 h-7 flex items-center justify-center rounded-lg shrink-0 text-white transition-all hover:-translate-y-0.5"
                                style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                                <Feather.Download className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  }
                  // Legacy object format
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { key: 'dataSheet', label: 'Product Data Sheet', icon: Feather.FileText },
                        { key: 'safetySheet', label: 'SDS / Safety Data Sheet', icon: Feather.Shield },
                        { key: 'applicationNote', label: 'Application Note', icon: Feather.File },
                      ].map(({ key: rKey, label: rLabel, icon: RIcon }) => {
                        const res = resources[rKey];
                        return (
                          <div key={rKey}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${res ? 'border-primary/25 bg-primary/6' : 'border-gray-200/60 bg-gray-50/40'}`}>
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                              style={{ background: res ? 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' : 'rgba(156,163,175,0.15)' }}>
                              <RIcon className="w-4 h-4" style={{ color: res ? '#fff' : '#9ca3af' }} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{rLabel}</p>
                              <p className={`text-[12px] font-semibold truncate ${res ? 'text-primary' : 'text-gray-400'}`}>
                                {res ? res.name : 'Not uploaded'}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </motion.div>
            );
          })}

          {/* Action strip */}
          <div className="rounded-2xl bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl border border-white/80 dark:border-white/15 p-5"
            style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.06)' }}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-[12px] font-semibold text-gray-400">
                ID: <span className="font-black text-gray-600 dark:text-gray-300">
                  #PRD-{String(prod.id).slice(-4).padStart(4, '0')}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => navigate(`/products/manage/edit/${prod.id}`)}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))', boxShadow: '0 4px 14px rgba(49,151,96,0.28)' }}>
                  <Feather.Edit2 className="w-3.5 h-3.5" /> Edit Product
                </button>
                <button onClick={() => navigate('/products/manage')}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-[12px] font-bold text-gray-600 bg-gray-100/70 hover:bg-gray-200/70 transition-all">
                  <Feather.List className="w-3.5 h-3.5" /> All Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductView;
