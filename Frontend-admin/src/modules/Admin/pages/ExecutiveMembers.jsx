import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardBody, CardTitle,
  Badge, PageTitle, Button,
  TableContainer, THead, TBody, TR, TH, TD,
  StatCard, DataTablePagination,
} from '../../../components/ui';
import * as Feather from 'react-feather';
import { useExecutiveMemberStore } from '../../../store/executiveMemberStore';

const ExecutiveMembers = () => {
  const navigate = useNavigate();
  const { members, fetchMembers, loading, deleteMember } = useExecutiveMemberStore();
  
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const filters = ['All', 'Active', 'Inactive'];

  useEffect(() => {
    fetchMembers();
  }, []);

  const stats = [
    { label: 'Total Members', value: members.length, icon: Feather.Users, color: 'var(--color-primary)', bg: 'rgba(10,28,64,0.10)' },
    { label: 'Active', value: members.filter(m => String(m.status).toLowerCase() === 'active').length, icon: Feather.CheckCircle, color: 'var(--color-secondary)', bg: 'rgba(31,63,119,0.10)' },
    { label: 'Inactive', value: members.filter(m => String(m.status).toLowerCase() === 'inactive').length, icon: Feather.XCircle, color: '#E67E22', bg: 'rgba(230,126,34,0.10)' },
  ];

  const filtered = members.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch = (m.name || '').toLowerCase().includes(q) || (m.designation || '').toLowerCase().includes(q) || (m.position || '').toLowerCase().includes(q);
    const matchFilter = filter === 'All' || String(m.status).toLowerCase() === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handlePerPage = (val) => { setPerPage(val); setPage(1); };
  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleFilter = (val) => { setFilter(val); setPage(1); };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      deleteMember(id);
    }
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
          title="Executive Members"
          breadcrumbs={[
            { label: 'CRM', path: '/admin/dashboard' },
            { label: 'Executive Members', active: true },
          ]}
        />
      </div>

      {/* Stat cards */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Table card */}
      <motion.div className="relative z-10"
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}>
        
        <Card className="overflow-hidden bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl border border-white/80 dark:border-white/15"
          style={{ boxShadow: '0 8px 32px rgba(10,28,64,0.05)' }}>
          
          <CardHeader>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
                <CardTitle>Members Directory</CardTitle>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">Show</span>
                    <select value={perPage} onChange={e => handlePerPage(Number(e.target.value))}
                      className="h-9 w-20 px-2 rounded-xl text-[13px] font-bold text-gray-600 dark:text-gray-200
                                 bg-gray-100/70 dark:bg-slate-700/50 border border-gray-200/60 dark:border-slate-600/60
                                 focus:outline-none focus:ring-2 focus:ring-primary/25 cursor-pointer">
                      {[5, 10, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <span className="text-[12px] font-medium text-gray-400 whitespace-nowrap">entries</span>
                  </div>

                  <div className="h-5 w-px bg-gray-200 dark:bg-slate-600" />

                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100/70 dark:bg-slate-700/50">
                    {filters.map(f => (
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
                      placeholder="Search members..."
                      value={search}
                      onChange={e => handleSearch(e.target.value)}
                      className="h-9 w-52 pl-9 pr-3 rounded-xl text-[13px]
                                 bg-gray-100/70 dark:bg-slate-700/50 border border-gray-200/60 dark:border-slate-600/60
                                 focus:outline-none focus:ring-2 focus:ring-primary/25
                                 transition-all placeholder:text-gray-400"
                    />
                    <Feather.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  </div>

                  <button
                    onClick={() => navigate('/admin/executive-members/add')}
                    className="flex items-center gap-1.5 h-9 px-4 text-white text-[13px] font-bold rounded-xl
                               transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]
                               shadow-[0_4px_14px_rgba(10,28,64,0.30)] hover:shadow-[0_6px_20px_rgba(10,28,64,0.40)]"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                    <Feather.Plus className="w-3.5 h-3.5" />
                    Add Member
                  </button>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardBody className="p-0">
            <TableContainer className="rounded-none border-0 shadow-none">
              <THead>
                <TR>
                  <TH className="w-14 text-center">Ord</TH>
                  <TH>Member Info</TH>
                  <TH>Designation</TH>
                  <TH>Position</TH>
                  <TH>Status</TH>
                  <TH className="text-right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {loading ? (
                  <TR><TD colSpan={6} className="text-center py-10">Loading...</TD></TR>
                ) : paginated.map((member, idx) => (
                  <motion.tr key={member.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b last:border-0 border-gray-100/60 dark:border-slate-700/30
                               relative transition-all duration-200 group/row
                               hover:shadow-[inset_3px_0_0_var(--color-primary)]"
                    onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(90deg, rgba(10,28,64,0.04) 0%, rgba(10,28,64,0.01) 40%, transparent 100%)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}>
                    
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-[11px] font-black
                                       bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400">
                        {member.display_order || idx + 1}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-200/60">
                          {member.profile_photo ? (
                            <img src={member.profile_photo} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs"
                                 style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white' }}>
                              {(member.name || '?').charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-gray-700 dark:text-gray-200 cursor-pointer hover:text-primary transition-colors"
                                onClick={() => navigate(`/admin/executive-members/view/${member.id}`)}>
                            {member.name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">{member.email || member.mobile_number}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="text-[12px] font-semibold text-gray-600 dark:text-gray-300">{member.designation}</span>
                    </td>

                    <td className="px-4 py-3.5">
                      <Badge variant="soft-info" size="sm">{member.position}</Badge>
                    </td>

                    <td className="px-4 py-3.5">
                      <Badge variant={String(member.status).toLowerCase() === 'active' ? 'soft-success' : 'soft-danger'} size="sm">
                        {member.status ? member.status.charAt(0).toUpperCase() + String(member.status).slice(1) : 'Active'}
                      </Badge>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button title="View"
                          onClick={() => navigate(`/admin/executive-members/view/${member.id}`)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-info hover:bg-info/10 transition-all duration-150">
                          <Feather.Eye className="w-[15px] h-[15px]" />
                        </button>
                        <button title="Edit"
                          onClick={() => navigate(`/admin/executive-members/edit/${member.id}`)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/10 transition-all duration-150">
                          <Feather.Edit2 className="w-[15px] h-[15px]" />
                        </button>
                        <button title="Delete"
                          onClick={() => handleDelete(member.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-150">
                          <Feather.Trash2 className="w-[15px] h-[15px]" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}

                {!loading && paginated.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                          <Feather.Users className="w-7 h-7 text-gray-300" />
                        </div>
                        <p className="text-sm font-bold text-gray-500">No Members found</p>
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

export default ExecutiveMembers;
