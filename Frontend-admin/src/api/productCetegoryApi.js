import axiosInstance from "./axios";

// ==========================
// CREATE CATEGORY
// ==========================
export const createProductCategoryApi = async (categoryData) => {
  const response = await axiosInstance.post(
    "/api/product/product_category",
    categoryData,
  );

  return response.data;
};

// ==========================
// GET ALL CATEGORIES
// ==========================
export const getProductCategoriesApi = async () => {
  const response = await axiosInstance.get("/api/product/product_category");

  return response.data;
};

// ==========================
// GET SINGLE CATEGORY
// ==========================
export const getSingleProductCategoryApi = async (id) => {
  const response = await axiosInstance.get(
    `/api/product/product_category/${id}`,
  );

  return response.data;
};

// ==========================
// UPDATE CATEGORY
// ==========================
export const updateProductCategoryApi = async (id, data) => {
  data.append("_method", "PUT");

  const response = await axiosInstance.post(
    `/api/product/product_category/${id}`,
    data,
  );

  return response.data;
};

// ==========================
// DELETE CATEGORY
// ==========================
export const deleteProductCategoryApi = async (id) => {
  const response = await axiosInstance.delete(
    `/api/product/product_category/${id}`,
  );

  return response.data;
};
