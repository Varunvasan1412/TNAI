import React from 'react';
import { Link } from 'react-router-dom';
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

// Pages Starter
export const PagesStarter = () => (
    <div className="space-y-6">
        <PageTitle 
            title="Starter Page" 
            breadcrumbs={[
                { label: 'Pages', path: '#' },
                { label: 'Starter Page', active: true },
            ]} 
        />
        <Card className="border-0 shadow-sm min-h-[400px] flex items-center justify-center">
            <div className="text-center space-y-6 max-w-sm p-6">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-lg shadow-primary/10">
                    <Feather.Zap className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-gray-800 dark:text-white">Start your coding!</h2>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                        Kickstart your next project with our modern atomic design system. Everything is set up and ready for your custom logic.
                    </p>
                </div>
                <Button className="px-8 shadow-lg shadow-primary/20">Create First Feature</Button>
            </div>
        </Card>
    </div>
);

// Pages Timeline
export const PagesTimeline = () => (
    <div className="space-y-6">
        <PageTitle 
            title="Timeline" 
            breadcrumbs={[
                { label: 'Pages', path: '#' },
                { label: 'Timeline', active: true },
            ]} 
        />
        <div className="max-w-4xl mx-auto py-10 relative">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-slate-800 -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-12">
                <TimelineItem 
                    date="March 2024" 
                    title="Project Milestone Achieved" 
                    desc="Successfully migrated all core modules to the new Tailwind architecture with 100% test coverage." 
                    icon={Feather.CheckCircle}
                    color="success"
                    align="right"
                />
                <TimelineItem 
                    date="February 2024" 
                    title="Design System Launch" 
                    desc="Released the first version of our atomic UI library, enabling rapid prototyping across teams." 
                    icon={Feather.Zap}
                    color="primary"
                    align="left"
                />
                <TimelineItem 
                    date="January 2024" 
                    title="Strategic Planning" 
                    desc="Defined the long-term roadmap for the executive dashboard and real-time visualization services." 
                    icon={Feather.Shield}
                    color="info"
                    align="right"
                />
            </div>
        </div>
    </div>
);

const TimelineItem = ({ date, title, desc, icon: Icon, color, align }) => (
    <div className={cn(
        "relative flex flex-col md:flex-row items-center gap-8",
        align === 'right' ? "md:flex-row-reverse" : ""
    )}>
        {/* Connector Circle */}
        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-slate-900 bg-gray-200 dark:bg-slate-800 z-10 hidden md:block"></div>
        
        <div className="flex-1 w-full">
            <Card className={cn(
                "border-0 shadow-sm hover:shadow-md transition-shadow",
                align === 'right' ? "text-left" : "md:text-right text-left"
            )}>
                <CardBody className="p-6 space-y-3">
                    <div className={cn(
                        "flex items-center gap-3 mb-2",
                        align === 'right' ? "justify-start" : "md:justify-end justify-start"
                    )}>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{date}</span>
                        <Badge variant={`soft-${color}`} size="sm" pill><Icon className="w-3 h-3" /></Badge>
                    </div>
                    <h5 className="text-base font-bold text-gray-800 dark:text-white">{title}</h5>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{desc}</p>
                </CardBody>
            </Card>
        </div>
        <div className="flex-1 hidden md:block"></div>
    </div>
);

