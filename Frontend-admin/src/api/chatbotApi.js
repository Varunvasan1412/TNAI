import axiosInstance from "./axios";

export const toggleChatbotStatusApi = async (isOnline) => {
  const response = await axiosInstance.post("/api/chatbot/admin/chat/toggle-status", {
    is_online: isOnline,
  });
  return response.data;
};

export const getChatSessionsApi = async () => {
  const response = await axiosInstance.get("/api/chatbot/admin/chat/sessions");
  return response.data;
};

export const sendChatReplyApi = async (formData) => {
  const response = await axiosInstance.post("/api/chatbot/admin/chat/reply", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
