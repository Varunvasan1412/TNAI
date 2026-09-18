import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../../api/axios';
import {
  Card, CardHeader, CardBody, CardTitle,
  Badge, PageTitle, Button,
  Avatar, TableContainer, THead, TBody, TR, TH, TD,
  StatCard, DataTablePagination,
  Modal, ModalHeader, ModalBody, ModalFooter, Input, Select, FormLabel
} from '../../../components/ui';
import * as Feather from 'react-feather';

const ManageUsers = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const filters = ['All', 'Active', 'Inactive'];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'college_user', status: 'active' });
  const [initialFormData, setInitialFormData] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/api/roles/users/admin/users');
      // Assume the API returns an array of users in response.data or response.data.data
      const data = response.data?.data || response.data || [];
      const mappedUsers = Array.isArray(data) ? data.map(u => ({
        ...u,
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status || 'Active',
        lastLogin: u.lastLogin || 'Never',
        initials: (u.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      })) : [];
      setUsers(mappedUsers);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmitUser = async (e) => {
    e.preventDefault();

    if (editingUserId && initialFormData && JSON.stringify(formData) === JSON.stringify(initialFormData)) {
      setIsModalOpen(false);
      setEditingUserId(null);
      return; // No changes made, just close the modal
    }

    setIsSubmitting(true);
    try {
      if (editingUserId) {
        await axiosInstance.put(`/api/roles/users/admin/users/${editingUserId}`, formData);
        toast.success('User updated successfully!');
        setUsers(users.map(u => u.id === editingUserId ? { ...u, ...formData } : u));
      } else {
        const response = await axiosInstance.post('/api/roles/users/admin/create-user', formData);
        toast.success(response.data?.message || 'User created and invitation email sent successfully');
        
        // Update UI with new user
        const newUserData = response.data?.data?.user || response.data?.data || {};
        const initials = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
        const newUser = {
          ...formData,
          id: newUserData.id || Date.now(),
          status: newUserData.status || formData.status || 'active',
          lastLogin: 'Never',
          initials
        };
        setUsers([newUser, ...users]);
      }
      setIsModalOpen(false);
      setEditingUserId(null);
      setInitialFormData(null);
      setFormData({ name: '', email: '', role: 'college_user', status: 'active' });
    } catch (error) {
      const data = error.response?.data;
      if (data?.errors) {
        // Get the first error message from the errors object
        const firstErrorKey = Object.keys(data.errors)[0];
        const firstErrorMessage = data.errors[firstErrorKey][0];
        toast.error(firstErrorMessage);
      } else {
        toast.error(data?.message || `Failed to ${editingUserId ? 'update' : 'create'} user`);
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axiosInstance.delete(`/api/roles/users/admin/users/${id}`);
      toast.success('User deleted successfully!');
      setUsers(users.filter(u => u.id !== id));
    } catch (error) {
      toast.error('Failed to delete user');
      console.error(error);
    }
  };

  const handleEditUserClick = async (id) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.get(`/api/roles/users/admin/users/${id}`);
      const userData = response.data?.data || response.data;
      
      const fetchedData = {
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'college_user',
        status: String(userData.status || 'active').toLowerCase()
      };
      
      setEditingUserId(id);
      setFormData(fetchedData);
      setInitialFormData(fetchedData);
      setIsModalOpen(true);
    } catch (error) {
      toast.error('Failed to fetch user details');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const userStats = [
    { label: 'Total Users', value: users.length, icon: Feather.Users, color: 'var(--color-primary)', bg: 'rgba(49,151,96,0.10)' },
    { label: 'Active', value: users.filter(u => u.status === 'Active' || u.status === 'active').length, icon: Feather.UserCheck, color: 'var(--color-secondary)', bg: 'rgba(52,152,219,0.10)' },
    { label: 'Inactive', value: users.filter(u => u.status === 'Inactive' || u.status === 'inactive').length, icon: Feather.UserX, color: '#E67E22', bg: 'rgba(230,126,34,0.10)' },
    { label: 'Roles', value: [...new Set(users.map(u => u.role))].length, icon: Feather.Shield, color: '#8CC63F', bg: 'rgba(140,198,63,0.10)' },
  ];

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      ((u.name || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q) || (u.role || '').toLowerCase().includes(q)) &&
      (filter === 'All' || String(u.status).toLowerCase() === filter.toLowerCase())
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handlePerPage = (val) => { setPerPage(val); setPage(1); };
  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleFilter = (val) => { setFilter(val); setPage(1); };

  return (
    <div className="relative space-y-7 min-h-screen">
      {/* Glass overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none
                      bg-gradient-to-br from-white/20 via-white/15 to-white/10
                      dark:from-slate-900/30 dark:via-slate-900/20 dark:to-slate-900/15" />

      {/* Page title */}
      <div className="relative z-10">
        <PageTitle
          title="Manage Users"
          breadcrumbs={[
            { label: 'CRM', path: '/admin/dashboard' },
            { label: 'Users', active: true },
          ]}
        />
      </div>

      {/* Stat cards */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
        {userStats.map((s, i) => (
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
                <CardTitle>All Users</CardTitle>

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
                      placeholder="Search users..."
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
                    onClick={() => {
                      setEditingUserId(null);
                      setInitialFormData(null);
                      setFormData({ name: '', email: '', role: 'college_user', status: 'active' });
                      setIsModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 h-9 px-4
                               text-white text-[13px] font-bold rounded-xl
                               transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]
                               shadow-[0_4px_14px_rgba(49,151,96,0.30)]
                               hover:shadow-[0_6px_20px_rgba(49,151,96,0.40)]"
                    style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))' }}>
                    <Feather.UserPlus className="w-3.5 h-3.5" />
                    Add User
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
                  <TH>User</TH>
                  <TH>Role</TH>
                  <TH>Last Login</TH>
                  <TH>Status</TH>
                  <TH className="text-right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {loading ? (
                  <TR><TD colSpan={6} className="text-center py-10">Loading...</TD></TR>
                ) : paginated.map((user, idx) => (
                  <motion.tr key={user.id}
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
                          {user.initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                            {user.name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <Badge variant="soft-info" size="sm">{user.role}</Badge>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <Feather.Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="text-[12px] font-medium text-gray-500">{user.lastLogin}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <Badge variant={String(user.status).toLowerCase() === 'active' ? 'soft-success' : 'soft-danger'} size="sm">
                        {user.status ? String(user.status).charAt(0).toUpperCase() + String(user.status).slice(1) : 'Active'}
                      </Badge>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button title="Edit"
                          onClick={() => handleEditUserClick(user.id)}
                          disabled={isSubmitting}
                          className="w-8 h-8 rounded-lg flex items-center justify-center
                                     text-gray-400 hover:text-primary
                                     hover:bg-primary/10 transition-all duration-150 disabled:opacity-50">
                          <Feather.Edit2 className="w-[15px] h-[15px]" />
                        </button>
                        <button title="Delete"
                          onClick={() => handleDeleteUser(user.id)}
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

                {!loading && paginated.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                          <Feather.Users className="w-7 h-7 text-gray-300" />
                        </div>
                        <p className="text-sm font-bold text-gray-500">No Users found</p>
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

      {/* Add/Edit User Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="sm">
        <form onSubmit={handleSubmitUser}>
          <ModalHeader onClose={() => setIsModalOpen(false)}>{editingUserId ? 'Edit User' : 'Create New User'}</ModalHeader>
          <ModalBody className="space-y-4">
            <div>
              <FormLabel required>Full Name</FormLabel>
              <Input
                placeholder="Jane Doe"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <FormLabel required>Email Address</FormLabel>
              <Input
                type="email"
                placeholder="jane.doe@example.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <FormLabel required>Role</FormLabel>
              <Select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="admin">Admin</option>
                <option value="college_user">College User</option>
                <option value="member">Member</option>
              </Select>
            </div>
            {editingUserId && (
              <div>
                <FormLabel required>Status</FormLabel>
                <Select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting} className="min-w-[100px]">
              {isSubmitting ? <Feather.Loader className="w-4 h-4 animate-spin" /> : (editingUserId ? 'Update User' : 'Create User')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
};

export default ManageUsers;
