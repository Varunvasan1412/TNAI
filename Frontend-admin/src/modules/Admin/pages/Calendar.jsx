import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  PageTitle, 
  Button, 
  Modal, 
  Input,
  Badge
} from '../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../lib/utils';

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Calendar" 
        breadcrumbs={[
          { label: 'Apps', path: '#' },
          { label: 'Calendar', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Left Sidebar ── */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-0 shadow-sm overflow-hidden">
            <CardBody className="p-6">
              <Button 
                className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 border-none gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <Feather.PlusCircle className="w-5 h-5" />
                Create New Event
              </Button>

              <div className="mt-8 space-y-6">
                <div>
                  <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Draggable Events</h6>
                  <p className="text-xs text-gray-500 font-medium mb-4 leading-relaxed">
                    Drag and drop your event or click in the calendar to schedule.
                  </p>
                  <div className="space-y-2">
                    <ExternalEvent label="New Event Planning" color="success" />
                    <ExternalEvent label="Meeting" color="info" />
                    <ExternalEvent label="Generating Reports" color="warning" />
                    <ExternalEvent label="Create New theme" color="danger" />
                    <ExternalEvent label="Team Meeting" color="dark" />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-slate-700">
                  <img src="/assets/images/undraw-calendar.svg" alt="Calendar Illustration" className="w-full h-auto opacity-80" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* ── Main Calendar area ── */}
        <div className="lg:col-span-9">
          <Card className="border-0 shadow-sm h-full min-h-[600px] overflow-hidden">
            <CardBody className="h-full p-0 flex flex-col">
              {/* Calendar Header Simulation */}
              <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                   <h4 className="text-xl font-bold text-gray-800 dark:text-white">February 2024</h4>
                   <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
                      <button className="p-1.5 rounded-md hover:bg-white dark:hover:bg-slate-700 transition-all text-gray-500">
                        <Feather.ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-white dark:hover:bg-slate-700 transition-all text-gray-500">
                        <Feather.ChevronRight className="w-4 h-4" />
                      </button>
                   </div>
                   <Button variant="ghost" size="sm" className="font-bold">Today</Button>
                </div>
                <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg self-end sm:self-auto">
                   <button className="px-4 py-1.5 rounded-md bg-white dark:bg-slate-700 text-primary text-xs font-bold shadow-sm transition-all">Month</button>
                   <button className="px-4 py-1.5 rounded-md hover:bg-white dark:hover:bg-slate-700 text-gray-500 text-xs font-bold transition-all">Week</button>
                   <button className="px-4 py-1.5 rounded-md hover:bg-white dark:hover:bg-slate-700 text-gray-500 text-xs font-bold transition-all">Day</button>
                </div>
              </div>

              {/* Placeholder for Calendar Grid */}
              <div className="flex-1 bg-gray-50/30 dark:bg-slate-900/10 grid grid-cols-7 grid-rows-5 min-h-[500px]">
                {/* Simplified Grid Mockup */}
                {Array.from({ length: 35 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-gray-100 dark:border-slate-800 p-2 min-h-[100px] hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <span className={cn(
                      "text-xs font-bold",
                      i < 4 || i > 32 ? "text-gray-300 dark:text-gray-600" : "text-gray-500 dark:text-gray-400"
                    )}>
                      {((i + 28) % 31) + 1}
                    </span>
                    {i === 10 && (
                      <div className="mt-2 p-1.5 rounded-md bg-primary/10 border-l-2 border-primary text-[10px] font-bold text-primary truncate shadow-sm">
                        Meeting with Client
                      </div>
                    )}
                    {i === 15 && (
                      <div className="mt-2 p-1.5 rounded-md bg-success/10 border-l-2 border-success text-[10px] font-bold text-success truncate shadow-sm">
                        Project Review
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Add Event Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Event"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Event Name</label>
            <Input placeholder="Enter event title" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</label>
            <select className="w-full h-11 rounded-xl bg-gray-100 dark:bg-slate-900/50 border-none px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none">
              <option value="primary">Primary</option>
              <option value="success">Success</option>
              <option value="danger">Danger</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" className="px-8 shadow-lg shadow-primary/20">Save Event</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const ExternalEvent = ({ label, color }) => {
  const colorMap = {
    primary: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white',
    success: 'bg-success/10 text-success border-success/20 hover:bg-success hover:text-white',
    danger: 'bg-danger/10 text-danger border-danger/20 hover:bg-danger hover:text-white',
    info: 'bg-info/10 text-info border-info/20 hover:bg-info hover:text-white',
    warning: 'bg-warning/10 text-warning border-warning/20 hover:bg-warning hover:text-white',
    dark: 'bg-slate-800/10 text-slate-800 border-slate-800/20 dark:text-slate-200 hover:bg-slate-800 dark:hover:bg-slate-200 dark:hover:text-slate-900 hover:text-white',
  };

  return (
    <div className={cn(
      "px-4 py-2.5 rounded-xl border text-xs font-bold cursor-move transition-all duration-300 shadow-sm flex items-center gap-3",
      colorMap[color]
    )}>
      <div className={cn("w-2 h-2 rounded-full", `bg-${color}`)}></div>
      {label}
    </div>
  );
};

export default Calendar;
