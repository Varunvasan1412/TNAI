import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({ label, value, icon: Icon, color, bg, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const target = value ?? 0;
    const prev = prevRef.current;
    prevRef.current = target;
    if (target === prev) {
      setCount(target);
      return;
    }
    const diff = target - prev;
    const steps = Math.max(20, Math.min(60, Math.abs(diff)));
    const interval = 900 / steps;
    let current = prev;
    const timer = setInterval(() => {
      current += diff > 0 ? 1 : -1;
      setCount(current);
      if (current === target) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden cursor-default select-none
                 bg-white/85 dark:bg-slate-800/70
                 backdrop-blur-2xl
                 border border-white/80 dark:border-white/10
                 shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                 hover:-translate-y-2
                 transition-all duration-300"
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 48px ${color}28, 0 4px 16px ${color}14`; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; }}
    >
      {/* Decorative circle — top-right */}
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full
                   group-hover:scale-110 transition-transform duration-500"
        style={{ background: color, opacity: 0.07 }}
      />
      <div
        className="absolute -top-4 -right-4 w-20 h-20 rounded-full"
        style={{ background: color, opacity: 0.04 }}
      />

      {/* Bottom hover bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full
                   transition-all duration-500 rounded-b-2xl"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
      />

      <div className="relative p-5">
        {/* Icon box */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-5
                     group-hover:scale-110 group-hover:rotate-3
                     transition-transform duration-300"
          style={{ background: bg }}
        >
          <Icon className="w-[18px] h-[18px]" style={{ color }} />
        </div>

        {/* Label */}
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5">
          {label}
        </p>

        {/* Animated count */}
        <h3 className="text-[30px] font-black leading-none text-gray-800 dark:text-white">
          {count}
        </h3>
      </div>
    </motion.div>
  );
};
