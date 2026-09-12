import { create } from 'zustand';

export const useInstitutionProfileStore = create((set, get) => ({
  data: [],
  single: null,
  loading: false,

  fetchAll: async () => {
    set({ loading: true });
    setTimeout(() => {
      set({ loading: false, data: [{id: 1, name: 'name_mock', code: 'code_mock', type: 'type_mock', estYear: 'estYear_mock', logo: 'logo_mock', cover: 'cover_mock', about: 'about_mock', address: 'address_mock', city: 'city_mock', district: 'district_mock', state: 'state_mock', pincode: 'pincode_mock', phone: 'phone_mock', altPhone: 'altPhone_mock', email: 'email_mock', website: 'website_mock', principalName: 'principalName_mock', principalPhoto: 'principalPhoto_mock', principalContact: 'principalContact_mock', principalEmail: 'principalEmail_mock', courses: 'courses_mock', departments: 'departments_mock', studentsCount: 'studentsCount_mock', facultyCount: 'facultyCount_mock', accreditation: 'accreditation_mock', affiliation: 'affiliation_mock'}] });
    }, 500);
  },

  fetchSingle: async (id) => {
    set({ loading: true });
    setTimeout(() => {
      const item = get().data.find(m => m.id === parseInt(id));
      set({ single: item || {id: 1, name: 'name_mock', code: 'code_mock', type: 'type_mock', estYear: 'estYear_mock', logo: 'logo_mock', cover: 'cover_mock', about: 'about_mock', address: 'address_mock', city: 'city_mock', district: 'district_mock', state: 'state_mock', pincode: 'pincode_mock', phone: 'phone_mock', altPhone: 'altPhone_mock', email: 'email_mock', website: 'website_mock', principalName: 'principalName_mock', principalPhoto: 'principalPhoto_mock', principalContact: 'principalContact_mock', principalEmail: 'principalEmail_mock', courses: 'courses_mock', departments: 'departments_mock', studentsCount: 'studentsCount_mock', facultyCount: 'facultyCount_mock', accreditation: 'accreditation_mock', affiliation: 'affiliation_mock'}, loading: false });
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
