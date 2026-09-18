import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  FormHelperText,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Alert
} from '../../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCreate = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', phone: '', role: '', status: 'Active',
        address: '', city: '', country: '', zipCode: '', bio: '', website: '',
        twitter: '', linkedin: '', notifications: true, twoFactor: false, newsletter: true,
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [avatar, setAvatar] = useState(null);

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

    return (
        <div className="space-y-6">
            <PageTitle 
                title="Create New User" 
                breadcrumbs={[
                    { label: 'Dashboard', path: '/dashboard' },
                    { label: 'Custom List', path: '/custom-list' },
                    { label: 'Create', active: true },
                ]} 
            />

            <AnimatePresence>
                {success && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                        <Alert variant="success" icon={<Feather.CheckCircle className="w-4 h-4" />}>
                            <strong>Success!</strong> Record created. Redirecting to user directory...
                        </Alert>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                {/* Profile Snapshot */}
                <div className="xl:col-span-3 space-y-6">
                    <Card className="border-0 shadow-sm text-center">
                        <CardBody className="p-8">
                            <div className="relative inline-block group mb-6">
                                <div className="w-32 h-32 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white dark:ring-slate-800 bg-gray-50 dark:bg-slate-900 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                                    {avatar ? (
                                        <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                                    ) : (
                                        <Feather.User className="w-12 h-12 text-gray-300" />
                                    )}
                                </div>
                                <label className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg cursor-pointer hover:bg-primary-hover transition-colors border-2 border-white dark:border-slate-800">
                                    <Feather.Camera className="w-4 h-4" />
                                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                                </label>
                            </div>
                            <div className="space-y-1 mb-6">
                                <h5 className="text-xl font-bold text-gray-800 dark:text-white">
                                    {form.firstName || form.lastName ? `${form.firstName} ${form.lastName}`.trim() : 'New Account'}
                                </h5>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{form.role || 'Assign Role'}</p>
                            </div>
                            <div className="flex flex-col gap-3 pt-6 border-t border-gray-50 dark:border-slate-800 text-left">
                                <QuickInfo icon={Feather.Mail} value={form.email || 'Email missing'} />
                                <QuickInfo icon={Feather.Phone} value={form.phone || 'Phone missing'} />
                                <QuickInfo icon={Feather.MapPin} value={form.city ? `${form.city}, ${form.country}` : 'Location missing'} />
                            </div>
                        </CardBody>
                        <div className="px-6 py-4 bg-gray-50/50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-700 space-y-2">
                             <Button className="w-full h-11 shadow-lg shadow-primary/20" onClick={handleSubmit} disabled={submitting}>
                                {submitting ? <><Feather.Loader className="w-4 h-4 animate-spin mr-2" /> Saving...</> : <><Feather.Save className="w-4 h-4 mr-2" /> Create User</>}
                             </Button>
                             <Link to="/custom-list" className="block w-full">
                                <Button variant="ghost" className="w-full h-11 text-gray-500">Cancel</Button>
                             </Link>
                        </div>
                    </Card>
                </div>

                {/* Form Panels */}
                <div className="xl:col-span-9">
                    <Card className="border-0 shadow-sm overflow-hidden">
                        <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
                            <TabList className="bg-gray-50/50 dark:bg-slate-800/50 p-2 gap-2">
                                <Tab value="basic" icon={Feather.User}>Basic Info</Tab>
                                <Tab value="contact" icon={Feather.MapPin}>Location</Tab>
                                <Tab value="social" icon={Feather.Globe}>Social & Bio</Tab>
                                <Tab value="settings" icon={Feather.Settings}>Settings</Tab>
                            </TabList>
                            <CardBody className="p-8">
                                <TabPanel value="basic" className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <FormLabel required>First Name</FormLabel>
                                            <Input name="firstName" value={form.firstName} onChange={handleChange} placeholder="e.g. John" className={cn("h-11", errors.firstName && "border-danger focus:ring-danger/10")} />
                                            {errors.firstName && <p className="text-[10px] font-bold text-danger uppercase tracking-wider">{errors.firstName}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <FormLabel required>Last Name</FormLabel>
                                            <Input name="lastName" value={form.lastName} onChange={handleChange} placeholder="e.g. Doe" className={cn("h-11", errors.lastName && "border-danger focus:ring-danger/10")} />
                                            {errors.lastName && <p className="text-[10px] font-bold text-danger uppercase tracking-wider">{errors.lastName}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <FormLabel required>Email Address</FormLabel>
                                            <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" icon={Feather.Mail} className={cn("h-11", errors.email && "border-danger focus:ring-danger/10")} />
                                            {errors.email && <p className="text-[10px] font-bold text-danger uppercase tracking-wider">{errors.email}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <FormLabel>Phone Number</FormLabel>
                                            <Input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" icon={Feather.Phone} className="h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <FormLabel required>Role Assignment</FormLabel>
                                            <Select name="role" value={form.role} onChange={handleChange} className={cn("h-11", errors.role && "border-danger focus:ring-danger/10")}>
                                                <option value="">Select a role...</option>
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
                                            <Input name="address" value={form.address} onChange={handleChange} placeholder="123 Main Street, Suite 500" className="h-11" />
                                        </div>
                                        <div className="md:col-span-4 space-y-2">
                                            <FormLabel>City</FormLabel>
                                            <Input name="city" value={form.city} onChange={handleChange} placeholder="New York" className="h-11" />
                                        </div>
                                        <div className="md:col-span-5 space-y-2">
                                            <FormLabel>Country</FormLabel>
                                            <Select name="country" value={form.country} onChange={handleChange} className="h-11">
                                                <option value="">Select country...</option>
                                                {['India', 'United States', 'United Kingdom', 'Australia', 'Canada', 'UAE'].map(c => <option key={c}>{c}</option>)}
                                            </Select>
                                        </div>
                                        <div className="md:col-span-3 space-y-2">
                                            <FormLabel>ZIP Code</FormLabel>
                                            <Input name="zipCode" value={form.zipCode} onChange={handleChange} placeholder="10001" className="h-11" />
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
                                            <FormLabel>Professional Bio</FormLabel>
                                            <Textarea name="bio" value={form.bio} onChange={handleChange} rows="5" placeholder="Tell us about the user..." className="resize-none" />
                                            <div className="flex justify-end"><span className="text-[10px] font-black text-gray-300">{form.bio.length}/500</span></div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <FormLabel>Personal Website</FormLabel>
                                                <Input name="website" value={form.website} onChange={handleChange} icon={Feather.Globe} placeholder="https://example.com" className="h-11" />
                                            </div>
                                            <div className="space-y-2">
                                                <FormLabel>Twitter Handle</FormLabel>
                                                <Input name="twitter" value={form.twitter} onChange={handleChange} icon={Feather.Twitter} placeholder="@username" className="h-11" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4">
                                        <Button variant="ghost" onClick={() => setActiveTab('contact')} icon={Feather.ChevronLeft}>Back</Button>
                                        <Button onClick={() => setActiveTab('settings')} icon={Feather.ChevronRight} iconPlacement="right">Last Step</Button>
                                    </div>
                                </TabPanel>

                                <TabPanel value="settings" className="space-y-8">
                                    <div className="space-y-4">
                                        <SettingToggle 
                                            label="Email Notifications" 
                                            description="Receive critical alerts and system updates via email." 
                                            icon={Feather.Bell}
                                            checked={form.notifications}
                                            onChange={(c) => setForm(p => ({...p, notifications: c}))}
                                        />
                                        <SettingToggle 
                                            label="Two-Factor Security" 
                                            description="Enhanced security requiring a second verification step." 
                                            icon={Feather.Shield}
                                            checked={form.twoFactor}
                                            onChange={(c) => setForm(p => ({...p, twoFactor: c}))}
                                        />
                                        <SettingToggle 
                                            label="Newsletter" 
                                            description="Stay updated with our weekly product highlights." 
                                            icon={Feather.Mail}
                                            checked={form.newsletter}
                                            onChange={(c) => setForm(p => ({...p, newsletter: c}))}
                                        />
                                    </div>
                                    <div className="flex justify-between pt-6 border-t border-gray-50 dark:border-slate-800">
                                        <Button variant="ghost" onClick={() => setActiveTab('social')} icon={Feather.ChevronLeft}>Back</Button>
                                        <Button variant="success" onClick={handleSubmit} disabled={submitting} shadow="success">
                                            {submitting ? <Feather.Loader className="w-4 h-4 animate-spin mr-2" /> : <Feather.Check className="w-4 h-4 mr-2" />}
                                            Finalize & Create
                                        </Button>
                                    </div>
                                </TabPanel>
                            </CardBody>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
};

const QuickInfo = ({ icon: Icon, value }) => (
    <div className="flex items-center gap-3 text-xs font-medium text-gray-500 group">
        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
            <Icon className="w-4 h-4" />
        </div>
        <span className="truncate flex-1">{value}</span>
    </div>
);

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

export default CustomCreate;
