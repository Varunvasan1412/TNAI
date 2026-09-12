import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const variantStyles = {
  primary: {
    soft: 'bg-primary-50 border-primary-200 dark:bg-primary-900/20 dark:border-primary-800',
    solid: 'bg-primary border-primary text-white',
    icon: 'text-primary',
    iconSolid: 'text-white',
    text: 'text-primary-800 dark:text-primary-200',
  },
  success: {
    soft: 'bg-success-50 border-success-200 dark:bg-success-900/20 dark:border-success-800',
    solid: 'bg-success border-success text-white',
    icon: 'text-success',
    iconSolid: 'text-white',
    text: 'text-success-800 dark:text-success-200',
  },
  info: {
    soft: 'bg-info-50 border-info-200 dark:bg-info-900/20 dark:border-info-800',
    solid: 'bg-info border-info text-white',
    icon: 'text-info',
    iconSolid: 'text-white',
    text: 'text-info-800 dark:text-info-200',
  },
  warning: {
    soft: 'bg-warning-50 border-warning-200 dark:bg-warning-900/20 dark:border-warning-800',
    solid: 'bg-warning border-warning text-white',
    icon: 'text-warning-700',
    iconSolid: 'text-white',
    text: 'text-warning-800 dark:text-warning-200',
  },
  danger: {
    soft: 'bg-danger-50 border-danger-200 dark:bg-danger-900/20 dark:border-danger-800',
    solid: 'bg-danger border-danger text-white',
    icon: 'text-danger',
    iconSolid: 'text-white',
    text: 'text-danger-800 dark:text-danger-200',
  },
};

const iconMap = {
  primary: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ),
  danger: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const Alert = React.forwardRef(({
  variant = 'primary',
  className,
  children,
  icon,
  dismissible = false,
  onDismiss,
  show = true,
  title,
  solid = false,
  ...props
}, ref) => {
  const styles = variantStyles[variant];
  const defaultIcon = iconMap[variant];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -10, height: 0 }}
          transition={{ duration: 0.2 }}
          role="alert"
          className={cn(
            'flex gap-3 rounded-lg border p-4 shadow-sm',
            solid ? styles.solid : styles.soft,
            className
          )}
          {...props}
        >
          {(icon || defaultIcon) && (
            <div className={cn('flex-shrink-0 mt-0.5', solid ? styles.iconSolid : styles.icon)}>
              {icon || defaultIcon}
            </div>
          )}
          <div className={cn('flex-1 text-sm leading-relaxed', solid ? 'text-white' : styles.text)}>
            {title && <p className={cn('font-bold mb-1', solid ? 'text-white' : 'text-inherit')}>{title}</p>}
            <div className={cn('font-medium', solid ? 'text-white/90' : 'text-inherit')}>
               {children}
            </div>
          </div>
          {dismissible && (
            <button
              onClick={onDismiss}
              className={cn(
                'flex-shrink-0 ml-auto -mr-1 -mt-1 p-1 rounded-md transition-colors', 
                solid ? 'text-white/70 hover:bg-white/10 hover:text-white' : cn(styles.text, 'hover:bg-black/5')
              )}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

Alert.displayName = 'Alert';

export default Alert;
