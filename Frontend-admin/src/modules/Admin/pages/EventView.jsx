import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button, Badge } from '../../../components/ui';
import * as Feather from 'react-feather';
import { useEventStore } from '../../../store/eventStore';

const EventView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { single, fetchSingle, loading } = useEventStore();

  useEffect(() => { fetchSingle(id); }, [id]);

  if (loading || !single) return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-br from-white/20 via-white/15 to-white/10 dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />
      
      <div className="relative z-10 flex items-center justify-between">
        <PageTitle title="View Record" breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'Events', path: '/admin/events' }, { label: 'Details', active: true }]} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/events')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
          <Button size="sm" onClick={() => navigate(`/admin/events/edit/${id}`)} style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white', border: 'none' }}>
            <Feather.Edit2 className="w-4 h-4 mr-2" /> Edit Record
          </Button>
        </div>
      </div>

      <motion.div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        
        {/* Left Side: Summary Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl border-0 shadow-xl overflow-hidden rounded-2xl">
            <div className="h-32 w-full relative" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
               <div className="absolute -bottom-10 left-6 w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center text-primary">
                 <Feather.FileText className="w-8 h-8" />
               </div>
            </div>
            <CardBody className="p-6 pt-14">
              <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">{single.event_title || 'Untitled Record'}</h2>
              <div className="flex items-center gap-2 mb-6">
                 <Badge variant="soft-primary">{single.status || 'Active'}</Badge>
                 <span className="text-xs text-slate-400 font-semibold">ID: #{single.id || id}</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                This is the summary profile for this record. All detailed data points are listed in the information pane.
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Right Side: Detailed Information Grid */}
        <div className="lg:col-span-8">
          <Card className="bg-white/85 dark:bg-slate-800/70 backdrop-blur-2xl border-0 shadow-xl rounded-2xl h-full">
            <CardBody className="p-8">
              <h3 className="text-lg font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 pb-4 border-b border-gray-100 dark:border-slate-700 flex items-center gap-2">
                <Feather.Database className="w-5 h-5 text-primary" /> Complete Record Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Event Title</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.event_title || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Event Category</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.event_category || '-'}</span>
                </div>
                <div className="md:col-span-2 flex flex-col p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Short Description</span>
                  <p className="text-[14px] font-medium text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{single.short_description || '-'}</p>
                </div>
                <div className="md:col-span-2 flex flex-col p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Detailed Description</span>
                  <p className="text-[14px] font-medium text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{single.detailed_description || '-'}</p>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Event Banner</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.event_banner || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Start Date</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.start_date || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Start Time</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.start_time || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">End Date</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.end_date || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">End Time</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.end_time || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Venue</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.venue || '-'}</span>
                </div>
                <div className="md:col-span-2 flex flex-col p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Address</span>
                  <p className="text-[14px] font-medium text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{single.address || '-'}</p>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">City</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.city || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">State</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.state || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Registration Required</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{(single.registration_required === true || single.registration_required === 'true' || single.registration_required === '1') ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Registration URL</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.registration_url || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Person</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.contact_person || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Email</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.contact_email || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Phone</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.contact_phone || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Event Brochure</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.event_brochure || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Display Order</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.display_order || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.status || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Organizing Chairperson</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.organizing_chairperson || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Organizing Secretary</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.organizing_secretary || '-'}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

      </motion.div>
    </div>
  );
};

export default EventView;
