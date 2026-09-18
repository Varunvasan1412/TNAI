import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Badge, 
  Button, 
  Pagination, 
  PaginationItem, 
  PaginationLink, 
  PaginationPrevious, 
  PaginationNext, 
  PaginationEllipsis,
  Spinner,
  Tooltip
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const General = () => {
  const variants = ['primary', 'success', 'info', 'warning', 'danger', 'dark'];

  return (
    <div className="space-y-6">
      <PageTitle 
        title="General" 
        breadcrumbs={[
          { label: 'Components', path: '#' },
          { label: 'General', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Small status indicators with various visual styles.</p>
          </CardHeader>
          <CardBody className="space-y-6">
            <div>
               <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Solid Variants</h5>
               <div className="flex flex-wrap gap-2">
                  {variants.map(v => <Badge key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>)}
               </div>
            </div>
            <div>
               <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Soft Variants</h5>
               <div className="flex flex-wrap gap-2">
                  {variants.map(v => <Badge key={v} variant={`soft-${v}`}>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>)}
               </div>
            </div>
            <div>
               <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Outline & Pill</h5>
               <div className="flex flex-wrap gap-2">
                  {variants.map(v => <Badge key={v} variant={`outline-${v}`} pill>{v.charAt(0).toUpperCase() + v.slice(1)}</Badge>)}
               </div>
            </div>
          </CardBody>
        </Card>

        {/* Spinners */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Loading Indicators</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Lightweight spinners for active state feedback.</p>
          </CardHeader>
          <CardBody className="space-y-6">
            <div>
               <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Border Spinners</h5>
               <div className="flex flex-wrap items-center gap-4">
                  <Spinner size="sm" />
                  <Spinner size="md" variant="success" />
                  <Spinner size="lg" variant="info" />
                  <Spinner size="xl" variant="danger" />
               </div>
            </div>
            <div>
               <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Grow Spinners</h5>
               <div className="flex flex-wrap items-center gap-4">
                  <Spinner type="grow" size="sm" />
                  <Spinner type="grow" size="md" variant="success" />
                  <Spinner type="grow" size="lg" variant="info" />
                  <Spinner type="grow" size="xl" variant="danger" />
               </div>
            </div>
          </CardBody>
        </Card>

        {/* Pagination */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Pagination</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Navigation links for multi-page content structures.</p>
          </CardHeader>
          <CardBody className="space-y-10">
            <div className="space-y-4">
               <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400">Default Style</h5>
               <Pagination>
                  <PaginationPrevious />
                  <PaginationItem><PaginationLink>1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink>3</PaginationLink></PaginationItem>
                  <PaginationEllipsis />
                  <PaginationItem><PaginationLink>12</PaginationLink></PaginationItem>
                  <PaginationNext />
               </Pagination>
            </div>
            <div className="space-y-4">
               <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400">Small Sizing</h5>
               <Pagination className="justify-start">
                  <PaginationItem><PaginationLink size="sm">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink size="sm" isActive>2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink size="sm">3</PaginationLink></PaginationItem>
                  <PaginationNext label="" />
               </Pagination>
            </div>
          </CardBody>
        </Card>

        {/* Tooltips & Popovers */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Tooltips</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Interactive hover states for contextual information.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-4">
            <Tooltip content="This is a top tooltip" position="top">
               <Button variant="outline">Tooltip Top</Button>
            </Tooltip>
            <Tooltip content="Tooltip on the right side" position="right">
               <Button variant="outline">Tooltip Right</Button>
            </Tooltip>
            <Tooltip content="Tooltip on the bottom side" position="bottom">
               <Button variant="outline">Tooltip Bottom</Button>
            </Tooltip>
            <Tooltip content="Tooltip on the left side" position="left">
               <Button variant="outline">Tooltip Left</Button>
            </Tooltip>
          </CardBody>
        </Card>

        {/* Buttons with Badges */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Badges in Context</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Using badges within buttons and other components.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-4">
            <Button className="gap-2">
               Notifications <Badge variant="light" size="sm" pill>4</Badge>
            </Button>
            <Button variant="soft-success" className="gap-2">
               Messages <Badge variant="success" size="sm" pill>12</Badge>
            </Button>
            <div className="relative inline-block">
               <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 border border-gray-100 dark:border-slate-700">
                  <Feather.Bell className="w-5 h-5 text-gray-500" />
               </Button>
               <span className="absolute top-0 right-0 w-3 h-3 bg-danger border-2 border-white dark:border-slate-800 rounded-full"></span>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default General;
