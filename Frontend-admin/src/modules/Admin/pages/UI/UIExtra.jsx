import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Button, 
  Badge,
  Avatar
} from '../../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const UIToasts = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (type) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, type, title: type.charAt(0).toUpperCase() + type.slice(1) }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    return (
        <div className="space-y-6">
            <PageTitle 
                title="Toasts" 
                breadcrumbs={[
                    { label: 'UI Elements', path: '#' },
                    { label: 'Toasts', active: true },
                ]} 
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm">
                    <CardHeader>
                        <CardTitle>Interactive Toasts</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Click buttons to trigger floating notification toasts with smooth entry animations.</p>
                    </CardHeader>
                    <CardBody className="flex flex-wrap gap-3">
                        <Button variant="primary" size="sm" onClick={() => addToast('primary')}>Show Primary</Button>
                        <Button variant="success" size="sm" onClick={() => addToast('success')}>Show Success</Button>
                        <Button variant="danger" size="sm" onClick={() => addToast('danger')}>Show Danger</Button>
                        <Button variant="warning" size="sm" onClick={() => addToast('warning')}>Show Warning</Button>
                        <Button variant="info" size="sm" onClick={() => addToast('info')}>Show Info</Button>
                    </CardBody>
                </Card>

                <Card className="border-0 shadow-sm">
                    <CardHeader>
                        <CardTitle>Rich Toast Preview</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Static preview of the toast visual architecture.</p>
                    </CardHeader>
                    <CardBody className="p-12 bg-gray-50 dark:bg-slate-900/50 rounded-2xl flex items-center justify-center">
                        <div className="w-full max-w-sm bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                            <div className="px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Avatar name="M" size="xs" className="bg-primary text-[10px]" />
                                    <span className="text-xs font-black text-gray-700 dark:text-slate-300">Minia Admin</span>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400">JUST NOW</span>
                            </div>
                            <div className="p-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hello, world! This is a premium toast message powered by Tailwind CSS.</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Toast Container */}
            <div className="fixed top-20 right-6 z-[9999] space-y-3 w-72 pointer-events-none">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className={cn(
                                "p-4 rounded-xl shadow-2xl border flex items-center justify-between pointer-events-auto",
                                toast.type === 'primary' ? "bg-primary border-primary text-white" :
                                toast.type === 'success' ? "bg-success border-success text-white" :
                                toast.type === 'danger' ? "bg-danger border-danger text-white" :
                                toast.type === 'warning' ? "bg-warning border-warning text-white" :
                                "bg-info border-info text-white"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Feather.Bell className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-black">{toast.title}</p>
                                    <p className="text-xs opacity-90 truncate">System notification triggered.</p>
                                </div>
                            </div>
                            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="opacity-60 hover:opacity-100">
                                <Feather.X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export const UIVideo = () => (
    <div className="space-y-6">
        <PageTitle 
            title="Video Embeds" 
            breadcrumbs={[
                { label: 'UI Elements', path: '#' },
                { label: 'Video', active: true },
            ]} 
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader><CardTitle>Widescreen (16:9)</CardTitle></CardHeader>
                <CardBody className="p-0">
                    <div className="aspect-video w-full">
                        <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/1y_kfWUCFDQ" 
                            title="YouTube video" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </CardBody>
            </Card>
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader><CardTitle>Standard (4:3)</CardTitle></CardHeader>
                <CardBody className="p-0">
                    <div className="aspect-[4/3] w-full">
                        <iframe 
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/1y_kfWUCFDQ" 
                            title="YouTube video" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </CardBody>
            </Card>
        </div>
    </div>
);

export const UIUtilities = () => (
    <div className="space-y-6">
        <PageTitle 
            title="Utility Sandbox" 
            breadcrumbs={[
                { label: 'UI Elements', path: '#' },
                { label: 'Utilities', active: true },
            ]} 
        />
        <div className="grid grid-cols-1 gap-6">
            <Card className="border-0 shadow-sm">
                <CardHeader><CardTitle>Color Tokens</CardTitle></CardHeader>
                <CardBody className="space-y-8">
                    <div>
                        <h6 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Backgrounds</h6>
                        <div className="flex flex-wrap gap-3">
                            {['primary','success','danger','warning','info','dark'].map(c => (
                                <div key={c} className={cn("px-4 py-2 rounded-lg text-white text-xs font-black uppercase tracking-widest", `bg-${c}`)}>{c}</div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h6 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Text Contrast</h6>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {['primary','success','danger','warning','info'].map(c => (
                                <p key={c} className={cn("text-sm font-bold", `text-${c}`)}>The quick brown fox jumps over the lazy dog.</p>
                            ))}
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card className="border-0 shadow-sm">
                <CardHeader><CardTitle>Spacing Scale</CardTitle></CardHeader>
                <CardBody className="space-y-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl font-bold text-xs">P-3: Compact Spacing (1rem)</div>
                    <div className="p-6 bg-success/10 text-success rounded-xl font-bold text-xs">P-6: Standard Spacing (1.5rem)</div>
                    <div className="p-10 bg-info/10 text-info rounded-xl font-bold text-xs">P-10: Expanded Spacing (2.5rem)</div>
                </CardBody>
            </Card>
        </div>
    </div>
);
