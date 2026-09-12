import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  ProgressBar,
  Button
} from '../../../../components/ui';

const ProgressBars = () => {
  const [dynamicValue, setDynamicValue] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicValue(prev => (prev >= 100 ? 0 : prev + 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Progress Bars" 
        breadcrumbs={[
          { label: 'Components', path: '#' },
          { label: 'Progress Bars', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Default Progress */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Default Examples</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Standard progress bars with various color variants.</p>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="space-y-2">
               <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                  <span>Primary</span>
                  <span>25%</span>
               </div>
               <ProgressBar value={25} variant="primary" />
            </div>
            <div className="space-y-2">
               <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                  <span>Success</span>
                  <span>50%</span>
               </div>
               <ProgressBar value={50} variant="success" />
            </div>
            <div className="space-y-2">
               <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                  <span>Info</span>
                  <span>75%</span>
               </div>
               <ProgressBar value={75} variant="info" />
            </div>
            <div className="space-y-2">
               <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                  <span>Danger</span>
                  <span>100%</span>
               </div>
               <ProgressBar value={100} variant="danger" />
            </div>
          </CardBody>
        </Card>

        {/* Sizes & Labels */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Sizes & Labels</CardTitle>
            <p className="text-xs text-gray-500 font-medium">From slim indicators to large bars with embedded labels.</p>
          </CardHeader>
          <CardBody className="space-y-8">
            <div className="space-y-1">
               <p className="text-xs font-medium text-gray-500 mb-2">Extra Small (h-1)</p>
               <ProgressBar value={40} size="xs" variant="primary" />
            </div>
            <div className="space-y-1">
               <p className="text-xs font-medium text-gray-500 mb-2">Small (h-1.5)</p>
               <ProgressBar value={60} size="sm" variant="success" />
            </div>
            <div className="space-y-1">
               <p className="text-xs font-medium text-gray-500 mb-2">Medium with Label (h-2.5)</p>
               <ProgressBar value={80} size="md" variant="info" showLabel />
            </div>
            <div className="space-y-1">
               <p className="text-xs font-medium text-gray-500 mb-2">Large with Label (h-4)</p>
               <ProgressBar value={70} size="lg" variant="warning" showLabel />
            </div>
            <div className="space-y-1">
               <p className="text-xs font-medium text-gray-500 mb-2">Extra Large (h-6)</p>
               <ProgressBar value={95} size="xl" variant="danger" showLabel />
            </div>
          </CardBody>
        </Card>

        {/* Striped & Animated */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Striped & Animated</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Add visual texture and motion to indicate active processes.</p>
          </CardHeader>
          <CardBody className="space-y-6">
            <ProgressBar value={40} variant="primary" striped />
            <ProgressBar value={60} variant="success" striped animated />
            <ProgressBar value={80} variant="info" striped animated />
            <ProgressBar value={dynamicValue} variant="warning" striped animated showLabel />
            <div className="flex justify-center">
               <Button variant="soft" size="sm" onClick={() => setDynamicValue(0)}>Reset Dynamic Bar</Button>
            </div>
          </CardBody>
        </Card>

        {/* Multiple Progress Bars */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Stacked Progress</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Multiple progress indicators in a single container.</p>
          </CardHeader>
          <CardBody>
            <div className="w-full h-4 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden flex">
               <div className="h-full bg-primary" style={{ width: '15%' }}></div>
               <div className="h-full bg-success" style={{ width: '30%' }}></div>
               <div className="h-full bg-info" style={{ width: '20%' }}></div>
               <div className="h-full bg-warning" style={{ width: '10%' }}></div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
               <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-primary"></div> Plan
               </div>
               <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-success"></div> Build
               </div>
               <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-info"></div> Test
               </div>
               <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-warning"></div> Release
               </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProgressBars;
