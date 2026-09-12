import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const Breadcrumb = ({ className, children, ...props }) => (
  <nav aria-label="Breadcrumb" className={cn('', className)} {...props}>
    <ol className="flex items-center gap-1.5 text-sm">
      {children}
    </ol>
  </nav>
);

const BreadcrumbItem = ({ className, href, active = false, children, ...props }) => {
  const Comp = href ? Link : 'span';

  return (
    <li className={cn('flex items-center gap-1.5', className)} {...props}>
      {active ? (
        <span className="text-gray-500 dark:text-gray-400">{children}</span>
      ) : (
        <>
          <Comp
            {...(href ? { to: href } : {})}
            className="text-primary hover:text-primary-700 transition-colors duration-200"
          >
            {children}
          </Comp>
          <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </>
      )}
    </li>
  );
};

export { Breadcrumb, BreadcrumbItem };
