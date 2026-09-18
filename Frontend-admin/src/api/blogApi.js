import axiosInstance from "./axios";

// CREATE BLOG
export const createBlogApi = async (blogData) => {
  const response = await axiosInstance.post("/api/crm/blog", blogData);

  return response.data;
};

export const getBlogsApi = async () => {
  const response = await axiosInstance.get("/api/crm/blog");

  return response.data;
};

export const getSingleBlogApi = async (id) => {
  const response = await axiosInstance.get(`/api/crm/blog/${id}`);

  return response.data;
};

// export const updateBlogApi = async (id, blogData) => {
//   const response = await axiosInstance.put(`/admin/blog/${id}`, blogData);

//   return response.data;
// };

export const updateBlogApi = async (id, blogData) => {
  if (blogData instanceof FormData) {
    blogData.append("_method", "PUT");
    const response = await axiosInstance.post(`/api/crm/blog/${id}`, blogData);
    return response.data;
  } else {
    const response = await axiosInstance.put(`/api/crm/blog/${id}`, blogData);
    return response.data;
  }
};

export const deleteBlogApi = async (id) => {
  const response = await axiosInstance.delete(`/api/crm/blog/${id}`);

  return response.data;
};

export const deleteBlogImageApi = async (imageId) => {
  const response = await axiosInstance.delete(`/api/crm/blog/image/${imageId}`);
  return response.data;
};
