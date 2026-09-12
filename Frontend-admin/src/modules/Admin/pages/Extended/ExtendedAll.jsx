import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Button, 
  Badge,
  Alert,
  Avatar
} from '../../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../../lib/utils';

// Extended Lightbox
export const ExtendedLightbox = () => (
    <div className="space-y-6">
        <PageTitle 
            title="Lightbox" 
            breadcrumbs={[
                { label: 'Extended', path: '#' },
                { label: 'Lightbox', active: true },
            ]} 
        />
        <Card className="border-0 shadow-sm">
            <CardHeader>
                <CardTitle>Image Gallery</CardTitle>
                <p className="text-xs text-gray-500 font-medium">Interactive image gallery with premium hover effects and lightbox integration.</p>
            </CardHeader>
            <CardBody>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Feather.Image className="w-10 h-10 text-gray-300 dark:text-slate-600 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                    <Feather.Maximize2 className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    </div>
);

// Extended Range Slider
export const ExtendedRangeSlider = () => (
    <div className="space-y-6">
        <PageTitle 
            title="Range Slider" 
            breadcrumbs={[
                { label: 'Extended', path: '#' },
                { label: 'Range Slider', active: true },
            ]} 
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
                <CardHeader><CardTitle>Default Sliders</CardTitle></CardHeader>
                <CardBody className="space-y-8">
                    <RangeItem label="Basic Usage" defaultValue={30} />
                    <RangeItem label="Success Variant" defaultValue={60} variant="success" />
                    <RangeItem label="Disabled State" defaultValue={45} disabled />
                </CardBody>
            </Card>
            <Card className="border-0 shadow-sm">
                <CardHeader><CardTitle>Rich Controls</CardTitle></CardHeader>
                <CardBody className="space-y-8">
                    <RangeItem label="Primary Intensity" defaultValue={80} variant="primary" />
                    <RangeItem label="Danger Zone" defaultValue={20} variant="danger" />
                    <RangeItem label="Warning Threshold" defaultValue={50} variant="warning" />
                </CardBody>
            </Card>
        </div>
    </div>
);

const RangeItem = ({ label, defaultValue, variant = 'primary', disabled }) => {
    const variants = {
        primary: 'accent-primary',
        success: 'accent-success',
        warning: 'accent-warning',
        danger: 'accent-danger',
    };

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</label>
                <Badge variant={variant} size="sm">{defaultValue}%</Badge>
            </div>
            <input 
                type="range" 
                className={cn("w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer", variants[variant])} 
                defaultValue={defaultValue}
                disabled={disabled}
            />
        </div>
    );
};

// Extended Sweet Alert
export const ExtendedSweetAlert = () => (
    <div className="space-y-6">
        <PageTitle 
            title="Modern Alerts" 
            breadcrumbs={[
                { label: 'Extended', path: '#' },
                { label: 'SweetAlert 2', active: true },
            ]} 
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
                <CardHeader><CardTitle>Basic Dialogs</CardTitle></CardHeader>
                <CardBody className="flex flex-wrap gap-4">
                    <Button onClick={() => alert('Basic Message')} shadow="primary">Basic Alert</Button>
                    <Button variant="success" onClick={() => alert('Success!')} shadow="success">Success</Button>
                    <Button variant="danger" onClick={() => alert('Error!')} shadow="danger">Danger</Button>
                    <Button variant="warning" onClick={() => confirm('Confirm action?')} shadow="warning">Confirm</Button>
                </CardBody>
            </Card>
            <Card className="border-0 shadow-sm">
                <CardHeader><CardTitle>Interaction Patterns</CardTitle></CardHeader>
                <CardBody className="flex flex-wrap gap-4">
                    <Button variant="info" icon={Feather.Clock} shadow="info">Auto Close</Button>
                    <Button variant="soft" icon={Feather.Edit3}>Input Box</Button>
                </CardBody>
            </Card>
        </div>
    </div>
);

