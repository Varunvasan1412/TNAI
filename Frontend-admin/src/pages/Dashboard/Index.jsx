import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardTitle, 
  Badge, 
  PageTitle, 
  Button,
  Avatar,
  TableContainer,
  TBody,
  TR,
  TD
} from '../../components/ui';
import * as Feather from 'react-feather';

const Dashboard = () => {
  /* ───── Stat Cards (Institution KPIs) ───── */
  const statCards = [
    { title: 'Total Institutions', value: '248', trend: '+6', trendLabel: 'this month', color: 'primary', icon: Feather.Briefcase, path: '/admin/institutions' },
    { title: 'Students Enrolled', value: '12,450', trend: '+320', trendLabel: 'this month', color: 'info', icon: Feather.Users, path: '/admin/students' },
    { title: 'Upcoming Events', value: '18', trend: '+3', trendLabel: 'new this week', color: 'warning', icon: Feather.Calendar, path: '/admin/events' },
    { title: 'Active SNA Units', value: '156', trend: '+12', trendLabel: 'this quarter', color: 'success', icon: Feather.Shield, path: '/admin/sna-units' },
  ];

  /* ───── Recent Events ───── */
  const recentEvents = [
    { id: 1, title: 'National Nursing Conference 2026', date: 'Sep 20, 2026', venue: 'Chennai Convention Centre', status: 'Upcoming', category: 'Conference' },
    { id: 2, title: 'SNA Leadership Workshop', date: 'Sep 15, 2026', venue: 'AIIMS New Delhi', status: 'Ongoing', category: 'Workshop' },
    { id: 3, title: 'World Patient Safety Day', date: 'Sep 17, 2026', venue: 'Multiple Locations', status: 'Upcoming', category: 'Awareness' },
    { id: 4, title: 'TNAI Annual General Body Meeting', date: 'Oct 05, 2026', venue: 'Hyderabad', status: 'Upcoming', category: 'Meeting' },
  ];

  /* ───── Quick Access Modules ───── */
  const quickModules = [
    { label: 'Executive Members', icon: Feather.Award, path: '/admin/executive-members', color: '#319760', count: 24 },
    { label: 'Newsletter', icon: Feather.Mail, path: '/admin/newsletter', color: '#3498DB', count: 42 },
    { label: 'SNAI Articles', icon: Feather.BookOpen, path: '/admin/snai-articles', color: '#E67E22', count: 87 },
    { label: 'Photo Gallery', icon: Feather.Image, path: '/admin/gallery/albums', color: '#9B59B6', count: 36 },
    { label: 'Downloads', icon: Feather.Download, path: '/admin/downloads', color: '#1ABC9C', count: 65 },
    { label: 'Our Activities', icon: Feather.Activity, path: '/admin/activities', color: '#E74C3C', count: 53 },
    { label: 'Our Impacts', icon: Feather.Target, path: '/admin/impacts', color: '#F39C12', count: 29 },
    { label: 'Voice Concern', icon: Feather.MessageSquare, path: '/admin/voice-concern', color: '#2C3E50', count: 14 },
  ];

  /* ───── Recent News & Circulars ───── */
  const recentNews = [
    { id: 1, title: 'TNAI Membership Renewal Notice 2026-27', type: 'Circular', date: 'Sep 10, 2026' },
    { id: 2, title: 'New SNA Unit Approved – Bangalore Medical College', type: 'News', date: 'Sep 08, 2026' },
    { id: 3, title: 'Guidelines for Institution Profile Updates', type: 'Circular', date: 'Sep 05, 2026' },
    { id: 4, title: 'TNAI Newsletter Vol. 48 Published', type: 'News', date: 'Sep 01, 2026' },
    { id: 5, title: 'Annual Statistics Report 2025 Released', type: 'News', date: 'Aug 28, 2026' },
  ];

  /* ───── Pending Approvals ───── */
  const pendingApprovals = [
    { id: 1, item: 'SNA Unit – CMC Vellore', type: 'SNA Unit', submitted: 'Sep 09, 2026', status: 'Pending' },
    { id: 2, item: 'Event – Regional Nursing Seminar', type: 'Event', submitted: 'Sep 08, 2026', status: 'Pending' },
    { id: 3, item: 'Article – "Advances in Critical Care"', type: 'SNAI Article', submitted: 'Sep 07, 2026', status: 'Rework' },
    { id: 4, item: 'Newsletter – Vol. 49 Draft', type: 'Newsletter', submitted: 'Sep 06, 2026', status: 'Pending' },
  ];

  /* ───── Distribution Summary ───── */
  const distributionData = [
    { label: 'Nursing Colleges', count: 142, pct: 57, color: 'primary' },
    { label: 'Medical Institutions', count: 48, pct: 19, color: 'info' },
    { label: 'Government Hospitals', count: 35, pct: 14, color: 'success' },
    { label: 'Private Institutions', count: 23, pct: 10, color: 'warning' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming': return 'soft-info';
      case 'Ongoing': return 'soft-success';
      case 'Completed': return 'soft-primary';
      case 'Pending': return 'soft-warning';
      case 'Rework': return 'soft-danger';
      default: return 'soft-primary';
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageTitle 
          title="Institution Dashboard" 
          breadcrumbs={[
            { label: 'Home', path: '/admin/dashboard' },
            { label: 'Dashboard', active: true },
          ]} 
        />
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
            <Feather.Calendar className="w-4 h-4" /> Academic Year 2026-27
          </Button>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <Feather.Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      {/* ───── Stat Cards Grid ───── */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div key={idx} variants={item}>
              <Link to={stat.path}>
                <Card className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <CardBody className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{
                          background: `var(--color-${stat.color === 'primary' ? 'primary' : stat.color === 'info' ? 'secondary' : stat.color === 'warning' ? 'primary' : 'primary'}, #319760)`,
                          opacity: 0.12,
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: `var(--color-${stat.color === 'primary' ? 'primary' : stat.color === 'info' ? 'secondary' : stat.color === 'warning' ? 'primary' : 'primary'}, #319760)` }} />
                      </div>
                      <Badge variant="soft-success" size="sm" pill>
                        {stat.trend}
                      </Badge>
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.title}</p>
                    <h3 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">{stat.value}</h3>
                    <p className="text-[11px] text-gray-400 mt-1">{stat.trendLabel}</p>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ───── Quick Access Modules ───── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
            <div>
              <CardTitle>Quick Access</CardTitle>
              <p className="text-xs text-gray-500">Navigate to key modules</p>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-4">
              {quickModules.map((mod) => {
                const ModIcon = mod.icon;
                return (
                  <Link
                    key={mod.label}
                    to={mod.path}
                    className="group flex flex-col items-center gap-2.5 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all duration-200 text-center"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${mod.color}15` }}
                    >
                      <ModIcon className="w-5 h-5" style={{ color: mod.color }} />
                    </div>
                    <span className="text-[11px] font-bold text-gray-600 dark:text-gray-300 leading-tight">{mod.label}</span>
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">{mod.count}</span>
                  </Link>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* ───── Main Content: Events + Distribution ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Recent Events */}
        <Card className="lg:col-span-8 border-0 shadow-sm overflow-hidden">
          <CardHeader className="flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
            <div>
              <CardTitle>Upcoming Events</CardTitle>
              <p className="text-xs text-gray-500">Conferences, workshops, and institutional events</p>
            </div>
            <Link to="/admin/events">
              <Button variant="ghost" size="sm" className="text-primary font-bold">View All</Button>
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            <TableContainer className="rounded-none border-0 shadow-none">
              <TBody>
                {recentEvents.map(event => (
                  <TR key={event.id} hover={false} className="border-b last:border-0 border-gray-50 dark:border-slate-700/50 hover:bg-gray-50/50 dark:hover:bg-slate-800/30">
                    <TD className="w-12">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Feather.Calendar className="w-4 h-4" />
                      </div>
                    </TD>
                    <TD>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 dark:text-white text-sm">{event.title}</span>
                        <span className="text-[11px] text-gray-400 mt-0.5">
                          <Feather.MapPin className="w-3 h-3 inline mr-1" />{event.venue}
                        </span>
                      </div>
                    </TD>
                    <TD className="hidden sm:table-cell">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md">{event.category}</span>
                    </TD>
                    <TD className="text-xs text-gray-500 whitespace-nowrap">{event.date}</TD>
                    <TD className="text-right">
                      <Badge variant={getStatusColor(event.status)} size="sm">
                        {event.status}
                      </Badge>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </TableContainer>
          </CardBody>
        </Card>

        {/* Institution Distribution */}
        <Card className="lg:col-span-4 border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Institution Distribution</CardTitle>
            <p className="text-xs text-gray-500 mt-0.5">By category type</p>
          </CardHeader>
          <CardBody className="space-y-5">
            {distributionData.map(d => (
              <div key={d.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-gray-700 dark:text-white">{d.label}</span>
                  <span className="text-gray-400 font-mono text-xs">{d.count} ({d.pct}%)</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${d.pct}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: d.color === 'primary' ? 'var(--color-primary)' :
                                  d.color === 'info' ? 'var(--color-secondary)' :
                                  d.color === 'success' ? '#1ABC9C' : '#F39C12'
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Institutions</p>
                  <h5 className="text-lg font-black text-gray-800 dark:text-white">248</h5>
                </div>
                <Link to="/admin/institutions">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ───── Bottom Row: News + Approvals ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Recent News & Circulars */}
        <Card className="lg:col-span-7 border-0 shadow-sm">
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle>Latest News & Circulars</CardTitle>
              <p className="text-xs text-gray-500">Recent announcements and official communications</p>
            </div>
            <Link to="/admin/news-circulars">
              <Button variant="ghost" size="sm" className="text-primary font-bold">View All</Button>
            </Link>
          </CardHeader>
          <CardBody className="space-y-1 p-2">
            {recentNews.map(news => (
              <div
                key={news.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  news.type === 'Circular' ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'
                }`}>
                  {news.type === 'Circular' ? <Feather.FileText className="w-4 h-4" /> : <Feather.Bell className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate group-hover:text-primary transition-colors">{news.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{news.date}</p>
                </div>
                <Badge variant={news.type === 'Circular' ? 'soft-warning' : 'soft-info'} size="sm">
                  {news.type}
                </Badge>
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Pending Approvals */}
        <Card className="lg:col-span-5 border-0 shadow-sm">
          <CardHeader className="flex justify-between items-center">
            <div>
              <CardTitle>Pending Approvals</CardTitle>
              <p className="text-xs text-gray-500">Items awaiting admin review</p>
            </div>
            <Badge variant="soft-warning" size="sm" pill>
              {pendingApprovals.length} pending
            </Badge>
          </CardHeader>
          <CardBody className="space-y-1 p-2">
            {pendingApprovals.map(appr => (
              <div
                key={appr.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center flex-shrink-0">
                  <Feather.Clock className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">{appr.item}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{appr.type} · {appr.submitted}</p>
                </div>
                <Badge variant={appr.status === 'Rework' ? 'soft-danger' : 'soft-warning'} size="sm">
                  {appr.status}
                </Badge>
              </div>
            ))}
            <div className="pt-3 px-3 pb-1">
              <Button variant="outline" size="sm" className="w-full justify-center gap-2">
                <Feather.CheckCircle className="w-3.5 h-3.5" /> Review All Approvals
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ───── Statistics Counters (Bottom Banner) ───── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl p-6 md:p-8"
        style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)' }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { label: 'TNAI Units', value: '86', icon: Feather.Award },
            { label: 'SNA Units', value: '156', icon: Feather.Shield },
            { label: 'Total Members', value: '18,400+', icon: Feather.Users },
            { label: 'States Covered', value: '28', icon: Feather.Map },
          ].map((counter, i) => {
            const CIcon = counter.icon;
            return (
              <div key={i} className="text-center text-white">
                <CIcon className="w-7 h-7 mx-auto mb-2 opacity-80" />
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">{counter.value}</h3>
                <p className="text-xs font-semibold opacity-75 mt-1 uppercase tracking-wider">{counter.label}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
