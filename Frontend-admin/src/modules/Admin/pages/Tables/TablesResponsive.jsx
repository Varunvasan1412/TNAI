import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  TableContainer, 
  THead, 
  TBody, 
  TR, 
  TH, 
  TD,
  Badge,
  Avatar
} from '../../../../components/ui';
import * as Feather from 'react-feather';
import { ArrowLeftRight } from 'lucide-react';

const TablesResponsive = () => (
    <div className="space-y-6">
        <PageTitle 
            title="Responsive Tables" 
            breadcrumbs={[
                { label: 'Tables', path: '#' },
                { label: 'Responsive', active: true },
            ]} 
        />

        <Card className="border-0 shadow-sm overflow-hidden">
            <CardHeader>
                <CardTitle>Horizontal Scrolling</CardTitle>
                <p className="text-xs text-gray-500 font-medium">Responsive tables allow data-heavy grids to be scrolled horizontally with ease on smaller viewports.</p>
            </CardHeader>
            <CardBody className="p-0">
                <TableContainer className="rounded-none border-0 shadow-none">
                    <THead className="bg-gray-50/50 dark:bg-slate-800/50">
                        <TR>
                            <TH className="w-12 whitespace-nowrap">#</TH>
                            <TH className="whitespace-nowrap">User Profile</TH>
                            <TH className="whitespace-nowrap">Position</TH>
                            <TH className="whitespace-nowrap">Contact Email</TH>
                            <TH className="whitespace-nowrap">Location</TH>
                            <TH className="whitespace-nowrap">Citizenship</TH>
                            <TH className="whitespace-nowrap text-center">Account Status</TH>
                            <TH className="whitespace-nowrap text-right">Last Login</TH>
                        </TR>
                    </THead>
                    <TBody>
                        {[
                            { id: 1, name: 'Mark Otto', user: '@mdo', role: 'System Admin', email: 'mark@example.com', city: 'New York', country: 'United States', status: 'Active', color: 'success', date: '2 mins ago' },
                            { id: 2, name: 'Jacob Thornton', user: '@fat', role: 'Content Editor', email: 'jacob@example.com', city: 'London', country: 'United Kingdom', status: 'Active', color: 'success', date: '5 hours ago' },
                            { id: 3, name: 'Larry Bird', user: '@twitter', role: 'Staff Author', email: 'larry@example.com', city: 'Tokyo', country: 'Japan', status: 'Pending', color: 'warning', date: '1 day ago' },
                            { id: 4, name: 'Sarah Connor', user: '@sconnor', role: 'Lead Developer', email: 'sarah@skynet.com', city: 'Los Angeles', country: 'United States', status: 'Active', color: 'success', date: '10 mins ago' },
                            { id: 5, name: 'John Wick', user: '@baba-yaga', role: 'Contractor', email: 'wick@continental.com', city: 'Rome', country: 'Italy', status: 'Inactive', color: 'danger', date: '1 week ago' },
                        ].map((row) => (
                            <TR key={row.id}>
                                <TD className="font-mono text-gray-400 font-bold">0{row.id}</TD>
                                <TD className="whitespace-nowrap">
                                   <div className="flex items-center gap-3">
                                      <Avatar size="sm" fallback={row.name.charAt(0)} className="bg-primary/10 text-primary font-bold" />
                                      <div className="flex flex-col">
                                         <span className="font-bold text-gray-800 dark:text-white leading-tight">{row.name}</span>
                                         <span className="text-[10px] text-gray-400 font-mono">{row.user}</span>
                                      </div>
                                   </div>
                                </TD>
                                <TD className="whitespace-nowrap">
                                   <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded text-gray-600 dark:text-slate-400">{row.role}</span>
                                </TD>
                                <TD className="whitespace-nowrap">
                                   <span className="text-sm text-primary hover:underline cursor-pointer">{row.email}</span>
                                </TD>
                                <TD className="whitespace-nowrap font-medium text-gray-700 dark:text-slate-300">{row.city}</TD>
                                <TD className="whitespace-nowrap text-gray-500">{row.country}</TD>
                                <TD className="whitespace-nowrap text-center">
                                   <Badge variant={`soft-${row.color}`} size="sm">
                                      <div className="w-1.5 h-1.5 rounded-full bg-current mr-1.5"></div>
                                      {row.status}
                                   </Badge>
                                </TD>
                                <TD className="whitespace-nowrap text-right">
                                   <div className="flex flex-col items-end">
                                      <span className="text-xs font-bold text-gray-800 dark:text-white">{row.date}</span>
                                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Via Web</span>
                                   </div>
                                </TD>
                            </TR>
                        ))}
                    </TBody>
                </TableContainer>
            </CardBody>
            <div className="p-4 bg-primary/5 dark:bg-slate-800/50 border-t border-primary/10 flex items-center justify-center gap-3">
               <ArrowLeftRight className="w-4 h-4 text-primary animate-pulse" />
               <p className="text-[10px] text-primary uppercase font-bold tracking-[0.2em]">Scroll horizontally to view more data</p>
            </div>
        </Card>
    </div>
);

export default TablesResponsive;
