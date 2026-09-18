import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { cn } from "../../../lib/utils";
import menuItems from "../config/menuItems";

/* ─────────────────────────────────────────────
   Sub-components
   ───────────────────────────────────────────── */

const Chevron = ({ isOpen }) => (
  <motion.svg
    animate={{ rotate: isOpen ? 90 : 0 }}
    transition={{ duration: 0.2 }}
    className="w-4 h-4 text-gray-400 shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </motion.svg>
);

const MenuBadge = ({ badge }) => {
  const colors = {
    danger: "bg-danger/10 text-danger",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    info: "bg-info/10 text-info",
    primary: "bg-primary/10 text-primary",
  };
  return (
    <span
      className={cn(
        "ml-auto px-1.5 py-0.5 text-[10px] font-semibold rounded",
        colors[badge.variant] || colors.danger,
      )}
    >
      {badge.text}
    </span>
  );
};

const SubMenu = ({ isOpen, children }) => (
  <AnimatePresence initial={false}>
    {isOpen && (
      <motion.ul
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        {children}
      </motion.ul>
    )}
  </AnimatePresence>
);

const MenuItem = ({
  item,
  depth = 0,
  openMenus,
  toggleMenu,
  currentPath,
  isCollapsed,
}) => {
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path === currentPath || (item.path && item.path !== '/' && currentPath.startsWith(item.path + '/'));
  const isOpen = openMenus[item.id];

  const isChildActive = useCallback(
    (items) => {
      if (!items) return false;
      return items.some(
        (child) => child.path === currentPath || isChildActive(child.children),
      );
    },
    [currentPath],
  );

  const hasActiveChild = isChildActive(item.children);

  // Padding adjustment for collapsed state
  const paddingLeft = isCollapsed
    ? "px-0 justify-center"
    : depth === 0
      ? "pl-4"
      : depth === 1
        ? "pl-10"
        : "pl-14";

  if (!hasChildren) {
    return (
      <li className="relative">
        {isActive && (
          <span
            className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full z-10"
            style={{ background: 'linear-gradient(180deg, var(--color-primary), var(--color-secondary))' }}
          />
        )}
        <Link
          to={item.path || "#"}
          className={cn(
            "group flex items-center gap-3 py-2.5 pr-4 text-[13px] font-semibold",
            "transition-all duration-200 rounded-xl mx-2 my-0.5",
            paddingLeft,
            isActive
              ? "text-white shadow-[0_4px_14px_rgba(49,151,96,0.28)]"
              : "text-gray-500 dark:text-gray-400 hover:bg-primary/10 dark:hover:bg-emerald-900/20 hover:text-primary dark:hover:text-emerald-400",
          )}
          style={isActive ? { background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' } : {}}
        >
          {Icon && (
            <Icon
              className={cn(
                "w-[18px] h-[18px] shrink-0 transition-colors",
                isActive
                  ? "text-white"
                  : "text-gray-400 group-hover:text-primary dark:group-hover:text-emerald-400",
              )}
            />
          )}
          {!isCollapsed && (
            <span className="flex-1 truncate">{item.label}</span>
          )}
          {!isCollapsed && item.badge && <MenuBadge badge={item.badge} />}
        </Link>
      </li>
    );
  }

  return (
    <li className="relative">
      {(isOpen || hasActiveChild) && !isCollapsed && (
        <span
          className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full z-10"
          style={{ background: 'linear-gradient(180deg, var(--color-primary), var(--color-secondary))' }}
        />
      )}
      <button
        onClick={() => !isCollapsed && toggleMenu(item.id)}
        className={cn(
          "group flex items-center gap-3 w-full py-2.5 pr-4 text-[13px] font-semibold text-left",
          "transition-all duration-200 rounded-xl mx-2 my-0.5",
          paddingLeft,
          (isOpen || hasActiveChild) && !isCollapsed
            ? "text-primary bg-primary/10 dark:text-emerald-400 dark:bg-emerald-900/20"
            : "text-gray-500 dark:text-gray-400 hover:bg-primary/10 dark:hover:bg-emerald-900/20 hover:text-primary dark:hover:text-emerald-400",
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              "w-[18px] h-[18px] shrink-0 transition-colors",
              (isOpen || hasActiveChild) && !isCollapsed
                ? "text-primary dark:text-emerald-400"
                : "text-gray-400 group-hover:text-primary dark:group-hover:text-emerald-400",
            )}
          />
        )}
        {!isCollapsed && <span className="flex-1 truncate">{item.label}</span>}
        {!isCollapsed && item.badge && <MenuBadge badge={item.badge} />}
        {!isCollapsed && <Chevron isOpen={isOpen} />}
      </button>
      {!isCollapsed && (
        <SubMenu isOpen={isOpen}>
          {item.children.map((child) => (
            <MenuItem
              key={child.id}
              item={child}
              depth={depth + 1}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
              currentPath={currentPath}
              isCollapsed={isCollapsed}
            />
          ))}
        </SubMenu>
      )}
    </li>
  );
};

