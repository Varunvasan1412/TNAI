import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const variantColors = {
  primary: 'bg-primary',
  success: 'bg-success',
  info:    'bg-info',
  warning: 'bg-warning',
  danger:  'bg-danger',
  dark:    'bg-gray-800',
};

const sizeStyles = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
  xl: 'h-6',
};

const ProgressBar = React.forwardRef(({
  value = 0,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  striped = false,
  animated = true,
  className,
  ...props
}, ref) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        'w-full rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden',
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clampedValue}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={cn(
          'h-full rounded-full flex items-center justify-center',
          variantColors[variant],
          striped && 'bg-stripes',
          animated && striped && 'animate-stripes'
        )}
      >
        {showLabel && size !== 'xs' && size !== 'sm' && (
          <span className="text-2xs font-medium text-white px-2">
            {clampedValue}%
          </span>
        )}
      </motion.div>
    </div>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
