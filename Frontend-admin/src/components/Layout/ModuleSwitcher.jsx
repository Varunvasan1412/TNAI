import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Feather from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

const ModuleSwitcher = ({ isSidebar = false, isOpen = true }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const modules = [
    { name: 'All Modules', path: '/module-selection', icon: Feather.Grid },
    { name: 'Admin', path: '/admin/dashboard', icon: Feather.PieChart },
    { name: 'ChatBot', path: '/chat-bot/dashboard', icon: Feather.MessageSquare },
  ];

  const moduleMatch = modules.find(
    m => m.path !== '/module-selection' && location.pathname.startsWith(m.path.replace('/dashboard', ''))
  );

  // Persist the last matched module so generic routes (e.g. /apps-contacts-profile)
  // continue showing the module the user came from instead of "All Modules".
  useEffect(() => {
    if (moduleMatch) localStorage.setItem('lastActiveModule', moduleMatch.path);
  }, [moduleMatch?.path]);

  const activeModule = moduleMatch || (() => {
    const stored = localStorage.getItem('lastActiveModule');
    return modules.find(m => m.path === stored) || modules[0];
  })();

  return (
    <div ref={ref} className={cn("relative", isSidebar ? "px-4 pb-3" : "flex items-center mx-2")}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={cn(
          "flex items-center gap-2 font-bold text-gray-700 dark:text-gray-200 transition-colors rounded-xl",
          isSidebar 
            ? "w-full px-3 py-2 text-[13px] justify-between bg-gray-100/80 dark:bg-slate-700/50 hover:bg-primary/10 hover:text-primary" 
            : "px-3 py-2 text-[13px] bg-gray-100/80 dark:bg-slate-700/50 hover:bg-primary/10 hover:text-primary",
          !isOpen && isSidebar && "justify-center px-0 bg-transparent"
        )}
      >
        <div className="flex items-center gap-2">
          <activeModule.icon className={cn("w-4 h-4", "text-primary dark:text-emerald-400")} />
          {(!isSidebar || isOpen) && <span className={!isSidebar ? "hidden sm:block" : ""}>{activeModule.name}</span>}
        </div>
        {(!isSidebar || isOpen) && <Feather.ChevronDown className={cn("w-3.5 h-3.5 text-gray-400 transition-transform", dropdownOpen && "rotate-180")} />}
      </button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: isSidebar ? 5 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isSidebar ? 5 : 10 }}
            className={cn(
              "absolute z-50 min-w-[220px] p-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700",
              isSidebar ? "left-4 right-4 top-full mt-1" : "left-0 top-full mt-2"
            )}
          >
            <div className="px-3 py-2 mb-1 border-b border-gray-50 dark:border-slate-700/50">
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Active Modules</span>
            </div>
            {modules.map((m) => {
              const Icon = m.icon;
              const isActive = activeModule.path === m.path;
              return (
                <Link
                  key={m.path}
                  to={m.path}
                  onClick={() => setDropdownOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-[13px] font-semibold rounded-lg transition-colors my-0.5",
                    isActive 
                      ? "bg-primary/10 text-primary dark:bg-emerald-900/20 dark:text-emerald-400" 
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <Icon className={cn("w-[18px] h-[18px]", isActive ? "text-primary dark:text-emerald-400" : "text-gray-400")} />
                  {m.name}
                  {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary dark:bg-emerald-400" />}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModuleSwitcher;
