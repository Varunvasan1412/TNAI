import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as Feather from 'react-feather';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './productForm.css';
import { useProductCategoryStore, useProductStore, useProductSubcategoryStore } from '../../../store/store';
import toast from 'react-hot-toast';
import { deleteProductImageApi } from '../../../api/productApi';

/* ── Shared styles ─────────────────────────────────────────────────── */
const getInputCls = (err) =>
  `w-full h-11 px-4 rounded-xl text-[13px] font-medium text-gray-700 dark:text-gray-200 ` +
  `bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm transition-all placeholder:text-gray-300 ` +
  (err
    ? `border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/30 `
    : `border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 `);

const labelCls = 'block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.16em] mb-1.5';

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'], ['clean'],
  ],
};
const QUILL_FORMATS = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'ordered', 'link'];

/* ── Sub-components ────────────────────────────────────────────────── */
const RichEditor = React.memo(({ value, onChange, placeholder }) => (
  <ReactQuill
    theme="snow"
    value={value || ''}
    onChange={onChange}
    modules={QUILL_MODULES}
    formats={QUILL_FORMATS}
    placeholder={placeholder || 'Enter content...'}
    className="custom-quill"
  />
));

const TableBuilder = ({ table, onChange }) => {
  const { headers = [], rows = [] } = table;
  const addCol = () => onChange({ headers: [...headers, `Column ${headers.length + 1}`], rows: rows.map(r => [...r, '']) });
  const delCol = (ci) => onChange({ headers: headers.filter((_, i) => i !== ci), rows: rows.map(r => r.filter((_, i) => i !== ci)) });
  const addRow = () => onChange({ headers, rows: [...rows, headers.map(() => '')] });
  const delRow = (ri) => onChange({ headers, rows: rows.filter((_, i) => i !== ri) });
  const setHdr = (ci, v) => { const h = [...headers]; h[ci] = v; onChange({ headers: h, rows }); };
  const setCell = (ri, ci, v) => onChange({ headers, rows: rows.map((row, i) => i === ri ? row.map((c, j) => j === ci ? v : c) : row) });

  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center gap-2">
        <button type="button" onClick={addCol}
          className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-[11px] font-bold text-white shadow-[0_3px_10px_rgba(49,151,96,0.25)] transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
          <Feather.PlusSquare className="w-3.5 h-3.5" /> Add Column
        </button>
        {headers.length > 0 && (
          <button type="button" onClick={addRow}
            className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 transition-all hover:-translate-y-0.5">
            <Feather.PlusCircle className="w-3.5 h-3.5" /> Add Row
          </button>
        )}
      </div>
      {headers.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 rounded-2xl bg-gray-50/60 dark:bg-slate-800/40 border-2 border-dashed border-gray-200 dark:border-slate-600/40">
          <Feather.Table className="w-6 h-6 text-gray-300" />
          <p className="text-[12px] text-gray-400 font-medium">Click "Add Column" to start building your table</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200/70 dark:border-slate-600/50">
          <table className="w-full">
            <thead>
              <tr className="bg-primary/6">
                {headers.map((h, ci) => (
                  <th key={ci} className="p-2 border-r last:border-r-0 border-gray-200/60 min-w-[130px]">
                    <div className="flex items-center gap-1">
                      <input value={h} onChange={e => setHdr(ci, e.target.value)}
                        className="flex-1 text-[11px] font-black text-primary bg-transparent text-center focus:outline-none" />
                      {headers.length > 1 && (
                        <button type="button" onClick={() => delCol(ci)}
                          className="w-4 h-4 flex items-center justify-center rounded text-red-400 hover:bg-red-50 shrink-0">
                          <Feather.X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </th>
                ))}
                <th className="w-10 p-2 bg-gray-50/40"><span className="text-[10px] text-gray-400 font-bold">Del</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-t border-gray-100/60 dark:border-slate-700/30 hover:bg-gray-50/30">
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-1 border-r last:border-r-0 border-gray-100/60">
                      <input value={cell} onChange={e => setCell(ri, ci, e.target.value)}
                        className="w-full px-2 py-1.5 text-[12px] font-medium text-gray-600 dark:text-gray-300 bg-transparent focus:outline-none rounded" />
                    </td>
                  ))}
                  <td className="p-1 w-10 text-center">
                    <button type="button" onClick={() => delRow(ri)}
                      className="w-6 h-6 mx-auto flex items-center justify-center rounded text-red-400 hover:bg-red-50">
                      <Feather.Trash2 className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={headers.length + 1} className="py-5 text-center text-[12px] text-gray-400">Click "+ Add Row" to add data rows</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const IS_3D = (name) => /\.(glb|gltf|obj|fbx|stl|usdz)$/i.test(name);

// Strips server-generated timestamp prefix and hash suffix to recover a readable filename
// e.g. "1781864651_datasheet_6a3518cb341d7.pdf" → "datasheet.pdf"
const cleanServerName = (path) => {
  const raw = (path || '').split('/').pop();
  const cleaned = raw.replace(/^\d+_/, '').replace(/_[a-f0-9]{8,}(\.[^.]+)$/, '$1');
  return cleaned || raw;
};
const MAX_IMG_MB = 30;
const MAX_IMG_BYTES = MAX_IMG_MB * 1024 * 1024;

const ImageSlot = ({ index, preview, loading, onUpload, onRemove, onLoaded }) => {
  const ref = useRef(null);
  return (
    <div onClick={() => !preview && !loading && ref.current?.click()}
      className={`relative rounded-2xl overflow-hidden border-2 border-dashed transition-all duration-200 group
                  ${preview ? 'border-primary/40 cursor-default' : 'border-gray-200/80 dark:border-slate-600/50 hover:border-primary/60 cursor-pointer'}`}
      style={{ aspectRatio: '1', minHeight: '130px' }}>

      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <svg className="w-8 h-8 animate-spin text-primary" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          <span className="text-[10px] font-bold text-primary">Loading…</span>
        </div>
      )}

      {preview ? (
        <>
          <img
            src={
              preview instanceof File
                ? URL.createObjectURL(preview)
                : typeof preview === "string"
                  ? preview
                  : preview?.image_path
                    ? `${import.meta.env.VITE_API_BASE_URL}/${preview.image_path}`
                    : ""
            }
            alt={`img-${index}`}
            className="w-full h-full object-cover"
            onLoad={() => onLoaded(index)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100">
            <button type="button" onClick={e => { e.stopPropagation(); onRemove(index); }}
              className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center text-white shadow-lg">
              <Feather.Trash2 className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-50/60 dark:bg-slate-800/40">
          <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-slate-700/60 border border-gray-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Feather.Image className="w-5 h-5 text-gray-300" />
          </div>
          <span className="text-[10px] font-bold text-gray-400">Slot {index + 1}</span>
          <span className="text-[8px] text-gray-300 px-1.5 py-0.5 rounded bg-gray-200/70 dark:bg-slate-700/50 font-bold">IMG</span>
        </div>
      )}
      <input ref={ref} type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={e => onUpload(index, e.target.files[0])} className="hidden" />
    </div>
  );
};

