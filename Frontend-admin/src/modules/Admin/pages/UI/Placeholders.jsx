import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Skeleton,
  Button
} from '../../../../components/ui';

const Placeholders = () => {
    return (
        <div className="space-y-6">
            <PageTitle 
                title="Skeletons & Placeholders" 
                breadcrumbs={[
                    { label: 'Components', path: '#' },
                    { label: 'Placeholders', active: true },
                ]} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Default Examples */}
                <Card className="border-0 shadow-sm">
                    <CardHeader>
                        <CardTitle>Skeleton States</CardTitle>                                        
                        <p className="text-xs text-gray-500 font-medium">Recreating components with animated skeletons to improve perceived performance during data loading.</p>
                    </CardHeader>
                    <CardBody>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Real Card */}
                            <div className="space-y-4">
                                <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active State</h6>
                                <Card className="overflow-hidden border border-gray-100 dark:border-slate-700 shadow-none">
                                    <img src="/assets/images/small/img-1.jpg" className="w-full h-32 object-cover" alt="Real" />
                                    <div className="p-4 space-y-3">
                                        <h5 className="text-sm font-bold text-gray-800 dark:text-white">Professional Dashboard</h5>
                                        <p className="text-xs text-gray-500 leading-relaxed">High-performance React admin template with Tailwind CSS.</p>
                                        <Button size="sm" className="w-full">View Details</Button>
                                    </div>
                                </Card>
                            </div>

                            {/* Skeleton Card */}
                            <div className="space-y-4">
                                <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loading State</h6>
                                <Card className="overflow-hidden border border-gray-100 dark:border-slate-700 shadow-none">
                                    <Skeleton className="w-full h-32 rounded-none" />
                                    <div className="p-4 space-y-3">
                                        <Skeleton className="h-4 w-3/4" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-3 w-full" />
                                            <Skeleton className="h-3 w-5/6" />
                                        </div>
                                        <Skeleton className="h-8 w-full rounded-lg" />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </CardBody>
                </Card>
    
                {/* Widths & Sizes */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle>Dynamic Widths</CardTitle>
                            <p className="text-xs text-gray-500 font-medium">Use Tailwind's width utilities to control the horizontal span of loading indicators.</p>
                        </CardHeader>
                        <CardBody className="space-y-4">
                            <Skeleton className="h-3 w-1/2" />
                            <Skeleton className="h-3 w-3/4" />
                            <Skeleton className="h-3 w-full" />
                            <Skeleton className="h-3 w-1/4" />
                        </CardBody>
                    </Card>

                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle>Height Variations</CardTitle>
                            <p className="text-xs text-gray-500 font-medium">Adjust heights to match specific typographic styles or UI elements.</p>
                        </CardHeader>
                        <CardBody className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-2 w-full" />
                        </CardBody>
                    </Card>
                </div>

                {/* Presence & Shapes */}
                <Card className="border-0 shadow-sm">
                    <CardHeader>
                        <CardTitle>Complex UI Layouts</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Combining multiple skeleton shapes to simulate complex presence states like user lists.</p>
                    </CardHeader>
                    <CardBody className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-4">
                                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-3 w-1/3" />
                                    <Skeleton className="h-2 w-1/2 opacity-60" />
                                </div>
                            </div>
                        ))}
                    </CardBody>
                </Card>

                {/* Shimmer Styles */}
                <Card className="border-0 shadow-sm">
                    <CardHeader>
                        <CardTitle>Premium Shimmer</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Using CSS animations to create a more natural loading perception.</p>
                    </CardHeader>
                    <CardBody className="space-y-4">
                        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800/50 space-y-4">
                           <Skeleton className="h-24 w-full rounded-xl" />
                           <div className="flex gap-4">
                              <Skeleton className="h-10 w-1/2 rounded-lg" />
                              <Skeleton className="h-10 w-1/2 rounded-lg" />
                           </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Placeholders;
