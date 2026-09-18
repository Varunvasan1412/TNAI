import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button, Badge } from '../../../components/ui';
import * as Feather from 'react-feather';
import { useSnaOfficeBearerStore } from '../../../store/snaOfficeBearerStore';

const SnaOfficeBearerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { single, fetchSingle, loading } = useSnaOfficeBearerStore();

  useEffect(() => { fetchSingle(id); }, [id]);

  if (loading || !single) return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-br from-white/20 via-white/15 to-white/10 dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />
      
      <div className="relative z-10 flex items-center justify-between">
        <PageTitle title="View Record" breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'SnaOfficeBearers', path: '/admin/sna-office-bearers' }, { label: 'Details', active: true }]} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/sna-office-bearers')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
          <Button size="sm" onClick={() => navigate(`/admin/sna-office-bearers/edit/${id}`)} style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white', border: 'none' }}>
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
              <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">{single.name || 'Untitled Record'}</h2>
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
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Office Bearer Names</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{Array.isArray(single.bearer_names) ? single.bearer_names.join(', ') : (single.bearer_names || '-')}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Student ID</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.student_id || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Designation</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.designation || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Academic Year</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.academic_year || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Course</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.course || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Year of Study</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.year_of_study || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Photo</span>
                  {single.photo ? (
                    <img src={single.photo} alt="Office Bearer" className="mt-1 h-16 w-auto rounded border" />
                  ) : (
                    <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">-</span>
                  )}
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile Number</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.mobile_number || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.email || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">From Date</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.from_date || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">To Date</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.to_date || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Display Order</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.display_order || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">
                    <Badge variant={single.status === 'active' ? 'soft-success' : 'soft-danger'}>{single.status || 'Active'}</Badge>
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

      </motion.div>
    </div>
  );
};

export default SnaOfficeBearerView;
