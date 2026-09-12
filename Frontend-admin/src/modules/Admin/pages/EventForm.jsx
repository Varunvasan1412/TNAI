import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button } from '../../../components/ui';
import * as Feather from 'react-feather';
import toast from 'react-hot-toast';
import { useEventStore } from '../../../store/eventStore';

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const { single, fetchSingle, createItem, updateItem, loading } = useEventStore();

  const [formData, setFormData] = useState({
    event_title: '',
    event_category: '',
    short_description: '',
    detailed_description: '',
    event_banner: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    venue: '',
    address: '',
    city: '',
    state: '',
    registration_required: false,
    registration_url: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    event_brochure: '',
    display_order: '',
    status: 'active',
    organizing_chairperson: '',
    organizing_secretary: ''
  });

  useEffect(() => { if (isEdit) fetchSingle(id); }, [id, isEdit]);
  
  useEffect(() => { 
    if (isEdit && single) {
      setFormData({
        ...single,
        registration_required: single.registration_required === true || single.registration_required === 'true' || single.registration_required === '1'
      });
    }
  }, [single, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'registration_required' ? value === 'true' : value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) await updateItem(id, formData);
      else await createItem(formData);
      toast.success('Saved successfully!');
      navigate('/admin/events');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error saving data!');
    }
  };

  const inputClass = "w-full h-11 px-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";
  const textareaClass = "w-full h-24 p-4 rounded-xl text-[14px] bg-white dark:bg-slate-800 border border-gray-200 focus:ring-2 focus:ring-primary/20";

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="relative z-10 flex items-center justify-between">
        <PageTitle title={isEdit ? "Edit Record" : "Add New Record"} breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'Events', path: '/admin/events' }, { label: isEdit ? 'Edit' : 'Add', active: true }]} />
        <Button variant="outline" size="sm" onClick={() => navigate('/admin/events')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
      </div>
      <motion.div className="relative z-10 w-full" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl">
          <CardBody className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div><label className="block text-[13px] font-bold mb-1.5">Event Title</label><input type="text" name="event_title" value={formData.event_title} onChange={handleChange} className={inputClass} required/></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Event Category</label><select name="event_category" value={formData.event_category} onChange={handleChange} className={inputClass}><option value="">Select...</option><option value="Workshop">Workshop</option><option value="Seminar">Seminar</option><option value="Conference">Conference</option></select></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Short Description</label><textarea name="short_description" value={formData.short_description} onChange={handleChange} className={textareaClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Detailed Description</label><textarea name="detailed_description" value={formData.detailed_description} onChange={handleChange} className={textareaClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Event Banner</label><input type="text" name="event_banner" value={formData.event_banner} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Start Date</label><input type="date" name="start_date" value={formData.start_date} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Start Time</label><input type="time" name="start_time" value={formData.start_time} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">End Date</label><input type="date" name="end_date" value={formData.end_date} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">End Time</label><input type="time" name="end_time" value={formData.end_time} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Venue</label><input type="text" name="venue" value={formData.venue} onChange={handleChange} className={inputClass} /></div>
                <div className="md:col-span-2 lg:col-span-3"><label className="block text-[13px] font-bold mb-1.5">Address</label><textarea name="address" value={formData.address} onChange={handleChange} className={textareaClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">City</label><input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">State</label><input type="text" name="state" value={formData.state} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Registration Required</label><select name="registration_required" value={formData.registration_required ? 'true' : 'false'} onChange={handleSelectChange} className={inputClass}><option value="false">No</option><option value="true">Yes</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Registration URL</label><input type="url" name="registration_url" value={formData.registration_url} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Contact Person</label><input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Contact Email</label><input type="email" name="contact_email" value={formData.contact_email} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Contact Phone</label><input type="text" name="contact_phone" value={formData.contact_phone} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Event Brochure</label><input type="text" name="event_brochure" value={formData.event_brochure} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Display Order</label><input type="number" name="display_order" value={formData.display_order} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Status</label><select name="status" value={formData.status} onChange={handleChange} className={inputClass}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Organizing Chairperson</label><input type="text" name="organizing_chairperson" value={formData.organizing_chairperson} onChange={handleChange} className={inputClass} /></div>
                <div><label className="block text-[13px] font-bold mb-1.5">Organizing Secretary</label><input type="text" name="organizing_secretary" value={formData.organizing_secretary} onChange={handleChange} className={inputClass} /></div>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <Button type="button" variant="outline" onClick={() => navigate('/admin/events')}>Cancel</Button>
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

export default EventForm;
