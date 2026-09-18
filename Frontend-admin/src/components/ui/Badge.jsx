import React from 'react';
import { cn } from '../../lib/utils';

const variantStyles = {
  // Solid
  primary: 'bg-primary text-white border-transparent',
  success: 'bg-success text-white border-transparent',
  info:    'bg-info text-white border-transparent',
  warning: 'bg-warning text-white border-transparent',
  danger:  'bg-danger text-white border-transparent',
  dark:    'bg-slate-800 text-white border-transparent',
  light:   'bg-gray-100 text-gray-800 border-transparent',
  // Soft
  'soft-primary': 'bg-primary/10 text-primary border-transparent',
  'soft-success': 'bg-success/10 text-success border-transparent',
  'soft-info':    'bg-info/10 text-info border-transparent',
  'soft-warning': 'bg-warning/10 text-warning border-transparent',
  'soft-danger':  'bg-danger/10 text-danger border-transparent',
  'soft-dark':    'bg-slate-800/10 text-slate-800 dark:text-slate-200 border-transparent',
  // Outline
  'outline-primary': 'bg-transparent text-primary border-primary/30',
  'outline-success': 'bg-transparent text-success border-success/30',
  'outline-info':    'bg-transparent text-info border-info/30',
  'outline-warning': 'bg-transparent text-warning border-warning/30',
  'outline-danger':  'bg-transparent text-danger border-danger/30',
};

const sizeStyles = {
  sm: 'px-1.5 py-0.5 text-2xs',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
};

const Badge = React.forwardRef(({
  variant = 'primary',
  size = 'md',
  pill = false,
  dot = false,
  className,
  children,
  ...props
}, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center font-medium leading-none border',
        pill ? 'rounded-full' : 'rounded',
        dot && 'gap-1.5',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn(
          'w-1.5 h-1.5 rounded-full',
          variant.includes('soft') ? 'bg-current' : 'bg-white/70'
        )} />
      )}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
