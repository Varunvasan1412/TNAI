import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { cn } from '../../../lib/utils';
import * as Feather from 'react-feather';

const SettingRadioGroup = ({ label, name, options, value, onChange }) => (
  <div className="mb-5">
    <h6 className="text-sm font-black text-[#1E293B] tracking-tight mb-3">{label}</h6>
    <div className="flex flex-wrap gap-x-5 gap-y-2">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            'inline-flex items-center gap-2 cursor-pointer group',
            'text-sm transition-colors duration-200'
          )}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 border-gray-300 dark:border-slate-600 text-secondary focus:ring-2 focus:ring-secondary/50 focus:ring-offset-0 transition-colors duration-200"
          />
          <span className={cn(
            value === opt.value
              ? 'text-secondary font-medium'
              : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200'
          )}>
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const RightSidebar = () => {
  const {
    layout, setLayout,
    layoutMode, setLayoutMode,
    layoutWidth, setLayoutWidth,
    layoutPosition, setLayoutPosition,
    topbarColor, setTopbarColor,
    sidebarSize, setSidebarSize,
    sidebarColor, setSidebarColor,
    direction, setDirection,
    showRightSidebar, setShowRightSidebar,
  } = useTheme();

  return (
    <>
      <AnimatePresence>
        {showRightSidebar && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'fixed top-0 right-0 z-[1050] h-full w-[300px]',
              'bg-white dark:bg-slate-800',
              'shadow-2xl border-l border-gray-100 dark:border-slate-700',
            )}
          >
            <SimpleBar style={{ height: '100%' }}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-5">
                  <h5 className="text-base font-black text-[#1E293B] tracking-tight">
                    Theme Customizer
                  </h5>
                  <button
                    onClick={() => setShowRightSidebar(false)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Feather.X className="w-5 h-5" />
                  </button>
                </div>

                <div className="h-px bg-gray-200 dark:bg-slate-700 mb-5" />

                <SettingRadioGroup label="Layout" name="layout" value={layout} onChange={setLayout}
                  options={[{ label: 'Vertical', value: 'vertical' }, { label: 'Horizontal', value: 'horizontal' }]} />
                <SettingRadioGroup label="Layout Mode" name="layoutMode" value={layoutMode} onChange={setLayoutMode}
                  options={[{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]} />
                <SettingRadioGroup label="Layout Width" name="layoutWidth" value={layoutWidth} onChange={setLayoutWidth}
                  options={[{ label: 'Fluid', value: 'fluid' }, { label: 'Boxed', value: 'boxed' }]} />
                <SettingRadioGroup label="Layout Position" name="layoutPosition" value={layoutPosition} onChange={setLayoutPosition}
                  options={[{ label: 'Fixed', value: 'fixed' }, { label: 'Scrollable', value: 'scrollable' }]} />
                <SettingRadioGroup label="Topbar Color" name="topbarColor" value={topbarColor} onChange={setTopbarColor}
                  options={[{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]} />

                {layout === 'vertical' && (
                  <>
                    <SettingRadioGroup label="Sidebar Size" name="sidebarSize" value={sidebarSize} onChange={setSidebarSize}
                      options={[{ label: 'Default', value: 'lg' }, { label: 'Compact', value: 'md' }, { label: 'Small (Icon View)', value: 'sm' }]} />
                    <SettingRadioGroup label="Sidebar Color" name="sidebarColor" value={sidebarColor} onChange={setSidebarColor}
                      options={[{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }, { label: 'Brand', value: 'brand' }]} />
                  </>
                )}

                <SettingRadioGroup label="Direction" name="direction" value={direction} onChange={setDirection}
                  options={[{ label: 'LTR', value: 'ltr' }, { label: 'RTL', value: 'rtl' }]} />
              </div>
            </SimpleBar>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRightSidebar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1049] bg-black/40 backdrop-blur-sm"
            onClick={() => setShowRightSidebar(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default RightSidebar;
