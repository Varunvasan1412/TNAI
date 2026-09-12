import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  PageTitle, 
  Avatar, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Modal,
  Input
} from '../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../lib/utils';

const EmailRead = () => {
  const [isComposeOpen, setIsComposeOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Read Email" 
        breadcrumbs={[
          { label: 'Email', path: '#' },
          { label: 'Read Email', active: true },
        ]} 
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* ── Left Sidebar ── */}
        <div className="w-full lg:w-64 space-y-6 shrink-0">
          <Button 
            className="w-full h-11 bg-danger hover:bg-danger/90 text-white font-bold shadow-lg shadow-danger/20 border-none"
            onClick={() => setIsComposeOpen(true)}
          >
            Compose
          </Button>

          <Card className="overflow-hidden border-0 bg-transparent lg:bg-white dark:lg:bg-slate-800 shadow-none lg:shadow-sm">
            <div className="p-2 space-y-1">
              <SidebarLink active icon={Feather.Inbox} label="Inbox" count={18} />
              <SidebarLink icon={Feather.Star} label="Starred" />
              <SidebarLink icon={Feather.AlertCircle} label="Important" />
              <SidebarLink icon={Feather.FileText} label="Draft" />
              <SidebarLink icon={Feather.Send} label="Sent Mail" />
              <SidebarLink icon={Feather.Trash2} label="Trash" />
            </div>

            <div className="px-5 py-4">
              <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Labels</h6>
            </div>
            <div className="p-2 space-y-1">
              <LabelLink color="bg-info" label="Theme Support" />
              <LabelLink color="bg-warning" label="Freelance" />
              <LabelLink color="bg-primary" label="Social" />
              <LabelLink color="bg-danger" label="Friends" />
              <LabelLink color="bg-success" label="Family" />
            </div>
          </Card>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 min-w-0">
          <Card className="overflow-hidden border-0 shadow-sm">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex flex-wrap items-center gap-2">
              <Link to="/apps-email-inbox" className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors mr-2">
                <Feather.ArrowLeft className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-1 bg-gray-50 dark:bg-slate-900/50 p-1 rounded-lg">
                <ToolbarButton icon={Feather.Inbox} />
                <ToolbarButton icon={Feather.AlertCircle} />
                <ToolbarButton icon={Feather.Trash2} />
              </div>
              
              <Dropdown>
                <DropdownTrigger className="h-9 px-3 flex items-center gap-2 bg-gray-50 dark:bg-slate-900/50 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                  <Feather.Folder className="w-4 h-4" />
                  <Feather.ChevronDown className="w-3 h-3" />
                </DropdownTrigger>
                <DropdownMenu width="w-40">
                  <DropdownItem>Updates</DropdownItem>
                  <DropdownItem>Social</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown align="right">
                <DropdownTrigger className="h-9 px-3 flex items-center gap-2 bg-gray-50 dark:bg-slate-900/50 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                  More
                  <Feather.MoreVertical className="w-4 h-4" />
                </DropdownTrigger>
                <DropdownMenu width="w-44">
                  <DropdownItem>Mark as Unread</DropdownItem>
                  <DropdownItem>Mute</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            <CardBody className="p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <Avatar src="/assets/images/users/avatar-2.jpg" name="Humberto Champion" size="md" />
                  <div>
                    <h5 className="text-base font-bold text-gray-800 dark:text-white mb-0.5">Humberto D. Champion</h5>
                    <p className="text-xs text-gray-500 font-medium">support@domain.com</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400">12:45 PM, 08 March 2024</p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-bold text-gray-800 dark:text-white">This Week's Top Stories</h4>
                
                <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 space-y-4">
                  <p>Dear Lorem Ipsum,</p>
                  <p>Praesent dui ex, dapibus eget mauris ut, finibus vestibulum enim. Quisque arcu leo, facilisis in fringilla id, luctus in tortor. Nunc vestibulum est quis orci varius viverra. Curabitur dictum volutpat massa vulputate molestie. In at felis ac velit maximus convallis.</p>
                  <p>Sed elementum turpis eu lorem interdum, sed porttitor eros commodo. Nam eu venenatis tortor, id lacinia diam. Sed aliquam in dui et porta. Sed bibendum orci non tincidunt ultrices. Vivamus fringilla, mi lacinia dapibus condimentum, ipsum urna lacinia lacus, vel tincidunt mi nibh sit amet lorem.</p>
                  <p>Sincerely,</p>
                </div>

                <div className="pt-8 border-t border-gray-100 dark:border-slate-700">
                  <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Attachments (2)</h6>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AttachmentCard image="/assets/images/small/img-3.jpg" filename="img-3.jpg" size="2.4 MB" />
                    <AttachmentCard image="/assets/images/small/img-4.jpg" filename="img-4.jpg" size="1.8 MB" />
                  </div>
                </div>

                <div className="pt-6">
                   <Button variant="soft" className="gap-2">
                     <Feather.CornerUpLeft className="w-4 h-4" />
                     Reply
                   </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Compose Modal (Same as Inbox) */}
      <Modal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)} 
        title="New Message"
        size="lg"
      >
        <div className="space-y-4">
          <Input placeholder="To" />
          <Input placeholder="Subject" />
          <div className="h-64 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/50 p-4">
             <textarea className="w-full h-full bg-transparent border-none focus:ring-0 resize-none text-sm" placeholder="Write your message..."></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setIsComposeOpen(false)}>Discard</Button>
            <Button className="gap-2">
              Send
              <Feather.Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const SidebarLink = ({ active, icon: Icon, label, count }) => (
  <Link 
    to="#" 
    className={cn(
      "flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
      active 
        ? "bg-primary text-white shadow-md shadow-primary/20" 
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
    )}
  >
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4" />
      {label}
    </div>
    {count && <span className={active ? "text-white/80" : "text-gray-400"}>{count}</span>}
  </Link>
);

const LabelLink = ({ color, label }) => (
  <Link to="#" className="flex items-center justify-between px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors font-medium">
    {label}
    <div className={cn("w-2 h-2 rounded-full", color)}></div>
  </Link>
);

const ToolbarButton = ({ icon: Icon }) => (
  <button className="p-2 rounded-md hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm text-gray-500 hover:text-primary transition-all">
    <Icon className="w-4 h-4" />
  </button>
);

const AttachmentCard = ({ image, filename, size }) => (
  <div className="group relative overflow-hidden rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all">
    <img src={image} alt={filename} className="w-full aspect-video object-cover" />
    <div className="p-3 flex items-center justify-between bg-white dark:bg-slate-800">
      <div className="min-w-0">
        <p className="text-[11px] font-bold text-gray-800 dark:text-white truncate">{filename}</p>
        <p className="text-[10px] text-gray-500 font-medium">{size}</p>
      </div>
      <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-400 hover:text-primary transition-colors">
        <Feather.Download className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

export default EmailRead;
