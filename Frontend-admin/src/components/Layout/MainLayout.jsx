import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import HeaderHorizontal from './HeaderHorizontal';
import Footer from './Footer';
import RightSidebar from './RightSidebar';
import TopbarLoader from './TopbarLoader';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';
import CircuitBg from '../ui/CircuitBg';

/**
 * Main application layout shell.
 * 
 * FINAL PURGE:
 * All legacy Bootstrap classes and app.min.css dependencies have been removed.
 * The layout is now 100% controlled by Tailwind CSS and Framer Motion.
 */
const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const {
    layout: contextLayout,
    layoutMode,
    layoutWidth,
    layoutPosition,
    topbarColor,
    sidebarSize,
    sidebarColor,
    direction,
    showRightSidebar,
  } = useTheme();

  const layout = location.pathname === '/layouts-horizontal' ? 'horizontal' : contextLayout;

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // Listen for closeSidebar events from the Sidebar's mobile overlay
  useEffect(() => {
    const handleClose = () => setIsSidebarOpen(false);
    window.addEventListener('closeSidebar', handleClose);
    return () => window.removeEventListener('closeSidebar', handleClose);
  }, []);

  // Sync Layout States (Moved to ThemeContext)

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-900 transition-colors duration-300">
      <CircuitBg />
      <TopbarLoader />

      {layout === 'vertical' ? (
        <>
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
          <Sidebar isOpen={isSidebarOpen} />
        </>
      ) : (
        <HeaderHorizontal />
      )}

      {/* ── Main Content Area ── */}
      <main 
        className={cn(
          "transition-all duration-300 min-h-screen flex flex-col",
          layout === 'vertical' && (
            isSidebarOpen 
              ? "lg:pl-[250px]" // Standard sidebar width
              : "lg:pl-[70px]"  // Compact sidebar width
          )
        )}
      >
        <div className="flex-1 pt-16 pb-12"> {/* Header height is 64px (pt-16) */}
          <div className={cn(
            'px-4 sm:px-6 lg:px-8 py-6',
            layoutWidth === 'boxed' && 'max-w-7xl mx-auto'
          )}>
            {children}
          </div>
        </div>
        <Footer />
      </main>

      <RightSidebar />
    </div>
  );
};

export default MainLayout;
