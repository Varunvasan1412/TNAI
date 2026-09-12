import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Button, 
  Badge,
  Avatar,
  TableContainer,
  THead,
  TBody,
  TR,
  TH,
  TD,
  Input,
  Select,
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox
} from '../../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const initialData = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', role: 'Admin', status: 'Active', date: '2024-01-15', avatar: 'JS' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Editor', status: 'Active', date: '2024-02-20', avatar: 'SJ' },
    { id: 3, name: 'Michael Brown', email: 'm.brown@example.com', role: 'Author', status: 'Inactive', date: '2024-01-08', avatar: 'MB' },
    { id: 4, name: 'Emily Davis', email: 'emily.d@example.com', role: 'Subscriber', status: 'Active', date: '2024-03-10', avatar: 'ED' },
    { id: 5, name: 'Robert Wilson', email: 'r.wilson@example.com', role: 'Editor', status: 'Pending', date: '2024-02-05', avatar: 'RW' },
    { id: 6, name: 'Jessica Lee', email: 'jess.lee@example.com', role: 'Author', status: 'Active', date: '2024-03-18', avatar: 'JL' },
    { id: 7, name: 'David Taylor', email: 'd.taylor@example.com', role: 'Admin', status: 'Active', date: '2024-01-22', avatar: 'DT' },
    { id: 8, name: 'Amanda White', email: 'a.white@example.com', role: 'Subscriber', status: 'Inactive', date: '2024-02-28', avatar: 'AW' },
];