// Extended Rating
export const ExtendedRating = () => {
    const [rating, setRating] = useState(3);
    const [hover, setHover] = useState(0);

    return (
        <div className="space-y-6">
            <PageTitle 
                title="Interactive Rating" 
                breadcrumbs={[
                    { label: 'Extended', path: '#' },
                    { label: 'Rating', active: true },
                ]} 
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle>User Feedback</CardTitle></CardHeader>
                    <CardBody className="space-y-6">
                        <div className="flex items-center gap-2">
                            {[1,2,3,4,5].map(star => (
                                <button 
                                    key={star} 
                                    className="p-1 transition-transform active:scale-90"
                                    onMouseEnter={() => setHover(star)} 
                                    onMouseLeave={() => setHover(0)} 
                                    onClick={() => setRating(star)}
                                >
                                    <Feather.Star className={cn(
                                        "w-8 h-8 transition-colors duration-200",
                                        (hover || rating) >= star ? "fill-warning text-warning" : "text-gray-200 dark:text-slate-700"
                                    )} />
                                </button>
                            ))}
                            <span className="ml-4 text-xl font-black text-gray-800 dark:text-white">{rating} / 5</span>
                        </div>
                        <p className="text-sm font-medium text-gray-500">How would you rate your experience with the new dashboard?</p>
                    </CardBody>
                </Card>

                <Card className="border-0 shadow-sm">
                    <CardHeader><CardTitle>Read-only Display</CardTitle></CardHeader>
                    <CardBody className="space-y-4">
                        {[5,4,3,2].map(r => (
                            <div key={r} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-900/50">
                                <div className="flex gap-1">
                                    {[1,2,3,4,5].map(s => (
                                        <Feather.Star key={s} className={cn("w-4 h-4", r >= s ? "fill-warning text-warning" : "text-gray-200 dark:text-slate-800")} />
                                    ))}
                                </div>
                                <Badge variant="soft-primary" pill>{r}.0</Badge>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

// Extended Notifications
export const ExtendedNotifications = () => (
    <div className="space-y-6">
        <PageTitle 
            title="Notifications" 
            breadcrumbs={[
                { label: 'Extended', path: '#' },
                { label: 'Notifications', active: true },
            ]} 
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
                <CardHeader>
                    <CardTitle>In-App Alerts</CardTitle>
                    <p className="text-xs text-gray-500 font-medium">Standardized system notifications with high-contrast variants.</p>
                </CardHeader>
                <CardBody className="space-y-4">
                    <Alert variant="success" icon={<Feather.CheckCircle className="w-4 h-4" />}>
                        Operation completed successfully!
                    </Alert>
                    <Alert variant="info" icon={<Feather.Info className="w-4 h-4" />}>
                        New system updates are available for review.
                    </Alert>
                    <Alert variant="warning" icon={<Feather.AlertTriangle className="w-4 h-4" />}>
                        Warning: Disk space is reaching maximum capacity.
                    </Alert>
                    <Alert variant="danger" icon={<Feather.XCircle className="w-4 h-4" />}>
                        Error: Failed to synchronize with the server.
                    </Alert>
                </CardBody>
            </Card>

            <Card className="border-0 shadow-sm bg-primary/5 dark:bg-primary/10 border-none">
                <CardBody className="flex flex-col items-center justify-center text-center p-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                        <Feather.Bell className="w-8 h-8" />
                    </div>
                    <h5 className="text-xl font-bold text-gray-800 dark:text-white">Push Notifications</h5>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto font-medium">Enable real-time desktop notifications to stay updated on critical system events.</p>
                    <Button className="px-8 shadow-lg shadow-primary/20">Enable Now</Button>
                </CardBody>
            </Card>
        </div>
    </div>
);

// Extended Session Timeout
export const ExtendedSessionTimeout = () => (
    <div className="space-y-6">
        <PageTitle 
            title="Security" 
            breadcrumbs={[
                { label: 'Extended', path: '#' },
                { label: 'Session Timeout', active: true },
            ]} 
        />
        <Card className="border-0 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
                <Feather.Shield className="w-32 h-32" />
            </div>
            <CardBody className="p-8 sm:p-12 max-w-2xl">
                <div className="flex items-center gap-3 text-warning mb-4">
                    <Feather.Clock className="w-6 h-6" />
                    <span className="text-sm font-black uppercase tracking-widest">Session Management</span>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-6">Automated Session Control</h2>
                <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-8 font-medium">
                    Our security protocol monitors user activity in real-time. If no interactions are detected within the defined threshold, a secure logout sequence is initiated to protect sensitive data.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Button variant="warning" className="px-8 shadow-lg shadow-warning/20">Test Security Sequence</Button>
                    <Button variant="ghost">Configure Threshold</Button>
                </div>
            </CardBody>
        </Card>
    </div>
);
