import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button } from '../../../components/ui';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';
import { useImpactStore } from '../../../store/impactStore';

const ImpactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { single, fetchSingle, createItem, updateItem, loading } = useImpactStore();

  const [formData, setFormData] = useState({
    title: '',
    short_summary: '',
    detailed_description: '',
    category: '',
    impact_date: '',
    location: '',
    beneficiaries_count: '',
    featured_image: '',
    supporting_images: '',
    supporting_document: '',
    external_url: '',
    display_order: '',
    status: ''
  });

  useEffect(() => { if (isEdit) fetchSingle(id); }, [id, isEdit]);
  useEffect(() => { 
    if (isEdit && single) {
      setFormData({
        ...single,
        supporting_images: Array.isArray(single.supporting_images) ? single.supporting_images.join(', ') : single.supporting_images
      });
    } 
  }, [single, isEdit]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success = false;
    
    const payload = {
      ...formData,
      beneficiaries_count: formData.beneficiaries_count ? parseInt(formData.beneficiaries_count, 10) : 0,
      display_order: formData.display_order ? parseInt(formData.display_order, 10) : 0,
      supporting_images: formData.supporting_images ? formData.supporting_images.split(',').map(s => s.trim()).filter(s => s) : []
    };

    try {
      if (isEdit) success = await updateItem(id, payload);
      else success = await createItem(payload);
      
      if (success) navigate('/admin/impacts');
    } catch (error) {
      toast.error('Error saving data!');
    }
  };

  const inputClass = "w-full h-11 px-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";
  const textareaClass = "w-full h-24 p-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="relative z-10 flex items-center justify-between">
        <PageTitle title={isEdit ? "Edit Record" : "Add New Record"} breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'Impacts', path: '/admin/impacts' }, { label: isEdit ? 'Edit' : 'Add', active: true }]} />
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/impacts')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
      </div>
      <motion.div className="relative z-10 w-full" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div><label className="block text-[13px] font-bold mb-1.5">Impact Title <span className="text-red-500">*</span></label><input type="text" name="title" value={formData.title || ''} onChange={handleChange} className={inputClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Short Summary <span className="text-red-500">*</span></label><textarea name="short_summary" value={formData.short_summary || ''} onChange={handleChange} className={textareaClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Detailed Description <span className="text-red-500">*</span></label><textarea name="detailed_description" value={formData.detailed_description || ''} onChange={handleChange} className={textareaClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Impact Category <span className="text-red-500">*</span></label><input type="text" name="category" value={formData.category || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Impact Date </label><input type="date" name="impact_date" value={formData.impact_date || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Location </label><input type="text" name="location" value={formData.location || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Beneficiaries/People Impacted <span className="text-red-500">*</span></label><input type="number" name="beneficiaries_count" value={formData.beneficiaries_count || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Featured Image URL <span className="text-red-500">*</span></label><input type="text" name="featured_image" value={formData.featured_image || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Supporting Images URLs (comma separated) </label><input type="text" name="supporting_images" value={formData.supporting_images || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Supporting Document URL </label><input type="text" name="supporting_document" value={formData.supporting_document || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">External URL </label><input type="text" name="external_url" value={formData.external_url || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Display Order </label><input type="number" name="display_order" value={formData.display_order || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Status <span className="text-red-500">*</span></label><select name="status" value={formData.status || ''} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/impacts')}>Cancel</Button>
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

export default ImpactForm;
