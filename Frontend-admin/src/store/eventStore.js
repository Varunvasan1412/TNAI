import { create } from 'zustand';
import axiosInstance from '../api/axios';

export const useEventStore = create((set, get) => ({
  data: [],
  single: null,
  loading: false,

  fetchAll: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get('/api/tnai/admin/events');
      set({ data: response.data?.data || response.data || [], loading: false });
    } catch (error) {
      console.error("Failed to fetch events", error);
      set({ loading: false });
    }
  },

  fetchSingle: async (id) => {
    set({ loading: true, single: null });
    try {
      const response = await axiosInstance.get(`/api/tnai/admin/events/${id}`);
      set({ single: response.data?.data || response.data || null, loading: false });
    } catch (error) {
      console.error("Failed to fetch event", error);
      set({ loading: false });
    }
  },

  createItem: async (data) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.post('/api/tnai/admin/events', data);
      set((state) => ({ 
        data: [...state.data, response.data?.data || response.data || data], 
        loading: false 
      }));
      return true;
    } catch (error) {
      console.error("Failed to create event", error);
      set({ loading: false });
      throw error;
    }
  },

  updateItem: async (id, data) => {
    set({ loading: true });
    try {
      const response = await axiosInstance.put(`/api/tnai/admin/events/${id}`, data);
      const updatedItem = response.data?.data || response.data || data;
      set((state) => ({
        data: state.data.map(m => m.id === parseInt(id) ? { ...m, ...updatedItem } : m),
        loading: false
      }));
      return true;
    } catch (error) {
      console.error("Failed to update event", error);
      set({ loading: false });
      throw error;
    }
  },

  deleteItem: async (id) => {
    set({ loading: true });
    try {
      await axiosInstance.delete(`/api/tnai/admin/events/${id}`);
      set((state) => ({ data: state.data.filter(m => m.id !== parseInt(id)), loading: false }));
      return true;
    } catch (error) {
      console.error("Failed to delete event", error);
      set({ loading: false });
      throw error;
    }
  },
}));
