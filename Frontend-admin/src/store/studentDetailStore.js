import { create } from 'zustand';

export const useStudentDetailStore = create((set, get) => ({
  data: [],
  single: null,
  loading: false,

  fetchAll: async () => {
    set({ loading: true });
    setTimeout(() => {
      set({ loading: false, data: [{id: 1, name: 'name_mock', studentId: 'studentId_mock', admissionNumber: 'admissionNumber_mock', dob: 'dob_mock', gender: 'gender_mock', course: 'course_mock', courseYear: 'courseYear_mock', academicYear: 'academicYear_mock', batch: 'batch_mock', photo: 'photo_mock', email: 'email_mock', mobile: 'mobile_mock', parentName: 'parentName_mock', parentPhone: 'parentPhone_mock', parentEmail: 'parentEmail_mock', department: 'department_mock', admissionYear: 'admissionYear_mock', studentStatus: 'studentStatus_mock'}] });
    }, 500);
  },

  fetchSingle: async (id) => {
    set({ loading: true });
    setTimeout(() => {
      const item = get().data.find(m => m.id === parseInt(id));
      set({ single: item || {id: 1, name: 'name_mock', studentId: 'studentId_mock', admissionNumber: 'admissionNumber_mock', dob: 'dob_mock', gender: 'gender_mock', course: 'course_mock', courseYear: 'courseYear_mock', academicYear: 'academicYear_mock', batch: 'batch_mock', photo: 'photo_mock', email: 'email_mock', mobile: 'mobile_mock', parentName: 'parentName_mock', parentPhone: 'parentPhone_mock', parentEmail: 'parentEmail_mock', department: 'department_mock', admissionYear: 'admissionYear_mock', studentStatus: 'studentStatus_mock'}, loading: false });
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
