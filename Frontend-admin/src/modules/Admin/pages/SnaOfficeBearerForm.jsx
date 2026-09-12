import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button } from '../../../components/ui';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';
import { useSnaOfficeBearerStore } from '../../../store/snaOfficeBearerStore';

const SnaOfficeBearerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { single, fetchSingle, createItem, updateItem, loading } = useSnaOfficeBearerStore();

  const [formData, setFormData] = useState({
    bearer_names: '',
    student_id: '',
    designation: '',
    academic_year: '',
    course: '',
    year_of_study: '',
    photo: '',
    mobile_number: '',
    email: '',
    from_date: '',
    to_date: '',
    display_order: '',
    status: ''
  });

  useEffect(() => { if (isEdit) fetchSingle(id); }, [id, isEdit]);
  useEffect(() => { 
    if (isEdit && single) {
      setFormData({
        ...single,
        bearer_names: Array.isArray(single.bearer_names) ? single.bearer_names.join(', ') : single.bearer_names
      });
    } 
  }, [single, isEdit]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    
    const payload = {
      ...formData,
      display_order: formData.display_order ? parseInt(formData.display_order, 10) : 0,
      bearer_names: formData.bearer_names ? formData.bearer_names.split(',').map(s => s.trim()).filter(s => s) : []
    };

    try {
      if (isEdit) success = await updateItem(id, payload);
      else success = await createItem(payload);
      
      if (success) navigate('/admin/sna-office-bearers');
    } catch (error) {
      toast.error('Error saving data!');
    }
  };

  const inputClass = "w-full h-11 px-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";
  const textareaClass = "w-full h-24 p-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="relative z-10 flex items-center justify-between">
        <PageTitle title={isEdit ? "Edit Record" : "Add New Record"} breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'SnaOfficeBearers', path: '/admin/sna-office-bearers' }, { label: isEdit ? 'Edit' : 'Add', active: true }]} />
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/sna-office-bearers')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
      </div>
      <motion.div className="relative z-10 w-full" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div><label className="block text-[13px] font-bold mb-1.5">Office Bearer Names (comma separated) <span className="text-red-500">*</span></label><input type="text" name="bearer_names" value={formData.bearer_names || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Student ID <span className="text-red-500">*</span></label><input type="text" name="student_id" value={formData.student_id || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Designation <span className="text-red-500">*</span></label><input type="text" name="designation" value={formData.designation || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Academic Year <span className="text-red-500">*</span></label><input type="text" name="academic_year" value={formData.academic_year || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Course </label><input type="text" name="course" value={formData.course || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Year of Study </label><input type="text" name="year_of_study" value={formData.year_of_study || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Photo URL <span className="text-red-500">*</span></label><input type="text" name="photo" value={formData.photo || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Mobile Number </label><input type="text" name="mobile_number" value={formData.mobile_number || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Email </label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">From Date </label><input type="date" name="from_date" value={formData.from_date || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">To Date </label><input type="date" name="to_date" value={formData.to_date || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Display Order <span className="text-red-500">*</span></label><input type="number" name="display_order" value={formData.display_order || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Status <span className="text-red-500">*</span></label><select name="status" value={formData.status || ''} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/sna-office-bearers')}>Cancel</Button>
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

export default SnaOfficeBearerForm;