/* Editable resource row */
const ResourceItem = ({ res, idx, onLabelChange, onFileUpload, onFileRemove, onDelete }) => {
  const fileRef = useRef(null);
  return (
    <div className="flex items-center gap-3">
      <input type="text" value={res.label} onChange={e => onLabelChange(idx, e.target.value)}
        className="w-44 h-10 px-3 rounded-xl text-[12px] font-bold text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-slate-800/60 border border-gray-200/60 dark:border-slate-600/40 focus:outline-none focus:ring-2 focus:ring-primary/30 shrink-0"
        placeholder="Resource label..." />
      <div onClick={() => !res.file && fileRef.current?.click()}
        className={`flex-1 flex items-center gap-3 h-10 px-4 rounded-xl border transition-all
                    ${res.file
            ? 'border-primary/40 bg-primary/6'
            : 'border-dashed border-gray-200/80 dark:border-slate-600/50 bg-gray-50/60 dark:bg-slate-800/40 hover:border-primary/50 cursor-pointer'}`}>
        <Feather.FileText className="w-3.5 h-3.5 shrink-0" style={{ color: res.file ? 'var(--color-primary)' : '#9ca3af' }} />
        {res.file ? (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <span className="text-[12px] font-semibold text-primary truncate flex-1">{res.file.name}</span>
            <button type="button" onClick={e => { e.stopPropagation(); onFileRemove(idx); }}
              className="w-5 h-5 flex items-center justify-center rounded text-gray-400 hover:text-red-400 shrink-0">
              <Feather.X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <span className="text-[12px] text-gray-400">Click to upload file</span>
        )}
        <input ref={fileRef} type="file" accept={DOCS_ACCEPT}
          onChange={e => onFileUpload(idx, e.target.files[0])} className="hidden" />
      </div>
      <button type="button" onClick={() => onDelete(idx)}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all shrink-0">
        <Feather.Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

/* ── File accept strings ───────────────────────────────────────────── */
const DOCS_ACCEPT = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.rtf,.zip,.rar';
const IMAGES_ACCEPT = 'image/jpeg,image/png,image/webp,image/gif,image/svg+xml';

/* Custom section — image upload */
const CustomImageField = ({ value, onChange }) => {
  const ref = useRef(null);
  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onChange({ file, preview: reader.result });
    reader.readAsDataURL(file);
  };
  // value is { file, preview } for new uploads, a URL string for server-loaded images, or null
  const preview = value?.preview ?? value;
  return (
    <div className="max-w-50">
      <div onClick={() => !value && ref.current?.click()}
        className={`relative rounded-2xl overflow-hidden border-2 border-dashed transition-all duration-200 group
                    ${value ? 'border-primary/40 cursor-default' : 'border-gray-200/80 dark:border-slate-600/50 hover:border-primary/60 cursor-pointer'}`}
        style={{ aspectRatio: '1', minHeight: '140px' }}>
        {value ? (
          <>
            <img src={preview} alt="uploaded" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100">
              <button type="button" onClick={e => { e.stopPropagation(); onChange(null); }}
                className="w-9 h-9 rounded-xl bg-red-500 flex items-center justify-center text-white shadow-lg">
                <Feather.Trash2 className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-50/60 dark:bg-slate-800/40">
            <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-slate-700/60 border border-gray-200/60 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Feather.Image className="w-4 h-4 text-gray-300" />
            </div>
            <span className="text-[10px] font-bold text-gray-400 text-center px-2">Click to upload image</span>
            <span className="text-[9px] text-gray-300">JPG, PNG, WebP, GIF, SVG</span>
          </div>
        )}
        <input ref={ref} type="file" accept={IMAGES_ACCEPT}
          onChange={e => handleFile(e.target.files[0])} className="hidden" />
      </div>
    </div>
  );
};

/* Custom section — file upload */
const CustomFileField = ({ value, onChange }) => {
  const ref = useRef(null);
  return (
    <div onClick={() => !value && ref.current?.click()}
      className={`flex items-center gap-3 h-12 px-4 rounded-xl border transition-all
                  ${value
          ? 'border-primary/40 bg-primary/6'
          : 'border-dashed border-gray-200/80 dark:border-slate-600/50 bg-gray-50/60 dark:bg-slate-800/40 hover:border-primary/50 cursor-pointer'}`}>
      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: value ? 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' : 'rgba(156,163,175,0.2)' }}>
        <Feather.Upload className="w-3.5 h-3.5" style={{ color: value ? '#fff' : '#9ca3af' }} />
      </div>
      {value ? (
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-[12px] font-semibold text-primary truncate flex-1">{value.name}</span>
          <button type="button" onClick={e => { e.stopPropagation(); onChange(null); }}
            className="w-5 h-5 flex items-center justify-center rounded text-gray-400 hover:text-red-400 shrink-0">
            <Feather.X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div>
          <p className="text-[12px] text-gray-400">Click to upload document</p>
          <p className="text-[10px] text-gray-300">PDF, DOC, XLS, PPT, TXT, CSV, ZIP…</p>
        </div>
      )}
      <input ref={ref} type="file" accept={DOCS_ACCEPT}
        onChange={e => { const f = e.target.files[0]; if (f) onChange(f); }} className="hidden" />
    </div>
  );
};

/* ── Datasheet upload — accepts every file type ────────────────────── */
const DatasheetField = ({ value, onChange }) => {
  const ref = useRef(null);
  const isFile = value instanceof File;
  const isServerFile = value && !isFile && typeof value === 'object';
  const hasValue = isFile || isServerFile;
  const fileName = isFile
    ? value.name
    : isServerFile
      ? (value.original_name || value.file_name || value.name || 'Datasheet')
      : '';
  const fileSize = isFile
    ? (value.size < 1024 * 1024
      ? `${(value.size / 1024).toFixed(1)} KB`
      : `${(value.size / (1024 * 1024)).toFixed(1)} MB`)
    : '';
  const ext = (fileName.split('.').pop() || 'FILE').toUpperCase().slice(0, 4);

  return (
    <div
      onClick={() => !hasValue && ref.current?.click()}
      className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-200
                  ${hasValue
          ? 'border-primary/25 bg-primary/4 dark:bg-primary/6 cursor-default'
          : 'border-dashed border-gray-200/80 dark:border-slate-600/50 bg-gray-50/60 dark:bg-slate-800/40 hover:border-primary/50 cursor-pointer group'
        }`}
    >
      {hasValue ? (
        <>
          <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
            <Feather.FileText className="w-5 h-5 text-white" />
            <span className="text-[8px] font-black text-white/80 mt-0.5 tracking-wider">{ext}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-gray-800 dark:text-white truncate">{fileName}</p>
            {fileSize && <p className="text-[11px] text-gray-400 mt-0.5">{fileSize}</p>}
            {isServerFile && <p className="text-[11px] font-semibold mt-0.5" style={{ color: 'var(--color-primary)' }}>Already uploaded</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button type="button" onClick={e => { e.stopPropagation(); ref.current?.click(); }}
              className="flex items-center gap-1.5 h-8 px-3 rounded-xl text-[11px] font-bold
                         bg-white/80 dark:bg-slate-700/60 border border-gray-200/60 dark:border-slate-600/40
                         text-gray-600 dark:text-gray-300 hover:border-primary/40 hover:text-primary transition-all">
              <Feather.RefreshCw className="w-3 h-3" /> Replace
            </button>
            <button type="button" onClick={e => { e.stopPropagation(); onChange(null); }}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400
                         hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
              <Feather.Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0
                          bg-white/80 dark:bg-slate-700/60 border border-gray-200/60 dark:border-slate-600/40
                          group-hover:scale-105 transition-transform">
            <Feather.FileText className="w-6 h-6 text-gray-300" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-bold text-gray-500 dark:text-gray-400">Click to upload datasheet</p>
            <p className="text-[11px] text-gray-400 mt-0.5">All file formats supported — PDF, DOC, XLS, ZIP, DWG and more</p>
          </div>
          <div className="flex flex-wrap gap-1 shrink-0">
            {['PDF', 'DOC', 'XLS', 'ZIP', 'ALL'].map(fmt => (
              <span key={fmt} className="text-[8px] font-bold px-1.5 py-0.5 rounded-md bg-gray-200/70 dark:bg-slate-700/50 text-gray-400">{fmt}</span>
            ))}
          </div>
        </>
      )}
      <input ref={ref} type="file" onChange={e => { const f = e.target.files[0]; if (f) onChange(f); }} className="hidden" />
    </div>
  );
};

/* ── 3D Model file slot (OBJ or MTL) ─────────────────────────────── */
const Model3DFile = ({ file, label, ext, inputRef, onChange }) => {
  const isFile = file instanceof File;
  const isServer = file && !isFile;
  const hasFile = isFile || isServer;
  const fileName = isFile ? file.name : isServer ? (file.name || cleanServerName(file.file_path || '')) : '';
  return (
    <div onClick={() => !hasFile && inputRef.current?.click()}
      className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 border-dashed transition-all duration-200 group
                  ${hasFile ? 'border-[#5156be]/30 cursor-default' : 'border-gray-200/80 dark:border-slate-600/50 hover:border-[#5156be]/50 cursor-pointer'}`}
      style={{ background: hasFile ? 'linear-gradient(135deg,rgba(81,86,190,0.04),rgba(52,152,219,0.04))' : '' }}>
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: hasFile ? 'linear-gradient(135deg,rgba(81,86,190,0.15),rgba(52,152,219,0.15))' : 'rgba(209,213,219,0.20)',
            border: hasFile ? '1px solid rgba(81,86,190,0.20)' : '1px solid rgba(209,213,219,0.6)',
          }}>
          <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
            <polygon points="12,2 22,7 12,12 2,7" fill={hasFile ? "#5156be" : "#d1d5db"} fillOpacity="0.30" stroke={hasFile ? "#5156be" : "#d1d5db"} strokeWidth="1.5" />
            <polygon points="2,7 2,17 12,22 12,12" fill={hasFile ? "#5156be" : "#d1d5db"} fillOpacity="0.12" stroke={hasFile ? "#5156be" : "#d1d5db"} strokeWidth="1.5" />
            <polygon points="22,7 22,17 12,22 12,12" fill={hasFile ? "var(--color-secondary)" : "#d1d5db"} fillOpacity="0.30" stroke={hasFile ? "var(--color-secondary)" : "#d1d5db"} strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-black text-white tracking-wider"
          style={{ background: hasFile ? 'linear-gradient(135deg,#5156be,var(--color-secondary))' : '#9ca3af' }}>
          {ext}
        </div>
      </div>
      <div className="text-center">
        <p className="text-[12px] font-black text-gray-600 dark:text-gray-300 uppercase tracking-wider">{label}</p>
        {hasFile ? (
          <p className="text-[11px] font-semibold truncate max-w-[160px] mt-1" style={{ color: '#5156be' }}>{fileName}</p>
        ) : (
          <p className="text-[11px] text-gray-400 mt-1">Click to upload <span className="font-bold">.{ext.toLowerCase()}</span> file</p>
        )}
        {isServer && <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--color-primary)' }}>Already uploaded</p>}
      </div>
      {hasFile && (
        <div className="flex items-center gap-2">
          <button type="button" onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
            className="flex items-center gap-1 h-7 px-3 rounded-xl text-[10px] font-bold border bg-white/80 dark:bg-slate-700/60 transition-all"
            style={{ color: '#5156be', borderColor: 'rgba(81,86,190,0.25)' }}>
            <Feather.RefreshCw className="w-2.5 h-2.5" /> Replace
          </button>
          <button type="button" onClick={e => { e.stopPropagation(); onChange(null); }}
            className="w-7 h-7 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
            <Feather.Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}
      <input ref={inputRef} type="file" accept={`.${ext.toLowerCase()}`}
        onChange={e => { const f = e.target.files[0]; if (f) onChange(f); }} className="hidden" />
    </div>
  );
};

