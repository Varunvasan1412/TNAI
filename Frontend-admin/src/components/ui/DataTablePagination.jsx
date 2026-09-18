import React from 'react';
import * as Feather from 'react-feather';

export const DataTablePagination = ({ page, totalPages, total, perPage, onPage }) => {
  const from = Math.min((page - 1) * perPage + 1, total);
  const to = Math.min(page * perPage, total);
  const pages = [];
  const delta = 1;
  for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) pages.push(i);
  if (pages[0] > 2) pages.unshift('...');
  if (pages[0] > 1) pages.unshift(1);
  if (pages[pages.length - 1] < totalPages - 1) pages.push('...');
  if (pages[pages.length - 1] < totalPages) pages.push(totalPages);

  if (total === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3.5
                    border-t border-gray-100/60 dark:border-slate-700/40">
      <p className="text-[12px] font-medium text-gray-400">
        Showing <span className="font-bold text-gray-600 dark:text-gray-300">{from}</span> to{' '}
        <span className="font-bold text-gray-600 dark:text-gray-300">{to}</span> of{' '}
        <span className="font-bold text-gray-600 dark:text-gray-300">{total}</span> entries
      </p>
      <div className="flex items-center gap-1">
        <button onClick={() => onPage(page - 1)} disabled={page === 1}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400
                     hover:bg-primary/10 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <Feather.ChevronLeft className="w-4 h-4" />
        </button>
        {pages.map((p, i) =>
          p === '...'
            ? <span key={`d${i}`} className="w-8 h-8 flex items-center justify-center text-[12px] text-gray-400">…</span>
            : <button key={p} onClick={() => onPage(p)}
              className={`w-8 h-8 rounded-lg text-[12px] font-bold transition-all ${p === page ? 'text-white shadow-sm' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700'
                }`}
              style={p === page ? { background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' } : {}}>
              {p}
            </button>
        )}
        <button onClick={() => onPage(page + 1)} disabled={page === totalPages || totalPages === 0}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400
                     hover:bg-primary/10 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all">
          <Feather.ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
