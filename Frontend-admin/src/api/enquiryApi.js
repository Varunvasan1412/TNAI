import axiosInstance from "./axios";

export const getEnquiresApi = async () => {
    const response = await axiosInstance.get("/api/crm/enquiry");
    return response.data;
}

export const deleteEnquiryApi = async (id) => {
    const response = await axiosInstance.delete(`/api/crm/enquiry/${id}`)
    return response.data
}

export const updateEnquiryApi = async (id, payload) => {
    payload.append("_method", "PUT");
    const response = await axiosInstance.post(`/api/crm/enquiry/${id}`, payload);
    return response.data;
}

export const updateFollowupApi = async (id, followupData) => {

  followupData.append("_method", "PUT");

  const response = await axiosInstance.post(
    `/api/crm/followup/${id}`,
    followupData
  );

  return response.data;
};

export const convertToLeadApi = async (id) => {

  const response = await axiosInstance.put(
    `/api/crm/enquiry/convert/${id}`
  );

  return response.data;
};