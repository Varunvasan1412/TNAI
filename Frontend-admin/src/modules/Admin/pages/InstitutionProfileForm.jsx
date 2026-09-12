import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button } from '../../../components/ui';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';
import { useInstitutionProfileStore } from '../../../store/institutionProfileStore';

const InstitutionProfileForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { single, fetchSingle, createItem, updateItem, loading } = useInstitutionProfileStore();

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: '',
    estYear: '',
    logo: '',
    cover: '',
    about: '',
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    phone: '',
    altPhone: '',
    email: '',
    website: '',
    principalName: '',
    principalPhoto: '',
    principalContact: '',
    principalEmail: '',
    courses: '',
    departments: '',
    studentsCount: '',
    facultyCount: '',
    accreditation: '',
    affiliation: ''
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
      navigate('/admin/institution-profile');
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
        <PageTitle title={isEdit ? "Edit Record" : "Add New Record"} breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'InstitutionProfiles', path: '/admin/institution-profile' }, { label: isEdit ? 'Edit' : 'Add', active: true }]} />
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/institution-profile')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
      </div>
      <motion.div className="relative z-10 w-full" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div><label className="block text-[13px] font-bold mb-1.5">Institution Name <span className="text-red-500">*</span></label><input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Institution Code <span className="text-red-500">*</span></label><input type="text" name="code" value={formData.code} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Institution Type <span className="text-red-500">*</span></label><select name="type" value={formData.type} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Govt">Govt</option><option value="Private">Private</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Established Year <span className="text-red-500">*</span></label><input type="text" name="estYear" value={formData.estYear} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Institution Logo </label><input type="file" onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "" }))} className={fileClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Cover Image </label><input type="file" onChange={(e) => setFormData(prev => ({ ...prev, cover: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "" }))} className={fileClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">About Institution <span className="text-red-500">*</span></label><textarea name="about" value={formData.about} onChange={handleChange} className={textareaClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Address <span className="text-red-500">*</span></label><textarea name="address" value={formData.address} onChange={handleChange} className={textareaClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">City <span className="text-red-500">*</span></label><input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">District <span className="text-red-500">*</span></label><select name="district" value={formData.district} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Dist 1">Dist 1</option><option value="Dist 2">Dist 2</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">State <span className="text-red-500">*</span></label><select name="state" value={formData.state} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="State 1">State 1</option><option value="State 2">State 2</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Pincode <span className="text-red-500">*</span></label><input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Phone <span className="text-red-500">*</span></label><input type="text" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Alternate Phone </label><input type="text" name="altPhone" value={formData.altPhone} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Email <span className="text-red-500">*</span></label><input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Website <span className="text-red-500">*</span></label><input type="text" name="website" value={formData.website} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Principal/Head Name <span className="text-red-500">*</span></label><input type="text" name="principalName" value={formData.principalName} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Principal Photo </label><input type="file" onChange={(e) => setFormData(prev => ({ ...prev, principalPhoto: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "" }))} className={fileClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Principal Contact Number </label><input type="text" name="principalContact" value={formData.principalContact} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Principal Email <span className="text-red-500">*</span></label><input type="email" name="principalEmail" value={formData.principalEmail} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Courses Offered <span className="text-red-500">*</span></label><select name="courses" value={formData.courses} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="B.Sc">B.Sc</option><option value="M.Sc">M.Sc</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Departments </label><select name="departments" value={formData.departments} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Dept A">Dept A</option><option value="Dept B">Dept B</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Number of Students <span className="text-red-500">*</span></label><input type="number" name="studentsCount" value={formData.studentsCount} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Number of Faculty <span className="text-red-500">*</span></label><input type="number" name="facultyCount" value={formData.facultyCount} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Accreditation </label><input type="text" name="accreditation" value={formData.accreditation} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Affiliation </label><input type="text" name="affiliation" value={formData.affiliation} onChange={handleChange} className={inputClass} /></div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/institution-profile')}>Cancel</Button>
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

export default InstitutionProfileForm;
