import { create } from 'zustand';
import axiosInstance from '../api/axios';
import { toast } from 'react-hot-toast';

export const useGalleryImageStore = create((set, get) => ({
  data: [],
  single: null,
  loading: false,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/api/tnai/admin/gallery-images');
      set({ data: response.data?.data || response.data || [], loading: false });
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      toast.error('Failed to load gallery images');
      set({ loading: false });
    }
  },

  fetchSingle: async (id) => {
    set({ loading: true, single: null });
    try {
      const response = await axiosInstance.get(`/api/tnai/admin/gallery-images/${id}`);
      set({ single: response.data?.data || response.data || null, loading: false });
    } catch (error) {
      console.error('Error fetching gallery image details:', error);
      toast.error('Failed to load details');
      set({ loading: false });
    }
  },

  createItem: async (data) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/api/tnai/admin/gallery-images', data);
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
      const response = await axiosInstance.put(`/api/tnai/admin/gallery-images/${id}`, data);
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
      await axiosInstance.delete(`/api/tnai/admin/gallery-images/${id}`);
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
