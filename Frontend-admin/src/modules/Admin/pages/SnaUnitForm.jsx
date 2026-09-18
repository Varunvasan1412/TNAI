import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button } from '../../../components/ui';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';
import { useSnaUnitStore } from '../../../store/snaUnitStore';

const SnaUnitForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { single, fetchSingle, createItem, updateItem, loading } = useSnaUnitStore();

  const [formData, setFormData] = useState({
    unit_name: '',
    unit_code: '',
    institution: '',
    establishment_date: '',
    sna_advisor: '',
    contact_number: '',
    email: '',
    address: '',
    district: '',
    state: '',
    number_of_members: '',
    description: '',
    logo: '',
    renewal_date: '',
    fees_paid_on: '',
    status: ''
  });

  useEffect(() => { if (isEdit) fetchSingle(id); }, [id, isEdit]);
  useEffect(() => { if (isEdit && single) setFormData(single); }, [single, isEdit]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    
    const payload = {
      ...formData,
      number_of_members: formData.number_of_members ? parseInt(formData.number_of_members, 10) : 0
    };

    try {
      if (isEdit) success = await updateItem(id, payload);
      else success = await createItem(payload);
      
      if (success) navigate('/admin/sna-units');
    } catch (error) {
      toast.error('Error saving data!');
    }
  };

  const inputClass = "w-full h-11 px-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";
  const textareaClass = "w-full h-24 p-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="relative z-10 flex items-center justify-between">
        <PageTitle title={isEdit ? "Edit Record" : "Add New Record"} breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'SNA Units', path: '/admin/sna-units' }, { label: isEdit ? 'Edit' : 'Add', active: true }]} />
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/sna-units')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
      </div>
      <motion.div className="relative z-10 w-full" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div><label className="block text-[13px] font-bold mb-1.5">SNA Unit Name <span className="text-red-500">*</span></label><input type="text" name="unit_name" value={formData.unit_name || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Unit Code <span className="text-red-500">*</span></label><input type="text" name="unit_code" value={formData.unit_code || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Institution <span className="text-red-500">*</span></label><input type="text" name="institution" value={formData.institution || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Establishment Date <span className="text-red-500">*</span></label><input type="date" name="establishment_date" value={formData.establishment_date || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">SNA Advisor <span className="text-red-500">*</span></label><input type="text" name="sna_advisor" value={formData.sna_advisor || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Contact Number <span className="text-red-500">*</span></label><input type="text" name="contact_number" value={formData.contact_number || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Email <span className="text-red-500">*</span></label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} className={inputClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Address <span className="text-red-500">*</span></label><textarea name="address" value={formData.address || ''} onChange={handleChange} className={textareaClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">District <span className="text-red-500">*</span></label><select name="district" value={formData.district || ''} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Central Delhi">Central Delhi</option><option value="Chennai">Chennai</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">State <span className="text-red-500">*</span></label><select name="state" value={formData.state || ''} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Delhi">Delhi</option><option value="Tamil Nadu">Tamil Nadu</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Number of Members <span className="text-red-500">*</span></label><input type="number" name="number_of_members" value={formData.number_of_members || ''} onChange={handleChange} className={inputClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Description </label><textarea name="description" value={formData.description || ''} onChange={handleChange} className={textareaClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Logo URL </label><input type="text" name="logo" value={formData.logo || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Renewal Date <span className="text-red-500">*</span></label><input type="date" name="renewal_date" value={formData.renewal_date || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Fees Paid On <span className="text-red-500">*</span></label><input type="date" name="fees_paid_on" value={formData.fees_paid_on || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Status <span className="text-red-500">*</span></label><select name="status" value={formData.status || ''} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/sna-units')}>Cancel</Button>
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

export default SnaUnitForm;
