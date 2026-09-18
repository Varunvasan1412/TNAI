import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Low-level building blocks for custom table layouts
 */

export const TableContainer = ({ children, className }) => (
  <div className={twMerge("w-full overflow-x-auto rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm", className)}>
    <table className="w-full text-left border-collapse">
      {children}
    </table>
  </div>
);

export const THead = ({ children, className }) => (
  <thead className={twMerge("bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700", className)}>
    {children}
  </thead>
);

export const TBody = ({ children, className }) => (
  <tbody className={twMerge("divide-y divide-gray-100 dark:divide-slate-700 bg-white dark:bg-slate-800", className)}>
    {children}
  </tbody>
);

export const TH = ({ children, className }) => (
  <th className={twMerge("px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400", className)}>
    {children}
  </th>
);

export const TD = ({ children, className }) => (
  <td className={twMerge("px-6 py-4 text-sm text-gray-600 dark:text-slate-300", className)}>
    {children}
  </td>
);

export const TR = ({ children, className, hover = true }) => (
  <tr className={twMerge(
    "transition-colors",
    hover && "hover:bg-gray-50/80 dark:hover:bg-slate-700/30",
    className
  )}>
    {children}
  </tr>
);

// Aliases for better compatibility with different coding styles
export { THead as TableHead, TBody as TableBody, TR as TableRow, TD as TableCell, TH as TableHeader };

/**
 * High-level Table component for declarative usage
 */
export const Table = ({ 
  columns = [], 
  data = [], 
  children,
  className,
  selectable = false,
  hoverable = true,
  pagination = false,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = React.useState(1);

  // If children are provided, we act as a wrapper (compositional mode)
  if (children) {
    return (
      <TableContainer className={className}>
        {children}
      </TableContainer>
    );
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = pagination ? data.slice(startIndex, startIndex + itemsPerPage) : data;

  // Otherwise, we act as a declarative data table
  return (
    <div className="space-y-4">
      <TableContainer className={className}>
        <THead>
          <TR hover={false}>
            {selectable && (
              <TH className="w-12">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
              </TH>
            )}
            {columns.map((col, idx) => (
              <TH key={idx} className={col.className}>{col.header}</TH>
            ))}
          </TR>
        </THead>
        <TBody>
          {paginatedData.map((row, rowIdx) => (
            <TR key={rowIdx} hover={hoverable}>
              {selectable && (
                <TD>
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                </TD>
              )}
              {columns.map((col, colIdx) => (
                <TD key={colIdx} className={col.className}>
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </TD>
              ))}
            </TR>
          ))}
          {paginatedData.length === 0 && (
            <TR hover={false}>
              <TD colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-12 text-gray-400 italic">
                No data available to display
              </TD>
            </TR>
          )}
        </TBody>
      </TableContainer>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-xs font-medium text-gray-500">
            Showing <span className="text-gray-800 dark:text-white font-bold">{startIndex + 1}</span> to <span className="text-gray-800 dark:text-white font-bold">{Math.min(startIndex + itemsPerPage, data.length)}</span> of <span className="text-gray-800 dark:text-white font-bold">{data.length}</span> entries
          </p>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={twMerge(
                  "w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all",
                  currentPage === i + 1 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-500"
                )}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 dark:border-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
