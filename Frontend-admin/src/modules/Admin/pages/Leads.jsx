import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Card, CardHeader, CardBody, CardTitle,
  Badge, PageTitle, Button,
  Avatar, TableContainer, THead, TBody, TR, TH, TD,
  StatCard, DataTablePagination,
} from '../../../components/ui';
import * as Feather from 'react-feather';

const Leads = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const statuses = ['All', 'New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

  const leads = [
    { id: 1, name: 'Ananya Reddy', company: 'FreshFoods Pvt Ltd', email: 'ananya@freshfoods.in', source: 'Website', status: 'New', score: 85, date: '29 May 2026', initials: 'AR' },
    { id: 2, name: 'Mohammed Irfan', company: 'SpiceMart', email: 'irfan@spicemart.com', source: 'Referral', status: 'Contacted', score: 72, date: '28 May 2026', initials: 'MI' },
    { id: 3, name: 'Lakshmi Nair', company: 'GreenBasket', email: 'lakshmi@greenbasket.in', source: 'Trade Show', status: 'Qualified', score: 90, date: '27 May 2026', initials: 'LN' },
    { id: 4, name: 'Suresh Menon', company: 'QuickBite Foods', email: 'suresh@quickbite.com', source: 'Cold Call', status: 'Lost', score: 20, date: '25 May 2026', initials: 'SM' },
    { id: 5, name: 'Divya Joshi', company: 'NutriWell', email: 'divya@nutriwell.in', source: 'LinkedIn', status: 'Converted', score: 95, date: '24 May 2026', initials: 'DJ' },
    { id: 6, name: 'Arjun Mehta', company: 'DailyDine', email: 'arjun@dailydine.com', source: 'Website', status: 'New', score: 60, date: '29 May 2026', initials: 'AM' },
  ];

  const leadStats = [
    { label: 'Total Leads', value: leads.length, icon: Feather.Users, color: 'var(--color-primary)', bg: 'rgba(49,151,96,0.10)' },
    { label: 'New Leads', value: leads.filter(l => l.status === 'New').length, icon: Feather.UserPlus, color: 'var(--color-secondary)', bg: 'rgba(52,152,219,0.10)' },
    { label: 'Converted', value: leads.filter(l => l.status === 'Converted').length, icon: Feather.CheckCircle, color: '#8CC63F', bg: 'rgba(140,198,63,0.10)' },
    { label: 'Avg Score', value: Math.round(leads.reduce((s, l) => s + l.score, 0) / leads.length), icon: Feather.BarChart2, color: '#E67E22', bg: 'rgba(230,126,34,0.10)' },
  ];

  const filtered = leads.filter((l) => {
    const q = search.toLowerCase();
    return (
      (l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q)) &&
      (filter === 'All' || l.status === filter)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handlePerPage = (val) => { setPerPage(val); setPage(1); };
  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleFilter = (val) => { setFilter(val); setPage(1); };

  const statusColor = (status) => {
    switch (status) {
      case 'New': return 'soft-info';
      case 'Contacted': return 'soft-warning';
      case 'Qualified': return 'soft-primary';
      case 'Converted': return 'soft-success';
      case 'Lost': return 'soft-danger';
      default: return 'soft-secondary';
    }
  };

  const scoreColor = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 50) return 'bg-warning';
    return 'bg-danger';
  };

  return (
    <div className="relative space-y-7 min-h-screen">
      {/* Glass overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* Page title */}
      <div className="relative z-10">
        <PageTitle
          title="Leads Management"
          breadcrumbs={[
            { label: 'CRM', path: '/admin/dashboard' },
            { label: 'Leads', active: true },
          ]}
        />
      </div>

      {/* Stat cards */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {leadStats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Table card */}
      <motion.div className="relative z-10"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}>
        
        <Card className="overflow-hidden
                         bg-white/75 dark:bg-slate-800/65
                         backdrop-blur-2xl
                         border border-white/80 dark:border-white/15"
          style={{ boxShadow: '0 8px 32px rgba(49,151,96,0.09)' }}>
          
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
                <CardTitle>All Leads</CardTitle>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">Show</span>
                    <select value={perPage} onChange={e => handlePerPage(Number(e.target.value))}
                      className="h-9 w-20 px-2 rounded-xl text-[13px] font-bold text-gray-600 dark:text-gray-200
                                 bg-gray-100/70 dark:bg-slate-700/50
                                 border border-gray-200/60 dark:border-slate-600/60
                                 focus:outline-none focus:ring-2 focus:ring-primary/25 cursor-pointer">
                      {[5, 10, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">entries</span>
                  </div>

                  <div className="h-5 w-px bg-gray-200 dark:bg-slate-600" />

                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100/70 dark:bg-slate-700/50">
                    {statuses.map(f => (
                      <button key={f} onClick={() => handleFilter(f)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${filter === f
                          ? 'bg-white dark:bg-slate-600 text-primary shadow-sm'
                          : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                          }`}>
                        {f}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search leads..."
                      value={search}
                      onChange={e => handleSearch(e.target.value)}
                      className="h-9 w-52 pl-9 pr-3 rounded-xl text-[13px]
                                 bg-gray-100/70 dark:bg-slate-700/50
                                 border border-gray-200/60 dark:border-slate-600/60
                                 focus:outline-none focus:ring-2 focus:ring-primary/25
                                 transition-all placeholder:text-gray-400"
                    />
                    <Feather.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  </div>

                  <button
                    className="flex items-center gap-1.5 h-9 px-4
                               text-gray-600 dark:text-gray-200 text-[13px] font-bold rounded-xl
                               bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600
                               transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]">
                    <Feather.Download className="w-3.5 h-3.5" />
                    Export
                  </button>

                  <button
                    className="flex items-center gap-1.5 h-9 px-4
                               text-white text-[13px] font-bold rounded-xl
                               transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]
                               shadow-[0_4px_14px_rgba(49,151,96,0.30)]
                               hover:shadow-[0_6px_20px_rgba(49,151,96,0.40)]"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                    <Feather.Plus className="w-3.5 h-3.5" />
                    Add Lead
                  </button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardBody className="p-0">
            <TableContainer className="rounded-none border-0 shadow-none">
              <THead>
                <TR>
                  <TH className="w-14 text-center">S.No</TH>
                  <TH>Lead</TH>
                  <TH>Source</TH>
                  <TH>Status</TH>
                  <TH>Lead Score</TH>
                  <TH>Date</TH>
                  <TH className="text-right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {paginated.map((lead, idx) => (
                  <motion.tr key={lead.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b last:border-0 border-gray-100/60 dark:border-slate-700/30
                               relative transition-all duration-200 group/row
                               hover:shadow-[inset_3px_0_0_var(--color-primary)]"
                    onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, rgba(49,151,96,0.06) 0%, rgba(49,151,96,0.01) 40%, transparent 100%)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}>
                    
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center justify-center
                                       w-7 h-7 rounded-lg text-[11px] font-black
                                       bg-gray-100 dark:bg-slate-700
                                       text-gray-500 dark:text-gray-400">
                        {String(idx + 1 + (page - 1) * perPage).padStart(2, '0')}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center
                                        text-white text-[11px] font-black shrink-0"
                          style={{ background: "linear-gradient(135deg,var(--color-primary),var(--color-secondary))" }}>
                          {lead.initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            {lead.name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">{lead.company} · {lead.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{lead.source}</span>
                    </td>

                    <td className="px-4 py-3.5">
                      <Badge variant={statusColor(lead.status)} size="sm">
                        {lead.status}
                      </Badge>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${scoreColor(lead.score)}`} style={{ width: `${lead.score}%` }} />
                        </div>
                        <span className="text-xs font-bold text-gray-500">{lead.score}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <Feather.Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="text-[12px] font-medium text-gray-500">{lead.date}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button title="View"
                          className="w-8 h-8 rounded-lg flex items-center justify-center
                                     text-gray-400 hover:text-secondary
                                     hover:bg-secondary/10 transition-all duration-150">
                          <Feather.Eye className="w-[15px] h-[15px]" />
                        </button>
                        <button title="Edit"
                          className="w-8 h-8 rounded-lg flex items-center justify-center
                                     text-gray-400 hover:text-primary
                                     hover:bg-primary/10 transition-all duration-150">
                          <Feather.Edit2 className="w-[15px] h-[15px]" />
                        </button>
                        <button title="Delete"
                          className="w-8 h-8 rounded-lg flex items-center justify-center
                                     text-gray-400 hover:text-red-500
                                     hover:bg-red-50 dark:hover:bg-red-900/20
                                     transition-all duration-150">
                          <Feather.Trash2 className="w-[15px] h-[15px]" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}

                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                          <Feather.Users className="w-7 h-7 text-gray-300" />
                        </div>
                        <p className="text-sm font-bold text-gray-500">No Leads found</p>
                        <p className="text-xs text-gray-400">Try adjusting your search</p>
                      </div>
                    </td>
                  </tr>
                )}
              </TBody>
            </TableContainer>

            <DataTablePagination page={page} totalPages={totalPages} total={filtered.length}
              perPage={perPage} onPage={setPage} />
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Leads;
