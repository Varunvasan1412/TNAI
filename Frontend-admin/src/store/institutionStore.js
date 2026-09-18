import { create } from 'zustand';
import axiosInstance from '../api/axios';
import { toast } from 'react-hot-toast';

export const useInstitutionStore = create((set, get) => ({
  data: [],
  single: null,
  loading: false,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/api/tnai/admin/institutions');
      // Assume response.data.data contains the list based on standard API formats
      set({ data: response.data?.data || response.data || [], loading: false });
    } catch (error) {
      console.error('Error fetching institutions:', error);
      toast.error('Failed to load institutions');
      set({ loading: false });
    }
  },

  fetchSingle: async (id) => {
    set({ loading: true, single: null });
    try {
      const response = await axiosInstance.get(`/api/tnai/admin/institutions/${id}`);
      set({ single: response.data?.data || response.data || null, loading: false });
    } catch (error) {
      console.error('Error fetching institution:', error);
      toast.error('Failed to load institution details');
      set({ loading: false });
    }
  },

  createItem: async (data) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/api/tnai/admin/institutions', data);
      set((state) => ({ 
        data: [...state.data, response.data?.data || response.data], 
        loading: false 
      }));
      toast.success('Institution created successfully');
      return true;
    } catch (error) {
      console.error('Error creating institution:', error);
      toast.error(error.response?.data?.message || 'Failed to create institution');
      set({ loading: false });
      return false;
    }
  },

  updateItem: async (id, data) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/api/tnai/admin/institutions/${id}`, data);
      const updatedItem = response.data?.data || response.data;
      set((state) => ({
        data: state.data.map(m => m.id === parseInt(id) ? { ...m, ...updatedItem } : m),
        single: updatedItem,
        loading: false
      }));
      toast.success('Institution updated successfully');
      return true;
    } catch (error) {
      console.error('Error updating institution:', error);
      toast.error(error.response?.data?.message || 'Failed to update institution');
      set({ loading: false });
      return false;
    }
  },

  deleteItem: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/api/tnai/admin/institutions/${id}`);
      set((state) => ({ 
        data: state.data.filter(m => m.id !== parseInt(id)), 
        loading: false 
      }));
      toast.success('Institution deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting institution:', error);
      toast.error('Failed to delete institution');
      set({ loading: false });
      return false;
    }
  },
}));
