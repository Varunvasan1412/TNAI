import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardTitle, Badge, PageTitle, TableContainer, THead, TBody, TR, TH, TD } from '../../../components/ui';
import * as Feather from 'react-feather';
import { useInstitutionStore } from '../../../store/institutionStore';

const Institutions = () => {
  const navigate = useNavigate();
  const { data, fetchAll, loading, deleteItem } = useInstitutionStore();

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) deleteItem(id);
  };

  return (
    <div className="relative space-y-7 min-h-screen">
      <div className="fixed inset-0 z-[1] pointer-events-none bg-gradient-to-br from-white/20 via-white/15 to-white/10 dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />
      <div className="relative z-10">
        <PageTitle title="Institutions" breadcrumbs={[{ label: 'CRM', path: '/admin/dashboard' }, { label: 'Institutions', active: true }]} />
      </div>

      <motion.div className="relative z-10" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="overflow-hidden bg-white/75 dark:bg-slate-800/65 backdrop-blur-2xl">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Manage Institutions</CardTitle>
              <button onClick={() => navigate('/admin/institutions/add')} className="flex items-center gap-1.5 h-9 px-4 text-white text-[13px] font-bold rounded-xl shadow-lg" style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                <Feather.Plus className="w-3.5 h-3.5" /> Add New
              </button>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <TableContainer>
              <THead>
                <TR>
                  <TH>ID</TH>
                  <TH>Institution Details</TH>
                  <TH>Type & Affiliation</TH>
                  <TH>Location</TH>
                  <TH>Status</TH>
                  <TH className="text-right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {loading ? <TR><TD colSpan={6} className="text-center py-10">Loading...</TD></TR> : data.map((item, idx) => (
                  <TR key={item.id}>
                    <TD className="text-slate-500 font-medium">#{item.id}</TD>
                    <TD>
                      <div className="font-bold text-slate-800">{item.institution_name}</div>
                      <div className="text-xs text-slate-500 font-medium">{item.institution_code}</div>
                    </TD>
                    <TD>
                      <div className="font-medium text-slate-700">{item.institution_type}</div>
                      <div className="text-xs text-slate-500">{item.affiliation}</div>
                    </TD>
                    <TD>
                      <div className="font-medium text-slate-700">{item.city}</div>
                      <div className="text-xs text-slate-500">{item.state}</div>
                    </TD>
                    <TD>
                      <Badge variant={item.status === 'inactive' ? 'soft-danger' : 'soft-success'}>
                        {item.status ? item.status.toUpperCase() : 'ACTIVE'}
                      </Badge>
                    </TD>
                    <TD className="text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => navigate(`/admin/institutions/view/${item.id}`)} className="w-8 h-8 flex justify-center items-center hover:bg-info/10 text-gray-400 hover:text-info rounded-lg"><Feather.Eye className="w-4 h-4" /></button>
                        <button onClick={() => navigate(`/admin/institutions/edit/${item.id}`)} className="w-8 h-8 flex justify-center items-center hover:bg-primary/10 text-gray-400 hover:text-primary rounded-lg"><Feather.Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(item.id)} className="w-8 h-8 flex justify-center items-center hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg"><Feather.Trash2 className="w-4 h-4" /></button>
                      </div>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </TableContainer>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Institutions;
