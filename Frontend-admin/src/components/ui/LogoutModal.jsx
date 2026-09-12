import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut } from 'react-feather';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="w-full max-w-sm rounded-[24px] overflow-hidden bg-white shadow-2xl pointer-events-auto flex flex-col"
            >
              {/* Top Section */}
              <div className="relative pt-10 pb-6 px-6 flex flex-col items-center justify-center text-center bg-primary">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-white" />
                </button>

                {/* Icon */}
                <div className="w-[60px] h-[60px] rounded-full border-[1.5px] border-white/60 flex items-center justify-center mb-4">
                  <LogOut className="w-7 h-7 text-white ml-1" />
                </div>

                <h2 className="text-xl font-bold text-white mb-1 tracking-wide">Confirm Logout</h2>
                <p className="text-sm font-medium text-white/80">RSIStore</p>
              </div>

              {/* Bottom Section */}
              <div className="p-8 pb-8 text-center bg-white flex flex-col items-center">
                <p className="text-[15px] font-bold text-gray-700 mb-2">
                  Are you sure you want to log out?
                </p>
                <p className="text-[12px] font-medium text-gray-400 mb-8 leading-relaxed">
                  You will need to sign in again to access your account.
                </p>

                {/* Buttons */}
                <div className="flex w-full gap-4">
                  <button
                    onClick={onClose}
                    className="flex-1 h-[42px] rounded-full border-2 border-primary text-primary font-bold text-[13px] hover:bg-primary/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 h-[42px] rounded-full bg-[#ef4444] text-white font-bold text-[13px] hover:bg-[#dc2626] transition-colors shadow-lg shadow-red-500/30"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
};

export default LogoutModal;
