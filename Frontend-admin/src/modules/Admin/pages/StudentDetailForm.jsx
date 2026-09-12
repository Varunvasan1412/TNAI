import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button } from '../../../components/ui';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';
import { useStudentDetailStore } from '../../../store/studentDetailStore';

const StudentDetailForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { single, fetchSingle, createItem, updateItem, loading } = useStudentDetailStore();

  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    admissionNumber: '',
    dob: '',
    gender: '',
    course: '',
    courseYear: '',
    academicYear: '',
    batch: '',
    photo: '',
    email: '',
    mobile: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    department: '',
    admissionYear: '',
    studentStatus: ''
  });

  useEffect(() => { if (isEdit) fetchSingle(id); }, [id, isEdit]);
  useEffect(() => { if (isEdit && single) setFormData(single); }, [single, isEdit]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) await updateItem(id, formData);
      else await createItem(formData);
      toast.success('Saved successfully!');
      navigate('/admin/students');
    } catch (error) {
      toast.error('Error saving data!');
    }
  };

  const inputClass = "w-full h-11 px-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";
  const textareaClass = "w-full h-24 p-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";
  const fileClass = "block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer";

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="relative z-10 flex items-center justify-between">
        <PageTitle title={isEdit ? "Edit Record" : "Add New Record"} breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'StudentDetails', path: '/admin/students' }, { label: isEdit ? 'Edit' : 'Add', active: true }]} />
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/students')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
      </div>
      <motion.div className="relative z-10 w-full" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div><label className="block text-[13px] font-bold mb-1.5">Student Name <span className="text-red-500">*</span></label><input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Student ID/Register Number <span className="text-red-500">*</span></label><input type="text" name="studentId" value={formData.studentId} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Admission Number </label><input type="text" name="admissionNumber" value={formData.admissionNumber} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Date of Birth </label><input type="text" name="dob" value={formData.dob} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Gender <span className="text-red-500">*</span></label><select name="gender" value={formData.gender} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Course <span className="text-red-500">*</span></label><select name="course" value={formData.course} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="B.Sc Nursing">B.Sc Nursing</option><option value="M.Sc Nursing">M.Sc Nursing</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Course Year <span className="text-red-500">*</span></label><select name="courseYear" value={formData.courseYear} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="1st Year">1st Year</option><option value="2nd Year">2nd Year</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Academic Year <span className="text-red-500">*</span></label><select name="academicYear" value={formData.academicYear} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="2023-24">2023-24</option><option value="2024-25">2024-25</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Batch </label><input type="text" name="batch" value={formData.batch} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Student Photo </label><input type="file" onChange={(e) => setFormData(prev => ({ ...prev, photo: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "" }))} className={fileClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Email <span className="text-red-500">*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Mobile Number <span className="text-red-500">*</span></label><input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Parent/Guardian Name </label><input type="text" name="parentName" value={formData.parentName} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Parent/Guardian Phone </label><input type="text" name="parentPhone" value={formData.parentPhone} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Parent/Guardian Email </label><input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Department </label><select name="department" value={formData.department} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Dept A">Dept A</option><option value="Dept B">Dept B</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Admission Year <span className="text-red-500">*</span></label><input type="text" name="admissionYear" value={formData.admissionYear} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Student Status <span className="text-red-500">*</span></label><select name="studentStatus" value={formData.studentStatus} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Active">Active</option><option value="Alumni">Alumni</option></select></div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/students')}>Cancel</Button>
                <Button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white', border: 'none' }}>
                  {loading ? 'Saving...' : 'Save Record'}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentDetailForm;
