import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const Buttons = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Buttons" 
        breadcrumbs={[
          { label: 'Components', path: '#' },
          { label: 'Buttons', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Default Buttons */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Default Buttons</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Standard solid buttons for primary actions.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="success">Success</Button>
            <Button variant="info">Info</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="light">Light</Button>
          </CardBody>
        </Card>

        {/* Soft Buttons */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Soft Buttons</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Modern, low-contrast buttons with light backgrounds.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-3">
            <Button variant="soft">Primary</Button>
            <Button variant="soft-success">Success</Button>
            <Button variant="soft-info">Info</Button>
            <Button variant="soft-warning">Warning</Button>
            <Button variant="soft-danger">Danger</Button>
          </CardBody>
        </Card>

        {/* Outline Buttons */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Outline Buttons</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Clean, bordered buttons for secondary actions.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-3">
            <Button variant="outline">Primary</Button>
            <Button variant="outline-success">Success</Button>
            <Button variant="outline-info">Info</Button>
            <Button variant="outline-danger">Danger</Button>
          </CardBody>
        </Card>

        {/* Sizes */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Button Sizes</CardTitle>
            <p className="text-xs text-gray-500 font-medium">From tiny to large, buttons for every context.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </CardBody>
        </Card>

        {/* Icons & Loading */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Icons & States</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Interactive buttons with icons and loading indicators.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-3">
            <Button variant="primary" className="gap-2">
              <Feather.Plus className="w-4 h-4" /> Add Item
            </Button>
            <Button variant="soft-success" className="gap-2">
              <Feather.CheckCircle className="w-4 h-4" /> Confirm
            </Button>
            <Button variant="danger" size="icon">
              <Feather.Trash2 className="w-4 h-4" />
            </Button>
            <Button 
              variant="primary" 
              loading={isLoading} 
              onClick={toggleLoading}
            >
              {isLoading ? 'Processing...' : 'Click to Load'}
            </Button>
            <Button variant="primary" disabled>Disabled</Button>
          </CardBody>
        </Card>

        {/* Group & Dropdowns */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Dropdown Buttons</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Combined buttons for multi-action components.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="primary" className="gap-2">
                  Options <Feather.ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem icon={Feather.Edit}>Edit</DropdownItem>
                <DropdownItem icon={Feather.Copy}>Duplicate</DropdownItem>
                <DropdownItem icon={Feather.Trash} danger>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <div className="inline-flex shadow-sm rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700">
               <Button variant="ghost" className="rounded-none border-r border-gray-200 dark:border-slate-700 h-10 px-4">Left</Button>
               <Button variant="ghost" className="rounded-none border-r border-gray-200 dark:border-slate-700 h-10 px-4">Middle</Button>
               <Button variant="ghost" className="rounded-none h-10 px-4">Right</Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Buttons;
