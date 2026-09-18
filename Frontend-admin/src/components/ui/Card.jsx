import React from 'react';
import { cn } from '../../lib/utils';

const Card = React.forwardRef(({ 
  children, 
  className, 
  variant = 'default', // default, glass, primary, success, info, danger, warning
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 shadow-sm',
    glass:   'bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-white/20 dark:border-slate-700/50 shadow-xl',
    primary: 'bg-primary text-white border-primary shadow-lg shadow-primary/20',
    success: 'bg-success text-white border-success shadow-lg shadow-success/20',
    info:    'bg-info text-white border-info shadow-lg shadow-info/20',
    warning: 'bg-warning text-white border-warning shadow-lg shadow-warning/20',
    danger:  'bg-danger text-white border-danger shadow-lg shadow-danger/20',
  };

  return (
    <div 
      ref={ref}
      className={cn(
        'rounded-2xl border transition-all duration-300 overflow-hidden',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
Card.displayName = 'Card';

const CardHeader = ({ children, className, ...props }) => (
  <div className={cn('px-6 py-4 border-b border-inherit/10', className)} {...props}>
    {children}
  </div>
);

const CardBody = ({ children, className, ...props }) => (
  <div className={cn('p-6', className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className, ...props }) => (
  <div className={cn('px-6 py-4 border-t border-inherit/10 bg-inherit/5', className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, as: Tag = 'h4', ...props }) => (
  <Tag className={cn('text-base font-black text-[#1E293B] leading-tight tracking-tight', className)} {...props}>
    {children}
  </Tag>
);

export { Card, CardHeader, CardBody, CardFooter, CardTitle };
