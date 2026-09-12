import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Button, 
  Badge,
  Avatar,
  Input,
  Select,
  Textarea,
  Switch,
  FormLabel,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '../../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Pre-filled data for editing (simulated fetch)
const RECORDS = {
    1: { firstName: 'John', lastName: 'Smith', email: 'john.smith@example.com', phone: '+1 555-0101', role: 'Admin', status: 'Active', address: '123 Main St', city: 'New York', country: 'United States', zipCode: '10001', bio: 'Experienced admin with 5+ years in the field.', website: 'https://johnsmith.com', twitter: '@johnsmith', linkedin: 'linkedin.com/in/johnsmith', notifications: true, twoFactor: true, newsletter: false },
    2: { firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.j@example.com', phone: '+1 555-0102', role: 'Editor', status: 'Active', address: '456 Oak Ave', city: 'Chicago', country: 'United States', zipCode: '60601', bio: 'Content editor with a passion for good writing.', website: '', twitter: '@sarahj', linkedin: '', notifications: true, twoFactor: false, newsletter: true },
};

const CustomEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryId = new URLSearchParams(location.search).get('id');
    const prefill = RECORDS[queryId] || null;

    const [form, setForm] = useState(prefill || {
        firstName: '', lastName: '', email: '', phone: '', role: 'Editor', status: 'Active',
        address: '', city: '', country: '', zipCode: '', bio: '', website: '',
        twitter: '', linkedin: '', notifications: true, twoFactor: false, newsletter: true,
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [avatar, setAvatar] = useState(null);
    const [showDiscard, setShowDiscard] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.firstName.trim()) e.firstName = 'First name is required';
        if (!form.lastName.trim()) e.lastName = 'Last name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.role) e.role = 'Please select a role';
        return e;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); setActiveTab('basic'); return; }
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
            setTimeout(() => navigate('/custom-list'), 1500);
        }, 1200);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatar(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const tabList = [
        { id: 'basic', label: 'Basic Info', icon: Feather.User },
        { id: 'contact', label: 'Location', icon: Feather.MapPin },
        { id: 'social', label: 'Social & Bio', icon: Feather.Globe },
        { id: 'settings', label: 'Settings', icon: Feather.Settings },
    ];

    return (
        <div className="space-y-6">
            <PageTitle 
                title="Edit User Profile" 
                breadcrumbs={[
                    { label: 'Dashboard', path: '/dashboard' },
                    { label: 'Custom List', path: '/custom-list' },
                    { label: 'Edit', active: true },
                ]} 
            />

            <AnimatePresence>
                {success && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                        <Alert variant="success" icon={<Feather.CheckCircle className="w-4 h-4" />}>
                            <strong>Profile Updated!</strong> Changes have been saved successfully. Redirecting...
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Profile Preview Column */}
                <div className="xl:col-span-3 space-y-6">
                    <Card className="border-0 shadow-sm">
                        <CardBody className="p-8 text-center">
                            <div className="relative inline-block group mb-6">
                                <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white dark:ring-slate-800 bg-gray-50 dark:bg-slate-900 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                                    {avatar ? (
                                        <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-primary flex items-center justify-center text-white text-3xl font-black">
                                            {form.firstName?.[0]}{form.lastName?.[0]}
                                        </div>
                                    )}
                                </div>
                                <label className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-primary-hover transition-colors border-2 border-white dark:border-slate-800">
                                    <Feather.Camera className="w-4 h-4" />
                                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                                </label>
                            </div>
                            
                            <div className="space-y-1 mb-6">
                                <h5 className="text-xl font-extrabold text-gray-800 dark:text-white">{form.firstName} {form.lastName}</h5>
                                <div className="flex items-center justify-center gap-2">
                                    <Badge variant="soft-primary" size="sm" pill>{form.role}</Badge>
                                    <Badge variant={form.status === 'Active' ? 'success' : 'warning'} size="sm" pill>{form.status}</Badge>
                                </div>
                            </div>

                            <div className="space-y-1 py-6 border-y border-gray-50 dark:border-slate-800 text-left">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Quick Stats</p>
                                {tabList.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={cn(
                                            "w-full flex items-center justify-between p-3 rounded-xl transition-all group",
                                            activeTab === tab.id ? "bg-primary/10 text-primary" : "text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-800"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <tab.icon className="w-4 h-4" />
                                            <span className="text-xs font-bold">{tab.label}</span>
                                        </div>
                                        {activeTab === tab.id && <Feather.ChevronRight className="w-4 h-4" />}
                                    </button>
                                ))}
                            </div>

                            <div className="pt-6 space-y-2">
                                <Button className="w-full h-11 shadow-lg shadow-primary/20" onClick={handleSubmit} disabled={submitting}>
                                    {submitting ? <Feather.Loader className="w-4 h-4 animate-spin mr-2" /> : <Feather.Save className="w-4 h-4 mr-2" />}
                                    Update Profile
                                </Button>
                                <Button variant="ghost" className="w-full h-11 text-danger hover:bg-danger/5" onClick={() => setShowDiscard(true)}>
                                    Discard Changes
                                </Button>
                            </div>
                        </CardBody>
                    </Card>

                    <Card className="border-danger/30 bg-danger/5 shadow-none">
                        <CardBody className="p-6">
                            <div className="flex items-center gap-2 text-danger mb-2">
                                <Feather.AlertTriangle className="w-4 h-4" />
                                <h6 className="text-xs font-black uppercase tracking-widest">Danger Zone</h6>
                            </div>
                            <p className="text-xs text-gray-500 font-medium mb-4">Permanently remove this user and all associated data.</p>
                            <Button variant="outline" className="w-full border-danger/20 text-danger hover:bg-danger hover:text-white" size="sm" onClick={() => setShowDelete(true)}>
                                Delete Account
                            </Button>
                        </CardBody>
                    </Card>
                </div>

                {/* Form Editing Column */}
                <div className="xl:col-span-9">
                    <Card className="border-0 shadow-sm overflow-hidden">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabList className="bg-gray-50/50 dark:bg-slate-800/50 p-2 gap-2">
                                {tabList.map(tab => (
                                    <Tab key={tab.id} value={tab.id} icon={tab.icon}>{tab.label}</Tab>
                                ))}
                            </TabList>
                            <CardBody className="p-8">
                                <TabPanel value="basic" className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <FormLabel required>First Name</FormLabel>
                                            <Input name="firstName" value={form.firstName} onChange={handleChange} className="h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <FormLabel required>Last Name</FormLabel>
                                            <Input name="lastName" value={form.lastName} onChange={handleChange} className="h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <FormLabel required>Email Address</FormLabel>
                                            <Input type="email" name="email" value={form.email} onChange={handleChange} icon={Feather.Mail} className="h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <FormLabel>Phone Number</FormLabel>
                                            <Input type="tel" name="phone" value={form.phone} onChange={handleChange} icon={Feather.Phone} className="h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <FormLabel required>Role</FormLabel>
                                            <Select name="role" value={form.role} onChange={handleChange} className="h-11">
                                                <option>Admin</option>
                                                <option>Editor</option>
                                                <option>Author</option>
                                                <option>Subscriber</option>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <FormLabel>Account Status</FormLabel>
                                            <Select name="status" value={form.status} onChange={handleChange} className="h-11">
                                                <option>Active</option>
                                                <option>Inactive</option>
                                                <option>Pending</option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <Button onClick={() => setActiveTab('contact')} icon={Feather.ChevronRight} iconPlacement="right">Next Section</Button>
                                    </div>
                                </TabPanel>

                                <TabPanel value="contact" className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                        <div className="md:col-span-12 space-y-2">
                                            <FormLabel>Street Address</FormLabel>
                                            <Input name="address" value={form.address} onChange={handleChange} className="h-11" />
                                        </div>
                                        <div className="md:col-span-4 space-y-2">
                                            <FormLabel>City</FormLabel>
                                            <Input name="city" value={form.city} onChange={handleChange} className="h-11" />
                                        </div>
                                        <div className="md:col-span-5 space-y-2">
                                            <FormLabel>Country</FormLabel>
                                            <Select name="country" value={form.country} onChange={handleChange} className="h-11">
                                                {['India', 'United States', 'United Kingdom', 'Canada', 'UAE'].map(c => <option key={c}>{c}</option>)}
                                            </Select>
                                        </div>
                                        <div className="md:col-span-3 space-y-2">
                                            <FormLabel>ZIP Code</FormLabel>
                                            <Input name="zipCode" value={form.zipCode} onChange={handleChange} className="h-11" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4">
                                        <Button variant="ghost" onClick={() => setActiveTab('basic')} icon={Feather.ChevronLeft}>Back</Button>
                                        <Button onClick={() => setActiveTab('social')} icon={Feather.ChevronRight} iconPlacement="right">Next Section</Button>
                                    </div>
                                </TabPanel>

                                <TabPanel value="social" className="space-y-8">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <FormLabel>Bio</FormLabel>
                                            <Textarea name="bio" value={form.bio} onChange={handleChange} rows="5" className="resize-none" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <FormLabel>Website</FormLabel>
                                                <Input name="website" value={form.website} onChange={handleChange} icon={Feather.Globe} className="h-11" />
                                            </div>
                                            <div className="space-y-2">
                                                <FormLabel>Twitter</FormLabel>
                                                <Input name="twitter" value={form.twitter} onChange={handleChange} icon={Feather.Twitter} className="h-11" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4">
                                        <Button variant="ghost" onClick={() => setActiveTab('contact')} icon={Feather.ChevronLeft}>Back</Button>
                                        <Button onClick={() => setActiveTab('settings')} icon={Feather.ChevronRight} iconPlacement="right">Security Settings</Button>
                                    </div>
                                </TabPanel>

                                <TabPanel value="settings" className="space-y-8">
                                    <div className="space-y-4">
                                        <SettingToggle 
                                            label="Security Alerts" 
                                            description="Receive instant notifications about login attempts from new devices." 
                                            icon={Feather.Shield}
                                            checked={form.notifications}
                                            onChange={(c) => setForm(p => ({...p, notifications: c}))}
                                        />
                                        <SettingToggle 
                                            label="Two-Factor Auth" 
                                            description="Add a second verification layer for sensitive operations." 
                                            icon={Feather.Lock}
                                            checked={form.twoFactor}
                                            onChange={(c) => setForm(p => ({...p, twoFactor: c}))}
                                        />
                                        <SettingToggle 
                                            label="Marketing Updates" 
                                            description="Stay informed about new product features and enterprise releases." 
                                            icon={Feather.Send}
                                            checked={form.newsletter}
                                            onChange={(c) => setForm(p => ({...p, newsletter: c}))}
                                        />
                                    </div>
                                    <div className="flex justify-between pt-6 border-t border-gray-50 dark:border-slate-800">
                                        <Button variant="ghost" onClick={() => setActiveTab('social')} icon={Feather.ChevronLeft}>Back</Button>
                                        <Button variant="success" onClick={handleSubmit} disabled={submitting} shadow="success">
                                            {submitting ? <Feather.Loader className="w-4 h-4 animate-spin mr-2" /> : <Feather.Check className="w-4 h-4 mr-2" />}
                                            Save Changes
                                        </Button>
                                    </div>
                                </TabPanel>
                            </CardBody>
                        </Tabs>
                    </Card>
                </div>
            </div>

            {/* Modals */}
            <Modal isOpen={showDiscard} onClose={() => setShowDiscard(false)}>
                <ModalHeader>Discard Changes?</ModalHeader>
                <ModalBody className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-warning/10 text-warning flex items-center justify-center mx-auto mb-4">
                        <Feather.AlertCircle className="w-8 h-8" />
                    </div>
                    <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Unsaved Progress</h5>
                    <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto">
                        You have made changes to this profile. Are you sure you want to discard them and exit?
                    </p>
                </ModalBody>
                <ModalFooter className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setShowDiscard(false)}>Keep Editing</Button>
                    <Button variant="warning" className="flex-1 shadow-lg shadow-warning/20" onClick={() => navigate('/custom-list')}>Discard</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={showDelete} onClose={() => setShowDelete(false)}>
                <ModalHeader>Delete Account?</ModalHeader>
                <ModalBody className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-danger/10 text-danger flex items-center justify-center mx-auto mb-4">
                        <Feather.Trash2 className="w-8 h-8" />
                    </div>
                    <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Permanent Deletion</h5>
                    <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto">
                        This action cannot be undone. All data for <strong>{form.firstName}</strong> will be erased.
                    </p>
                </ModalBody>
                <ModalFooter className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setShowDelete(false)}>Cancel</Button>
                    <Button variant="danger" className="flex-1 shadow-lg shadow-danger/20" onClick={() => navigate('/custom-list')}>Confirm Delete</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

const SettingToggle = ({ label, description, icon: Icon, checked, onChange }) => (
    <div className={cn(
        "p-5 rounded-2xl border transition-all flex items-center justify-between gap-6",
        checked ? "bg-primary/5 border-primary/20" : "bg-gray-50/50 border-gray-100 dark:border-slate-800"
    )}>
        <div className="flex gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm", checked ? "bg-primary text-white" : "bg-white dark:bg-slate-700 text-gray-400")}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h6 className="text-sm font-bold text-gray-800 dark:text-white">{label}</h6>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{description}</p>
            </div>
        </div>
        <Switch checked={checked} onCheckedChange={onChange} />
    </div>
);

export default CustomEdit;
