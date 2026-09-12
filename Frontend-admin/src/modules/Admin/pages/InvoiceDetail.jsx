import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardBody, 
  PageTitle, 
  Button, 
  Table 
} from '../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../lib/utils';

const InvoiceDetail = () => {
  const lineItems = [
    { no: '01', item: 'Minia', desc: 'React Admin Dashboard (Tailwind Edition)', price: '$499.00' },
    { no: '02', item: 'Skote', desc: 'Bootstrap 5 Admin Dashboard', price: '$499.00' },
  ];

  const columns = [
    { header: 'No.', accessor: 'no', className: 'w-16' },
    { 
      header: 'Item', 
      accessor: 'item',
      render: (val, row) => (
        <div className="py-1">
          <h5 className="text-sm font-bold text-gray-800 dark:text-white mb-0.5">{val}</h5>
          <p className="text-xs text-gray-500 font-medium">{row.desc}</p>
        </div>
      )
    },
    { header: 'Price', accessor: 'price', className: 'text-right font-bold text-gray-800 dark:text-white' },
  ];

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Invoice Detail" 
        breadcrumbs={[
          { label: 'Invoices', path: '#' },
          { label: 'Invoice Detail', active: true },
        ]} 
      />

      <Card className="max-w-5xl mx-auto shadow-xl border-0 overflow-hidden">
        <CardBody className="p-0">
          {/* Header Section */}
          <div className="p-8 sm:p-12 bg-primary text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
              <Feather.FileText className="w-64 h-64 -rotate-12" />
            </div>
            
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <img src="/assets/images/favicon.png" alt="Minia" className="h-7 w-7" />
                  </div>
                  <span className="text-2xl font-black tracking-tighter">MINIA</span>
                </div>
                <div className="space-y-1 text-sm font-medium text-white/80">
                  <p>1874 County Line Road City, FL 33566</p>
                  <p>abc@123.com</p>
                  <p>012-345-6789</p>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-4xl font-black tracking-tight mb-2">INVOICE</h1>
                <p className="text-lg font-bold text-white/90">#12345</p>
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-12 space-y-12">
            {/* Info Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Billed To</h5>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white">Richard Saul</h4>
                  <div className="text-sm text-gray-500 font-medium space-y-0.5">
                    <p>1208 Sherwood Circle</p>
                    <p>Lafayette, LA 70506</p>
                    <p>RichardSaul@rhyta.com</p>
                    <p>337-256-9134</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-8">
                <div className="sm:text-right space-y-1">
                  <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Order Date</h5>
                  <p className="text-base font-bold text-gray-800 dark:text-white">February 16, 2024</p>
                </div>
                <div className="sm:text-right space-y-1">
                  <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Payment Method</h5>
                  <p className="text-base font-bold text-gray-800 dark:text-white">Visa ending **** 4242</p>
                  <p className="text-sm text-gray-500 font-medium">richards@email.com</p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Summary</h5>
              <div className="rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm">
                <Table columns={columns} data={lineItems} hoverable={false} />
                
                <div className="bg-gray-50/50 dark:bg-slate-900/50 p-6 flex flex-col items-end space-y-3">
                  <div className="flex items-center justify-between w-64 text-sm font-medium">
                    <span className="text-gray-500">Sub Total</span>
                    <span className="text-gray-800 dark:text-white">$998.00</span>
                  </div>
                  <div className="flex items-center justify-between w-64 text-sm font-medium">
                    <span className="text-gray-500">Tax (1.2%)</span>
                    <span className="text-gray-800 dark:text-white">$12.00</span>
                  </div>
                  <div className="w-64 border-t border-gray-200 dark:border-slate-700 my-2"></div>
                  <div className="flex items-center justify-between w-64">
                    <span className="text-base font-bold text-gray-800 dark:text-white">Grand Total</span>
                    <span className="text-2xl font-black text-primary">$1,010.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 d-print-none">
              <Button 
                variant="soft" 
                onClick={() => window.print()} 
                className="gap-2 h-11 px-6 font-bold"
              >
                <Feather.Printer className="w-4 h-4" />
                Print
              </Button>
              <Button 
                variant="primary" 
                className="gap-2 h-11 px-8 font-bold shadow-lg shadow-primary/20"
              >
                <Feather.Send className="w-4 h-4" />
                Send Invoice
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default InvoiceDetail;
