import { create } from 'zustand';

export const useDownloadStore = create((set, get) => ({
  data: [],
  single: null,
  loading: false,

  fetchAll: async () => {
    set({ loading: true });
    setTimeout(() => {
      set({ loading: false, data: [{id: 1, title: 'title_mock', category: 'category_mock', description: 'description_mock', docType: 'docType_mock', file: 'file_mock', pubDate: 'pubDate_mock', refNumber: 'refNumber_mock', displayOrder: 'displayOrder_mock', status: 'status_mock'}] });
    }, 500);
  },

  fetchSingle: async (id) => {
    set({ loading: true });
    setTimeout(() => {
      const item = get().data.find(m => m.id === parseInt(id));
      set({ single: item || {id: 1, title: 'title_mock', category: 'category_mock', description: 'description_mock', docType: 'docType_mock', file: 'file_mock', pubDate: 'pubDate_mock', refNumber: 'refNumber_mock', displayOrder: 'displayOrder_mock', status: 'status_mock'}, loading: false });
    }, 300);
  },

  createItem: async (data) => {
    set({ loading: true });
    setTimeout(() => {
      set((state) => ({ data: [...state.data, { ...data, id: Date.now() }], loading: false }));
    }, 500);
  },

  updateItem: async (id, data) => {
    set({ loading: true });
    setTimeout(() => {
      set((state) => ({
        data: state.data.map(m => m.id === parseInt(id) ? { ...m, ...data } : m),
        loading: false
      }));
    }, 500);
  },

  deleteItem: async (id) => {
    set({ loading: true });
    setTimeout(() => {
      set((state) => ({ data: state.data.filter(m => m.id !== parseInt(id)), loading: false }));
    }, 500);
  },
}));
