import React, { useState } from 'react';
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
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  Input,
  InputGroup,
  InputGroupText,
  Badge,
  Button
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const data = [
    { id: 1, name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: 61, startDate: '2011/04/25', salary: '$320,800', status: 'Full-time' },
    { id: 2, name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: 63, startDate: '2011/07/25', salary: '$170,750', status: 'Contract' },
    { id: 3, name: 'Ashton Cox', position: 'Junior Technical Author', office: 'San Francisco', age: 66, startDate: '2009/01/12', salary: '$86,000', status: 'Full-time' },
    { id: 4, name: 'Cedric Kelly', position: 'Senior Javascript Developer', office: 'Edinburgh', age: 22, startDate: '2012/03/29', salary: '$433,060', status: 'Remote' },
    { id: 5, name: 'Airi Satou', position: 'Accountant', office: 'Tokyo', age: 33, startDate: '2008/11/28', salary: '$162,700', status: 'Full-time' },
    { id: 6, name: 'Brielle Williamson', position: 'Integration Specialist', office: 'New York', age: 61, startDate: '2012/12/02', salary: '$372,000', status: 'Full-time' },
    { id: 7, name: 'Herrod Chandler', position: 'Sales Assistant', office: 'San Francisco', age: 59, startDate: '2012/08/06', salary: '$137,500', status: 'Contract' },
    { id: 8, name: 'Rhona Davidson', position: 'Integration Specialist', office: 'Tokyo', age: 55, startDate: '2010/10/14', salary: '$327,900', status: 'Full-time' },
    { id: 9, name: 'Colleen Hurst', position: 'Javascript Developer', office: 'San Francisco', age: 39, startDate: '2009/09/15', salary: '$205,500', status: 'Remote' },
    { id: 10, name: 'Sonya Frost', position: 'Software Engineer', office: 'Edinburgh', age: 23, startDate: '2008/12/13', salary: '$103,600', status: 'Full-time' },
];

const TablesDataTable = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 5;

    const filtered = data.filter(d => 
        d.name.toLowerCase().includes(search.toLowerCase()) || 
        d.position.toLowerCase().includes(search.toLowerCase()) || 
        d.office.toLowerCase().includes(search.toLowerCase())
    );
    const pages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="space-y-6">
            <PageTitle 
                title="Data Tables" 
                breadcrumbs={[
                    { label: 'Tables', path: '#' },
                    { label: 'Data Tables', active: true },
                ]} 
            />

            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <CardTitle>Employee Directory</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">A high-performance data table with advanced filtering and pagination.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <InputGroup className="w-full md:w-64">
                            <InputGroupText className="bg-transparent border-r-0">
                                <Feather.Search className="w-4 h-4 text-gray-400" />
                            </InputGroupText>
                            <Input 
                                placeholder="Filter records..." 
                                className="border-l-0 pl-0 focus:ring-0"
                                value={search}
                                onChange={e => { setSearch(e.target.value); setPage(1); }}
                            />
                        </InputGroup>
                        <Button variant="outline" size="icon" className="shrink-0">
                            <Feather.Download className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                    <TableContainer className="rounded-none border-0 shadow-none">
                        <THead>
                            <TR>
                                <TH className="w-12">ID</TH>
                                <TH>Employee</TH>
                                <TH>Position & Office</TH>
                                <TH>Joined Date</TH>
                                <TH>Salary</TH>
                                <TH>Status</TH>
                                <TH className="text-right">Actions</TH>
                            </TR>
                        </THead>
                        <TBody>
                            {paged.length > 0 ? paged.map(row => (
                                <TR key={row.id}>
                                    <TD className="font-mono text-[11px] font-bold text-gray-400">#{row.id.toString().padStart(3, '0')}</TD>
                                    <TD>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-800 dark:text-white leading-tight">{row.name}</span>
                                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">Age: {row.age}</span>
                                        </div>
                                    </TD>
                                    <TD>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-600 dark:text-slate-300">{row.position}</span>
                                            <span className="flex items-center gap-1 text-[10px] text-gray-400">
                                                <Feather.MapPin className="w-2.5 h-2.5" /> {row.office}
                                            </span>
                                        </div>
                                    </TD>
                                    <TD className="text-xs text-gray-500 font-medium">{row.startDate}</TD>
                                    <TD>
                                        <span className="text-sm font-bold text-gray-800 dark:text-white">{row.salary}</span>
                                    </TD>
                                    <TD>
                                        <Badge 
                                            variant={row.status === 'Full-time' ? 'soft-primary' : row.status === 'Remote' ? 'soft-success' : 'soft-info'} 
                                            size="sm"
                                        >
                                            {row.status}
                                        </Badge>
                                    </TD>
                                    <TD className="text-right">
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
                                            <Feather.MoreHorizontal className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </TD>
                                </TR>
                            )) : (
                                <TR>
                                    <TD colSpan={7} className="py-20 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Feather.Inbox className="w-12 h-12 mb-4 opacity-20" />
                                            <p className="text-sm font-medium">No matching records found</p>
                                        </div>
                                    </TD>
                                </TR>
                            )}
                        </TBody>
                    </TableContainer>
                </CardBody>
                <div className="p-6 border-t border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Showing {filtered.length > 0 ? ((page-1)*perPage)+1 : 0} to {Math.min(page*perPage, filtered.length)} of {filtered.length} entries
                    </div>
                    <Pagination>
                        <PaginationItem>
                            <PaginationPrevious 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); setPage(p => Math.max(1, p-1)); }}
                                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                        {Array.from({length: pages}, (_, i) => (
                            <PaginationItem key={i+1}>
                                <PaginationLink 
                                    href="#" 
                                    isActive={page === i+1}
                                    onClick={(e) => { e.preventDefault(); setPage(i+1); }}
                                >
                                    {i+1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); setPage(p => Math.min(pages, p+1)); }}
                                className={page === pages ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </Pagination>
                </div>
            </Card>
        </div>
    );
};

export default TablesDataTable;
