import React from 'react';
import { cn } from '../../lib/utils';

const variantColors = {
  primary: 'text-primary',
  success: 'text-success',
  info:    'text-info',
  warning: 'text-warning',
  danger:  'text-danger',
  dark:    'text-slate-800 dark:text-slate-200',
  light:   'text-white',
};

const sizeStyles = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const Spinner = ({ 
  variant = 'primary', 
  size = 'md', 
  className,
  type = 'border' // border | grow
}) => {
  if (type === 'grow') {
    return (
      <div
        className={cn(
          'inline-block rounded-full animate-pulse bg-current opacity-75',
          sizeStyles[size],
          variantColors[variant],
          className
        )}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
        sizeStyles[size],
        variantColors[variant],
        className
      )}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
