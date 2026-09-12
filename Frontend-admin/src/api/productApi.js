import axiosInstance from "./axios";

// ======================
// GET PRODUCTS
// ======================
export const getProductsApi = async () => {
  const response = await axiosInstance.get("/api/product/product");

  return response.data;
};

// ======================
// GET SINGLE PRODUCT
// ======================
export const getSingleProductApi = async (id) => {
  const response = await axiosInstance.get(`/api/product/product/${id}`);

  return response.data;
};

// ======================
// CREATE PRODUCT
// ======================
export const createProductApi = async (data) => {
  const response = await axiosInstance.post("/api/product/product", data);

  return response.data;
};

// ======================
// UPDATE PRODUCT
// ======================
export const updateProductApi = async (id, data) => {
  data.append("_method", "PUT");

  const response = await axiosInstance.post(`/api/product/product/${id}`, data);

  return response.data;
};

// ======================
// DELETE PRODUCT
// ======================
export const deleteProductApi = async (id) => {
  const response = await axiosInstance.delete(`/api/product/product/${id}`);

  return response.data;
};

// ======================
// DELETE PRODUCT IMAGE
// ======================
export const deleteProductImageApi = async (imageId) => {
  const response = await axiosInstance.get(`/api/product/image/delete/${imageId}`);

  return response.data;
};