import { useCompany } from "../../../context/CompanyContext";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const { companyData } = useCompany();
  const [openMenus, setOpenMenus] = useState(() => {
    const initial = {};
    const expandParents = (items, path) => {
      for (const item of items) {
        if (item.children) {
          const hasMatch = item.children.some(
            (c) =>
              c.path === path ||
              (c.children && c.children.some((gc) => gc.path === path)),
          );
          if (hasMatch) {
            initial[item.id] = true;
            item.children.forEach((c) => {
              if (c.children && c.children.some((gc) => gc.path === path)) {
                initial[c.id] = true;
              }
            });
          }
        }
      }
    };
    expandParents(menuItems, location.pathname);
    return initial;
  });

  const toggleMenu = useCallback((id) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  return (
    <>
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-[50]",
          "bg-white dark:bg-slate-800",
          "border-r border-gray-100 dark:border-slate-700",
          "transition-all duration-300 ease-in-out",
          isOpen
            ? "w-[250px] translate-x-0"
            : "w-[250px] lg:w-[70px] -translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-20 border-b border-gray-100 dark:border-slate-700">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2.5 overflow-hidden"
          >
            <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-widest ml-2">TNAI</span>
            {isOpen && (
              <span className="text-lg font-bold text-gray-800 dark:text-white tracking-tight"></span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <SimpleBar className="h-[calc(100%-64px)]">
          <nav className="pt-3 pb-20">
            <ul className="space-y-0.5">
              {menuItems.map((item) => {
                if (item.isTitle) {
                  return !isOpen ? (
                    <li
                      key={item.id}
                      className="h-8 flex items-center justify-center"
                    >
                      <div className="w-4 h-px bg-gray-200 dark:bg-slate-700"></div>
                    </li>
                  ) : (
                    <li key={item.id} className="px-6 pt-5 pb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                        {item.label}
                      </span>
                    </li>
                  );
                }

                return (
                  <MenuItem
                    key={item.id}
                    item={item}
                    depth={0}
                    openMenus={openMenus}
                    toggleMenu={toggleMenu}
                    currentPath={location.pathname}
                    isCollapsed={!isOpen}
                  />
                );
              })}
            </ul>

            {/* Upgrade Card */}
            {/* {isOpen && (
              <div className="mx-4 mt-8 mb-4 p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10 text-center">
                <img src="/assets/images/giftbox.png" alt="" className="w-12 mx-auto mb-3" />
                <h6 className="text-sm font-bold text-gray-800 dark:text-white mb-1">
                  Unlimited Access
                </h6>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                  Upgrade to Business Plan for premium features.
                </p>
                <motion.a
                  href="#!"
                  onClick={(e) => e.preventDefault()}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="block w-full py-2 text-xs font-bold text-white bg-primary rounded-lg shadow-lg shadow-primary/20"
                >
                  Upgrade Now
                </motion.a>
              </div>
            )} */}
          </nav>
        </SimpleBar>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[40] bg-black/40 backdrop-blur-sm lg:hidden"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("closeSidebar"))
            }
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
