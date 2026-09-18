import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Badge,
  Button
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const ChartPlaceholder = ({ title, type = 'line', library = 'ApexCharts' }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50/50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700 group hover:border-primary/30 transition-all">
    <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {type === 'line' && <Feather.TrendingUp className="w-10 h-10 text-primary" />}
      {type === 'bar' && <Feather.BarChart2 className="w-10 h-10 text-info" />}
      {type === 'pie' && <Feather.PieChart className="w-10 h-10 text-success" />}
      {type === 'activity' && <Feather.Activity className="w-10 h-10 text-warning" />}
    </div>
    <h5 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h5>
    <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto text-center">
      Ready to implement with <span className="font-bold text-primary">{library}</span>. 
      Professional data visualization with full interactivity and dark mode support.
    </p>
    <div className="mt-8 flex gap-3">
       <Button variant="soft-primary" size="sm" className="font-bold">
          Documentation
       </Button>
       <Button variant="ghost" size="sm" className="font-bold">
          View Demo
       </Button>
    </div>
  </div>
);

export const ChartsApex = () => (
  <div className="space-y-6">
    <PageTitle title="Apex Charts" breadcrumbs={[{ label: 'Charts', path: '#' }, { label: 'Apex Charts', active: true }]} />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="flex justify-between items-center">
             <CardTitle>Real-time Sales</CardTitle>
             <Badge variant="soft-success" size="sm">Live Feed</Badge>
          </CardHeader>
          <CardBody>
             <ChartPlaceholder title="Performance Analytics" type="line" />
          </CardBody>
       </Card>
       <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader className="flex justify-between items-center">
             <CardTitle>Revenue by Region</CardTitle>
             <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="w-2 h-2 rounded-full bg-info"></div>
                <div className="w-2 h-2 rounded-full bg-success"></div>
             </div>
          </CardHeader>
          <CardBody>
             <ChartPlaceholder title="Geographic Distribution" type="bar" />
          </CardBody>
       </Card>
    </div>
  </div>
);

export const ChartsEChart = () => (
  <div className="space-y-6">
    <PageTitle title="E-Charts" breadcrumbs={[{ label: 'Charts', path: '#' }, { label: 'E-Charts', active: true }]} />
    <Card className="border-0 shadow-sm">
      <CardHeader><CardTitle>Complex Visualizations</CardTitle></CardHeader>
      <CardBody>
        <ChartPlaceholder title="Interactive Radar Chart" type="activity" library="E-Charts" />
      </CardBody>
    </Card>
  </div>
);

export const ChartsChartjs = () => (
  <div className="space-y-6">
    <PageTitle title="Chart.js" breadcrumbs={[{ label: 'Charts', path: '#' }, { label: 'Chart.js', active: true }]} />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader><CardTitle>Market Share</CardTitle></CardHeader>
          <CardBody>
             <ChartPlaceholder title="Segmentation Pie" type="pie" library="Chart.js" />
          </CardBody>
       </Card>
       <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader><CardTitle>User Growth</CardTitle></CardHeader>
          <CardBody>
             <ChartPlaceholder title="Stack Bar Chart" type="bar" library="Chart.js" />
          </CardBody>
       </Card>
    </div>
  </div>
);

export const ChartsKnob = () => (
  <div className="space-y-6">
    <PageTitle title="Jquery Knob" breadcrumbs={[{ label: 'Charts', path: '#' }, { label: 'Knob', active: true }]} />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {[
          { label: 'Server Load', val: '75%', color: 'primary' },
          { label: 'Storage', val: '42%', color: 'success' },
          { label: 'Traffic', val: '91%', color: 'danger' }
       ].map(item => (
          <Card key={item.label} className="border-0 shadow-sm text-center">
             <CardBody className="py-10">
                <div className="relative w-32 h-32 mx-auto mb-6">
                   <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle className="text-gray-100 dark:text-slate-700 stroke-current" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                      <circle className={`text-${item.color} stroke-current`} strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.75)} strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-800 dark:text-white">{item.val}</span>
                   </div>
                </div>
                <h6 className="text-xs font-bold uppercase tracking-widest text-gray-400">{item.label}</h6>
             </CardBody>
          </Card>
       ))}
    </div>
  </div>
);

export const ChartsSparkline = () => (
  <div className="space-y-6">
    <PageTitle title="Sparkline" breadcrumbs={[{ label: 'Charts', path: '#' }, { label: 'Sparkline', active: true }]} />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {[
          { label: 'Total Sales', val: '$24,500', trend: '+12%', color: 'success' },
          { label: 'Active Users', val: '1,240', trend: '+5%', color: 'primary' },
          { label: 'New Leads', val: '84', trend: '-2%', color: 'danger' },
          { label: 'Conversion', val: '3.2%', trend: '+0.5%', color: 'info' }
       ].map(item => (
          <Card key={item.label} className="border-0 shadow-sm">
             <CardBody className="p-6">
                <div className="flex justify-between items-start mb-4">
                   <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white mt-1">{item.val}</h4>
                   </div>
                   <Badge variant={`soft-${item.color}`} size="sm">{item.trend}</Badge>
                </div>
                <div className="h-10 w-full bg-gray-50 dark:bg-slate-800 rounded-lg flex items-end gap-1 px-2 pb-1 overflow-hidden">
                   {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                      <div key={i} className={`flex-1 rounded-t-sm bg-${item.color}`} style={{ height: `${h}%` }}></div>
                   ))}
                </div>
             </CardBody>
          </Card>
       ))}
    </div>
  </div>
);