const Model3DField = ({ objFile, mtlFile, onObjChange, onMtlChange }) => {
  const objRef = useRef(null);
  const mtlRef = useRef(null);
  return (
    <div className="grid grid-cols-2 gap-4">
      <Model3DFile file={objFile} label="OBJ Model" ext="OBJ" inputRef={objRef} onChange={onObjChange} />
      <Model3DFile file={mtlFile} label="MTL Material" ext="MTL" inputRef={mtlRef} onChange={onMtlChange} />
    </div>
  );
};

/* ── Constants ─────────────────────────────────────────────────────── */
const SECTIONS = [
  { key: 'introduction', label: 'Introduction', icon: Feather.BookOpen },
  { key: 'application', label: 'Application', icon: Feather.Cpu },
  { key: 'orderInformation', label: 'Order Information', icon: Feather.ShoppingCart },
  { key: 'customization', label: 'Customization', icon: Feather.Sliders },
  { key: 'kitContents', label: 'Kit Contents', icon: Feather.Box },
  { key: 'keyFeatures', label: 'Key Features', icon: Feather.Star },
  { key: 'resources', label: 'Resources', icon: Feather.Download },
];

const FIELD_TYPES = [
  { value: 'text', label: 'Text', icon: Feather.AlignLeft, desc: 'Plain text area' },
  { value: 'number', label: 'Number', icon: Feather.Hash, desc: 'Numeric input field' },
  { value: 'customization', label: 'Rich Text', icon: Feather.Edit3, desc: 'Rich text editor with formatting' },
  { value: 'table', label: 'Table', icon: Feather.Grid, desc: 'Column & row table builder' },
  { value: 'image', label: 'Image', icon: Feather.Image, desc: 'Single image upload (JPG, PNG, WebP…)' },
  { value: 'fileupload', label: 'File Upload', icon: Feather.Upload, desc: 'Document attachment (PDF, DOC, XLS…)' },
];

const DEFAULT_RESOURCES = [
  { id: 'dataSheet', label: 'Product Data Sheet', file: null },
  { id: 'safetySheet', label: 'SDS / Safety Data Sheet', file: null },
  { id: 'applicationNote', label: 'Application Note', file: null },
];

/* ── Default form state ────────────────────────────────────────────── */
const defaultForm = () => ({
  name: '', description: '',
  categoryId: '', categoryName: '',
  subcategoryId: '', subcategoryName: '',
  divisionId: '',
  status: 'Active',
  keyFeaturesTitle: 'Key Features',
  keyFeatures: [],
  sectionEnabled: { introduction: false, application: false, orderInformation: false, customization: false, kitContents: false, keyFeatures: false, resources: false },
  sectionContent: {
    introduction: '', application: '',
    orderInformation: '', orderInformationTable: { headers: [], rows: [] },
    customization: '', kitContents: '', keyFeatures: '',
    resources: DEFAULT_RESOURCES.map(r => ({ ...r })),
  },
  customSections: [],
  imageCount: 1,
  images: [],
  objFile: null,
  mtlFile: null,
  datasheet: null,
  partNo: '',
});

