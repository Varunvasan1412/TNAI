import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  PageTitle, 
  Avatar, 
  Button, 
  Badge,
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Modal,
  Input
} from '../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../lib/utils';

const EmailInbox = () => {
  const [isComposeOpen, setIsComposeOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Email Inbox" 
        breadcrumbs={[
          { label: 'Email', path: '#' },
          { label: 'Email Inbox', active: true },
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

            <div className="px-5 py-4">
              <h6 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Chat</h6>
            </div>
            <div className="p-2 space-y-1">
              <ChatUser name="Scott Median" status="online" avatar="/assets/images/users/avatar-2.jpg" lastMsg="Hello" />
              <ChatUser name="Julian Rosa" status="away" avatar="/assets/images/users/avatar-3.jpg" lastMsg="What about..." />
              <ChatUser name="David Medina" status="online" avatar="/assets/images/users/avatar-4.jpg" lastMsg="Yeah everything..." />
            </div>
          </Card>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 min-w-0">
          <Card className="overflow-hidden border-0 shadow-sm">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex flex-wrap items-center gap-2">
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

              <Dropdown>
                <DropdownTrigger className="h-9 px-3 flex items-center gap-2 bg-gray-50 dark:bg-slate-900/50 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                  <Feather.Tag className="w-4 h-4" />
                  <Feather.ChevronDown className="w-3 h-3" />
                </DropdownTrigger>
                <DropdownMenu width="w-40">
                  <DropdownItem>Promotions</DropdownItem>
                  <DropdownItem>Work</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown align="right">
                <DropdownTrigger className="h-9 px-3 flex items-center gap-2 bg-gray-50 dark:bg-slate-900/50 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                  More
                  <Feather.MoreVertical className="w-4 h-4" />
                </DropdownTrigger>
                <DropdownMenu width="w-44">
                  <DropdownItem>Mark as Read</DropdownItem>
                  <DropdownItem>Archive</DropdownItem>
                  <DropdownItem danger border>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>

            {/* Email List */}
            <div className="divide-y divide-gray-50 dark:divide-slate-700/50">
              <EmailRow 
                sender="Peter, me (3)" 
                subject="Trip home from Colombo" 
                teaser="Trip home from Colombo has been arranged, then Jenna will come get me from Stockholm. :)" 
                date="Mar 6" 
                starred
              />
              <EmailRow 
                sender="me, Susanna (7)" 
                subject="Since you asked..." 
                teaser="Alright thanks. I'll have to re-book that somehow, i'll get back to you." 
                date="Mar 6" 
                badge={{ label: 'Freelance', variant: 'warning' }}
                unread
              />
              <EmailRow 
                sender="Web Support Dennis" 
                subject="Re: New mail settings" 
                teaser="Will you answer him asap?" 
                date="Mar 7" 
              />
              <EmailRow 
                sender="me, Peter (2)" 
                subject="Off on Thursday" 
                teaser="Eff that place, you might as well stay here with us instead!" 
                date="Mar 4" 
                badge={{ label: 'Support', variant: 'info' }}
              />
              <EmailRow 
                sender="Medium" 
                subject="This Week's Top Stories" 
                teaser="Our top pick for you on Medium this week The Man Who Destroyed America’s Ego" 
                date="Feb 28" 
                badge={{ label: 'Social', variant: 'primary' }}
              />
              <EmailRow 
                sender="Death to Stock" 
                subject="Montly High-Res Photos" 
                teaser="To create this month's pack, we hosted a party with local musician Jared Mahone" 
                date="Feb 28" 
              />
              <EmailRow 
                sender="Randy, me (5)" 
                subject="Last pic over my village" 
                teaser="Yeah i'd like that! Do you remember the video you showed me of your train ride" 
                date="5:01 am" 
                badge={{ label: 'Family', variant: 'success' }}
                unread
              />
            </div>

            {/* Footer */}
            <div className="p-4 flex items-center justify-between bg-gray-50/30 dark:bg-slate-900/10">
              <p className="text-xs font-medium text-gray-500">Showing 1 - 20 of 1,524</p>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors">
                  <Feather.ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition-colors">
                  <Feather.ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Compose Modal */}
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

const ChatUser = ({ name, avatar, lastMsg, status }) => (
  <Link to="#" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors group">
    <Avatar src={avatar} name={name} size="sm" status={status} />
    <div className="min-w-0">
      <h6 className="text-xs font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors">{name}</h6>
      <p className="text-[10px] text-gray-500 truncate">{lastMsg}</p>
    </div>
  </Link>
);

const ToolbarButton = ({ icon: Icon }) => (
  <button className="p-2 rounded-md hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm text-gray-500 hover:text-primary transition-all">
    <Icon className="w-4 h-4" />
  </button>
);

const EmailRow = ({ sender, subject, teaser, date, starred, unread, badge }) => (
  <div className={cn(
    "flex items-center gap-4 px-4 py-3 cursor-pointer transition-colors group",
    unread ? "bg-primary/[0.02] dark:bg-primary/[0.04]" : "hover:bg-gray-50/50 dark:hover:bg-slate-800/30"
  )}>
    <div className="flex items-center gap-3 shrink-0">
      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
      <Feather.Star className={cn("w-4 h-4 transition-colors", starred ? "fill-warning text-warning" : "text-gray-300 group-hover:text-gray-400")} />
    </div>

    <div className="w-32 lg:w-48 shrink-0">
      <span className={cn("text-sm truncate block", unread ? "font-bold text-gray-800 dark:text-white" : "text-gray-600 dark:text-gray-400")}>
        {sender}
      </span>
    </div>

    <div className="flex-1 min-w-0 flex items-center gap-2">
      {badge && (
        <Badge variant={badge.variant} size="sm" className="shrink-0">
          {badge.label}
        </Badge>
      )}
      <span className={cn("text-sm truncate", unread ? "font-bold text-gray-800 dark:text-white" : "text-gray-600 dark:text-gray-400")}>
        {subject}
        <span className="text-gray-400 font-normal ml-2 group-hover:text-gray-500 transition-colors">— {teaser}</span>
      </span>
    </div>

    <div className="w-16 text-right shrink-0">
      <span className="text-[11px] font-bold text-gray-400 group-hover:text-gray-500 transition-colors">{date}</span>
    </div>
  </div>
);

export default EmailInbox;
