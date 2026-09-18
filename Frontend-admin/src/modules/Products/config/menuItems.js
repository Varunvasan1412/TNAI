import * as Feather from 'react-feather';

const productsMenu = [
  { id: 'products-title', label: 'Products Module', isTitle: true },
  {
    id: 'products-dashboard',
    label: 'Dashboard',
    icon: Feather.Home,
    path: '/products/dashboard',
  },
  {
    id: 'products-category',
    label: 'Manage Category',
    icon: Feather.Tag,
    path: '/products/categories',
  },
  {
    id: 'products-subcategory',
    label: 'Manage Subcategory',
    icon: Feather.Layers,
    path: '/products/subcategories',
  },
  {
    id: 'products-manage',
    label: 'Manage Products',
    icon: Feather.Package,
    path: '/products/manage',
  },
];

export default productsMenu;