const CustomList = () => {
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(initialData);
    const [page, setPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const perPage = 5;

    const filtered = data.filter(item => {
        const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.email.toLowerCase().includes(search.toLowerCase()) ||
            item.role.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'All' || item.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((page - 1) * perPage, page * perPage);

    const toggleSelect = (id) => {
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };
    const toggleAll = () => {
        if (selected.length === paged.length) setSelected([]);
        else setSelected(paged.map(r => r.id));
    };

    const confirmDelete = (id) => { setDeleteId(id); setShowDeleteModal(true); };
    const handleDelete = () => {
        setData(prev => prev.filter(r => r.id !== deleteId));
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    return (
        <div className="space-y-6">
            <PageTitle 
                title="User Management" 
                breadcrumbs={[
                    { label: 'Dashboard', path: '/dashboard' },
                    { label: 'Custom List', active: true },
                ]} 
            />

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={data.length} icon={Feather.Users} color="primary" />
                <StatCard title="Active Members" value={data.filter(d => d.status === 'Active').length} icon={Feather.CheckCircle} color="success" />
                <StatCard title="Inactive" value={data.filter(d => d.status === 'Inactive').length} icon={Feather.XCircle} color="danger" />
                <StatCard title="Pending Review" value={data.filter(d => d.status === 'Pending').length} icon={Feather.Clock} color="warning" />
            </div>

            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <CardTitle>User Directory</CardTitle>
                    <div className="flex items-center gap-2">
                        <AnimatePresence>
                            {selected.length > 0 && (
                                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                    <Button variant="danger" size="sm" icon={Feather.Trash2} onClick={() => { setData(prev => prev.filter(r => !selected.includes(r.id))); setSelected([]); }}>
                                        Delete ({selected.length})
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <Link to="/custom-create">
                            <Button size="sm" icon={Feather.Plus} shadow="primary">Create New User</Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardBody className="space-y-6">
                    {/* Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <Input 
                                placeholder="Search by name, email or role..." 
                                value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }}
                                className="pl-10 h-11 bg-gray-50/50 dark:bg-slate-900/50 border-none"
                            />
                            <Feather.Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        <Select 
                            value={statusFilter} 
                            onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
                            className="w-full md:w-48 h-11 bg-gray-50/50 dark:bg-slate-900/50 border-none"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                        </Select>
                    </div>

                    {/* Table Area */}
                    <TableContainer className="border-0 shadow-none rounded-xl overflow-hidden">
                        <THead className="bg-gray-50/50 dark:bg-slate-800/50">
                            <TR>
                                <TH className="w-12">
                                    <Checkbox 
                                        checked={selected.length === paged.length && paged.length > 0} 
                                        onChange={toggleAll}
                                    />
                                </TH>
                                <TH>User</TH>
                                <TH>Email</TH>
                                <TH>Role</TH>
                                <TH>Status</TH>
                                <TH>Join Date</TH>
                                <TH className="text-center">Action</TH>
                            </TR>
                        </THead>
                        <TBody>
                            {paged.length === 0 ? (
                                <TR>
                                    <TD colSpan="7" className="py-20">
                                        <div className="flex flex-col items-center justify-center text-center space-y-4">
                                            <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-300">
                                                <Feather.Search className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h6 className="font-bold text-gray-800 dark:text-white">No users found</h6>
                                                <p className="text-xs text-gray-400">Try adjusting your filters or search terms.</p>
                                            </div>
                                        </div>
                                    </TD>
                                </TR>
                            ) : paged.map((row) => (
                                <TR key={row.id} className={cn("hover:bg-gray-50/30 dark:hover:bg-slate-800/30 transition-colors", selected.includes(row.id) && "bg-primary/5 dark:bg-primary/10")}>
                                    <TD>
                                        <Checkbox 
                                            checked={selected.includes(row.id)} 
                                            onChange={() => toggleSelect(row.id)}
                                        />
                                    </TD>
                                    <TD>
                                        <div className="flex items-center gap-3">
                                            <Avatar initials={row.avatar} size="sm" className="shadow-sm" />
                                            <div>
                                                <h6 className="text-sm font-bold text-gray-800 dark:text-white mb-0.5">{row.name}</h6>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ID #{row.id}</p>
                                            </div>
                                        </div>
                                    </TD>
                                    <TD className="text-sm font-medium text-gray-500 dark:text-gray-400">{row.email}</TD>
                                    <TD>
                                        <Badge variant={row.role === 'Admin' ? 'soft-primary' : row.role === 'Editor' ? 'soft-info' : 'soft-secondary'} size="sm" pill>
                                            {row.role}
                                        </Badge>
                                    </TD>
                                    <TD>
                                        <Badge variant={row.status === 'Active' ? 'success' : row.status === 'Inactive' ? 'danger' : 'warning'} size="sm" pill>
                                            {row.status}
                                        </Badge>
                                    </TD>
                                    <TD className="text-sm font-medium text-gray-500 dark:text-gray-400">{row.date}</TD>
                                    <TD>
                                        <div className="flex items-center justify-center gap-2">
                                            <Link to={`/custom-edit?id=${row.id}`}>
                                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-primary hover:bg-primary/10"><Feather.Edit2 className="w-3.5 h-3.5" /></Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg text-danger hover:bg-danger/10" onClick={() => confirmDelete(row.id)}><Feather.Trash2 className="w-3.5 h-3.5" /></Button>
                                        </div>
                                    </TD>
                                </TR>
                            ))}
                        </TBody>
                    </TableContainer>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-50 dark:border-slate-800">
                            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                Showing <span className="text-gray-700 dark:text-slate-300">{((page - 1) * perPage) + 1}</span> to <span className="text-gray-700 dark:text-slate-300">{Math.min(page * perPage, filtered.length)}</span> of <span className="text-gray-700 dark:text-slate-300">{filtered.length}</span> Users
                            </p>
                            <Pagination>
                                <PaginationItem>
                                    <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} />
                                </PaginationItem>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <PaginationItem key={p}>
                                        <PaginationLink isActive={page === p} onClick={() => setPage(p)}>{p}</PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
                                </PaginationItem>
                            </Pagination>
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <ModalHeader>Delete Record?</ModalHeader>
                <ModalBody className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-danger/10 text-danger flex items-center justify-center mx-auto mb-4">
                        <Feather.Trash2 className="w-8 h-8" />
                    </div>
                    <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Are you sure?</h5>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-xs mx-auto">
                        This action will permanently remove the record from the database. This cannot be undone.
                    </p>
                </ModalBody>
                <ModalFooter className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" className="flex-1 shadow-lg shadow-danger/20" onClick={handleDelete}>Confirm Delete</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
    <Card className="border-0 shadow-sm overflow-hidden group">
        <CardBody className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">{title}</p>
                    <h3 className="text-2xl font-black text-gray-800 dark:text-white">{value}</h3>
                </div>
                <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110",
                    color === 'primary' ? "bg-primary/10 text-primary shadow-primary/10" :
                    color === 'success' ? "bg-success/10 text-success shadow-success/10" :
                    color === 'danger' ? "bg-danger/10 text-danger shadow-danger/10" :
                    "bg-warning/10 text-warning shadow-warning/10"
                )}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
        </CardBody>
    </Card>
);

export default CustomList;
