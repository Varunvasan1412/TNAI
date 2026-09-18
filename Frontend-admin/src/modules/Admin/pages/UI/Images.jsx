import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Avatar, 
  Badge 
} from '../../../../components/ui';

const Images = () => {
    return (
        <div className="space-y-6">
            <PageTitle 
                title="Images & Avatars" 
                breadcrumbs={[
                    { label: 'Components', path: '#' },
                    { label: 'Images', active: true },
                ]} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Shapes */}
                <Card className="border-0 shadow-sm">
                    <CardHeader>
                        <CardTitle>Image Shapes</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Standard border-radius utilities for various image treatments.</p>
                    </CardHeader>
                    <CardBody>
                        <div className="flex flex-wrap items-end gap-6">
                            <div className="space-y-2">
                                <img className="rounded-2xl w-48 h-32 object-cover shadow-sm border border-gray-100 dark:border-slate-700" src="/assets/images/small/img-4.jpg" alt="Rounded" />
                                <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rounded 2XL</p>
                            </div>
                            <div className="space-y-2 text-center">
                                <img className="rounded-full w-32 h-32 object-cover shadow-md border-4 border-white dark:border-slate-800 ring-1 ring-gray-100 dark:ring-slate-700" src="/assets/images/users/avatar-4.jpg" alt="Circle" />
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Circle Avatar</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Thumbnails */}
                <Card className="border-0 shadow-sm">
                    <CardHeader>
                        <CardTitle>Thumbnails & Framing</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Premium image framing with subtle borders and shadows.</p>
                    </CardHeader>
                    <CardBody>
                        <div className="flex flex-wrap items-end gap-6">
                            <div className="space-y-2">
                                <img className="p-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg w-48 h-32 object-cover shadow-sm" src="/assets/images/small/img-3.jpg" alt="Thumbnail" />
                                <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Framed Thumb</p>
                            </div>
                            <div className="space-y-2 text-center">
                                <img className="p-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full w-32 h-32 object-cover shadow-sm" src="/assets/images/users/avatar-3.jpg" alt="Circle Thumb" />
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Circle Frame</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Avatar Sizes */}
                <Card className="border-0 shadow-sm lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Atomic Avatar Suite</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Standardized avatar sizes and status indicators for consistent user representation.</p>
                    </CardHeader>
                    <CardBody>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-6">
                                <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Square Rounded Variants</h6>
                                <div className="flex flex-wrap items-center gap-6">
                                    <Avatar src="/assets/images/users/avatar-1.jpg" name="XS" size="xs" />
                                    <Avatar src="/assets/images/users/avatar-2.jpg" name="SM" size="sm" />
                                    <Avatar src="/assets/images/users/avatar-4.jpg" name="MD" size="md" />
                                    <Avatar src="/assets/images/users/avatar-5.jpg" name="LG" size="lg" />
                                    <Avatar src="/assets/images/users/avatar-1.jpg" name="XL" size="xl" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status & Presence</h6>
                                <div className="flex flex-wrap items-center gap-6">
                                    <Avatar src="/assets/images/users/avatar-1.jpg" name="Online" size="md" status="online" />
                                    <Avatar src="/assets/images/users/avatar-2.jpg" name="Away" size="md" status="away" />
                                    <Avatar src="/assets/images/users/avatar-3.jpg" name="Busy" size="md" status="busy" />
                                    <Avatar initials="JD" name="Offline" size="md" status="offline" />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Media Objects (Modernized) */}
                <Card className="border-0 shadow-sm lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Media Patterns</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Modern flexbox-based media object patterns for comments, notifications, or profiles.</p>
                    </CardHeader>
                    <CardBody className="space-y-8">
                        <MediaObject 
                            avatar="/assets/images/users/avatar-3.jpg"
                            title="Conversational Thread"
                            description="Premium typography and spacing integration for multi-line content. This pattern is essential for dashboard activity feeds and communication modules."
                        />
                        <div className="h-px bg-gray-100 dark:bg-slate-700/50" />
                        <MediaObject 
                            avatar="/assets/images/users/avatar-5.jpg"
                            title="Interactive Item"
                            description="Easily align avatars top, center, or bottom using flexbox utilities while maintaining consistent padding and responsive behaviors."
                            center
                        />
                        <div className="h-px bg-gray-100 dark:bg-slate-700/50" />
                        <MediaObject 
                            avatar="/assets/images/users/avatar-1.jpg"
                            title="System Notification"
                            description="Supporting both image-based and initial-based avatars with status badges for high-density information displays."
                            bottom
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

const MediaObject = ({ avatar, title, description, center, bottom }) => (
    <div className={`flex gap-4 ${center ? 'items-center' : bottom ? 'items-end' : 'items-start'}`}>
        <Avatar src={avatar} size="md" className="shrink-0 shadow-sm" />
        <div className="space-y-1">
            <h5 className="text-sm font-bold text-gray-800 dark:text-white">{title}</h5>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">{description}</p>
        </div>
    </div>
);

export default Images;
