import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../../lib/utils';

/**
 * Reusable layout for Authentication pages (Login, Register, etc.)
 */
const AuthLayout = ({ children, title, subtitle, image, showCarousel = true }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 overflow-hidden">
      <div className="flex min-h-screen">
        {/* ── Left Column: Form Content ── */}
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-[450px] xl:w-[550px] bg-white dark:bg-slate-900 z-10 shadow-2xl lg:shadow-none">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            {/* Logo */}
            <div className="mb-10">
              <Link to="/dashboard" className="flex items-center gap-2.5">
                <img src="/assets/images/favicon.png" alt="Logo" className="h-8" />
                <span className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
                  Minia
                </span>
              </Link>
            </div>

            {/* Header Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            </motion.div>

            {/* Form Slot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8"
            >
              {children}
            </motion.div>

            {/* Footer */}
            <div className="mt-10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Minia. Crafted with <span className="text-danger">♥</span> by Themesbrand
              </p>
            </div>
          </div>
        </div>

        {/* ── Right Column: Visual/Carousel ── */}
        <div className="hidden lg:block relative flex-1">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-primary/90 dark:bg-slate-800/95 z-10" />
          
          {/* Bubbles Animation */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  y: '110%', 
                  x: `${Math.random() * 100}%`,
                  scale: Math.random() * 0.5 + 0.5,
                  opacity: 0.1
                }}
                animate={{ 
                  y: '-20%',
                  x: `${(Math.random() * 100)}%`,
                  opacity: [0.1, 0.3, 0.1],
                  rotate: 360
                }}
                transition={{ 
                  duration: Math.random() * 20 + 20, 
                  repeat: Infinity, 
                  ease: "linear",
                  delay: Math.random() * 20
                }}
                className="absolute w-24 h-24 rounded-full bg-white/20 blur-xl"
              />
            ))}
          </div>

          {/* Background Image */}
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/assets/images/auth-bg.jpg"
            alt="Auth background"
          />

          {/* Carousel Content */}
          {showCarousel && (
            <div className="absolute inset-0 z-20 flex items-center justify-center p-12 text-white">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-md text-center"
              >
                <div className="mb-8">
                  <svg className="w-12 h-12 text-success mx-auto opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H13.017C12.4647 8 12.017 8.44772 12.017 9V15C12.017 15.5523 11.5693 16 11.017 16H8.01703C6.91246 16 6.01703 16.8954 6.01703 18V21M14.017 21H6.01703M14.017 21V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h4 className="text-2xl font-medium mb-6">
                  “I feel confident imposing change on myself. It's a lot more progressing fun than looking back.”
                </h4>
                <div className="flex items-center justify-center gap-4">
                  <img src="/assets/images/users/avatar-1.jpg" className="w-12 h-12 rounded-full border-2 border-white/20" alt="Avatar" />
                  <div className="text-left">
                    <p className="font-bold">Richard Drews</p>
                    <p className="text-white/60 text-sm">Web Designer</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
