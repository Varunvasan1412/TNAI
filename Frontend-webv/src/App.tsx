import React, { useEffect } from 'react';
import useRsistoreContext from './components/context/useRsistoreContext';
import { Outlet } from 'react-router';
import CustomCursor from './components/elements/CustomCursor';
import SideBar from './components/elements/SideBar';
import ChatPopup from './components/elements/ChatPopup';
import SearchProp from './components/elements/SearchProp';
import ScrollToTop from './components/elements/ScrollToTop';
import VideoPopup from './components/elements/VideoPopup';
import MobileNav from './components/elements/MobileNav';
import SEOManager from './components/elements/SEOManager';

const App: React.FC = () => {
  const { isMobileManu, isSearch, showVideoPopup } = useRsistoreContext();

  useEffect(() => {
    /*
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+I (Windows) / Cmd+Option+I (Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+J (Windows) / Cmd+Option+J (Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'j') {
        e.preventDefault();
      }
      // Prevent Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
      }
      // Prevent Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
    */

  }, []);

  return (
    <div className={`custom-cursor ${isMobileManu ? "locked" : ""} ${isSearch ? 'search-active' : ''}`}>
      <SEOManager />
      <CustomCursor enabled />
      <Outlet />
      <SideBar />
      <MobileNav />
      {/* <ChatPopup /> */}
      <SearchProp />
      <ScrollToTop />
      {showVideoPopup && <VideoPopup />}
    </div>
  );
};

export default App;