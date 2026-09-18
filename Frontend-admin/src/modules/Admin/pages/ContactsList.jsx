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
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../lib/utils';

const users = [
  { id: 1, name: 'Phyllis Gatlin', role: 'UI/UX Designer', email: 'phyllisgatlin@minia.com', avatar: '/assets/images/users/avatar-2.jpg', tags: ['Photoshop', 'illustrator'] },
  { id: 2, name: 'James Nix', role: 'Frontend Developer', email: 'jamesnix@minia.com', avatar: '/assets/images/users/avatar-1.jpg', tags: ['Html', 'Css', '2 + more'] },
  { id: 3, name: 'Darlene Smith', role: 'Backend Developer', email: 'darlenesmith@minia.com', avatar: '/assets/images/users/avatar-3.jpg', tags: ['Php', 'Java', 'Python'] },
  { id: 4, name: 'William Swift', role: 'Full Stack Developer', email: 'williamswift@minia.com', avatar: null, tags: ['Ruby', 'Php', '2 + more'] },
  { id: 5, name: 'Kevin West', role: 'Frontend Developer', email: 'kevinwest@minia.com', avatar: null, tags: ['Html', 'Css', '2 + more'] },
  { id: 6, name: 'Tommy Hayes', role: 'UI/UX Designer', email: 'tommyhayes@minia.com', avatar: '/assets/images/users/avatar-6.jpg', tags: ['Photoshop', 'illustrator'] },
  { id: 7, name: 'Diana Owens', role: 'Graphic Designer', email: 'dianaowens@minia.com', avatar: '/assets/images/users/avatar-8.jpg', tags: ['Photoshop', 'illustrator'] },
  { id: 8, name: 'Paul Sanchez', role: 'Angular Developer', email: 'paulsanchez@minia.com', avatar: '/assets/images/users/avatar-9.jpg', tags: ['Php', 'Javascript'] },
];

const ContactsList = () => {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="User List" 
        breadcrumbs={[
          { label: 'Contacts', path: '#' },
          { label: 'User List', active: true },
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
              className="p-1.5 rounded-md bg-white dark:bg-slate-700 text-primary shadow-sm"
              title="List View"
            >
              <Feather.List className="w-4 h-4" />
            </Link>
            <Link 
              to="/apps-contacts-grid" 
              className="p-1.5 rounded-md text-gray-500 hover:text-primary transition-colors"
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

      {/* Table Section */}
      <Card>
        <Table hoverable>
          <TableHead>
            <TableRow>
              <TableCell className="w-12">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell className="text-right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} name={user.name} size="sm" />
                    <Link to="#" className="font-semibold text-gray-800 dark:text-white hover:text-primary transition-colors">
                      {user.name}
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400 font-medium">
                  {user.role}
                </TableCell>
                <TableCell className="text-gray-500 dark:text-gray-400">
                  {user.email}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1.5">
                    {user.tags.map((tag, idx) => (
                      <Badge key={idx} variant="soft-primary" size="sm" className="px-2">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Dropdown align="right">
                    <DropdownTrigger className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md text-gray-400 transition-colors">
                      <Feather.MoreHorizontal className="w-4 h-4" />
                    </DropdownTrigger>
                    <DropdownMenu width="w-32">
                      <DropdownItem icon={Feather.Edit}>Edit</DropdownItem>
                      <DropdownItem icon={Feather.Trash2} danger>Delete</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-800 dark:text-white">1</span> to <span className="font-semibold text-gray-800 dark:text-white">10</span> of <span className="font-semibold text-gray-800 dark:text-white">57</span> entries
        </p>

        <div className="flex items-center gap-1">
          <PaginationButton disabled icon={Feather.ChevronLeft} />
          <PaginationButton active label="1" />
          <PaginationButton label="2" />
          <PaginationButton label="3" />
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

export default ContactsList;
