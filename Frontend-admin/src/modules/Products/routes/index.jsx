import React from 'react';
import { Route } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import ProductsDashboard from '../pages/Dashboard';
import ManageCategory from '../pages/ManageCategory';
import CategoryForm from '../pages/CategoryForm';
import CategoryView from '../pages/CategoryView';
import ManageSubcategory from '../pages/ManageSubcategory';
import SubcategoryForm from '../pages/SubcategoryForm';
import SubcategoryView from '../pages/SubcategoryView';
import ManageProducts from '../pages/ManageProducts';
import ProductForm from '../pages/ProductForm';
import ProductView from '../pages/ProductView';

const W = ({ children }) => <MainLayout>{children}</MainLayout>;

const ProductsRoutes = [
  <Route key="products-dashboard"      path="/products/dashboard"              element={<W><ProductsDashboard /></W>} />,
  <Route key="products-categories"     path="/products/categories"             element={<W><ManageCategory /></W>} />,
  <Route key="products-cat-add"        path="/products/categories/add"         element={<W><CategoryForm /></W>} />,
  <Route key="products-cat-edit"       path="/products/categories/edit/:id"    element={<W><CategoryForm /></W>} />,
  <Route key="products-cat-view"       path="/products/categories/view/:id"    element={<W><CategoryView /></W>} />,
  <Route key="products-subcategories"    path="/products/subcategories"              element={<W><ManageSubcategory /></W>} />,
  <Route key="products-sub-add"         path="/products/subcategories/add"          element={<W><SubcategoryForm /></W>} />,
  <Route key="products-sub-edit"        path="/products/subcategories/edit/:id"     element={<W><SubcategoryForm /></W>} />,
  <Route key="products-sub-view"        path="/products/subcategories/view/:id"     element={<W><SubcategoryView /></W>} />,
  <Route key="products-manage"           path="/products/manage"                 element={<W><ManageProducts /></W>} />,
  <Route key="products-prod-add"        path="/products/manage/add"             element={<W><ProductForm /></W>} />,
  <Route key="products-prod-edit"       path="/products/manage/edit/:id"        element={<W><ProductForm /></W>} />,
  <Route key="products-prod-view"       path="/products/manage/view/:id"        element={<W><ProductView /></W>} />,
];

export default ProductsRoutes;