/* ─────────────────────────────────────────────────────────────────── */
const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const kfNameRef = useRef(null);
  const nameRef = useRef(null);
  const categoryRef = useRef(null);
  const descriptionRef = useRef(null);

  const [filteredSubs, setFilteredSubs] = useState([]);
  const [form, setForm] = useState(defaultForm());
  const [kfName, setKfName] = useState('');
  const [kfValue, setKfValue] = useState('');
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState([]);

  /* Add Section modal */
  const [showAddSection, setShowAddSection] = useState(false);
  const [newSecTitle, setNewSecTitle] = useState('');
  const [newSecType, setNewSecType] = useState('text');

  const { singleProduct, fetchSingleProduct, createProduct, updateProduct, } = useProductStore();

  const { categories, fetchCategories, } = useProductCategoryStore();

  const { subcategories, fetchSubcategories, } = useProductSubcategoryStore();

  // Fetch categories and subcategories on mount; fetch product in edit mode
  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    if (isEdit && id) {
      fetchSingleProduct(id);
    }
  }, [id, isEdit]);

  // Populate form when singleProduct loads in edit mode
  useEffect(() => {
    if (!isEdit) {
      setForm(defaultForm());
      return;
    }
    if (!singleProduct) return;
    const existing = singleProduct;
    const formData = { ...defaultForm(), ...existing };
    formData.name = existing.product_name || '';
    formData.description = existing.description ?? '';
    formData.categoryId = String(existing.category_id || '');
    formData.subcategoryId = String(existing.subcategory_id || '');
    formData.divisionId = existing.division_id ? String(existing.division_id) : '';
    formData.status = existing.status === 1 ? 'Active' : existing.status === 0 ? 'Inactive' : existing.status || 'Active';
    formData.keyFeatures = (existing.key_features || []).map((item, index) => ({
      id: index + 1,
      name: item.feature_name || item.title || '',
      value: item.value || item.feature_value || '',   // API returns 'value'
    }));

    // ======================
    // IMAGES
    // ======================

    formData.images = existing.images || [];

    // image slots count
    if ((existing.images || []).length > 0) {
      formData.imageCount = existing.images.length;
    }

    // datasheet — API returns data_sheet as a plain path string
    if (existing.data_sheet) {
      formData.datasheet = {
        name: existing.data_sheet_name || cleanServerName(existing.data_sheet),
        file_path: existing.data_sheet,
      };
    } else {
      formData.datasheet = null;
    }

    formData.objFile = existing.obj_file
      ? { name: cleanServerName(existing.obj_file), file_path: existing.obj_file }
      : null;
    formData.mtlFile = existing.mtl_file
      ? { name: cleanServerName(existing.mtl_file), file_path: existing.mtl_file }
      : null;
    formData.partNo = existing.part_number || existing.part_number_sku || existing.part_no || '';


    if (existing.sectionContent?.resources && !Array.isArray(existing.sectionContent.resources)) {
      const old = existing.sectionContent.resources;
      formData.sectionContent = {
        ...formData.sectionContent,
        resources: [
          { id: 'dataSheet', label: 'Product Data Sheet', file: old.dataSheet || null },
          { id: 'safetySheet', label: 'SDS / Safety Data Sheet', file: old.safetySheet || null },
          { id: 'applicationNote', label: 'Application Note', file: old.applicationNote || null },
        ],
      };
    }

    // Load sections from new API format (prod.sections array)
    if (existing.sections?.length) {
      const TITLE_KEY = {
        'Introduction': 'introduction', 'Application': 'application',
        'Order Information': 'orderInformation', 'Customization': 'customization',
        'Kit Contents': 'kitContents', 'Key Features': 'keyFeatures', 'Resources': 'resources',
      };
      const strToTable = (str) => {
        try {
          const rows = JSON.parse(str || '[]');
          if (!Array.isArray(rows) || !rows.length) return { headers: [], rows: [] };
          const headers = Object.keys(rows[0]);
          return { headers, rows: rows.map(r => headers.map(h => r[h] || '')) };
        } catch { return { headers: [], rows: [] }; }
      };
      const customSections = [];
      const enabled = { ...formData.sectionEnabled };
      const content = { ...formData.sectionContent };

      existing.sections.forEach(sec => {
        const builtInKey = TITLE_KEY[sec.title];
        const fields = (sec.fields || []).sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
        if (builtInKey) {
          enabled[builtInKey] = true;
          if (builtInKey === 'orderInformation') {
            fields.forEach(f => {
              if (f.field_type === 'text') content.orderInformation = f.field_value || '';
              if (f.field_type === 'table') content.orderInformationTable = strToTable(f.field_value);
            });
          } else if (builtInKey === 'resources') {
            if (fields.length > 0) {
              content['resources'] = fields.map(f => ({
                id: f.id || `res_${Math.random()}`,
                label: f.field_label || '',
                file: (f.file_path || f.field_value)
                  ? { name: f.field_value || cleanServerName(f.file_path), file_path: f.file_path || null }
                  : null,
              }));
            } else {
              content['resources'] = DEFAULT_RESOURCES.map(r => ({ ...r }));
            }
          } else {
            content[builtInKey] = fields[0]?.field_value || '';
          }
        } else {
          const customId = `custom_sec_${sec.id}`;
          const first = fields[0];
          const fType = first?.field_type === 'rich_text' ? 'customization'
                      : first?.field_type === 'file' ? 'fileupload'
                      : (first?.field_type || 'text');
          let val;
          if (fType === 'table') {
            val = strToTable(first?.field_value);
          } else if (fType === 'image') {
            val = first?.file_path
              ? { preview: `${import.meta.env.VITE_API_BASE_URL}/${first.file_path}`, file: null }
              : null;
          } else if (fType === 'fileupload') {
            val = (first?.file_path || first?.field_value)
              ? { name: first?.field_value || cleanServerName(first?.file_path), file_path: first?.file_path || null }
              : null;
          } else {
            val = first?.field_value || '';
          }
          customSections.push({ id: customId, title: sec.title, fieldType: fType });
          enabled[customId] = true;
          content[customId] = val;
        }
      });

      formData.sectionEnabled = enabled;
      formData.sectionContent = content;
      formData.customSections = customSections;
    }

    if (!formData.customSections) formData.customSections = [];
    setForm(formData);
  }, [singleProduct, isEdit]);

  // Recompute filtered subcategories when category or subcategory list changes
  useEffect(() => {
    if (form.categoryId) {
      setFilteredSubs(subcategories.filter(s => String(s.category_id) === String(form.categoryId)));
    } else {
      setFilteredSubs([]);
    }
  }, [form.categoryId, subcategories]);

  /* ── Helpers ─────────────────────────────────────────────────────── */
  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const setSection = (key, val) =>
    setForm(f => ({ ...f, sectionEnabled: { ...f.sectionEnabled, [key]: val } }));

  const setContent = (key, val) =>
    setForm(f => ({ ...f, sectionContent: { ...f.sectionContent, [key]: val } }));

  const setOrderTable = (table) =>
    setForm(f => ({ ...f, sectionContent: { ...f.sectionContent, orderInformationTable: table } }));

  const handleCategory = (e) => {
    const catId = e.target.value;
    const cat = categories.find(c => String(c.id) === catId);
    setForm(f => ({ ...f, categoryId: catId, categoryName: cat?.category_name || '', subcategoryId: '', subcategoryName: '', divisionId: '' }));
    if (errors.categoryId) setErrors(e => ({ ...e, categoryId: '' }));
  };

  const handleSubcategory = (e) => {
    const subId = e.target.value;
    const sub = filteredSubs.find(s => String(s.id) === subId);
    setForm(f => ({ ...f, subcategoryId: subId, subcategoryName: sub?.sub_category_name || '', divisionId: '' }));
    if (errors.subcategoryId) setErrors(e => ({ ...e, subcategoryId: '' }));
  };

  const addKF = () => {
    if (!kfName.trim()) return;
    set('keyFeatures', [...form.keyFeatures, { id: Date.now(), name: kfName.trim(), value: kfValue.trim() }]);
    setKfName(''); setKfValue('');
    kfNameRef.current?.focus();
  };

  const removeKF = (kfId) => set('keyFeatures', form.keyFeatures.filter(k => k.id !== kfId));

  const handleImageUpload = (index, file) => {
    if (!file) return;
    if (file.size > MAX_IMG_BYTES) {
      toast.error(`File must be under ${MAX_IMG_MB} MB`);
      return;
    }
    const imgs = [...form.images];
    imgs[index] = file;
    set('images', imgs);
    setLoadingSlots(prev => [...new Set([...prev, index])]);
  };

  const handleImageRemove = async (index) => {
    const img = form.images[index];
    const isServerImage = img && !(img instanceof File) && typeof img !== 'string' && img?.id;

    if (isServerImage) {
      setLoadingSlots(prev => [...new Set([...prev, index])]);
      try {
        await deleteProductImageApi(img.id);
        toast.success('Image deleted successfully');
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to delete image');
        setLoadingSlots(prev => prev.filter(i => i !== index));
        return;
      }
    }

    const imgs = [...form.images];
    imgs[index] = null;
    set('images', imgs);
    setLoadingSlots(prev => prev.filter(i => i !== index));
  };

  const handleImageLoaded = (index) => {
    setLoadingSlots(prev => prev.filter(i => i !== index));
  };

  const handleImageCount = (count) =>
    setForm(f => ({ ...f, imageCount: count, images: f.images.slice(0, count) }));

  /* Resource helpers */
  const updateResourceLabel = (idx, val) =>
    setForm(f => {
      const resources = [...f.sectionContent.resources];
      resources[idx] = { ...resources[idx], label: val };
      return { ...f, sectionContent: { ...f.sectionContent, resources } };
    });

  const handleResourceFile = (idx, file) => {
    if (!file) return;
    setForm(f => {
      const resources = [...f.sectionContent.resources];
      resources[idx] = { ...resources[idx], file: file };
      return { ...f, sectionContent: { ...f.sectionContent, resources } };
    });
  };

  const removeResourceFile = (idx) =>
    setForm(f => {
      const resources = [...f.sectionContent.resources];
      resources[idx] = { ...resources[idx], file: null };
      return { ...f, sectionContent: { ...f.sectionContent, resources } };
    });

  const removeResourceItem = (idx) =>
    setForm(f => {
      const resources = f.sectionContent.resources.filter((_, i) => i !== idx);
      return { ...f, sectionContent: { ...f.sectionContent, resources } };
    });

  const addResourceItem = () =>
    setForm(f => {
      const resources = [...f.sectionContent.resources, { id: `res_${Date.now()}`, label: 'New Resource', file: null }];
      return { ...f, sectionContent: { ...f.sectionContent, resources } };
    });

  /* Custom section helpers */
  const handleAddSection = () => {
    if (!newSecTitle.trim()) return;
    const customId = `custom_${Date.now()}`;
    setForm(f => ({
      ...f,
      customSections: [...(f.customSections || []), { id: customId, title: newSecTitle.trim(), fieldType: newSecType }],
      sectionEnabled: { ...f.sectionEnabled, [customId]: true },
      sectionContent: {
        ...f.sectionContent,
        [customId]: newSecType === 'table' ? { headers: [], rows: [] }
          : newSecType === 'image' ? null
            : newSecType === 'fileupload' ? null
              : '',
      },
    }));
    setNewSecTitle(''); setNewSecType('text'); setShowAddSection(false);
  };

  const removeCustomSection = (customId) =>
    setForm(f => {
      const customSections = f.customSections.filter(s => s.id !== customId);
      const sectionEnabled = { ...f.sectionEnabled };
      delete sectionEnabled[customId];
      const sectionContent = { ...f.sectionContent };
      delete sectionContent[customId];
      return { ...f, customSections, sectionEnabled, sectionContent };
    });

  const validate = () => {
    const e = {};
    if (!form.name?.trim()) e.name = 'Product name is required';
    if (!form.categoryId) e.categoryId = 'Please select a category';
    if (!form.description?.trim()) e.description = 'Description is required';
    setErrors(e);

    if (Object.keys(e).length > 0) {
      const refMap = { name: nameRef, categoryId: categoryRef, description: descriptionRef };
      const firstKey = Object.keys(e)[0];
      const target = refMap[firstKey]?.current;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.focus();
      }
    }

    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    // const payload = { ...form, name: form.name.trim(), description: form.description.trim() };

    const payload = new FormData();

    payload.append(
      "product_name",
      form.name
    );

    payload.append(
      "description",
      form.description
    );

    payload.append(
      "category_id",
      form.categoryId
    );

    payload.append(
      "subcategory_id",
      form.subcategoryId
    );

    if (form.divisionId) {
      payload.append("division_id", form.divisionId);
    }

    payload.append(
      "status",
      form.status === "Active"
        ? 1
        : 0
    );

    payload.append(
      "log_status",
      1
    );

    // ======================
    // IMAGES
    // ======================

    let imgIdx = 0;
    form.images.forEach((img) => {
      if (!(img instanceof File)) return;
      payload.append(`images[${imgIdx}]`, img);
      imgIdx++;
    });

    if (form.objFile instanceof File) payload.append('obj_file', form.objFile);
    if (form.mtlFile instanceof File) payload.append('mtl_file', form.mtlFile);

    // ======================
    // KEY FEATURES
    // ======================

    form.keyFeatures.forEach((kf, i) => {
      payload.append(`key_features[${i}][section_title]`, '');
      payload.append(`key_features[${i}][title]`, kf.name);
      payload.append(`key_features[${i}][value]`, kf.value);
    });

    if (form.partNo) {
      payload.append('part_number', form.partNo.trim());
    }

    // ======================
    // SECTIONS
    // ======================

    const SECTION_API = {
      introduction:    { title: 'Introduction',    type: 'text'      },
      application:     { title: 'Application',     type: 'rich_text' },
      orderInformation:{ title: 'Order Information', type: 'mixed'   },
      customization:   { title: 'Customization',   type: 'rich_text' },
      kitContents:     { title: 'Kit Contents',    type: 'rich_text' },
      keyFeatures:     { title: 'Key Features',    type: 'rich_text' },
      resources:       { title: 'Resources',       type: 'files'     },
    };

    const tblToStr = (tbl) => {
      if (!tbl?.headers?.length) return '';
      return JSON.stringify(tbl.rows.map(row => {
        const obj = {};
        tbl.headers.forEach((h, hi) => { obj[h] = row[hi] || ''; });
        return obj;
      }));
    };

    let secIdx = 0;

    // Built-in enabled sections
    SECTIONS.forEach(({ key }) => {
      if (!form.sectionEnabled[key]) return;
      const map = SECTION_API[key];
      if (!map) return;

      payload.append(`sections[${secIdx}][title]`, map.title);
      payload.append(`sections[${secIdx}][order_index]`, secIdx + 1);

      if (key === 'orderInformation') {
        let fi = 0;
        const notes = form.sectionContent.orderInformation || '';
        if (notes) {
          payload.append(`sections[${secIdx}][fields][${fi}][field_label]`, 'Notes');
          payload.append(`sections[${secIdx}][fields][${fi}][field_type]`, 'text');
          payload.append(`sections[${secIdx}][fields][${fi}][field_value]`, notes);
          payload.append(`sections[${secIdx}][fields][${fi}][order_index]`, fi + 1);
          fi++;
        }
        const tbl = form.sectionContent.orderInformationTable;
        if (tbl?.headers?.length) {
          payload.append(`sections[${secIdx}][fields][${fi}][field_label]`, 'Order Table');
          payload.append(`sections[${secIdx}][fields][${fi}][field_type]`, 'table');
          payload.append(`sections[${secIdx}][fields][${fi}][field_value]`, tblToStr(tbl));
          payload.append(`sections[${secIdx}][fields][${fi}][order_index]`, fi + 1);
        }
      } else if (key === 'resources') {
        const resources = form.sectionContent.resources || [];
        resources.forEach((res, fi) => {
          payload.append(`sections[${secIdx}][fields][${fi}][field_label]`, res.label || '');
          payload.append(`sections[${secIdx}][fields][${fi}][field_type]`, 'file');
          payload.append(`sections[${secIdx}][fields][${fi}][order_index]`, fi + 1);
          if (res.file instanceof File) {
            payload.append(`sections[${secIdx}][fields][${fi}][file]`, res.file);
            payload.append(`sections[${secIdx}][fields][${fi}][field_value]`, res.file.name);
          } else if (res.file?.name) {
            payload.append(`sections[${secIdx}][fields][${fi}][field_value]`, res.file.name);
          }
        });
      } else {
        const val = form.sectionContent[key] || '';
        payload.append(`sections[${secIdx}][fields][0][field_label]`, map.title);
        payload.append(`sections[${secIdx}][fields][0][field_type]`, map.type);
        payload.append(`sections[${secIdx}][fields][0][field_value]`, val);
        payload.append(`sections[${secIdx}][fields][0][order_index]`, 1);
      }
      secIdx++;
    });

    // Custom sections
    (form.customSections || []).forEach(sec => {
      if (!form.sectionEnabled[sec.id]) return;
      const val = form.sectionContent[sec.id];
      const apiType = sec.fieldType === 'customization' ? 'rich_text'
                    : sec.fieldType === 'fileupload' ? 'file'
                    : sec.fieldType;

      payload.append(`sections[${secIdx}][title]`, sec.title);
      payload.append(`sections[${secIdx}][order_index]`, secIdx + 1);
      payload.append(`sections[${secIdx}][fields][0][field_label]`, sec.title);
      payload.append(`sections[${secIdx}][fields][0][field_type]`, apiType);
      payload.append(`sections[${secIdx}][fields][0][order_index]`, 1);

      if (sec.fieldType === 'table' && val?.headers?.length) {
        payload.append(`sections[${secIdx}][fields][0][field_value]`, tblToStr(val));
      } else if (sec.fieldType === 'image') {
        if (val?.file instanceof File) {
          payload.append(`sections[${secIdx}][fields][0][file]`, val.file);
        }
      } else if (sec.fieldType === 'fileupload') {
        if (val instanceof File) {
          payload.append(`sections[${secIdx}][fields][0][file]`, val);
          payload.append(`sections[${secIdx}][fields][0][field_value]`, val.name);
        } else if (val?.name) {
          payload.append(`sections[${secIdx}][fields][0][field_value]`, val.name);
        }
      } else {
        payload.append(`sections[${secIdx}][fields][0][field_value]`, val || '');
      }
      secIdx++;
    });

    // ======================
    // DATASHEET
    // ======================
    if (form.datasheet instanceof File) {
      payload.append('data_sheet', form.datasheet);
    }

    try {

      console.log("=== FIELD TYPES ===");

for (let pair of payload.entries()) {
  if (pair[0].includes("field_type")) {
    console.log(pair[0], pair[1]);
  }
}

      setSubmitting(true);

      if (isEdit) {
        await updateProduct(id, payload);
        toast.success("Product updated successfully");
      } else {
        await createProduct(payload);
        toast.success("Product created successfully");
      }

      setSaved(true);
      setTimeout(() => navigate("/products/manage"), 1000);

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };


  const selectedSub = subcategories.find(
    s => String(s.id) === String(form.subcategoryId)
  );

  const divisions = selectedSub?.divisions || [];

  const selectedSubHasDivisions = divisions.length > 0;

  const allEnabledSections = [
    ...SECTIONS.filter(s => form.sectionEnabled[s.key]).map(s => ({ ...s, isCustom: false })),
    ...(form.customSections || [])
      .filter(s => form.sectionEnabled[s.id])
      .map(s => ({ key: s.id, label: s.title, icon: Feather.FileText, isCustom: true, customSection: s })),
  ];

  /* ── Section renderers ────────────────────────────────────────────── */
  const renderSectionContent = (key, customSection) => {
    const content = form.sectionContent;

    if (customSection) {
      const { fieldType } = customSection;
      const value = content[key];
      if (fieldType === 'text') return (
        <textarea value={value || ''} onChange={e => setContent(key, e.target.value)}
          placeholder={`Enter ${customSection.title}...`} rows={5}
          className="w-full px-4 py-3 text-[13px] font-medium text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl resize-none transition-all placeholder:text-gray-300 border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50" />
      );
      if (fieldType === 'number') return (
        <input type="number" value={value || ''} onChange={e => setContent(key, e.target.value)}
          placeholder="Enter value..." className={getInputCls('')} />
      );
      if (fieldType === 'customization') return (
        <RichEditor value={value} onChange={v => setContent(key, v)} placeholder={`Enter ${customSection.title}...`} />
      );
      if (fieldType === 'table') return (
        <TableBuilder table={value || { headers: [], rows: [] }} onChange={t => setContent(key, t)} />
      );
      if (fieldType === 'image') return (
        <CustomImageField value={value || null} onChange={v => setContent(key, v)} />
      );
      if (fieldType === 'fileupload') return (
        <CustomFileField value={value || null} onChange={v => setContent(key, v)} />
      );
    }

    if (key === 'introduction') return (
      <textarea value={content.introduction} onChange={e => setContent('introduction', e.target.value)}
        placeholder="Write an introduction for this product..." rows={5}
        className="w-full px-4 py-3 text-[13px] font-medium text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl resize-none transition-all placeholder:text-gray-300 border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50" />
    );

    if (key === 'application') return (
      <RichEditor value={content.application} onChange={v => setContent('application', v)} placeholder="Describe application areas and use cases..." />
    );

    if (key === 'orderInformation') return (
      <div className="space-y-4">
        <textarea value={content.orderInformation} onChange={e => setContent('orderInformation', e.target.value)}
          placeholder="Add ordering notes or part numbers..." rows={3}
          className="w-full px-4 py-3 text-[13px] font-medium text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl resize-none transition-all placeholder:text-gray-300 border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50" />
        <div>
          <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Feather.Table className="w-3.5 h-3.5" /> Custom Order Table
          </p>
          <TableBuilder table={content.orderInformationTable} onChange={setOrderTable} />
        </div>
      </div>
    );

    if (key === 'customization') return (
      <RichEditor value={content.customization} onChange={v => setContent('customization', v)} placeholder="Describe customization options..." />
    );

    if (key === 'kitContents') return (
      <RichEditor value={content.kitContents} onChange={v => setContent('kitContents', v)} placeholder="List what's included in the kit..." />
    );

    if (key === 'keyFeatures') return (
      <RichEditor value={content.keyFeatures} onChange={v => setContent('keyFeatures', v)} placeholder="Highlight key features and benefits..." />
    );

    if (key === 'resources') {
      const resources = content.resources || [];
      return (
        <div className="space-y-3">
          {resources.map((res, idx) => (
            <ResourceItem
              key={res.id}
              res={res}
              idx={idx}
              onLabelChange={updateResourceLabel}
              onFileUpload={handleResourceFile}
              onFileRemove={removeResourceFile}
              onDelete={removeResourceItem}
            />
          ))}
          <button type="button" onClick={addResourceItem}
            className="flex items-center gap-2 h-9 px-4 rounded-xl text-[12px] font-bold text-primary bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-all">
            <Feather.Plus className="w-3.5 h-3.5" /> Add Resource
          </button>
        </div>
      );
    }

    return null;
  };

  /* ── Render ──────────────────────────────────────────────────────── */
  const imgGridCls = form.imageCount === 1 ? 'grid-cols-1 max-w-[180px]' : 'grid-cols-3';

  return (
    <div className="relative space-y-7 min-h-screen pb-10">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-primary/8 to-[#8CC63F]/5 blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/8 to-primary/5 blur-[130px]" />
      </div>
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-br from-white/20 via-white/15 to-white/10 dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* ── Add Section Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showAddSection && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.22 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/50 dark:border-slate-700/50">
              <div className="h-0.75 w-full" style={{ background: 'linear-gradient(90deg,var(--color-primary),#8CC63F,var(--color-secondary))' }} />
              <div className="p-6">
                {/* Modal header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                      <Feather.PlusCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h3 className="text-[14px] font-black text-gray-800 dark:text-white">Add Custom Section</h3>
                  </div>
                  <button type="button" onClick={() => setShowAddSection(false)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                    <Feather.X className="w-4 h-4" />
                  </button>
                </div>

                {/* Section title */}
                <div className="mb-4">
                  <label className={labelCls}>Section Title <span className="text-red-400">*</span></label>
                  <input type="text" value={newSecTitle}
                    onChange={e => setNewSecTitle(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAddSection()}
                    placeholder="e.g. Technical Notes, Certifications..."
                    className={getInputCls('')} />
                </div>

                {/* Field type — radio, only one selectable */}
                <div className="mb-6">
                  <label className={labelCls}>Field Value Type</label>
                  <div className="space-y-2 mt-2">
                    {FIELD_TYPES.map(opt => {
                      const Icon = opt.icon;
                      const active = newSecType === opt.value;
                      return (
                        <label key={opt.value}
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all select-none ${active
                            ? 'border-primary/50 bg-primary/5 dark:bg-primary/10'
                            : 'border-gray-200/60 dark:border-slate-600/40 hover:border-primary/30'
                            }`}>
                          <input type="radio" name="secType" value={opt.value}
                            checked={active} onChange={() => setNewSecType(opt.value)} className="hidden" />
                          {/* Radio circle */}
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${active ? 'border-primary' : 'border-gray-300 dark:border-slate-500'
                            }`}>
                            {active && <div className="w-2 h-2 rounded-full bg-primary" />}
                          </div>
                          {/* Type icon */}
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: active ? 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' : 'rgba(156,163,175,0.15)' }}>
                            <Icon className="w-3.5 h-3.5" style={{ color: active ? '#fff' : '#9ca3af' }} />
                          </div>
                          <div className="flex-1">
                            <p className="text-[12px] font-bold text-gray-700 dark:text-gray-200">{opt.label}</p>
                            <p className="text-[11px] text-gray-400">{opt.desc}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Modal actions */}
                <div className="flex gap-3">
                  <button type="button" onClick={() => setShowAddSection(false)}
                    className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-gray-600 dark:text-gray-300 bg-gray-100/70 dark:bg-slate-700/50 hover:bg-gray-200/70 transition-all">
                    Cancel
                  </button>
                  <button type="button" onClick={handleAddSection}
                    className="flex-1 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.97]"
                    style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))', boxShadow: '0 4px 14px rgba(49,151,96,0.25)' }}>
                    Add Section
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
            {isEdit ? 'Edit Product' : 'Add Product'}
          </h1>
          <div className="flex items-center gap-1.5 mt-1">
            <button onClick={() => navigate('/products/dashboard')} className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">Products</button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300" />
            <button onClick={() => navigate('/products/manage')} className="text-[12px] font-medium text-gray-400 hover:text-primary transition-colors">Products</button>
            <Feather.ChevronRight className="w-3 h-3 text-gray-300" />
            <span className="text-[12px] font-bold text-primary">{isEdit ? 'Edit' : 'Add'}</span>
          </div>
        </div>
        <button onClick={() => navigate('/products/manage')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm border border-gray-200/60 dark:border-slate-600/40 hover:border-secondary/40 hover:text-secondary shadow-sm transition-all">
          <Feather.ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <motion.div className="relative z-10"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl overflow-hidden bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl border border-white/80 dark:border-white/15"
            style={{ boxShadow: '0 8px 40px rgba(49,151,96,0.10)' }}>

            <div className="h-[3px] w-full" style={{ background: 'linear-gradient(90deg, var(--color-primary), #8CC63F, var(--color-secondary))' }} />

            <div className="p-6 lg:p-8 space-y-8">

              {/* ─── Basic Info ───────────────────────────────────────── */}
              <div>
                <SectionLabel icon={Feather.Package} text="Basic Information" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
                  <div className="md:col-span-2">
                    <label className={labelCls}>Product Name <span className="text-red-400">*</span></label>
                    <input ref={nameRef} type="text" value={form.name} onChange={e => set('name', e.target.value)}
                      placeholder="e.g. Arduino Uno R3" maxLength={120} className={getInputCls(errors.name)} />
                    {errors.name && <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Status</label>
                    <div className="relative">
                      <select value={form.status} onChange={e => set('status', e.target.value)}
                        className={getInputCls('') + ' pr-9 appearance-none cursor-pointer'}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <Feather.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="mt-5 max-w-sm">
                  <label className={labelCls}>Part No / SKU</label>
                  <input type="text" value={form.partNo} onChange={e => set('partNo', e.target.value)}
                    placeholder="e.g. SKU-12345" maxLength={80} className={getInputCls('')} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <div>
                    <label className={labelCls}>Category <span className="text-red-400">*</span></label>
                    <div className="relative">
                      <select ref={categoryRef} value={form.categoryId} onChange={handleCategory}
                        className={getInputCls(errors.categoryId) + ' pr-9 appearance-none cursor-pointer'}>
                        <option value="">Select category...</option>
                        {categories.filter(c => c.status === 1).map(c => (
                          <option key={c.id} value={String(c.id)}>{c.category_name}</option>
                        ))}
                      </select>
                      <Feather.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    {errors.categoryId && <p className="text-[11px] text-red-400 font-semibold mt-1.5">{errors.categoryId}</p>}
                  </div>
                  <div>
                    <label className={labelCls}>Subcategory</label>
                    <div className="relative">
                      <select value={form.subcategoryId} onChange={handleSubcategory}
                        disabled={!form.categoryId}
                        className={getInputCls('') + ' pr-9 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'}>
                        <option value="">{form.categoryId ? 'Select subcategory...' : 'Select category first'}</option>
                        {filteredSubs.filter(s => s.status === 1 || s.status === 'Active').map(s => (
                          <option key={s.id} value={String(s.id)}>{s.sub_category_name}</option>
                        ))}
                      </select>
                      <Feather.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Division — visible only when selected subcategory has divisions */}
                <AnimatePresence>
                  {/* {selectedSubHasDivisions && selectedSub?.divisions?.length > 0 && ( */}
                  {selectedSubHasDivisions && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden max-w-sm">
                      <label className={labelCls}>Division</label>
                      <div className="relative">
                        <select value={form.divisionId} onChange={e => set('divisionId', e.target.value)}
                          className={getInputCls('') + ' pr-9 appearance-none cursor-pointer'}>
                          <option value="">Select division...</option>
                          {divisions.map(d => (
                            <option
                              key={d.id || d.division_name}
                              value={String(d.id || d.division_name)}
                            >
                              {d.division_name}
                            </option>
                          ))}
                        </select>
                        <Feather.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Divider />

              {/* ─── Description ─────────────────────────────────────── */}
              <div>
                <SectionLabel icon={Feather.AlignLeft} text="Description" required />
                <div className="mt-4">
                  <textarea ref={descriptionRef} value={form.description} onChange={e => set('description', e.target.value)}
                    placeholder="Enter product description..." rows={4} maxLength={1000}
                    className={`w-full px-4 py-3 text-[13px] font-medium text-gray-700 dark:text-gray-200 bg-white/70 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl resize-none transition-all placeholder:text-gray-300 ${errors.description ? 'border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/30' : 'border border-gray-200/70 dark:border-slate-600/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50'}`} />
                  <div className="flex justify-between mt-1.5">
                    {errors.description ? <p className="text-[11px] text-red-400 font-semibold">{errors.description}</p> : <span />}
                    <span className="text-[10px] text-gray-400 ml-auto">{(form.description ?? '').length}/1000</span>
                  </div>
                </div>
              </div>

              <Divider />

              {/* ─── Key Features Table ───────────────────────────────── */}
              <div>
                <SectionLabel icon={Feather.List} text="Key Features Table" />
                <div className="mt-4 space-y-4">
                  <div className="max-w-sm">
                    <label className={labelCls}>Section Title</label>
                    <input type="text" value={form.keyFeaturesTitle}
                      onChange={e => set('keyFeaturesTitle', e.target.value)}
                      placeholder="e.g. Technical Specifications" className={getInputCls('')} />
                  </div>
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label className={labelCls}>Feature Name</label>
                      <input ref={kfNameRef} type="text" value={kfName}
                        onChange={e => setKfName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addKF())}
                        placeholder="e.g. Operating Voltage" className={getInputCls('')} />
                    </div>
                    <div className="flex-1">
                      <label className={labelCls}>Value</label>
                      <input type="text" value={kfValue}
                        onChange={e => setKfValue(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addKF())}
                        placeholder="e.g. 5V" className={getInputCls('')} />
                    </div>
                    <button type="button" onClick={addKF}
                      className="flex items-center gap-1.5 h-11 px-5 rounded-xl text-[13px] font-bold text-white shrink-0 transition-all hover:-translate-y-0.5 active:scale-[0.97] shadow-[0_4px_12px_rgba(49,151,96,0.25)]"
                      style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                      <Feather.Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  </div>
                  {form.keyFeatures.length > 0 ? (
                    <div className="rounded-2xl border border-gray-200/60 dark:border-slate-600/50 overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-primary/6 border-b border-gray-100/60">
                            <th className="px-4 py-2.5 text-left text-[11px] font-black text-primary uppercase tracking-widest w-8">#</th>
                            <th className="px-4 py-2.5 text-left text-[11px] font-black text-primary uppercase tracking-widest">Feature</th>
                            <th className="px-4 py-2.5 text-left text-[11px] font-black text-primary uppercase tracking-widest">Value</th>
                            <th className="px-4 py-2.5 w-12" />
                          </tr>
                        </thead>
                        <tbody>
                          {form.keyFeatures.map((kf, i) => (
                            <tr key={kf.id} className="border-b last:border-0 border-gray-100/60 hover:bg-gray-50/30 transition-colors">
                              <td className="px-4 py-2.5 text-[11px] font-black text-gray-400">{String(i + 1).padStart(2, '0')}</td>
                              <td className="px-4 py-2.5 text-[13px] font-semibold text-gray-700 dark:text-gray-200">{kf.name}</td>
                              <td className="px-4 py-2.5 text-[13px] text-gray-500 font-medium">{kf.value || '—'}</td>
                              <td className="px-4 py-2.5 text-right">
                                <button type="button" onClick={() => removeKF(kf.id)}
                                  className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                  <Feather.Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 py-7 rounded-2xl bg-gray-50/60 dark:bg-slate-800/40 border-2 border-dashed border-gray-200 dark:border-slate-600/40">
                      <Feather.List className="w-5 h-5 text-gray-300" />
                      <p className="text-[12px] text-gray-400">No features yet — add name + value above and click Add</p>
                    </div>
                  )}
                </div>
              </div>

              <Divider />

              {/* ─── Additional Content Sections ─────────────────────── */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <SectionLabel icon={Feather.Layers} text="Additional Content Sections" />
                    <p className="text-[12px] text-gray-400 mt-1">Select which sections to include on this product page</p>
                  </div>
                  <button type="button" onClick={() => setShowAddSection(true)}
                    className="flex items-center gap-2 h-9 px-4 rounded-xl text-[12px] font-bold text-white shrink-0 transition-all hover:-translate-y-0.5 active:scale-[0.97] shadow-[0_3px_10px_rgba(49,151,96,0.25)]"
                    style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                    <Feather.Plus className="w-3.5 h-3.5" /> Add Section
                  </button>
                </div>

                {/* Built-in section toggle pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {SECTIONS.map(({ key, label, icon: Icon }) => {
                    const active = form.sectionEnabled[key];
                    return (
                      <button key={key} type="button" onClick={() => setSection(key, !active)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold transition-all duration-200 ${active
                          ? 'text-white shadow-[0_4px_14px_rgba(49,151,96,0.25)]'
                          : 'text-gray-500 bg-gray-100/70 dark:bg-slate-700/50 border border-gray-200/60 dark:border-slate-600/40 hover:border-primary/40 hover:text-primary'
                          }`}
                        style={active ? { background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' } : {}}>
                        {active ? <Feather.CheckSquare className="w-3.5 h-3.5" /> : <Feather.Square className="w-3.5 h-3.5" />}
                        {label}
                      </button>
                    );
                  })}

                  {/* Custom section pills — with delete button */}
                  {(form.customSections || []).map(sec => {
                    const active = form.sectionEnabled[sec.id];
                    const typeInfo = FIELD_TYPES.find(t => t.value === sec.fieldType);
                    const TypeIcon = typeInfo?.icon || Feather.FileText;
                    return (
                      <div key={sec.id}
                        className={`flex items-center rounded-xl text-[12px] font-bold transition-all duration-200 overflow-hidden ${active
                          ? 'text-white shadow-[0_4px_14px_rgba(49,151,96,0.25)]'
                          : 'text-gray-500 bg-gray-100/70 dark:bg-slate-700/50 border border-gray-200/60 dark:border-slate-600/40'
                          }`}
                        style={active ? { background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' } : {}}>
                        <button type="button" onClick={() => setSection(sec.id, !active)}
                          className="flex items-center gap-2 px-3 py-2">
                          <TypeIcon className="w-3.5 h-3.5" />
                          {sec.title}
                        </button>
                        <button type="button" onClick={() => removeCustomSection(sec.id)}
                          className={`w-7 h-full flex items-center justify-center border-l transition-all ${active
                            ? 'border-white/20 hover:bg-white/15'
                            : 'border-gray-200/60 dark:border-slate-600/40 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'
                            }`}>
                          <Feather.X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Expanded sections */}
                <AnimatePresence>
                  {allEnabledSections.map(({ key, label, icon: Icon, isCustom, customSection }) => (
                    <motion.div key={key}
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden">
                      <div className="rounded-2xl border border-primary/15 dark:border-primary/10 bg-primary/3 dark:bg-primary/4 p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                              style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
                              <Icon className="w-3.5 h-3.5 text-white" />
                            </div>
                            <p className="text-[12px] font-black uppercase tracking-widest text-primary">{label}</p>
                            {isCustom && (
                              <span className="text-[10px] font-bold text-gray-400 bg-gray-100/60 dark:bg-slate-700/40 px-2 py-0.5 rounded-full capitalize">
                                {FIELD_TYPES.find(t => t.value === customSection?.fieldType)?.label || 'Custom'}
                              </span>
                            )}
                          </div>
                          <button type="button"
                            onClick={() => isCustom ? removeCustomSection(key) : setSection(key, false)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                            <Feather.X className="w-4 h-4" />
                          </button>
                        </div>
                        {renderSectionContent(key, isCustom ? customSection : null)}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {allEnabledSections.length === 0 && (
                  <div className="flex flex-col items-center gap-2 py-8 rounded-2xl bg-gray-50/60 dark:bg-slate-800/40 border-2 border-dashed border-gray-200 dark:border-slate-600/40">
                    <Feather.Layers className="w-5 h-5 text-gray-300" />
                    <p className="text-[12px] text-gray-400">Toggle sections above or click "+ Add Section" to create custom ones</p>
                  </div>
                )}
              </div>

              <Divider />

              {/* ─── Product Images ───────────────────────────────────── */}
              <div>
                <SectionLabel icon={Feather.Image} text="Product Images" />
                <p className="text-[12px] text-gray-400 mt-1 mb-4">Upload product images (JPG, PNG, WebP)</p>
                <div className="flex gap-3 mb-5">
                  {[1, 3, 6].map(count => (
                    <button key={count} type="button" onClick={() => handleImageCount(count)}
                      className={`flex flex-col items-center gap-1.5 w-24 py-3 rounded-2xl border-2 transition-all duration-200 ${form.imageCount === count
                        ? 'border-primary/50 text-white shadow-[0_4px_14px_rgba(49,151,96,0.20)]'
                        : 'border-gray-200/70 dark:border-slate-600/50 text-gray-500 hover:border-primary/40 hover:text-primary bg-gray-50/60 dark:bg-slate-800/40'
                        }`}
                      style={form.imageCount === count ? { background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' } : {}}>
                      <Feather.Image className="w-5 h-5" />
                      <span className="text-[12px] font-black">{count} {count === 1 ? 'Image' : 'Images'}</span>
                    </button>
                  ))}
                </div>
                <div className={`grid gap-4 ${imgGridCls}`}>
                  {Array.from({ length: form.imageCount }, (_, i) => (
                    <ImageSlot key={i} index={i} preview={form.images[i] || null}
                      loading={loadingSlots.includes(i)}
                      onUpload={handleImageUpload} onRemove={handleImageRemove} onLoaded={handleImageLoaded} />
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 mt-3">
                  JPG, PNG, WebP — max {MAX_IMG_MB} MB per file, up to {form.imageCount} {form.imageCount === 1 ? 'image' : 'images'}.
                </p>
              </div>

              <Divider />

              {/* ─── 3D Model Object ──────────────────────────────────── */}
              <div>
                <SectionLabel icon={Feather.Box} text="3D Model Object" />
                <p className="text-[12px] text-gray-400 mt-1 mb-4">Upload the 3D model — OBJ geometry file and MTL material file</p>
                <Model3DField
                  objFile={form.objFile}
                  mtlFile={form.mtlFile}
                  onObjChange={v => set('objFile', v)}
                  onMtlChange={v => set('mtlFile', v)}
                />
              </div>

              <Divider />

              {/* ─── Datasheet ────────────────────────────────────── */}
              <div>
                <SectionLabel icon={Feather.FileText} text="Product Datasheet" />
                <p className="text-[12px] text-gray-400 mt-1 mb-4">
                  Upload the product datasheet — all file formats are supported
                </p>
                <DatasheetField value={form.datasheet} onChange={v => set('datasheet', v)} />
              </div>

            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-6 lg:px-8 py-5 bg-gray-50/60 dark:bg-slate-800/30 border-t border-gray-100/60 dark:border-slate-700/40">
              <button type="button" onClick={() => navigate('/products/manage')}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.97]"
                style={{ background: 'linear-gradient(135deg, #E74C3C, #C0392B)', boxShadow: '0 6px 20px rgba(231,76,60,0.30)' }}>
                <Feather.X className="w-4 h-4" /> Cancel
              </button>
              <button type="submit" disabled={submitting || saved}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 active:scale-[0.97] disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', boxShadow: '0 6px 20px rgba(49,151,96,0.30)' }}>
                {saved ? (
                  <><Feather.CheckCircle className="w-4 h-4" />{isEdit ? 'Updated!' : 'Saved!'}</>
                ) : submitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    {isEdit ? 'Updating…' : 'Saving…'}
                  </>
                ) : (
                  <><Feather.Save className="w-4 h-4" />{isEdit ? 'Update Product' : 'Save Product'}</>
                )}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

/* ── Utility sub-components ────────────────────────────────────────── */
const SectionLabel = ({ icon: Icon, text, required }) => (
  <div className="flex items-center gap-2">
    <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0"
      style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}>
      <Icon className="w-3.5 h-3.5 text-white" />
    </div>
    <h3 className="text-[13px] font-black text-gray-700 dark:text-gray-200 uppercase tracking-wider">
      {text}
      {required && <span className="text-red-500 ml-1">*</span>}
    </h3>
  </div>
);

const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-gray-200/60 dark:via-slate-700/40 to-transparent" />
);

export default ProductForm;
