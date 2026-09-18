import { create } from "zustand";
import { useChatbotStore } from "./chatbotStore";
import { loginAPI, logoutAPI } from "../api/authApi";
import { toggleChatbotStatusApi } from "../api/chatbotApi";
import toast from "react-hot-toast";
import {
  getProductEnquiriesApi,
  getSingleProductEnquiryApi,
  updateProductEnquiryApi,
  deleteProductEnquiryApi,
} from "../api/productEnquiryApi";
import {
  createBlogApi,
  deleteBlogApi,
  getBlogsApi,
  getSingleBlogApi,
  updateBlogApi,
} from "../api/blogApi";
import {
  convertToLeadApi,
  deleteEnquiryApi,
  getEnquiresApi,
  updateFollowupApi,
  updateEnquiryApi,
} from "../api/enquiryApi";
import {
  createProductCategoryApi,
  deleteProductCategoryApi,
  getProductCategoriesApi,
  getSingleProductCategoryApi,
  updateProductCategoryApi,
} from "../api/productCetegoryApi";
import {
  createProductSubcategoryApi,
  deleteProductSubcategoryApi,
  getProductSubcategoriesApi,
  getSingleProductSubcategoryApi,
  updateProductSubcategoryApi,
} from "../api/productSubCategoryApi";
import {
  createProductApi,
  deleteProductApi,
  getProductsApi,
  getSingleProductApi,
  updateProductApi,
} from "../api/productApi";

