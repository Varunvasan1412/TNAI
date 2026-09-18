import axiosInstance from "../api/axios";

export const loginAPI = async (formData) => {
  const response = await axiosInstance.post("/api/roles/users/login", formData);
  return response; // full axios response → store reads response.data.data.*
};

export const logoutAPI = async () => {
  const response = await axiosInstance.post("/api/roles/users/logout");
  return response;
};

export const getMeAPI = async () => {
  const response = await axiosInstance.get("/api/roles/users/me");
  return response;
};