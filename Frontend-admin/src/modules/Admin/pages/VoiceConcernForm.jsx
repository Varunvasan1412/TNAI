import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button } from '../../../components/ui';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';
import { useVoiceConcernStore } from '../../../store/voiceConcernStore';

const VoiceConcernForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { single, fetchSingle, createItem, updateItem, loading } = useVoiceConcernStore();

  const [formData, setFormData] = useState({
    member_name: '',
    tnai_membership_number: '',
    snai_membership_number: '',
    email: '',
    mobile_number: '',
    institution: '',
    branch_zone: '',
    concern_category: '',
    subject: '',
    description: '',
    attachment: '',
    concern_status: '',
    assigned_to: '',
    admin_response: '',
    resolution_date: '',
    internal_remarks: ''
  });

  useEffect(() => { if (isEdit) fetchSingle(id); }, [id, isEdit]);
  useEffect(() => { if (isEdit && single) setFormData(single); }, [single, isEdit]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) await updateItem(id, formData);
      else await createItem(formData);
      navigate('/admin/voice-concern');
    } catch (error) {
      toast.error('Error saving data!');
    }
  };

  const inputClass = "w-full h-11 px-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";
  const textareaClass = "w-full h-24 p-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="relative z-10 flex items-center justify-between">
        <PageTitle title={isEdit ? "Resolve Concern" : "Add New Concern"} breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'Concerns', path: '/admin/voice-concern' }, { label: isEdit ? 'Resolve' : 'Add', active: true }]} />
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/voice-concern')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
      </div>
      <motion.div className="relative z-10 w-full" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div><label className="block text-[13px] font-bold mb-1.5">Member Name <span className="text-red-500">*</span></label><input type="text" name="member_name" value={formData.member_name || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">TNAI Membership Number </label><input type="text" name="tnai_membership_number" value={formData.tnai_membership_number || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">SNAI Membership Number </label><input type="text" name="snai_membership_number" value={formData.snai_membership_number || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Email <span className="text-red-500">*</span></label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Mobile Number <span className="text-red-500">*</span></label><input type="text" name="mobile_number" value={formData.mobile_number || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Institution </label><input type="text" name="institution" value={formData.institution || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Branch/Zone </label><input type="text" name="branch_zone" value={formData.branch_zone || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Concern Category <span className="text-red-500">*</span></label><input type="text" name="concern_category" value={formData.concern_category || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Subject <span className="text-red-500">*</span></label><input type="text" name="subject" value={formData.subject || ''} onChange={handleChange} className={inputClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Description <span className="text-red-500">*</span></label><textarea name="description" value={formData.description || ''} onChange={handleChange} className={textareaClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Attachment URL </label><input type="text" name="attachment" value={formData.attachment || ''} onChange={handleChange} className={inputClass} /></div>
                
                {isEdit && (
                  <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 mt-2 border-t border-gray-100">
                    <h3 className="md:col-span-2 lg:col-span-3 text-lg font-bold text-primary mb-2">Resolution Details</h3>
                    <div><label className="block text-[13px] font-bold mb-1.5">Concern Status <span className="text-red-500">*</span></label><select name="concern_status" value={formData.concern_status || ''} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="open">Open</option><option value="in_progress">In Progress</option><option value="resolved">Resolved</option><option value="closed">Closed</option></select></div>
                    <div><label className="block text-[13px] font-bold mb-1.5">Assigned To </label><input type="text" name="assigned_to" value={formData.assigned_to || ''} onChange={handleChange} className={inputClass} /></div>
                    <div><label className="block text-[13px] font-bold mb-1.5">Resolution Date </label><input type="date" name="resolution_date" value={formData.resolution_date || ''} onChange={handleChange} className={inputClass} /></div>
                    <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Admin Response </label><textarea name="admin_response" value={formData.admin_response || ''} onChange={handleChange} className={textareaClass} /></div>
                    <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Internal Remarks </label><textarea name="internal_remarks" value={formData.internal_remarks || ''} onChange={handleChange} className={textareaClass} /></div>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/voice-concern')}>Cancel</Button>
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

export default VoiceConcernForm;