// Pages FAQs 
export const PagesFAQs = () => (
    <div className="space-y-6">
        <PageTitle 
            title="FAQs" 
            breadcrumbs={[
                { label: 'Pages', path: '#' },
                { label: 'FAQs', active: true },
            ]} 
        />
        <div className="max-w-3xl mx-auto space-y-8 py-6">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white">Frequently Asked Questions</h2>
                <p className="text-gray-500 font-medium">Everything you need to know about the Minia Dashboard system.</p>
            </div>
            
            <div className="space-y-4">
                {[
                    { q: 'What is Minia Dashboard?', a: 'Minia is a professional, high-performance React admin template built on top of Tailwind CSS and Framer Motion, designed for complex executive dashboards.' },
                    { q: 'How do I customize the theme?', a: 'The theme is fully controlled via Tailwind configuration. You can easily adjust primary colors, spacing scales, and dark mode variants in a single file.' },
                    { q: 'Is it production ready?', a: 'Yes, all components are optimized for performance, accessibility, and high-density information display, meeting the standards of legal-tech environments.' },
                    { q: 'Do you provide support?', a: 'We offer comprehensive documentation and dedicated support for enterprise integrations.' },
                ].map((faq, idx) => (
                    <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-all group cursor-pointer">
                        <CardBody className="p-6">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <span className="font-black">?</span>
                                </div>
                                <div className="space-y-2">
                                    <h5 className="text-base font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors">{faq.q}</h5>
                                    <p className="text-sm text-gray-500 leading-relaxed font-medium">{faq.a}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    </div>
);

// Pages Pricing
export const PagesPricing = () => (
    <div className="space-y-6">
        <PageTitle 
            title="Pricing Plans" 
            breadcrumbs={[
                { label: 'Pages', path: '#' },
                { label: 'Pricing', active: true },
            ]} 
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
            <PricingCard 
                plan="Starter" 
                price="0" 
                color="primary" 
                icon={Feather.Zap}
                features={['5 Projects', '100 Tasks', '1 GB Storage', 'Community Support']} 
            />
            <PricingCard 
                plan="Professional" 
                price="19" 
                color="success" 
                icon={Feather.Target}
                popular
                features={['25 Projects', 'Unlimited Tasks', '10 GB Storage', 'Priority Email']} 
            />
            <PricingCard 
                plan="Enterprise" 
                price="49" 
                color="info" 
                icon={Feather.Shield}
                features={['Unlimited Everything', '24/7 Dedicated Support', '100 GB Storage', 'API Access']} 
            />
        </div>
    </div>
);

const PricingCard = ({ plan, price, color, features, popular, icon: Icon }) => (
    <Card className={cn(
        "border-0 transition-all duration-300 relative overflow-hidden",
        popular ? "shadow-2xl scale-105 z-10 border-2 border-primary/20" : "shadow-sm hover:shadow-xl"
    )}>
        {popular && (
            <div className="absolute top-0 right-0 p-4">
                <Badge variant="primary" className="shadow-lg shadow-primary/20 uppercase tracking-widest font-black text-[9px]">Most Popular</Badge>
            </div>
        )}
        <CardBody className="p-8 space-y-8">
            <div className="text-center space-y-4">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-2 bg-gray-50 dark:bg-slate-800 text-gray-400 group-hover:text-primary transition-colors", popular && "text-primary bg-primary/10")}>
                    <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-gray-800 dark:text-white uppercase tracking-widest">{plan}</h3>
                <div className="flex items-baseline justify-center gap-1">
                    <span className="text-2xl font-bold text-gray-400">$</span>
                    <span className="text-5xl font-black text-gray-800 dark:text-white tracking-tighter">{price}</span>
                    <span className="text-sm font-bold text-gray-400">/mo</span>
                </div>
            </div>
            
            <ul className="space-y-4 pt-4 border-t border-gray-50 dark:border-slate-800">
                {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <Feather.Check className={cn("w-4 h-4", popular ? "text-primary" : "text-success")} />
                        {f}
                    </li>
                ))}
            </ul>

            <Button variant={popular ? 'primary' : 'outline'} className="w-full h-12 font-bold text-base shadow-lg shadow-primary/10">
                Choose {plan}
            </Button>
        </CardBody>
    </Card>
);

// Pages Maintenance
export const PagesMaintenance = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-6">
        <div className="text-center space-y-8 max-w-lg">
            <div className="relative inline-block">
               <img src="/assets/images/maintenance.png" alt="Maintenance" className="w-64 h-auto mx-auto opacity-80" />
               <div className="absolute top-0 right-0 animate-bounce">
                  <Badge variant="warning" className="p-3 rounded-full"><Feather.Tool className="w-6 h-6" /></Badge>
               </div>
            </div>
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">System is Under Maintenance</h1>
                <p className="text-base text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                    We're currently performing scheduled updates to improve your experience. We'll be back online shortly. Thank you for your patience.
                </p>
            </div>
            <div className="flex justify-center gap-4">
               <Button variant="outline" icon={Feather.Mail}>Get Notified</Button>
               <Button variant="primary" icon={Feather.ExternalLink}>Status Page</Button>
            </div>
        </div>
    </div>
);

// Pages Coming Soon
export const PagesComingSoon = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 p-6 overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center pointer-events-none">
            <h1 className="text-[20vw] font-black text-primary select-none">SOON</h1>
        </div>
        <div className="text-center space-y-10 max-w-2xl relative z-10">
            <div className="space-y-4">
                <Badge variant="soft-primary" className="px-4 py-2 text-xs uppercase tracking-[0.3em] font-black">Launching Soon</Badge>
                <h1 className="text-5xl sm:text-7xl font-extrabold text-gray-800 dark:text-white tracking-tighter leading-none">
                    Something Big is <span className="text-primary">Coming</span>
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-md mx-auto leading-relaxed">
                    We're building the future of administrative management. Join our waitlist to get early access.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-1 h-12 px-6 rounded-xl bg-white dark:bg-slate-800 border-none shadow-xl shadow-black/5 focus:ring-2 focus:ring-primary/20 text-sm font-medium outline-none transition-all"
                />
                <Button className="h-12 px-8 shadow-xl shadow-primary/20">Notify Me</Button>
            </div>

            <div className="flex justify-center gap-8 pt-8">
               <CountdownItem value="12" label="Days" />
               <CountdownItem value="08" label="Hours" />
               <CountdownItem value="45" label="Mins" />
            </div>
        </div>
    </div>
);

const CountdownItem = ({ value, label }) => (
    <div className="text-center space-y-1">
        <div className="text-3xl font-black text-gray-800 dark:text-white">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</div>
    </div>
);
