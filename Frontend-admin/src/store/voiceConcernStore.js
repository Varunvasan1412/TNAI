import { create } from 'zustand';
import axiosInstance from '../api/axios';
import { toast } from 'react-hot-toast';

export const useVoiceConcernStore = create((set, get) => ({
  data: [],
  single: null,
  loading: false,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/api/tnai/admin/concerns');
      set({ data: response.data?.data || response.data || [], loading: false });
    } catch (error) {
      console.error('Error fetching concerns:', error);
      toast.error('Failed to load concerns');
      set({ loading: false });
    }
  },

  fetchSingle: async (id) => {
    set({ loading: true, single: null });
    try {
      const response = await axiosInstance.get(`/api/tnai/admin/concerns/${id}`);
      set({ single: response.data?.data || response.data || null, loading: false });
    } catch (error) {
      console.error('Error fetching concern details:', error);
      toast.error('Failed to load details');
      set({ loading: false });
    }
  },

  createItem: async (data) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/api/tnai/admin/concerns', data);
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
      // Using PATCH for the resolve endpoint based on API spec
      const response = await axiosInstance.patch(`/api/tnai/admin/concerns/${id}/resolve`, data);
      const updatedItem = response.data?.data || response.data;
      set((state) => ({
        data: state.data.map(m => m.id === parseInt(id) ? { ...m, ...updatedItem } : m),
        single: updatedItem,
        loading: false
      }));
      toast.success('Concern resolved successfully');
      return true;
    } catch (error) {
      console.error('Error resolving concern:', error);
      toast.error(error.response?.data?.message || 'Failed to resolve concern');
      set({ loading: false });
      return false;
    }
  },

  deleteItem: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/api/tnai/admin/concerns/${id}`);
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
