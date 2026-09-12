import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const DropdownContext = React.createContext(null);

const Dropdown = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={dropdownRef} className={cn('relative inline-block', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

const DropdownTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { isOpen, setIsOpen } = React.useContext(DropdownContext);
  return (
    <button
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
      className={cn('inline-flex items-center', className)}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
    </button>
  );
});
DropdownTrigger.displayName = 'DropdownTrigger';

const DropdownMenu = React.forwardRef(({
  className,
  children,
  align = 'left',
  width = 'w-48',
  ...props
}, ref) => {
  const { isOpen } = React.useContext(DropdownContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -5, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -5, scale: 0.95 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={cn(
            'absolute z-50 mt-1',
            'rounded-lg bg-white dark:bg-slate-800',
            'shadow-dropdown border border-gray-100 dark:border-slate-700',
            'py-1 overflow-hidden',
            width,
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});
DropdownMenu.displayName = 'DropdownMenu';

const DropdownItem = React.forwardRef(({ className, children, icon: Icon, danger = false, ...props }, ref) => {
  const { setIsOpen } = React.useContext(DropdownContext);

  return (
    <button
      ref={ref}
      onClick={() => {
        setIsOpen(false);
        props.onClick?.();
      }}
      className={cn(
        'flex w-full items-center gap-2 px-4 py-2 text-sm',
        'transition-colors duration-150',
        danger
          ? 'text-danger hover:bg-danger-50 dark:hover:bg-danger/10'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700',
        className
      )}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
});
DropdownItem.displayName = 'DropdownItem';

const DropdownDivider = () => (
  <div className="my-1 border-t border-gray-100 dark:border-slate-700" />
);

const DropdownLabel = ({ className, children }) => (
  <div className={cn('px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider', className)}>
    {children}
  </div>
);

export { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownDivider, DropdownLabel };
