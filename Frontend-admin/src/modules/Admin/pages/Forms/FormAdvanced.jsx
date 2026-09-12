import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Input, 
  Textarea, 
  FormLabel, 
  FormHelperText, 
  Switch, 
  Badge,
  Button,
  InputGroup,
  InputGroupText,
  Select
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const FormAdvanced = () => {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Advanced Components" 
        breadcrumbs={[
          { label: 'Forms', path: '#' },
          { label: 'Advanced', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Toggle Switches - Advanced */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Premium Switches</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Custom styled toggle switches for complex binary settings.</p>
          </CardHeader>
          <CardBody className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Color Variants</h5>
                  <div className="flex flex-wrap gap-4">
                     <Switch defaultChecked />
                     <Switch className="peer-checked:bg-success" defaultChecked />
                     <Switch className="peer-checked:bg-info" defaultChecked />
                     <Switch className="peer-checked:bg-warning" defaultChecked />
                     <Switch className="peer-checked:bg-danger" defaultChecked />
                  </div>
               </div>
               <div className="space-y-4">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Labeled Switches</h5>
                  <div className="space-y-3">
                     <Switch label="Active Status" defaultChecked />
                     <Switch label="Cloud Sync" />
                  </div>
               </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-700 flex items-center justify-between">
               <div>
                  <h6 className="text-sm font-bold text-gray-800 dark:text-white">Maintenance Mode</h6>
                  <p className="text-xs text-gray-500">Temporarily disable public access to your app.</p>
               </div>
               <Switch className="scale-110" />
            </div>
          </CardBody>
        </Card>

        {/* Choices / Selects */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Selection Controls</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Advanced select boxes with search and grouping capabilities.</p>
          </CardHeader>
          <CardBody className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <FormLabel>Single Select</FormLabel>
                   <Select>
                      <option>Choose a framework...</option>
                      <option>React</option>
                      <option>Vue.js</option>
                      <option>Angular</option>
                      <option>Svelte</option>
                   </Select>
                </div>
                <div>
                   <FormLabel>Option Groups</FormLabel>
                   <Select>
                      <optgroup label="Frontend">
                         <option>React</option>
                         <option>Vue</option>
                      </optgroup>
                      <optgroup label="Backend">
                         <option>Node.js</option>
                         <option>Python</option>
                      </optgroup>
                   </Select>
                </div>
             </div>

             <div>
                <FormLabel>Multi-Select Tags (Visual Mockup)</FormLabel>
                <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                   <Badge variant="soft-primary" className="gap-1 pr-1.5">
                      JavaScript <Feather.X className="w-3 h-3 cursor-pointer" />
                   </Badge>
                   <Badge variant="soft-primary" className="gap-1 pr-1.5">
                      Tailwind <Feather.X className="w-3 h-3 cursor-pointer" />
                   </Badge>
                   <Badge variant="soft-primary" className="gap-1 pr-1.5">
                      Framer Motion <Feather.X className="w-3 h-3 cursor-pointer" />
                   </Badge>
                   <input className="flex-1 bg-transparent border-0 focus:ring-0 text-sm min-w-[80px]" placeholder="Add tag..." />
                </div>
                <FormHelperText>Select multiple technologies for your stack.</FormHelperText>
             </div>
          </CardBody>
        </Card>

        {/* Datepickers */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Date & Time Pickers</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Native and custom date selection interfaces.</p>
          </CardHeader>
          <CardBody>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                   <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Basic Pickers</h5>
                   <div className="space-y-4">
                      <div>
                         <FormLabel>Pick a Date</FormLabel>
                         <Input type="date" defaultValue="2023-05-07" />
                      </div>
                      <div>
                         <FormLabel>Pick a Time</FormLabel>
                         <Input type="time" defaultValue="14:30" />
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Range & Intervals</h5>
                   <div>
                      <FormLabel>Project Duration</FormLabel>
                      <div className="grid grid-cols-2 gap-2">
                         <Input type="date" placeholder="Start" />
                         <Input type="date" placeholder="End" />
                      </div>
                      <FormHelperText>Define the start and end of your sprint.</FormHelperText>
                   </div>
                   <div>
                      <FormLabel>Month & Year</FormLabel>
                      <Input type="month" defaultValue="2023-05" />
                   </div>
                </div>

                <div className="space-y-4">
                   <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Inline Experience</h5>
                   <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-center">
                      <Feather.Calendar className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
                      <p className="text-sm font-bold text-gray-800 dark:text-white">Calendar View</p>
                      <p className="text-xs text-gray-500 mt-1">Integration with full-calendar or flatpickr recommended for inline layouts.</p>
                      <Button variant="soft-primary" size="sm" className="mt-4">Open Scheduler</Button>
                   </div>
                </div>
             </div>
          </CardBody>
        </Card>

        {/* Color Pickers */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Color Selections</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Advanced color picking for theme customization.</p>
          </CardHeader>
          <CardBody className="grid grid-cols-2 gap-6">
             <div className="space-y-4">
                <div className="h-32 rounded-2xl bg-gradient-to-br from-primary via-info to-success flex items-center justify-center p-6 border-4 border-white dark:border-slate-800 shadow-xl">
                   <div className="w-12 h-12 rounded-full bg-white shadow-inner flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-primary animate-pulse"></div>
                   </div>
                </div>
                <p className="text-[10px] text-center font-bold text-gray-400 uppercase">Hue & Saturation</p>
             </div>
             <div className="space-y-4">
                <div className="space-y-3">
                   <FormLabel>Brand Color</FormLabel>
                   <InputGroup>
                      <InputGroupText className="p-0 border-r-0 overflow-hidden w-10">
                         <input type="color" className="w-full h-full p-0 border-0 cursor-pointer" defaultValue="#5156be" />
                      </InputGroupText>
                      <Input defaultValue="#5156be" className="font-mono text-xs" />
                   </InputGroup>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                   {['#5156be', '#2ab57d', '#4ba6ef', '#ffbf53', '#fd625e'].map(c => (
                      <div key={c} className="w-6 h-6 rounded-full cursor-pointer ring-offset-2 ring-transparent hover:ring-primary/50 transition-all border border-black/5" style={{ backgroundColor: c }} />
                   ))}
                </div>
             </div>
          </CardBody>
        </Card>

        {/* Text Area with Character Count */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Character Limits</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Inputs with real-time feedback on content length.</p>
          </CardHeader>
          <CardBody className="space-y-4">
             <div>
                <div className="flex justify-between items-center mb-1.5">
                   <FormLabel className="mb-0">Campaign Description</FormLabel>
                   <span className="text-[10px] font-bold text-gray-400">124 / 250</span>
                </div>
                <Textarea placeholder="Describe your marketing campaign..." rows={4} />
                <div className="w-full h-1 bg-gray-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                   <div className="h-full bg-primary w-[49%] transition-all"></div>
                </div>
             </div>
             <div className="flex justify-end pt-2">
                <Button variant="soft-primary" className="gap-2">
                   Generate with AI <Feather.Zap className="w-3.5 h-3.5" />
                </Button>
             </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default FormAdvanced;
