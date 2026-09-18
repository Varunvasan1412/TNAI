import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  TableContainer, 
  THead, 
  TBody, 
  TR, 
  TH, 
  TD,
  Button,
  Input
} from '../../../../components/ui';
import * as Feather from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';

const TablesEditable = () => {
    const [rows, setRows] = useState([
        { id: 1, name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: 61 },
        { id: 2, name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: 63 },
        { id: 3, name: 'Ashton Cox', position: 'Junior Technical Author', office: 'San Francisco', age: 66 },
    ]);

    const [editingId, setEditingId] = useState(null);

    const handleEdit = (id, field, value) => {
        setRows(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
    };

    return (
        <div className="space-y-6">
            <PageTitle 
                title="Editable Tables" 
                breadcrumbs={[
                    { label: 'Tables', path: '#' },
                    { label: 'Editable', active: true },
                ]} 
            />

            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="flex items-center justify-between">
                    <div>
                        <CardTitle>In-place Editing</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Manage your data directly within the grid with seamless inline editing.</p>
                    </div>
                    <Button variant="soft-primary" size="sm" className="gap-2">
                        <Feather.Plus className="w-3.5 h-3.5" /> Add New Record
                    </Button>
                </CardHeader>
                <CardBody className="p-0">
                    <TableContainer className="rounded-none border-0 shadow-none">
                        <THead>
                            <TR>
                                <TH className="w-16">ID</TH>
                                <TH>Full Name</TH>
                                <TH>Job Position</TH>
                                <TH>Primary Office</TH>
                                <TH className="w-24 text-center">Age</TH>
                                <TH className="w-20 text-right">Status</TH>
                            </TR>
                        </THead>
                        <TBody>
                            {rows.map((row) => (
                                <TR 
                                    key={row.id} 
                                    className={editingId === row.id ? 'bg-primary/[0.02] dark:bg-primary/[0.05]' : ''}
                                    onDoubleClick={() => setEditingId(row.id)}
                                >
                                    <TD className="font-mono text-gray-400 font-bold">0{row.id}</TD>
                                    <TD>
                                       {editingId === row.id ? (
                                          <Input 
                                             autoFocus
                                             defaultValue={row.name} 
                                             className="h-8 py-0 px-2 text-sm"
                                             onBlur={(e) => { handleEdit(row.id, 'name', e.target.value); setEditingId(null); }}
                                             onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                                          />
                                       ) : (
                                          <div className="flex items-center group cursor-text">
                                             <span className="font-bold text-gray-800 dark:text-white">{row.name}</span>
                                             <Feather.Edit3 className="w-3 h-3 ml-2 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                          </div>
                                       )}
                                    </TD>
                                    <TD>
                                       {editingId === row.id ? (
                                          <Input 
                                             defaultValue={row.position} 
                                             className="h-8 py-0 px-2 text-sm"
                                             onBlur={(e) => { handleEdit(row.id, 'position', e.target.value); setEditingId(null); }}
                                             onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                                          />
                                       ) : (
                                          <span className="text-gray-600 dark:text-slate-400">{row.position}</span>
                                       )}
                                    </TD>
                                    <TD>
                                       {editingId === row.id ? (
                                          <Input 
                                             defaultValue={row.office} 
                                             className="h-8 py-0 px-2 text-sm"
                                             onBlur={(e) => { handleEdit(row.id, 'office', e.target.value); setEditingId(null); }}
                                             onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                                          />
                                       ) : (
                                          <div className="flex items-center gap-2">
                                             <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                                             <span className="text-gray-600 dark:text-slate-400">{row.office}</span>
                                          </div>
                                       )}
                                    </TD>
                                    <TD className="text-center font-medium">
                                       {editingId === row.id ? (
                                          <Input 
                                             type="number"
                                             defaultValue={row.age} 
                                             className="h-8 py-0 px-2 text-sm text-center"
                                             onBlur={(e) => { handleEdit(row.id, 'age', e.target.value); setEditingId(null); }}
                                             onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                                          />
                                       ) : (
                                          <span className="text-gray-500">{row.age}</span>
                                       )}
                                    </TD>
                                    <TD className="text-right">
                                       <div className="flex justify-end items-center h-full">
                                          {editingId === row.id ? (
                                             <Badge variant="soft-primary" className="animate-pulse">Editing...</Badge>
                                          ) : (
                                             <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(42,181,125,0.4)]"></div>
                                          )}
                                       </div>
                                    </TD>
                                </TR>
                            ))}
                        </TBody>
                    </TableContainer>
                </CardBody>
                <div className="p-4 bg-gray-50/50 dark:bg-slate-800/50 text-center">
                   <p className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.2em]">Double click any cell to enter edit mode</p>
                </div>
            </Card>
        </div>
    );
};

export default TablesEditable;
