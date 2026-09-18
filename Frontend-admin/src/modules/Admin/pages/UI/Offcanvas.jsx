import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Button, 
  Offcanvas as Drawer 
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const Offcanvas = () => {
    const [activeDrawer, setActiveDrawer] = useState(null);

    const open = (id) => setActiveDrawer(id);
    const close = () => setActiveDrawer(null);

    return (
        <div className="space-y-6">
            <PageTitle 
                title="Offcanvas / Drawers" 
                breadcrumbs={[
                    { label: 'Components', path: '#' },
                    { label: 'Offcanvas', active: true },
                ]} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Standard Demo */}
                <Card className="border-0 shadow-sm">
                    <CardHeader>
                        <CardTitle>Core Implementation</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Standard side-drawers for secondary navigation or settings panels.</p>
                    </CardHeader>
                    <CardBody className="flex flex-wrap gap-4">
                        <Button onClick={() => open('left')}>Open Left Drawer</Button>
                        <Button variant="soft" onClick={() => open('right')}>Open Right Drawer</Button>
                    </CardBody>
                </Card>

                {/* Placements */}
                <Card className="border-0 shadow-sm">
                    <CardHeader>
                        <CardTitle>Multi-directional Placement</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Trigger panels from any edge of the viewport.</p>
                    </CardHeader>
                    <CardBody className="flex flex-wrap gap-4">
                        <Button variant="outline" icon={Feather.ArrowUp} onClick={() => open('top')}>Top</Button>
                        <Button variant="outline" icon={Feather.ArrowDown} onClick={() => open('bottom')}>Bottom</Button>
                    </CardBody>
                </Card>

                {/* Behavioral Variants */}
                <Card className="border-0 shadow-sm lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Advanced Behaviors</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Customizing interaction patterns such as scrolling and backdrops.</p>
                    </CardHeader>
                    <CardBody className="flex flex-wrap gap-4">
                        <Button variant="soft-primary" onClick={() => open('scroll')}>No Backdrop + Scroll</Button>
                        <Button variant="soft-success" onClick={() => open('both')}>Backdrop + Scroll</Button>
                    </CardBody>
                </Card>
            </div>

            {/* --- Drawers --- */}
            
            <Drawer 
                isOpen={activeDrawer === 'left'} 
                onClose={close} 
                placement="left" 
                title="Navigation Panel"
            >
                <div className="space-y-4">
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        This is a standard left-aligned drawer, ideal for mobile navigation or side-bar extensions.
                    </p>
                    <div className="space-y-2">
                        <Button variant="soft" className="w-full justify-start" icon={Feather.Home}>Dashboard</Button>
                        <Button variant="soft" className="w-full justify-start" icon={Feather.User}>Profile</Button>
                        <Button variant="soft" className="w-full justify-start" icon={Feather.Settings}>Settings</Button>
                    </div>
                </div>
            </Drawer>

            <Drawer 
                isOpen={activeDrawer === 'right'} 
                onClose={close} 
                placement="right" 
                title="Quick Settings"
            >
                <p className="text-sm text-gray-500 font-medium">Configure your dashboard preferences in real-time.</p>
            </Drawer>

            <Drawer 
                isOpen={activeDrawer === 'top'} 
                onClose={close} 
                placement="top" 
                title="System Announcement"
                height="h-64"
            >
                <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <Feather.Bell />
                    </div>
                    <h6 className="font-bold">Scheduled Maintenance</h6>
                    <p className="text-xs text-gray-500 max-w-sm">The system will be offline for 2 hours starting at midnight for core updates.</p>
                </div>
            </Drawer>

            <Drawer 
                isOpen={activeDrawer === 'bottom'} 
                onClose={close} 
                placement="bottom" 
                title="Media Controls"
                height="h-48"
            >
                <div className="flex items-center justify-center h-full gap-8">
                    <Button variant="ghost" size="icon"><Feather.SkipBack /></Button>
                    <Button variant="primary" size="icon" className="w-12 h-12 rounded-full shadow-lg"><Feather.Play /></Button>
                    <Button variant="ghost" size="icon"><Feather.SkipForward /></Button>
                </div>
            </Drawer>

            <Drawer 
                isOpen={activeDrawer === 'scroll'} 
                onClose={close} 
                title="Persistent Sidebar"
                backdrop={false}
                scroll={true}
            >
                <p className="text-sm text-gray-500 font-medium">The backdrop is disabled and you can still scroll the underlying page while this is open.</p>
            </Drawer>

            <Drawer 
                isOpen={activeDrawer === 'both'} 
                onClose={close} 
                title="Hybrid Interaction"
                scroll={true}
            >
                <p className="text-sm text-gray-500 font-medium">A rare combination: background scrolling enabled while a modal backdrop is visible.</p>
            </Drawer>
        </div>
    );
};

export default Offcanvas;
