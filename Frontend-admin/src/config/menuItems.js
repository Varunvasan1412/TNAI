import * as Feather from 'react-feather';

/**
 * Central navigation menu configuration.
 * Used by BOTH the vertical Sidebar and the horizontal HeaderHorizontal.
 * 
 * Structure:
 *   - label:    Display text
 *   - icon:     Feather icon component (top-level only)
 *   - path:     Route path (leaf items)
 *   - badge:    { text, variant } for badges like "New"
 *   - isTitle:  If true, renders as a section header (vertical only)
 *   - children: Nested menu items (sub-menus)
 *   - megaMenu: If true, renders as a mega-menu in horizontal layout
 *   - megaColumns: Array of { title, items } for mega-menu columns
 */

import crmMenu from '../modules/Admin/config/menuItems';

const menuItems = [
  ...crmMenu,

  
];

export default menuItems;
