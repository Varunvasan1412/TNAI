import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import * as Feather from 'react-feather';

const Offcanvas = ({ 
  isOpen, 
  onClose, 
  placement = 'right', 
  title, 
  children,
  width = 'w-80',
  height = 'h-80',
  backdrop = true,
  scroll = false
}) => {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen && !scroll) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, scroll]);

  const variants = {
    right: { x: '100%' },
    left: { x: '-100%' },
    top: { y: '-100%' },
    bottom: { y: '100%' }
  };

  const placementClasses = {
    right: 'top-0 right-0 h-full border-l',
    left: 'top-0 left-0 h-full border-r',
    top: 'top-0 left-0 w-full border-b',
    bottom: 'bottom-0 left-0 w-full border-t'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {backdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[9998]"
            />
          )}
          <motion.div
            initial={variants[placement]}
            animate={{ x: 0, y: 0 }}
            exit={variants[placement]}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              "fixed z-[9999] bg-white dark:bg-slate-800 shadow-2xl border-gray-200 dark:border-slate-700 flex flex-col",
              placementClasses[placement],
              (placement === 'left' || placement === 'right') ? width : height
            )}
          >
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between shrink-0">
              <h5 className="text-base font-bold text-gray-800 dark:text-white">{title}</h5>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-600 transition-all"
              >
                <Feather.X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Offcanvas;
