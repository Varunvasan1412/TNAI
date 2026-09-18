import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import HeaderHorizontal from './HeaderHorizontal';
import Sidebar from './Sidebar';
import Footer from './Footer';
import RightSidebar from '../../Admin/components/RightSidebar';
import TopbarLoader from '../../Admin/components/TopbarLoader';
import { useTheme } from '../../../context/ThemeContext';
import { cn } from '../../../lib/utils';
import CircuitBg from '../../../components/ui/CircuitBg';

const ChatBotLayout = ({ children, fullHeight = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { layout: contextLayout, layoutWidth } = useTheme();
  const layout = location.pathname === '/layouts-horizontal' ? 'horizontal' : contextLayout;

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleClose = () => setIsSidebarOpen(false);
    window.addEventListener('closeSidebar', handleClose);
    return () => window.removeEventListener('closeSidebar', handleClose);
  }, []);

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

      <main className={cn(
        'transition-all duration-300 min-h-screen flex flex-col',
        layout === 'vertical' && (isSidebarOpen ? 'lg:pl-[250px]' : 'lg:pl-[70px]')
      )}>
        {fullHeight ? (
          /* Full-height mode for the chat page — no padding, fills viewport */
          <div style={{ height: 'calc(100vh - 64px)', marginTop: '64px', overflow: 'hidden' }}>
            {children}
          </div>
        ) : (
          <>
            <div className="flex-1 pt-16 pb-12">
              <div className={cn(
                'px-4 sm:px-6 lg:px-8 py-6',
                layoutWidth === 'boxed' && 'max-w-7xl mx-auto',
              )}>
                {children}
              </div>
            </div>
            <Footer />
          </>
        )}
      </main>

      <RightSidebar />
    </div>
  );
};

export default ChatBotLayout;
