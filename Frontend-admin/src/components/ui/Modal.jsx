import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { createPortal } from 'react-dom';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
};

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[calc(100%-2rem)]',
};

const Modal = ({
  isOpen,
  onClose,
  size = 'md',
  className,
  children,
  closeOnOverlay = true,
  closeOnEscape = true,
  variant = 'default', // default | glass
}) => {
  const modalRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!closeOnEscape) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose, closeOnEscape]);

  const variants = {
    default: 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700',
    glass: 'bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/50',
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1050] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeOnOverlay ? onClose : undefined}
          />
          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'relative w-full rounded-2xl shadow-2xl border',
              variants[variant],
              sizeStyles[size],
              className
            )}
            role="dialog"
            aria-modal="true"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const ModalHeader = ({ className, children, onClose, ...props }) => (
  <div
    className={cn(
      'flex items-center justify-between px-6 py-4',
      'border-b border-gray-100 dark:border-slate-700',
      className
    )}
    {...props}
  >
    <h5 className="text-lg font-black text-[#1E293B] tracking-tight">{children}</h5>
    {onClose && (
      <button
        type="button"
        onClick={onClose}
        className="p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
);

const ModalBody = ({ className, children, ...props }) => (
  <div className={cn('px-6 py-4', className)} {...props}>
    {children}
  </div>
);

const ModalFooter = ({ className, children, ...props }) => (
  <div
    className={cn(
      'flex items-center justify-end gap-2 px-6 py-4',
      'border-t border-gray-100 dark:border-slate-700',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export { Modal, ModalHeader, ModalBody, ModalFooter };
