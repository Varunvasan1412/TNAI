import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const variantStyles = {
  primary:   'bg-primary text-white hover:bg-primary-700 focus:ring-primary/50',
  success:   'bg-success text-white hover:bg-success-700 focus:ring-success/50',
  info:      'bg-info text-white hover:bg-info-700 focus:ring-info/50',
  warning:   'bg-warning text-white hover:bg-warning-700 focus:ring-warning/50',
  danger:    'bg-danger text-white hover:bg-danger-700 focus:ring-danger/50',
  dark:      'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500/50',
  light:     'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300/50',
  
  // Soft Variants
  soft:      'bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/40',
  'soft-success': 'bg-success-100 text-success-700 hover:bg-success-200 dark:bg-success-900/30 dark:text-success-300 dark:hover:bg-success-900/40',
  'soft-danger':  'bg-danger-100 text-danger-700 hover:bg-danger-200 dark:bg-danger-900/30 dark:text-danger-300 dark:hover:bg-danger-900/40',
  'soft-info':    'bg-info-100 text-info-700 hover:bg-info-200 dark:bg-info-900/30 dark:text-info-300 dark:hover:bg-info-900/40',
  'soft-warning': 'bg-warning-100 text-warning-700 hover:bg-warning-200 dark:bg-warning-900/30 dark:text-warning-300 dark:hover:bg-warning-900/40',
  
  // Outline Variants
  outline:   'border border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:ring-primary/50',
  'outline-success': 'border border-success text-success bg-transparent hover:bg-success hover:text-white focus:ring-success/50',
  'outline-danger':  'border border-danger text-danger bg-transparent hover:bg-danger hover:text-white focus:ring-danger/50',
  'outline-info':    'border border-info text-info bg-transparent hover:bg-info hover:text-white focus:ring-info/50',
  
  // Ghost & Link
  ghost:     'text-primary bg-transparent hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:ring-primary/50',
  link:      'text-primary bg-transparent underline-offset-4 hover:underline focus:ring-0 shadow-none px-0',
};

const sizeStyles = {
  xs: 'px-2.5 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
  xl: 'px-6 py-3 text-lg',
  icon: 'p-2',
};

const Button = React.forwardRef(({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled = false,
  loading = false,
  as: Component,
  animate = true,
  ...props
}, ref) => {
  const Comp = animate ? motion.button : (Component || 'button');

  const motionProps = animate ? {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  } : {};

  return (
    <Comp
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-1',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...motionProps}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </Comp>
  );
});

Button.displayName = 'Button';

export default Button;
