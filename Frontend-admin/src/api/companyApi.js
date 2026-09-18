import axiosInstance from "./axios";

export const getCompanyProfile = async () => {
  const response = await axiosInstance.get("/api/company");
  return response.data;
};

export const updateCompanyProfile = async (data) => {
  const response = await axiosInstance.post("/api/company", data);
  return response.data;
};
