import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Input, 
  FormLabel,
  InputGroup,
  InputGroupText,
  Badge
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const FormMask = () => {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Input Mask" 
        breadcrumbs={[
          { label: 'Forms', path: '#' },
          { label: 'Form Mask', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Input Formatting</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Enforce specific formats for user inputs like phone numbers, dates, and currency.</p>
          </CardHeader>
          <CardBody>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Contact Information */}
                <div className="space-y-6">
                   <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                      <Feather.Phone className="w-3 h-3" /> Contact Information
                   </h5>
                   <div>
                      <FormLabel>International Phone</FormLabel>
                      <InputGroup>
                         <InputGroupText className="bg-primary/5">+1</InputGroupText>
                         <Input placeholder="(000) 000-0000" />
                      </InputGroup>
                      <p className="text-[10px] font-mono text-gray-400 mt-1.5 uppercase">Format: +1 (XXX) XXX-XXXX</p>
                   </div>
                   <div>
                      <FormLabel>Postal Code (RegExp)</FormLabel>
                      <Input placeholder="123456" />
                      <p className="text-[10px] font-mono text-gray-400 mt-1.5 uppercase">Pattern: /^[1-6]\d{'{0,5}'}$/</p>
                   </div>
                </div>

                {/* Financial & Data */}
                <div className="space-y-6">
                   <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                      <Feather.DollarSign className="w-3 h-3" /> Financial & Data
                   </h5>
                   <div>
                      <FormLabel>Currency (Mask in Mask)</FormLabel>
                      <InputGroup>
                         <InputGroupText>$</InputGroupText>
                         <Input placeholder="0.00" className="text-right" />
                         <InputGroupText>USD</InputGroupText>
                      </InputGroup>
                      <p className="text-[10px] font-mono text-gray-400 mt-1.5 uppercase">Auto-formatted decimal input</p>
                   </div>
                   <div>
                      <FormLabel>Credit Card</FormLabel>
                      <div className="relative">
                         <Input placeholder="0000 0000 0000 0000" />
                         <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                            <div className="w-6 h-4 bg-gray-200 rounded-sm"></div>
                            <div className="w-6 h-4 bg-gray-200 rounded-sm"></div>
                         </div>
                      </div>
                      <p className="text-[10px] font-mono text-gray-400 mt-1.5 uppercase">Groups of 4 digits</p>
                   </div>
                </div>

                {/* Time & Date */}
                <div className="space-y-6">
                   <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                      <Feather.Calendar className="w-3 h-3" /> Time & Date
                   </h5>
                   <div>
                      <FormLabel>Date Format</FormLabel>
                      <Input placeholder="DD/MM/YYYY" />
                      <p className="text-[10px] font-mono text-gray-400 mt-1.5 uppercase">Range: [01.01.1990, 31.12.2025]</p>
                   </div>
                   <div>
                      <FormLabel>IPv4 Address</FormLabel>
                      <Input placeholder="192.168.1.1" />
                      <p className="text-[10px] font-mono text-gray-400 mt-1.5 uppercase">4 groups of 0-255</p>
                   </div>
                </div>

                {/* Dynamic Masks */}
                <div className="space-y-6">
                   <h5 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                      <Feather.Zap className="w-3 h-3" /> Dynamic Logic
                   </h5>
                   <div>
                      <FormLabel>On-the-fly Select</FormLabel>
                      <Input placeholder="Enter Phone or Email" />
                      <p className="text-[10px] font-mono text-gray-400 mt-1.5 uppercase">Switches mask based on input type</p>
                   </div>
                   <div className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700">
                      <div className="flex items-start gap-3">
                         <div className="w-8 h-8 bg-info/10 text-info rounded-full flex items-center justify-center shrink-0">
                            <Feather.Info className="w-4 h-4" />
                         </div>
                         <p className="text-xs text-gray-500 leading-relaxed">
                            Input masking improves data quality by guiding users to enter information in the expected format. We recommend using <span className="font-bold text-primary">imask.js</span> for production implementations.
                         </p>
                      </div>
                   </div>
                </div>
             </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default FormMask;
