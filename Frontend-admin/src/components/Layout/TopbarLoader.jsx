import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Animated topbar progress loader.
 * Renders a gradient progress bar on every route change.
 */
const TopbarLoader = () => {
  const location = useLocation();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const timer = setTimeout(() => setActive(false), 600);
    return () => clearTimeout(timer);
  }, [location]);

  if (!active) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] h-[3px]">
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '0%' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="h-full w-full"
        style={{
          background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
        }}
      />
    </div>
  );
};

export default TopbarLoader;
