import axiosInstance from "./axios";

export const getProductEnquiriesApi = async () => {
  const response = await axiosInstance.get("/api/product/product_enquiry");
  return response.data;
};

export const getSingleProductEnquiryApi = async (id) => {
  const response = await axiosInstance.get(`/api/product/product_enquiry/${id}`);
  return response.data;
};

export const updateProductEnquiryApi = async (id, data) => {
  const response = await axiosInstance.put(`/api/product/product_enquiry/${id}`, data);
  return response.data;
};

export const deleteProductEnquiryApi = async (id) => {
  const response = await axiosInstance.delete(`/api/product/product_enquiry/${id}`);
  return response.data;
};
