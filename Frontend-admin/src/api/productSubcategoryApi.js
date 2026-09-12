
import axiosInstance from "./axios";

// ==========================
// CREATE
// ==========================
export const createProductSubcategoryApi = async (data) => {

  const response = await axiosInstance.post(
    "/api/product/product_subcategory",
    data
  );

  return response.data;
};

// ==========================
// GET ALL
// ==========================
export const getProductSubcategoriesApi = async () => {

  const response = await axiosInstance.get(
    "/api/product/product_subcategory"
  );

  return response.data;
};

// ==========================
// GET SINGLE
// ==========================
export const getSingleProductSubcategoryApi = async (id) => {

  const response = await axiosInstance.get(
    `/api/product/product_subcategory/${id}`
  );

  return response.data;
};

// ==========================
// UPDATE
// ==========================
export const updateProductSubcategoryApi = async (
  id,
  data
) => {

  data.append("_method", "PUT");

  const response = await axiosInstance.post(
    `/api/product/product_subcategory/${id}`,
    data
  );

  return response.data;
};

// ==========================
// DELETE
// ==========================
export const deleteProductSubcategoryApi = async (id) => {

  const response = await axiosInstance.delete(
    `/api/product/product_subcategory/${id}`
  );

  return response.data;
};