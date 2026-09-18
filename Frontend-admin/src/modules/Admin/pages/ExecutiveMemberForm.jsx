import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button } from '../../../components/ui';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';
import { useExecutiveMemberStore } from '../../../store/executiveMemberStore';

const ExecutiveMemberForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const { singleMember, fetchSingleMember, createMember, updateMember, loading } = useExecutiveMemberStore();

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    position: '',
    profile_photo: '',
    qualification: '',
    professional_experience: '',
    short_biography: '',
    email: '',
    mobile_number: '',
    address: '',
    linkedin_link: '',
    display_order: 1,
    status: 'active',
  });

  useEffect(() => {
    if (isEdit) {
      fetchSingleMember(id);
    }
  }, [id, isEdit]);

  useEffect(() => {
    if (isEdit && singleMember) {
      setFormData(singleMember);
    }
  }, [singleMember, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.designation || !formData.position) {
      toast.error('Name, Designation, and Position are required fields.');
      return;
    }

    try {
      if (isEdit) {
        await updateMember(id, formData);
        toast.success('Member updated successfully!');
      } else {
        await createMember(formData);
        toast.success('Member added successfully!');
      }
      navigate('/admin/executive-members');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  const inputClass = `w-full h-11 px-4 rounded-xl text-[14px] text-gray-700 dark:text-gray-200
                      bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600
                      focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all`;

  return (
    <div className="relative space-y-7 min-h-screen">
      {/* Glass overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-br from-white/20 via-white/15 to-white/10 dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* Page title */}
      <div className="relative z-10 flex items-center justify-between">
        <PageTitle
          title={isEdit ? "Edit Member" : "Add New Member"}
          breadcrumbs={[
            { label: 'CRM', path: '/admin/dashboard' },
            { label: 'Executive Members', path: '/admin/executive-members' },
            { label: isEdit ? 'Edit' : 'Add', active: true },
          ]}
        />
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/executive-members')}>
          <Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back to List
        </Button>
      </div>

      <motion.div className="relative z-10 w-full"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}>
        
        <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl border border-white/80 dark:border-white/10 shadow-[0_8px_32px_rgba(10,28,64,0.06)]">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Section: Basic Info */}
              <div>
                <h3 className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 pb-3 border-b-2 border-primary/10 flex items-center gap-2">
                  <Feather.User className="w-5 h-5 text-primary" /> Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">Member Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="e.g. Dr. A. Smith" required />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">Designation <span className="text-red-500">*</span></label>
                    <input type="text" name="designation" value={formData.designation} onChange={handleChange} className={inputClass} placeholder="e.g. President" required />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">Position <span className="text-red-500">*</span></label>
                    <input type="text" name="position" value={formData.position} onChange={handleChange} className={inputClass} placeholder="e.g. Head of Committee" required />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">Qualification</label>
                    <input type="text" name="qualification" value={formData.qualification} onChange={handleChange} className={inputClass} placeholder="e.g. Ph.D, M.Sc Nursing" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">Profile Photo <span className="text-red-500">*</span></label>
                    <input type="text" name="profile_photo" value={formData.profile_photo} onChange={handleChange} className={inputClass} placeholder="e.g. https://example.com/photo.jpg" />
                  </div>
                </div>
              </div>

              {/* Section: Contact & Social */}
              <div>
                <h3 className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 pb-3 border-b-2 border-primary/10 flex items-center gap-2">
                  <Feather.Mail className="w-5 h-5 text-primary" /> Contact & Social
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="example@tnaitamilnadu.com" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">Mobile Number</label>
                    <input type="text" name="mobile_number" value={formData.mobile_number} onChange={handleChange} className={inputClass} placeholder="+91 9876543210" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">LinkedIn / Social Link</label>
                    <input type="url" name="linkedin_link" value={formData.linkedin_link} onChange={handleChange} className={inputClass} placeholder="https://linkedin.com/in/..." />
                  </div>
                </div>
              </div>

              {/* Section: Details & Bio */}
              <div>
                <h3 className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 pb-3 border-b-2 border-primary/10 flex items-center gap-2">
                  <Feather.FileText className="w-5 h-5 text-primary" /> Details & Bio
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows="2" className={`${inputClass} py-3 h-auto`} placeholder="Full address" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">Professional Experience</label>
                    <textarea name="professional_experience" value={formData.professional_experience} onChange={handleChange} rows="3" className={`${inputClass} py-3 h-auto`} placeholder="Brief description of professional experience" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">Short Biography</label>
                    <textarea name="short_biography" value={formData.short_biography} onChange={handleChange} rows="4" className={`${inputClass} py-3 h-auto`} placeholder="Biography..." />
                  </div>
                </div>
              </div>

              {/* Section: Display Options */}
              <div>
                <h3 className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 pb-3 border-b-2 border-primary/10 flex items-center gap-2">
                  <Feather.Settings className="w-5 h-5 text-primary" /> Display Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">Display Order <span className="text-red-500">*</span></label>
                    <input type="number" name="display_order" value={formData.display_order} onChange={handleChange} className={inputClass} required min="1" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-600 dark:text-gray-300 mb-1.5">Status <span className="text-red-500">*</span></label>
                    <select name="status" value={formData.status} onChange={handleChange} className={inputClass} required>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 dark:border-slate-700">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/executive-members')}>Cancel</Button>
                <Button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white', border: 'none' }}>
                  {loading ? 'Saving...' : (isEdit ? 'Update Member' : 'Save Member')}
                </Button>
              </div>

            </form>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default ExecutiveMemberForm;
