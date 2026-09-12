import { create } from 'zustand';
import axiosInstance from '../api/axios';

export const useExecutiveMemberStore = create((set, get) => ({
  members: [],
  singleMember: null,
  loading: false,
  error: null,
  success: null,

  fetchMembers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/api/tnai/admin/executive-members');
      const data = response.data?.data || response.data || [];
      set({ members: Array.isArray(data) ? data : [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchSingleMember: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/api/tnai/admin/executive-members/${id}`);
      set({ singleMember: response.data?.data || response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createMember: async (data) => {
    set({ loading: true, error: null, success: null });
    try {
      const response = await axiosInstance.post('/api/tnai/admin/executive-members', data);
      const newMember = response.data?.data || response.data;
      set((state) => ({
        members: [...state.members, newMember],
        loading: false,
        success: 'Member added successfully'
      }));
      return newMember;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateMember: async (id, data) => {
    set({ loading: true, error: null, success: null });
    try {
      const response = await axiosInstance.put(`/api/tnai/admin/executive-members/${id}`, data);
      const updatedMember = response.data?.data || response.data;
      set((state) => ({
        members: state.members.map(m => m.id === parseInt(id) ? { ...m, ...updatedMember } : m),
        loading: false,
        success: 'Member updated successfully'
      }));
      return updatedMember;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteMember: async (id) => {
    set({ loading: true, error: null, success: null });
    try {
      await axiosInstance.delete(`/api/tnai/admin/executive-members/${id}`);
      set((state) => ({
        members: state.members.filter(m => m.id !== parseInt(id)),
        loading: false,
        success: 'Member deleted successfully'
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
