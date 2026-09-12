import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button } from '../../../components/ui';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';
import { useDownloadStore } from '../../../store/downloadStore';

const DownloadForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { single, fetchSingle, createItem, updateItem, loading } = useDownloadStore();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    docType: '',
    file: '',
    pubDate: '',
    refNumber: '',
    displayOrder: '',
    status: ''
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
      navigate('/admin/downloads');
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
        <PageTitle title={isEdit ? "Edit Record" : "Add New Record"} breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'Downloads', path: '/admin/downloads' }, { label: isEdit ? 'Edit' : 'Add', active: true }]} />
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/downloads')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
      </div>
      <motion.div className="relative z-10 w-full" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div><label className="block text-[13px] font-bold mb-1.5">Document Title <span className="text-red-500">*</span></label><input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Category <span className="text-red-500">*</span></label><select name="category" value={formData.category} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Forms">Forms</option><option value="Guidelines">Guidelines</option><option value="Reports">Reports</option></select></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Description </label><textarea name="description" value={formData.description} onChange={handleChange} className={textareaClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Document Type <span className="text-red-500">*</span></label><select name="docType" value={formData.docType} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="PDF">PDF</option><option value="Word">Word</option><option value="Excel">Excel</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">File Upload <span className="text-red-500">*</span></label><input type="file" onChange={(e) => setFormData(prev => ({ ...prev, file: e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "" }))} className={fileClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Publication Date <span className="text-red-500">*</span></label><input type="text" name="pubDate" value={formData.pubDate} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Reference Number </label><input type="text" name="refNumber" value={formData.refNumber} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Display Order </label><input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Status <span className="text-red-500">*</span></label><select name="status" value={formData.status} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Active">Active</option><option value="Inactive">Inactive</option></select></div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/downloads')}>Cancel</Button>
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

export default DownloadForm;
