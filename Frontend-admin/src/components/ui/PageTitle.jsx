import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

/**
 * Reusable page title + breadcrumb component.
 * 
 * Usage:
 *   <PageTitle title="Dashboard" breadcrumbs={[
 *     { label: 'Home', path: '/dashboard' },
 *     { label: 'Dashboard', active: true },
 *   ]} />
 */
const PageTitle = ({ title, breadcrumbs = [], className, children }) => {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 pb-4 border-b border-gray-200/50 dark:border-gray-700/50', className)}>
      <div className="space-y-1.5">
        <h4 className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight leading-tight">
          {title}
        </h4>
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[13px] font-semibold">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  {crumb.active ? (
                    <span className="text-gray-400 dark:text-gray-500">{crumb.label}</span>
                  ) : (
                    <>
                      <Link
                        to={crumb.path || '#'}
                        className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200"
                      >
                        {crumb.label}
                      </Link>
                      <svg className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
      {children && <div className="mt-4 sm:mt-0">{children}</div>}
    </div>
  );
};

export default PageTitle;
