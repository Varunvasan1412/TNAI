import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

/* ─── Tabs ─── */

const TabsContext = React.createContext(null);

const Tabs = ({
  defaultValue,
  value,
  onChange,
  className,
  children,
  orientation = 'horizontal', // horizontal | vertical
  variant = 'line' // line | pills
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const activeTab = value !== undefined ? value : internalValue;
  const setActiveTab = onChange || setInternalValue;

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, orientation, variant }}>
      <div className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-row gap-6' : 'flex-col',
        className
      )}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabList = ({ className, children, ...props }) => {
  const { orientation, variant } = React.useContext(TabsContext);
  return (
    <div
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col border-r' : 'border-b',
        variant === 'pills' ? 'border-none p-1 bg-gray-100/50 dark:bg-slate-900/50 rounded-xl' : 'border-gray-200 dark:border-slate-700',
        className
      )}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
};

const Tab = ({ value, className, children, icon: Icon, ...props }) => {
  const { activeTab, setActiveTab, orientation, variant } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  const baseStyles = cn(
    'relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 whitespace-nowrap',
    orientation === 'vertical' ? 'text-left justify-start' : 'text-center justify-center',
    isActive
      ? variant === 'pills' ? 'text-primary' : 'text-primary'
      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
  );

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={cn(baseStyles, className)}
      {...props}
    >
      {isActive && variant === 'pills' && (
        <motion.div
          layoutId="tab-pills-bg"
          className="absolute inset-0 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </span>
      {isActive && variant === 'line' && (
        <motion.div
          layoutId="tab-indicator"
          className={cn(
            'absolute bg-primary',
            orientation === 'vertical' ? 'right-0 top-0 bottom-0 w-0.5' : 'bottom-0 left-0 right-0 h-0.5'
          )}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
};

const TabPanel = ({ value, className, children, ...props }) => {
  const { activeTab } = React.useContext(TabsContext);
  if (activeTab !== value) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      role="tabpanel"
      className={cn('py-4', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/* ─── Accordion ─── */

const AccordionContext = React.createContext(null);

const Accordion = ({ type = 'single', defaultValue, className, children }) => {
  const [openItems, setOpenItems] = useState(
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []
  );

  const toggle = (value) => {
    setOpenItems((prev) => {
      if (type === 'single') {
        return prev.includes(value) ? [] : [value];
      }
      return prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggle }}>
      <div className={cn('divide-y divide-gray-200 dark:divide-slate-700 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionItem = ({ value, className, children }) => {
  const { openItems, toggle } = React.useContext(AccordionContext);
  const isOpen = openItems.includes(value);

  return (
    <div className={cn('', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { isOpen, onToggle: () => toggle(value) });
        }
        return child;
      })}
    </div>
  );
};

const AccordionTrigger = ({ isOpen, onToggle, className, children }) => (
  <button
    onClick={onToggle}
    className={cn(
      'flex w-full items-center justify-between px-5 py-4 text-sm font-medium text-left',
      'text-gray-800 dark:text-white',
      'hover:bg-gray-50 dark:hover:bg-slate-700/50',
      'transition-colors duration-200',
      className
    )}
  >
    {children}
    <motion.svg
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      className="w-4 h-4 text-gray-500 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </motion.svg>
  </button>
);

const AccordionContent = ({ isOpen, className, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <div className={cn('px-5 pb-4 text-sm text-gray-600 dark:text-gray-400', className)}>
          {children}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export { Tabs, TabList, Tab, TabPanel, Accordion, AccordionItem, AccordionTrigger, AccordionContent };
