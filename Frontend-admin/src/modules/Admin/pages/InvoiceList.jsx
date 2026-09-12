import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  PageTitle, 
  Table, 
  Badge, 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Input
} from '../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../lib/utils';

const invoices = [
  { id: '#MN0215', date: '12 Oct, 2020', name: 'Connie Franco', amount: '$26.30', status: 'Paid' },
  { id: '#MN0214', date: '11 Oct, 2020', name: 'Paul Reynolds', amount: '$24.20', status: 'Paid' },
  { id: '#MN0213', date: '10 Oct, 2020', name: 'Ronald Patterson', amount: '$20.20', status: 'Pending' },
  { id: '#MN0212', date: '09 Oct, 2020', name: 'Adella Perez', amount: '$16.80', status: 'Paid' },
  { id: '#MN0211', date: '08 Oct, 2020', name: 'Theresa Mayers', amount: '$22.00', status: 'Paid' },
  { id: '#MN0210', date: '07 Oct, 2020', name: 'Michael Wallace', amount: '$15.60', status: 'Paid' },
  { id: '#MN0209', date: '06 Oct, 2020', name: 'Oliver Gonzales', amount: '$26.50', status: 'Pending' },
  { id: '#MN0208', date: '05 Oct, 2020', name: 'David Burke', amount: '$24.20', status: 'Paid' },
  { id: '#MN0207', date: '04 Oct, 2020', name: 'Willie Verner', amount: '$21.30', status: 'Pending' },
  { id: '#MN0206', date: '03 Oct, 2020', name: 'Felix Perry', amount: '$22.60', status: 'Paid' },
  { id: '#MN0205', date: '02 Oct, 2020', name: 'Virgil Kelley', amount: '$18.20', status: 'Paid' },
  { id: '#MN0204', date: '01 Oct, 2020', name: 'Matthew Lawler', amount: '$15.80', status: 'Pending' },
];

const InvoiceList = () => {
  const columns = [
    {
      header: 'Invoice ID',
      accessor: 'id',
      render: (value) => (
        <Link to="/apps-invoices-detail" className="text-primary font-bold hover:underline">
          {value}
        </Link>
      ),
    },
    {
      header: 'Date',
      accessor: 'date',
      render: (value) => <span className="text-gray-500 font-medium">{value}</span>
    },
    {
      header: 'Billing Name',
      accessor: 'name',
      render: (value) => <span className="text-gray-800 dark:text-white font-bold">{value}</span>
    },
    {
      header: 'Amount',
      accessor: 'amount',
      render: (value) => <span className="text-gray-800 dark:text-white font-bold">{value}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <Badge variant={value === 'Paid' ? 'success' : 'warning'}>
          {value}
        </Badge>
      ),
    },
    {
      header: 'Download',
      accessor: 'id',
      render: () => (
        <Button variant="soft" size="sm" className="gap-2">
          <Feather.Download className="w-3.5 h-3.5" />
          PDF
        </Button>
      ),
    },
    {
      header: 'Action',
      accessor: 'id',
      render: () => (
        <Dropdown align="right">
          <DropdownTrigger className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
            <Feather.MoreHorizontal className="w-5 h-5 text-gray-500" />
          </DropdownTrigger>
          <DropdownMenu width="w-32">
            <DropdownItem icon={Feather.Edit2}>Edit</DropdownItem>
            <DropdownItem icon={Feather.Printer}>Print</DropdownItem>
            <DropdownItem icon={Feather.Trash2} danger border>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Invoice List" 
        breadcrumbs={[
          { label: 'Invoices', path: '#' },
          { label: 'Invoice List', active: true },
        ]} 
      />

      <Card>
        <CardBody>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <Button variant="primary" className="gap-2 w-full sm:w-auto">
              <Feather.Plus className="w-4 h-4" />
              Add Invoice
            </Button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Input 
                  placeholder="Select date range" 
                  className="pl-9 h-10 bg-gray-50 dark:bg-slate-900/50 border-none" 
                />
                <Feather.Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <Dropdown align="right">
                <DropdownTrigger className="p-2.5 bg-gray-50 dark:bg-slate-900/50 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <Feather.MoreHorizontal className="w-5 h-5 text-gray-500" />
                </DropdownTrigger>
                <DropdownMenu width="w-40">
                  <DropdownItem>Export CSV</DropdownItem>
                  <DropdownItem>Export PDF</DropdownItem>
                  <DropdownItem border>Bulk Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>

          {/* Table */}
          <Table 
            columns={columns} 
            data={invoices} 
            selectable 
            pagination 
            itemsPerPage={10}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default InvoiceList;
