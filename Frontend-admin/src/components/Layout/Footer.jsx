import React from 'react';
import { cn } from '../../lib/utils';

/**
 * Minimal footer component.
 * Props:
 *   - brandName: Company/product name (default: 'Rsi Store')
 *   - creditName: Developer/designer credit
 *   - creditLink: URL for the credit link
 *   - className: Additional styling
 */
const Footer = ({
  brandName = 'Rsi Store',
  creditName = 'Rsi Store',
  creditLink = '#!',
  className,
}) => {
  return (
    <footer className={cn(
      'py-4 px-6',
      'relative z-10',
      'border-t border-gray-100 dark:border-slate-700',
      'bg-white dark:bg-slate-800',
      'transition-colors duration-300',
      className
    )}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span>
          {new Date().getFullYear()} © {brandName}.
        </span>
        <span className="hidden sm:block">
          Design & Develop by{' '}
          <a
            href={creditLink}
            className="text-primary hover:text-primary-700 underline underline-offset-2 transition-colors duration-200"
          >
            {creditName}
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
