import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button } from '../../../components/ui';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';
import { useGalleryAlbumStore } from '../../../store/galleryAlbumStore';

const GalleryAlbumForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { single, fetchSingle, createItem, updateItem, loading } = useGalleryAlbumStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    cover_image: '',
    date: '',
    display_order: '',
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
      display_order: formData.display_order ? parseInt(formData.display_order, 10) : 0
    };

    try {
      if (isEdit) success = await updateItem(id, payload);
      else success = await createItem(payload);
      
      if (success) navigate('/admin/gallery/albums');
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
        <PageTitle title={isEdit ? "Edit Record" : "Add New Record"} breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'Albums', path: '/admin/gallery/albums' }, { label: isEdit ? 'Edit' : 'Add', active: true }]} />
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/gallery/albums')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
      </div>
      <motion.div className="relative z-10 w-full" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div><label className="block text-[13px] font-bold mb-1.5">Album Title <span className="text-red-500">*</span></label><input type="text" name="title" value={formData.title || ''} onChange={handleChange} className={inputClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Description </label><textarea name="description" value={formData.description || ''} onChange={handleChange} className={textareaClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Event/Category </label><select name="category" value={formData.category || ''} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="General">General</option><option value="Events">Events</option><option value="Seminars">Seminars</option><option value="Conferences">Conferences</option><option value="National Events">National Events</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Cover Image URL <span className="text-red-500">*</span></label><input type="text" name="cover_image" value={formData.cover_image || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Date </label><input type="date" name="date" value={formData.date || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Display Order </label><input type="number" name="display_order" value={formData.display_order || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Status <span className="text-red-500">*</span></label><select name="status" value={formData.status || ''} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/gallery/albums')}>Cancel</Button>
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

export default GalleryAlbumForm;
