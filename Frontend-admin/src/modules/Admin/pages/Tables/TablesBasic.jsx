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

const TablesBasic = () => {
  const users = [
    { id: 1, name: 'Mark Otto', username: '@mdo', role: 'Administrator', status: 'Active', color: 'success', initials: 'MO' },
    { id: 2, name: 'Jacob Thornton', username: '@fat', role: 'Editor', status: 'Active', color: 'success', initials: 'JT' },
    { id: 3, name: 'Larry Bird', username: '@twitter', role: 'Author', status: 'Pending', color: 'warning', initials: 'LB' },
    { id: 4, name: 'John Doe', username: '@johndoe', role: 'Subscriber', status: 'Inactive', color: 'danger', initials: 'JD' },
    { id: 5, name: 'Ana Smith', username: '@asmith', role: 'Author', status: 'Active', color: 'success', initials: 'AS' },
  ];

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Basic Tables" 
        breadcrumbs={[
          { label: 'Tables', path: '#' },
          { label: 'Basic Tables', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 gap-6">
        {/* Modern Basic Table */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Standard View</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Clean, high-density table layout with premium typography and status indicators.</p>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <THead>
                <TR>
                  <TH className="w-12">#</TH>
                  <TH>User Information</TH>
                  <TH>Account Role</TH>
                  <TH>Status</TH>
                  <TH className="text-right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {users.map((user) => (
                  <TR key={user.id}>
                    <TD className="font-bold text-gray-400">0{user.id}</TD>
                    <TD>
                      <div className="flex items-center gap-3">
                        <Avatar size="sm" fallback={user.initials} className="bg-primary/10 text-primary" />
                        <div>
                          <p className="font-bold text-gray-800 dark:text-white leading-tight">{user.name}</p>
                          <p className="text-[11px] text-gray-400 font-mono tracking-tighter">{user.username}</p>
                        </div>
                      </div>
                    </TD>
                    <TD>
                      <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded-md text-gray-600 dark:text-slate-400">
                        {user.role}
                      </span>
                    </TD>
                    <TD>
                      <Badge variant={`soft-${user.color}`} size="sm">
                         <div className={`w-1.5 h-1.5 rounded-full bg-current mr-1.5`}></div>
                         {user.status}
                      </Badge>
                    </TD>
                    <TD className="text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 hover:bg-primary/10 text-gray-400 hover:text-primary rounded-lg transition-colors">
                          <Feather.Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 hover:bg-danger/10 text-gray-400 hover:text-danger rounded-lg transition-colors">
                          <Feather.Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </TableContainer>
          </CardBody>
        </Card>

        {/* Variations Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {/* Striped Table */}
           <Card className="border-0 shadow-sm overflow-hidden">
              <CardHeader>
                 <CardTitle>Striped Variant</CardTitle>
                 <p className="text-xs text-gray-500 font-medium">Zebra-striped rows for improved readability in dense data sets.</p>
              </CardHeader>
              <CardBody className="p-0">
                 <TableContainer className="rounded-none border-x-0 border-b-0 shadow-none">
                    <THead className="bg-gray-50/80 dark:bg-slate-800/80">
                       <TR>
                          <TH>Reference</TH>
                          <TH>Amount</TH>
                          <TH>Date</TH>
                       </TR>
                    </THead>
                    <TBody className="divide-y-0">
                       {[
                         { ref: 'ORD-7721', amount: '$540.00', date: 'Oct 24, 2023', color: 'success' },
                         { ref: 'ORD-7722', amount: '$1,200.00', date: 'Oct 23, 2023', color: 'primary' },
                         { ref: 'ORD-7723', amount: '$99.50', date: 'Oct 22, 2023', color: 'warning' },
                       ].map((item, idx) => (
                          <TR key={idx} className={idx % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50/30 dark:bg-slate-700/20'}>
                             <TD className="font-mono text-xs font-bold text-primary">{item.ref}</TD>
                             <TD className="font-bold text-gray-800 dark:text-white">{item.amount}</TD>
                             <TD className="text-xs text-gray-400">{item.date}</TD>
                          </TR>
                       ))}
                    </TBody>
                 </TableContainer>
              </CardBody>
           </Card>

           {/* Bordered Table */}
           <Card className="border-0 shadow-sm overflow-hidden">
              <CardHeader>
                 <CardTitle>Grid Variant</CardTitle>
                 <p className="text-xs text-gray-500 font-medium">Full grid borders for highly structured data views.</p>
              </CardHeader>
              <CardBody className="p-0">
                 <TableContainer className="rounded-none border-x-0 border-b-0 shadow-none">
                    <THead className="bg-gray-50/80 dark:bg-slate-800/80">
                       <TR>
                          <TH className="border-r border-gray-100 dark:border-slate-700">Project Name</TH>
                          <TH className="border-r border-gray-100 dark:border-slate-700">Priority</TH>
                          <TH>Completion</TH>
                       </TR>
                    </THead>
                    <TBody>
                       {[
                         { name: 'Minia React Admin', priority: 'High', progress: 85 },
                         { name: 'Skote Dashboard', priority: 'Medium', progress: 40 },
                         { name: 'Doot Chat App', priority: 'Low', progress: 100 },
                       ].map((item, idx) => (
                          <TR key={idx}>
                             <TD className="border-r border-gray-100 dark:border-slate-700 font-medium">{item.name}</TD>
                             <TD className="border-r border-gray-100 dark:border-slate-700">
                                <Badge variant={item.priority === 'High' ? 'soft-danger' : item.priority === 'Medium' ? 'soft-warning' : 'soft-info'} size="sm">
                                   {item.priority}
                                </Badge>
                             </TD>
                             <TD>
                                <div className="flex items-center gap-2">
                                   <div className="flex-1 h-1 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                      <div className={`h-full rounded-full ${item.progress === 100 ? 'bg-success' : 'bg-primary'}`} style={{ width: `${item.progress}%` }}></div>
                                   </div>
                                   <span className="text-[10px] font-bold text-gray-400">{item.progress}%</span>
                                </div>
                             </TD>
                          </TR>
                       ))}
                    </TBody>
                 </TableContainer>
              </CardBody>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default TablesBasic;
