import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button } from '../../../components/ui';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';
import { useInstitutionStore } from '../../../store/institutionStore';
import axiosInstance from '../../../api/axios';

const InstitutionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { single, fetchSingle, createItem, updateItem, loading } = useInstitutionStore();

  const [formData, setFormData] = useState({
    institution_name: '',
    institution_code: '',
    institution_type: '',
    affiliation: '',
    recognized: '',
    accreditation: '',
    established_year: '',
    principal_name: '',
    tnai_unit: '',
    sna_unit: '',
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    website: '',
    institution_logo: '',
    institution_image: '',
    description: '',
    status: '',
    college_user: ''
  });

  const [users, setUsers] = useState([]);

  useEffect(() => { if (isEdit) fetchSingle(id); }, [id, isEdit]);
  useEffect(() => { if (isEdit && single) setFormData(single); }, [single, isEdit]);

  useEffect(() => {
    // Fetch users for the College User dropdown
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/api/roles/users/admin/users');
        const data = response.data?.data || response.data || [];
        // Filter for college_users
        setUsers(data.filter(u => u.role === 'college_user' || u.role === 'College User'));
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    if (isEdit) {
      success = await updateItem(id, formData);
    } else {
      success = await createItem(formData);
    }
    
    if (success) {
      navigate('/admin/institutions');
    }
  };

  const inputClass = "w-full h-11 px-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";
  const textareaClass = "w-full h-24 p-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="relative z-10 flex items-center justify-between">
        <PageTitle title={isEdit ? "Edit Record" : "Add New Record"} breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'Institutions', path: '/admin/institutions' }, { label: isEdit ? 'Edit' : 'Add', active: true }]} />
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/institutions')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
      </div>
      <motion.div className="relative z-10 w-full" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div><label className="block text-[13px] font-bold mb-1.5">Institution Name</label><input type="text" name="institution_name" value={formData.institution_name || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Institution Code</label><input type="text" name="institution_code" value={formData.institution_code || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Institution Type</label><select name="institution_type" value={formData.institution_type || ''} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Government">Government</option><option value="Private">Private</option><option value="Trust">Trust</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Affiliation</label><input type="text" name="affiliation" value={formData.affiliation || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Recognized</label><input type="text" name="recognized" value={formData.recognized || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Accreditation</label><input type="text" name="accreditation" value={formData.accreditation || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Established Year</label><input type="number" name="established_year" value={formData.established_year || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Principal/Head Name</label><input type="text" name="principal_name" value={formData.principal_name || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">TNAI Unit</label><input type="text" name="tnai_unit" value={formData.tnai_unit || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">SNA Unit</label><input type="text" name="sna_unit" value={formData.sna_unit || ''} onChange={handleChange} className={inputClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Address</label><textarea name="address" value={formData.address || ''} onChange={handleChange} className={textareaClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">City</label><input type="text" name="city" value={formData.city || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">District</label><input type="text" name="district" value={formData.district || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">State</label><input type="text" name="state" value={formData.state || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Pincode</label><input type="text" name="pincode" value={formData.pincode || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Phone</label><input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Email</label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Website</label><input type="text" name="website" value={formData.website || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Institution Logo</label><input type="text" name="institution_logo" value={formData.institution_logo || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Institution Image</label><input type="text" name="institution_image" value={formData.institution_image || ''} onChange={handleChange} className={inputClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Description</label><textarea name="description" value={formData.description || ''} onChange={handleChange} className={textareaClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Status</label><select name="status" value={formData.status || ''} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
                <div>
                  <label className="block text-[13px] font-bold mb-1.5">College User</label>
                  <select name="college_user" value={formData.college_user || ''} onChange={handleChange} className={inputClass}>
                    <option value="">Select College User...</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/institutions')}>Cancel</Button>
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

export default InstitutionForm;
