import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card, CardHeader, CardBody, CardTitle,
  Badge, PageTitle, Button,
  Avatar, TableContainer, THead, TBody, TR, TH, TD
} from '../../../components/ui';
import * as Feather from 'react-feather';

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStage, setActiveStage] = useState('All');

  const deals = [
    { id: 1, title: 'Enterprise License – TechCorp', contact: 'Rajesh Kumar', value: '₹12,50,000', stage: 'Proposal', probability: 75, closeDate: '15 Jun 2026', initials: 'TC' },
    { id: 2, title: 'Annual Renewal – GlobalNet', contact: 'Priya Sharma', value: '₹4,80,000', stage: 'Negotiation', probability: 90, closeDate: '10 Jun 2026', initials: 'GN' },
    { id: 3, title: 'New Setup – InnovateLLC', contact: 'Amit Patel', value: '₹8,20,000', stage: 'Discovery', probability: 30, closeDate: '30 Jun 2026', initials: 'IL' },
    { id: 4, title: 'Add-on Modules – StarIndustries', contact: 'Sneha Gupta', value: '₹3,50,000', stage: 'Closed Won', probability: 100, closeDate: '25 May 2026', initials: 'SI' },
    { id: 5, title: 'Migration Project – QuickServe', contact: 'Vikram Singh', value: '₹6,00,000', stage: 'Proposal', probability: 60, closeDate: '20 Jun 2026', initials: 'QS' },
  ];

  const stages = ['All', 'Discovery', 'Proposal', 'Negotiation', 'Closed Won'];

  const filteredDeals = deals.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = activeStage === 'All' || d.stage === activeStage;
    return matchesSearch && matchesStage;
  });

  const stageColor = (stage) => {
    switch (stage) {
      case 'Discovery': return 'soft-info';
      case 'Proposal': return 'soft-warning';
      case 'Negotiation': return 'soft-primary';
      case 'Closed Won': return 'soft-success';
      default: return 'soft-secondary';
    }
  };

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
  const item = { hidden: { y: 15, opacity: 0 }, show: { y: 0, opacity: 1 } };

  const totalValue = deals.reduce((sum, d) => sum + parseInt(d.value.replace(/[₹,]/g, '')), 0);
  const wonValue = deals.filter(d => d.stage === 'Closed Won').reduce((sum, d) => sum + parseInt(d.value.replace(/[₹,]/g, '')), 0);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
       <PageTitle className=" gap-3"
          title="Deals Pipeline"
          breadcrumbs={[
            { label: 'CRM', path: '/admin/dashboard' },
            { label: 'Deals', active: true },
          ]}
        />
        <div className="flex items-center gap-3">
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <Feather.Plus className="w-4 h-4" /> New Deal
          </Button>
        </div>
      </div>

      {/* Stats */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Deals', value: deals.length, icon: Feather.Briefcase, color: 'primary' },
          { label: 'Pipeline Value', value: `₹${(totalValue / 100000).toFixed(1)}L`, icon: Feather.TrendingUp, color: 'info' },
          { label: 'Closed Won', value: `₹${(wonValue / 100000).toFixed(1)}L`, icon: Feather.CheckCircle, color: 'success' },
          { label: 'Avg Probability', value: `${Math.round(deals.reduce((s, d) => s + d.probability, 0) / deals.length)}%`, icon: Feather.Target, color: 'warning' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div key={idx} variants={item}>
              <Card className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <CardBody className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                      <h3 className="text-2xl font-black text-gray-800 dark:text-white">{stat.value}</h3>
                    </div>
                    <div className={`w-12 h-12 rounded-2xl bg-${stat.color}/10 text-${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Deals Table */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <CardHeader className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle>All Deals</CardTitle>
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search deals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl text-sm bg-gray-100/50 dark:bg-slate-900/50 border-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Feather.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          {/* Stage Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {stages.map(stage => (
              <button
                key={stage}
                onClick={() => setActiveStage(stage)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeStage === stage
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-slate-700'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <TableContainer className="rounded-none border-0 shadow-none">
            <THead>
              <TR>
                <TH>Deal</TH>
                <TH>Contact</TH>
                <TH>Value</TH>
                <TH>Stage</TH>
                <TH>Probability</TH>
                <TH>Close Date</TH>
                <TH className="text-right">Actions</TH>
              </TR>
            </THead>
            <TBody>
              {filteredDeals.map(deal => (
                <TR key={deal.id} hover={false} className="border-b last:border-0 border-gray-50 dark:border-slate-700/50 hover:bg-gray-50/50 dark:hover:bg-slate-800/30">
                  <TD>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" fallback={deal.initials} className="bg-info/10 text-info font-bold" />
                      <span className="font-bold text-gray-800 dark:text-white">{deal.title}</span>
                    </div>
                  </TD>
                  <TD className="text-sm text-gray-600 dark:text-gray-300">{deal.contact}</TD>
                  <TD className="font-bold text-gray-800 dark:text-white">{deal.value}</TD>
                  <TD><Badge variant={stageColor(deal.stage)} size="sm">{deal.stage}</Badge></TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${deal.probability >= 75 ? 'bg-success' : deal.probability >= 50 ? 'bg-warning' : 'bg-info'}`} style={{ width: `${deal.probability}%` }} />
                      </div>
                      <span className="text-xs font-bold text-gray-500">{deal.probability}%</span>
                    </div>
                  </TD>
                  <TD className="text-xs text-gray-400">{deal.closeDate}</TD>
                  <TD className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-400 hover:text-primary transition-colors">
                        <Feather.Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-danger transition-colors">
                        <Feather.Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TD>
                </TR>
              ))}
            </TBody>
          </TableContainer>
        </CardBody>
      </Card>
    </div>
  );
};

export default Deals;