// Auth store
export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("authUser") || "null"),
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  login: async (formData) => {
    try {
      set({ loading: true, error: null });

      const response = await loginAPI(formData);

      // API returns: { success, message, data: { access_token, token_type, user } }
      const { access_token, user } = response.data.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("authUser", JSON.stringify(user));

      // Attach token to all future axios requests
      import("../api/axios").then(({ default: axiosInstance }) => {
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${access_token}`;
      });

      set({ user, token: access_token, loading: false });

      toast.success("Login successful");
      return true;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials.";

      set({ error: message, loading: false });
      toast.error(message);
      return false;
    }
  },

  logout: async () => {
    console.log("logout start");

    // Set chatbot offline before revoking the auth token
    if (localStorage.getItem("chatbot_is_online") === "true") {
      try { await toggleChatbotStatusApi(false); } catch (_) {}
    }

    try {
      await logoutAPI();
    } catch (_) {
      // ignore logout API errors — clear session regardless
    }

    // Snapshot current session max-IDs into chatbot_last_seen BEFORE clearing the store.
    // This means after re-login, only messages that arrive AFTER this logout point
    // will appear as header notifications — not old messages the admin already saw.
    useChatbotStore.getState().markAllAsRead();

    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    localStorage.removeItem("chatbot_is_online");
    // chatbot_last_seen is intentionally NOT removed so the post-login
    // notification baseline is preserved across logout/login cycles.

    useChatbotStore.setState({
      isOnline: false,
      sessions: [],
      unreadCounts: {},
      selectedSessionId: null,
    });

    import("../api/axios").then(({ default: axiosInstance }) => {
      delete axiosInstance.defaults.headers.common["Authorization"];
    });

    set({ user: null, token: null });
    toast.success("Logged out successfully");
  },
}));

// Blog

export const useBlogStore = create((set) => ({
  blogs: [],
  singleBlog: null,

  loading: false,
  error: null,
  success: null,

  createBlog: async (blogData) => {
    try {
      set({
        loading: true,
        error: null,
        success: null,
      });

      const response = await createBlogApi(blogData);

      set({
        loading: false,
        success: response.message || "Success",
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Something went wrong",
      });

      throw error;
    }
  },

  fetchBlogs: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getBlogsApi();

      set({
        blogs: response.data || [],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch blogs",
      });

      console.error(error);
    }
  },

  // =========================
  // GET SINGLE BLOG
  // =========================
  fetchSingleBlog: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getSingleBlogApi(id);

      console.log("Single blog: ", response.data);

      set({
        singleBlog: response.data,
        loading: false,
      });

      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch blog",
      });

      console.error(error);
    }
  },

  // =========================
  // UPDATE BLOG
  // =========================
  updateBlog: async (id, blogData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await updateBlogApi(id, blogData);

      set({
        loading: false,
        success: response.message,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update blog",
      });

      throw error;
    }
  },

  // =========================
  // DELETE BLOG
  // =========================
  deleteBlog: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await deleteBlogApi(id);

      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== id),
        loading: false,
        success: response.message,
      }));

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to delete blog",
      });

      throw error;
    }
  },
}));

// Enquiry
export const useEnquiryStore = create((set) => ({
  enquires: [],
  singleEnquiry: null,

  loading: false,
  error: null,
  success: null,

  fetchEnquires: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getEnquiresApi();

      set({
        enquires: response.data || [],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch enquires",
      });

      console.error(error);
    }
  },

  // =========================
  // DELETE Enquiry
  // =========================
  deleteEnquiry: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await deleteEnquiryApi(id);

      set((state) => ({
        enquires: state.enquires.filter((enquiry) => enquiry.id !== id),
        loading: false,
        success: response.message,
      }));

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to delete enquiry",
      });

      throw error;
    }
  },

  updateFollowup: async (id, followupData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await updateFollowupApi(id, followupData);

      set((state) => {
        const updatedEnquires = state.enquires.map((enq) => {
          if (String(enq.id) === String(id)) {
            // Update current_followup_date
            enq.current_followup_date = response.data.followupdate;

            // Prepend or update the followup in the array
            const newFollowup = response.data;
            let followups = [...(enq.followups || [])];

            const existingIndex = followups.findIndex(
              (f) => f.id === newFollowup.id,
            );
            if (existingIndex >= 0) {
              followups[existingIndex] = newFollowup;
            } else {
              followups.unshift(newFollowup);
            }

            enq.followups = followups;
          }
          return enq;
        });

        return {
          enquires: updatedEnquires,
          loading: false,
          success: response.message,
        };
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update followup",
      });

      throw error;
    }
  },

  updateEnquiry: async (id, enquiryData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await updateEnquiryApi(id, enquiryData);

      set({
        loading: false,
        success: response.message,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update enquiry",
      });

      throw error;
    }
  },

  convertToLead: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await convertToLeadApi(id);

      set({
        loading: false,
        success: response.message,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to convert enquiry",
      });

      throw error;
    }
  },
}));

// ======================================
// PRODUCT CATEGORY STORE
// ======================================

export const useProductCategoryStore = create((set) => ({
  categories: [],
  singleCategory: null,

  loading: false,
  error: null,
  success: null,

  // ==========================
  // CREATE CATEGORY
  // ==========================
  createCategory: async (categoryData) => {
    try {
      set({
        loading: true,
        error: null,
        success: null,
      });

      const response = await createProductCategoryApi(categoryData);

      set({
        loading: false,
        success: response.message,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to create category",
      });

      throw error;
    }
  },

  // ==========================
  // GET ALL CATEGORIES
  // ==========================
  fetchCategories: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getProductCategoriesApi();

      set({
        categories: response.data || [],
        loading: false,
      });
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch categories";
      set({ loading: false, error: message });
      toast.error(message);
    }
  },

  // ==========================
  // GET SINGLE CATEGORY
  // ==========================
  fetchSingleCategory: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getSingleProductCategoryApi(id);

      set({
        singleCategory: response.data,
        loading: false,
      });

      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch category",
      });

      console.error(error);
    }
  },

  // ==========================
  // UPDATE CATEGORY
  // ==========================
  updateCategory: async (id, categoryData) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await updateProductCategoryApi(id, categoryData);

      set({
        loading: false,
        success: response.message,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update category",
      });

      throw error;
    }
  },

  // ==========================
  // DELETE CATEGORY
  // ==========================
  deleteCategory: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await deleteProductCategoryApi(id);

      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
        loading: false,
        success: response.message,
      }));

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to delete category",
      });

      throw error;
    }
  },
}));

// ======================================
// PRODUCT SUBCATEGORY STORE
// ======================================

export const useProductSubcategoryStore = create((set) => ({
  subcategories: [],
  singleSubcategory: null,

  loading: false,
  error: null,
  success: null,

  // CREATE
  createSubcategory: async (data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await createProductSubcategoryApi(data);

      set({
        loading: false,
        success: response.message,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to create subcategory",
      });

      throw error;
    }
  },

  // GET ALL
  fetchSubcategories: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getProductSubcategoriesApi();

      set({
        subcategories: response.data || [],
        loading: false,
      });
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch subcategories";
      set({ loading: false, error: message });
      toast.error(message);
    }
  },

  // GET SINGLE
  fetchSingleSubcategory: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getSingleProductSubcategoryApi(id);

      set({
        singleSubcategory: response.data,
        loading: false,
      });

      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch subcategory",
      });
    }
  },

  // UPDATE
  updateSubcategory: async (id, data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await updateProductSubcategoryApi(id, data);

      set({
        loading: false,
        success: response.message,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update subcategory",
      });

      throw error;
    }
  },

  // DELETE
  deleteSubcategory: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await deleteProductSubcategoryApi(id);

      set((state) => ({
        subcategories: state.subcategories.filter((item) => item.id !== id),

        loading: false,
        success: response.message,
      }));

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to delete subcategory",
      });

      throw error;
    }
  },
}));

// ======================
// PRODUCT STORE
// ======================

export const useProductStore = create((set) => ({
  products: [],
  singleProduct: null,

  loading: false,
  error: null,
  success: null,

  // ======================
  // GET PRODUCTS
  // ======================
  fetchProducts: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getProductsApi();

      set({
        products: response.data || [],
        loading: false,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch products",
      });
    }
  },

  // ======================
  // GET SINGLE PRODUCT
  // ======================
  fetchSingleProduct: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await getSingleProductApi(id);

      set({
        singleProduct: response.data,
        loading: false,
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch product";
      set({ loading: false, error: message });
      toast.error(message);
    }
  },

  // ======================
  // CREATE PRODUCT
  // ======================
  createProduct: async (data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await createProductApi(data);

      set({
        loading: false,
        success: response.message,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to create product",
      });

      throw error;
    }
  },

  // ======================
  // UPDATE PRODUCT
  // ======================
  updateProduct: async (id, data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await updateProductApi(id, data);

      set({
        loading: false,
        success: response.message,
      });

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update product",
      });

      throw error;
    }
  },

  // ======================
  // DELETE PRODUCT
  // ======================
  deleteProduct: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await deleteProductApi(id);

      set((state) => ({
        products: state.products.filter((p) => p.id !== id),

        loading: false,
        success: response.message,
      }));

      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to delete product",
      });

      throw error;
    }
  },
}));

// ======================
// PRODUCT ENQUIRY STORE
// ======================

export const useProductEnquiryStore = create((set) => ({
  enquiries: [],
  singleEnquiry: null,
  loading: false,
  error: null,

  fetchEnquiries: async () => {
    try {
      set({ loading: true, error: null });
      const response = await getProductEnquiriesApi();
      set({ enquiries: response.data || [], loading: false });
    } catch (error) {
      set({
        loading: false,
        error:
          error.response?.data?.message || "Failed to fetch product enquiries",
      });
    }
  },

  fetchSingleEnquiry: async (id) => {
    try {
      set({ loading: true, error: null, singleEnquiry: null });
      const response = await getSingleProductEnquiryApi(id);
      set({ singleEnquiry: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch enquiry",
      });
    }
  },

  updateEnquiry: async (id, data) => {
    try {
      set({ loading: true, error: null });
      const response = await updateProductEnquiryApi(id, data);
      set((state) => ({
        enquiries: state.enquiries.map((e) =>
          e.id === id ? response.data : e,
        ),
        singleEnquiry:
          state.singleEnquiry?.id === id ? response.data : state.singleEnquiry,
        loading: false,
      }));
      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to update enquiry",
      });
      throw error;
    }
  },

  deleteEnquiry: async (id) => {
    try {
      set({ loading: true, error: null });
      const response = await deleteProductEnquiryApi(id);
      set((state) => ({
        enquiries: state.enquiries.filter((e) => e.id !== id),
        loading: false,
      }));
      return response;
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to delete enquiry",
      });
      throw error;
    }
  },
}));
