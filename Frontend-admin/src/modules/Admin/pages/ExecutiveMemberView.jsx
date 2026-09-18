import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, PageTitle, Button, Badge } from '../../../components/ui';
import * as Feather from 'react-feather';
import { useExecutiveMemberStore } from '../../../store/executiveMemberStore';

const ExecutiveMemberView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { singleMember, fetchSingleMember, loading } = useExecutiveMemberStore();

  useEffect(() => {
    fetchSingleMember(id);
  }, [id]);

  if (loading || !singleMember) return <div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  const {
    name, designation, status, email, mobile_number, linkedin_link, qualification, address, professional_experience, short_biography, profile_photo
  } = singleMember || {};

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-br from-white/20 via-white/15 to-white/10 dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />
      
      <div className="relative z-10 flex items-center justify-between">
        <PageTitle
          title="Member Profile"
          breadcrumbs={[
            { label: 'CRM', path: '/admin/dashboard' },
            { label: 'Executive Members', path: '/admin/executive-members' },
            { label: 'Profile', active: true },
          ]}
        />
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/admin/executive-members')}>
            <Feather.ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button size="sm" onClick={() => navigate(`/admin/executive-members/edit/${id}`)}
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white', border: 'none' }}>
            <Feather.Edit2 className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
        </div>
      </div>

      <motion.div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="lg:col-span-12 overflow-hidden border-none shadow-sm dark:bg-slate-800">
          <CardBody className="p-0">
            {/* Header / Profile Section */}
            <div className="p-8 flex flex-col md:flex-row gap-8 items-start border-b border-gray-100 dark:border-slate-700/50">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 border-4 border-white dark:border-slate-700 shadow-lg bg-gray-100 dark:bg-slate-800">
                {profile_photo ? (
                  <img src={profile_photo} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400 font-bold bg-gray-50 dark:bg-slate-800">
                    {name?.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1 pb-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h2 className="text-2xl font-black text-gray-800 dark:text-white">{name}</h2>
                    <p className="text-[14px] font-bold text-primary">{designation}</p>
                  </div>
                  <Badge variant={String(status).toLowerCase() === 'active' ? 'soft-success' : 'soft-danger'}>{status ? status.charAt(0).toUpperCase() + String(status).slice(1) : 'Active'}</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: Contact & Info */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-3">Contact Details</h4>
                  <div className="space-y-3">
                    {email && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500">
                          <Feather.Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Email</p>
                          <p className="text-[13px] font-medium text-gray-700 dark:text-gray-300">{email}</p>
                        </div>
                      </div>
                    )}
                    {mobile_number && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500">
                          <Feather.Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Mobile</p>
                          <p className="text-[13px] font-medium text-gray-700 dark:text-gray-300">{mobile_number}</p>
                        </div>
                      </div>
                    )}
                    {linkedin_link && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500">
                          <Feather.Linkedin className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">LinkedIn</p>
                          <a href={linkedin_link} target="_blank" rel="noreferrer" className="text-[13px] font-medium text-primary hover:underline truncate w-full block">View Profile</a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-3">Professional</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 shrink-0">
                        <Feather.Award className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Qualification</p>
                        <p className="text-[13px] font-medium text-gray-700 dark:text-gray-300">{qualification || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 shrink-0">
                        <Feather.MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Address</p>
                        <p className="text-[13px] font-medium text-gray-700 dark:text-gray-300 leading-snug">{address || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Bio & Experience */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-gray-50 dark:bg-slate-700/30 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/50">
                  <h4 className="text-[13px] font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <Feather.Briefcase className="w-4 h-4 text-primary" /> Professional Experience
                  </h4>
                  <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {professional_experience || 'No experience details provided.'}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-slate-700/30 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/50">
                  <h4 className="text-[13px] font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                    <Feather.FileText className="w-4 h-4 text-primary" /> Biography
                  </h4>
                  <div className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed prose dark:prose-invert max-w-none" 
                       dangerouslySetInnerHTML={{ __html: short_biography || 'No biography provided.' }} />
                </div>
              </div>
            </div>

          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default ExecutiveMemberView;
