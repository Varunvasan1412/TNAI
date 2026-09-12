import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button, Badge } from '../../../components/ui';
import * as Feather from 'react-feather';
import { useSnaUnitStore } from '../../../store/snaUnitStore';

const SnaUnitView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { single, fetchSingle, loading } = useSnaUnitStore();

  useEffect(() => { fetchSingle(id); }, [id]);

  if (loading || !single) return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-br from-white/20 via-white/15 to-white/10 dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />
      
      <div className="relative z-10 flex items-center justify-between">
        <PageTitle title="View Record" breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'SNA Units', path: '/admin/sna-units' }, { label: 'Details', active: true }]} />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/sna-units')}><Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
          <Button size="sm" onClick={() => navigate(`/admin/sna-units/edit/${id}`)} style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white', border: 'none' }}>
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
              <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">{single.unit_name || 'Untitled Record'}</h2>
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
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">SNA Unit Name</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.unit_name || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Unit Code</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.unit_code || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Institution</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.institution || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Establishment Date</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.establishment_date || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">SNA Advisor</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.sna_advisor || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Number</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.contact_number || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.email || '-'}</span>
                </div>
                <div className="md:col-span-2 flex flex-col p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Address</span>
                  <p className="text-[14px] font-medium text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{single.address || '-'}</p>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">District</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.district || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">State</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.state || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Number of Members</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.number_of_members ?? '-'}</span>
                </div>
                <div className="md:col-span-2 flex flex-col p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700/50">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Description</span>
                  <p className="text-[14px] font-medium text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">{single.description || '-'}</p>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Logo/Image</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Feather.Image className="w-4 h-4 text-primary" />
                    <a href={single.logo} target="_blank" rel="noreferrer" className="text-[14px] font-semibold text-primary hover:underline">View Attachment</a>
                  </div>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Renewal Date</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.renewal_date || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Fees Paid On</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.fees_paid_on || '-'}</span>
                </div>
                <div className="flex flex-col p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</span>
                  <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{single.status || '-'}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

      </motion.div>
    </div>
  );
};

export default SnaUnitView;
