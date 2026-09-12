import React from 'react';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { 
  Card, 
  CardBody, 
  PageTitle, 
  Avatar, 
  Input, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Tabs,
  TabList,
  Tab,
  TabPanel
} from '../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../lib/utils';

const Chat = () => {
  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <PageTitle 
        title="Chat" 
        breadcrumbs={[
          { label: 'Apps', path: '#' },
          { label: 'Chat', active: true },
        ]} 
      />

      <div className="flex flex-1 overflow-hidden gap-4 lg:gap-6">
        {/* ── Left Sidebar ── */}
        <Card className="w-full lg:w-80 flex flex-col overflow-hidden shrink-0">
          <div className="p-4 border-b border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Avatar src="/assets/images/users/avatar-1.jpg" name="Shawn" status="online" size="md" />
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-bold text-gray-800 dark:text-white truncate">Shawn</h5>
                <p className="text-xs text-success font-medium">Available</p>
              </div>
              <Dropdown align="right">
                <DropdownTrigger className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors">
                  <Feather.MoreHorizontal className="w-4 h-4 text-gray-500" />
                </DropdownTrigger>
                <DropdownMenu width="w-40">
                  <DropdownItem icon={Feather.User}>Profile</DropdownItem>
                  <DropdownItem icon={Feather.Edit}>Edit</DropdownItem>
                  <DropdownItem icon={Feather.Settings}>Settings</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            
            <div className="mt-4">
              <div className="relative">
                <Input placeholder="Search..." className="pl-9 h-10" />
                <Feather.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <Tabs defaultValue="recent" className="flex-1 flex flex-col">
            <TabList className="px-4 border-b border-gray-100 dark:border-slate-700">
              <Tab value="recent" className="flex-1">Recent</Tab>
              <Tab value="groups" className="flex-1">Groups</Tab>
              <Tab value="contacts" className="flex-1">Contacts</Tab>
            </TabList>

            <TabPanel value="recent" className="flex-1 p-0 overflow-hidden">
              <SimpleBar className="h-full">
                <div className="py-2">
                  <ChatItem 
                    avatar="/assets/images/users/avatar-2.jpg" 
                    name="Jennie Sherlock" 
                    message="Hey! there I'm available" 
                    time="02 min" 
                    status="online"
                    active
                  />
                  <ChatItem 
                    initials="S" 
                    name="Stacie Dube" 
                    message="I've finished it! See you so" 
                    time="10 min" 
                    status="online"
                    unread={1}
                  />
                  <ChatItem 
                    avatar="/assets/images/users/avatar-3.jpg" 
                    name="Katie Olson" 
                    message="This theme is awesome!" 
                    time="22 min" 
                    status="away"
                  />
                </div>
              </SimpleBar>
            </TabPanel>

            <TabPanel value="groups" className="flex-1 p-0 overflow-hidden">
              <SimpleBar className="h-full">
                <div className="py-2">
                  <ChatItem initials="G" name="General" message="12 Members" />
                  <ChatItem initials="P" name="Projects" message="5 Members" />
                </div>
              </SimpleBar>
            </TabPanel>

            <TabPanel value="contacts" className="flex-1 p-0 overflow-hidden">
              <SimpleBar className="h-full">
                <div className="py-2 space-y-4">
                  <ContactSection title="A" names={['Adam Miller', 'Alfonso Fisher']} />
                  <ContactSection title="B" names={['Bonnie Harney']} />
                </div>
              </SimpleBar>
            </TabPanel>
          </Tabs>
        </Card>

        {/* ── Chat Window ── */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar src="/assets/images/users/avatar-2.jpg" name="Jennie Sherlock" status="online" size="md" />
              <div>
                <h5 className="text-sm font-bold text-gray-800 dark:text-white">Jennie Sherlock</h5>
                <p className="text-xs text-success font-medium">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl
                              bg-gray-50 dark:bg-slate-700/60
                              border border-gray-100 dark:border-slate-600/50 shadow-sm">
                <Feather.Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[12px] font-bold text-gray-600 dark:text-gray-300">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <Button variant="ghost" size="sm" icon={Feather.Search} />
              <Dropdown align="right">
                <DropdownTrigger className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <Feather.MoreVertical className="w-4 h-4 text-gray-500" />
                </DropdownTrigger>
                <DropdownMenu width="w-40">
                  <DropdownItem>Profile</DropdownItem>
                  <DropdownItem>Archive</DropdownItem>
                  <DropdownItem danger>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-hidden bg-gray-50/50 dark:bg-slate-900/50">
            <SimpleBar className="h-full p-4">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <span className="px-3 py-1 rounded-full bg-gray-200 dark:bg-slate-800 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Today
                  </span>
                </div>

                <MessageItem 
                  name="Jennie Sherlock" 
                  time="10:00" 
                  text="Good morning !" 
                />
                <MessageItem 
                  name="Shawn" 
                  time="10:02" 
                  text="Good morning" 
                  right 
                />
                <MessageItem 
                  name="Jennie Sherlock" 
                  time="10:04" 
                  text="Hello! How are you doing today?" 
                />
              </div>
            </SimpleBar>
          </div>

          {/* Footer / Input */}
          <div className="p-4 border-t border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input placeholder="Enter Message..." className="h-11 bg-gray-50 dark:bg-slate-700 border-none" />
              </div>
              <Button className="h-11 px-6 gap-2">
                <span className="hidden sm:inline">Send</span>
                <Feather.Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ChatItem = ({ avatar, initials, name, message, time, status, unread, active }) => (
  <button className={cn(
    "flex items-center gap-3 w-full px-4 py-3 transition-colors text-left",
    active ? "bg-primary/5 dark:bg-primary/10 border-r-2 border-primary" : "hover:bg-gray-50 dark:hover:bg-slate-800/50"
  )}>
    <Avatar src={avatar} name={name} status={status} size="sm" />
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-0.5">
        <h6 className="text-sm font-bold text-gray-800 dark:text-white truncate">{name}</h6>
        {time && <span className="text-[10px] text-gray-400">{time}</span>}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{message}</p>
    </div>
    {unread && (
      <span className="w-5 h-5 flex items-center justify-center bg-danger text-white text-[10px] font-bold rounded-full">
        {unread}
      </span>
    )}
  </button>
);

const ContactSection = ({ title, names }) => (
  <div className="space-y-1">
    <div className="px-4 py-1 bg-gray-50 dark:bg-slate-800 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      {title}
    </div>
    <div className="py-1">
      {names.map(name => (
        <button key={name} className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 text-left transition-colors font-medium">
          {name}
        </button>
      ))}
    </div>
  </div>
);

const MessageItem = ({ name, time, text, right }) => (
  <div className={cn("flex flex-col", right ? "items-end" : "items-start")}>
    <div className={cn(
      "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
      right 
        ? "bg-primary text-white rounded-tr-none" 
        : "bg-white dark:bg-slate-800 text-gray-800 dark:text-white border border-gray-100 dark:border-slate-700 rounded-tl-none"
    )}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[11px] font-bold opacity-80">{name}</span>
        <span className="text-[10px] opacity-60 font-medium">{time}</span>
      </div>
      <p className="text-sm leading-relaxed">{text}</p>
    </div>
  </div>
);

export default Chat;
