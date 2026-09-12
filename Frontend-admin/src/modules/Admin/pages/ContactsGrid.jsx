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
  DropdownItem 
} from '../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../lib/utils';

const users = [
  { id: 1, name: 'Phyllis Gatlin', role: 'Full Stack Developer', avatar: '/assets/images/users/avatar-2.jpg' },
  { id: 2, name: 'James Nix', role: 'Full Stack Developer', avatar: '/assets/images/users/avatar-1.jpg' },
  { id: 3, name: 'Darlene Smith', role: 'UI/UX Designer', avatar: '/assets/images/users/avatar-3.jpg' },
  { id: 4, name: 'William Swift', role: 'Backend Developer', avatar: null },
  { id: 5, name: 'Kevin West', role: 'Full Stack Developer', avatar: null },
  { id: 6, name: 'Tommy Hayes', role: 'Backend Developer', avatar: '/assets/images/users/avatar-6.jpg' },
  { id: 7, name: 'Diana Owens', role: 'UI/UX Designer', avatar: '/assets/images/users/avatar-8.jpg' },
  { id: 8, name: 'Paul Sanchez', role: 'Full Stack Developer', avatar: '/assets/images/users/avatar-9.jpg' },
];

const ContactsGrid = () => {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="User Grid" 
        breadcrumbs={[
          { label: 'Contacts', path: '#' },
          { label: 'User Grid', active: true },
        ]} 
      />

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h5 className="text-lg font-bold text-gray-800 dark:text-white">
            Contact List <span className="text-gray-500 font-normal ml-2">(834)</span>
          </h5>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
            <Link 
              to="/apps-contacts-list" 
              className="p-1.5 rounded-md text-gray-500 hover:text-primary transition-colors"
              title="List View"
            >
              <Feather.List className="w-4 h-4" />
            </Link>
            <Link 
              to="/apps-contacts-grid" 
              className="p-1.5 rounded-md bg-white dark:bg-slate-700 text-primary shadow-sm"
              title="Grid View"
            >
              <Feather.Grid className="w-4 h-4" />
            </Link>
          </div>

          <Button variant="primary" size="sm" className="gap-2">
            <Feather.Plus className="w-4 h-4" />
            Add New
          </Button>

          <Dropdown align="right">
            <DropdownTrigger className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-500 transition-colors">
              <Feather.MoreHorizontal className="w-5 h-5" />
            </DropdownTrigger>
            <DropdownMenu width="w-44">
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem border>Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <Card key={user.id} className="group overflow-hidden">
            <CardBody className="flex flex-col items-center p-6">
              <div className="w-full flex justify-end -mt-2 -mr-2 mb-2">
                <Dropdown align="right">
                  <DropdownTrigger className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md text-gray-400 transition-colors">
                    <Feather.MoreHorizontal className="w-4 h-4" />
                  </DropdownTrigger>
                  <DropdownMenu width="w-32">
                    <DropdownItem icon={Feather.Edit}>Edit</DropdownItem>
                    <DropdownItem icon={Feather.Trash2} danger>Delete</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                <Avatar 
                  src={user.avatar} 
                  name={user.name} 
                  size="xl" 
                  className="ring-4 ring-gray-50 dark:ring-slate-800"
                />
              </div>

              <h5 className="text-base font-bold text-gray-800 dark:text-white mb-1 hover:text-primary transition-colors">
                <Link to="#">{user.name}</Link>
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">{user.role}</p>

              <div className="grid grid-cols-2 w-full gap-2 pt-4 border-t border-gray-100 dark:border-slate-700">
                <Button variant="ghost" size="sm" className="w-full gap-2 text-xs font-semibold">
                  <Feather.User className="w-3.5 h-3.5" />
                  Profile
                </Button>
                <Button variant="ghost" size="sm" className="w-full gap-2 text-xs font-semibold">
                  <Feather.Mail className="w-3.5 h-3.5" />
                  Message
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-slate-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-800 dark:text-white">1</span> to <span className="font-semibold text-gray-800 dark:text-white">10</span> of <span className="font-semibold text-gray-800 dark:text-white">57</span> entries
        </p>

        <div className="flex items-center gap-1">
          <PaginationButton disabled icon={Feather.ChevronLeft} />
          <PaginationButton active label="1" />
          <PaginationButton label="2" />
          <PaginationButton label="3" />
          <PaginationButton label="4" />
          <PaginationButton label="5" />
          <PaginationButton icon={Feather.ChevronRight} />
        </div>
      </div>
    </div>
  );
};

const PaginationButton = ({ label, icon: Icon, active, disabled }) => (
  <button 
    disabled={disabled}
    className={cn(
      "w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200",
      active 
        ? "bg-primary text-white shadow-lg shadow-primary/20" 
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800",
      disabled && "opacity-40 cursor-not-allowed pointer-events-none"
    )}
  >
    {Icon ? <Icon className="w-4 h-4" /> : label}
  </button>
);

export default ContactsGrid;
