import { create } from 'zustand';
import axiosInstance from '../api/axios';
import { toast } from 'react-hot-toast';

export const useSnaiArticleStore = create((set, get) => ({
  data: [],
  single: null,
  loading: false,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/api/tnai/admin/articles');
      set({ data: response.data?.data || response.data || [], loading: false });
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Failed to load articles');
      set({ loading: false });
    }
  },

  fetchSingle: async (id) => {
    set({ loading: true, single: null });
    try {
      const response = await axiosInstance.get(`/api/tnai/admin/articles/${id}`);
      set({ single: response.data?.data || response.data || null, loading: false });
    } catch (error) {
      console.error('Error fetching article details:', error);
      toast.error('Failed to load details');
      set({ loading: false });
    }
  },

  createItem: async (data) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/api/tnai/admin/articles', data);
      set((state) => ({ 
        data: [...state.data, response.data?.data || response.data], 
        loading: false 
      }));
      toast.success('Record created successfully');
      return true;
    } catch (error) {
      console.error('Error creating record:', error);
      toast.error(error.response?.data?.message || 'Failed to create record');
      set({ loading: false });
      return false;
    }
  },

  updateItem: async (id, data) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/api/tnai/admin/articles/${id}`, data);
      const updatedItem = response.data?.data || response.data;
      set((state) => ({
        data: state.data.map(m => m.id === parseInt(id) ? { ...m, ...updatedItem } : m),
        single: updatedItem,
        loading: false
      }));
      toast.success('Record updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating record:', error);
      toast.error(error.response?.data?.message || 'Failed to update record');
      set({ loading: false });
      return false;
    }
  },

  deleteItem: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/api/tnai/admin/articles/${id}`);
      set((state) => ({ 
        data: state.data.filter(m => m.id !== parseInt(id)), 
        loading: false 
      }));
      toast.success('Record deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting record:', error);
      toast.error('Failed to delete record');
      set({ loading: false });
      return false;
    }
  },
}));
