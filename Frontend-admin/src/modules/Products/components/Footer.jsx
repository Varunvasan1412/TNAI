import React from 'react';
import { cn } from '../../../lib/utils';

const Footer = ({
  brandName = 'Rsi Store',
  creditName = 'Rsi Store',
  creditLink = 'https://ahattrickz.com',
  className,
}) => {
  return (
    <footer className={cn(
      'py-4 px-6',
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
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:text-primary-700 transition-colors duration-200"
          >
            {creditName}
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
