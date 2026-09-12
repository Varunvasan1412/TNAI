import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  DropdownDivider, 
  DropdownLabel,
  Button
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const Dropdowns = () => {
  const variants = [
    { name: 'Primary', variant: 'primary' },
    { name: 'Success', variant: 'success' },
    { name: 'Info', variant: 'info' },
    { name: 'Warning', variant: 'warning' },
    { name: 'Danger', variant: 'danger' },
    { name: 'Dark', variant: 'dark' },
  ];

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Dropdowns" 
        breadcrumbs={[
          { label: 'Components', path: '#' },
          { label: 'Dropdowns', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Single Button Dropdowns */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Single button dropdowns</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Standard dropdowns triggered by a single action button.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-4">
            <Dropdown>
              <DropdownTrigger>
                <Button className="gap-2">
                  Dropdown Menu <Feather.ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownLabel>Account Settings</DropdownLabel>
                <DropdownItem icon={Feather.User}>Profile Info</DropdownItem>
                <DropdownItem icon={Feather.Bell}>Notifications</DropdownItem>
                <DropdownDivider />
                <DropdownItem icon={Feather.LogOut} danger>Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="soft" className="gap-2">
                  Soft Variant <Feather.ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu align="right">
                <DropdownItem>Action One</DropdownItem>
                <DropdownItem>Action Two</DropdownItem>
                <DropdownItem>Action Three</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardBody>
        </Card>

        {/* Varied Button Dropdowns */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Color Variants</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Dropdowns can be used with any existing button color variant.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-3">
            {variants.map((v, i) => (
              <Dropdown key={i}>
                <DropdownTrigger>
                  <Button variant={v.variant} size="sm" className="gap-1.5">
                    {v.name} <Feather.ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem>Action</DropdownItem>
                  <DropdownItem>Another action</DropdownItem>
                  <DropdownDivider />
                  <DropdownItem>Separated link</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ))}
          </CardBody>
        </Card>

        {/* Rich Content & Alignment */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Rich Content & Icons</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Dropdown items can include icons, labels, and status indicators.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-4">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="outline" className="gap-2">
                  <Feather.Layers className="w-4 h-4" /> Project Tasks <Feather.ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu width="w-56">
                <DropdownLabel>Active Sprints</DropdownLabel>
                <DropdownItem className="justify-between">
                   <span>Design Audit</span>
                   <span className="text-[10px] bg-warning/10 text-warning px-1.5 py-0.5 rounded font-bold">WIP</span>
                </DropdownItem>
                <DropdownItem className="justify-between">
                   <span>API Integration</span>
                   <span className="text-[10px] bg-success/10 text-success px-1.5 py-0.5 rounded font-bold">DONE</span>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem icon={Feather.Plus}>Create New Task</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
                  <Feather.MoreVertical className="w-5 h-5" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu align="right" width="w-40">
                <DropdownItem icon={Feather.Edit2}>Edit</DropdownItem>
                <DropdownItem icon={Feather.Copy}>Clone</DropdownItem>
                <DropdownDivider />
                <DropdownItem icon={Feather.Trash2} danger>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </CardBody>
        </Card>

        {/* Sizes & Split (Conceptual) */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Sizes & Alignments</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Responsive alignments and flexible widths for any interface.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap items-center gap-4">
            <Dropdown>
               <DropdownTrigger>
                  <Button size="xs" className="gap-1">Tiny Dropdown <Feather.ChevronDown className="w-3 h-3" /></Button>
               </DropdownTrigger>
               <DropdownMenu width="w-40">
                  <DropdownItem>Small option</DropdownItem>
               </DropdownMenu>
            </Dropdown>

            <Dropdown>
               <DropdownTrigger>
                  <Button size="xl" variant="soft-primary" className="gap-3 font-bold">Huge Mega Menu <Feather.ChevronDown className="w-5 h-5" /></Button>
               </DropdownTrigger>
               <DropdownMenu width="w-72" align="right" className="p-2">
                  <div className="grid grid-cols-2 gap-1">
                     <DropdownItem className="flex-col items-start gap-1 p-3 rounded-lg">
                        <Feather.PieChart className="w-5 h-5 text-primary" />
                        <span className="font-bold">Analytics</span>
                        <span className="text-[10px] text-gray-400">View performance</span>
                     </DropdownItem>
                     <DropdownItem className="flex-col items-start gap-1 p-3 rounded-lg">
                        <Feather.Cpu className="w-5 h-5 text-success" />
                        <span className="font-bold">System</span>
                        <span className="text-[10px] text-gray-400">Server status</span>
                     </DropdownItem>
                  </div>
               </DropdownMenu>
            </Dropdown>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dropdowns;
