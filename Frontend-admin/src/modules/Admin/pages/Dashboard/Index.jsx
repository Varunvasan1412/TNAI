import React from 'react';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  CardTitle, 
  Badge, 
  PageTitle, 
  Button,
  Avatar,
  AvatarGroup,
  TableContainer,
  TBody,
  TR,
  TD
} from '../../components/ui';
import * as Feather from 'react-feather';

const Dashboard = () => {
  const statCards = [
    { title: 'Portfolio Balance', value: '$865,241', trend: '+12.5%', color: 'primary', icon: Feather.Briefcase },
    { title: 'Total Trades', value: '12,847', trend: '-2.4%', color: 'danger', icon: Feather.Activity },
    { title: 'Net Profit', value: '$43,210', trend: '+8.2%', color: 'success', icon: Feather.TrendingUp },
    { title: 'Growth Rate', value: '14.2%', trend: '+1.5%', color: 'info', icon: Feather.PieChart },
  ];

  const recentTransactions = [
    { id: 1, type: 'Buy', asset: 'Bitcoin', amount: '0.24 BTC', price: '$12,450', date: 'Oct 24, 2023', status: 'Completed', initials: 'BT' },
    { id: 2, type: 'Sell', asset: 'Ethereum', amount: '1.50 ETH', price: '$3,200', date: 'Oct 23, 2023', status: 'Pending', initials: 'ET' },
    { id: 3, type: 'Transfer', asset: 'Solana', amount: '42.0 SOL', price: '$1,840', date: 'Oct 22, 2023', status: 'Completed', initials: 'SL' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <PageTitle 
           title="Executive Overview" 
           breadcrumbs={[
             { label: 'Analytics', path: '/dashboard' },
             { label: 'Dashboard', active: true },
           ]} 
         />
         <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
               <Feather.Calendar className="w-4 h-4" /> Last 30 Days
            </Button>
            <Button className="gap-2 shadow-lg shadow-primary/20">
               <Feather.Plus className="w-4 h-4" /> New Investment
            </Button>
         </div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {statCards.map((stat, idx) => {
           const Icon = stat.icon;
           return (
              <motion.div key={idx} variants={item}>
                 <Card className="group border-0 shadow-sm hover:shadow-xl transition-all duration-300">
                    <CardBody className="p-6">
                       <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-2xl bg-${stat.color}/10 text-${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                             <Icon className="w-6 h-6" />
                          </div>
                          <Badge variant={stat.trend.startsWith('+') ? 'soft-success' : 'soft-danger'} size="sm" pill>
                             {stat.trend}
                          </Badge>
                       </div>
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.title}</p>
                       <h3 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">{stat.value}</h3>
                       <div className="mt-4 h-1 w-full bg-gray-50 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: '65%' }}
                             transition={{ duration: 1, delay: 0.5 }}
                             className={`h-full bg-${stat.color}`}
                          />
                       </div>
                    </CardBody>
                 </Card>
              </motion.div>
           );
        })}
      </motion.div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Market Analysis */}
        <Card className="lg:col-span-8 border-0 shadow-sm overflow-hidden">
           <CardHeader className="flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
              <div>
                 <CardTitle>Market Analysis</CardTitle>
                 <p className="text-xs text-gray-500">Global crypto and stock market trends</p>
              </div>
              <div className="flex gap-2">
                 <button className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-2 py-1 rounded">Volume</button>
                 <button className="text-[10px] font-bold uppercase text-gray-400 hover:text-primary px-2 py-1 transition-colors">Price</button>
              </div>
           </CardHeader>
           <CardBody className="h-[400px] relative flex items-center justify-center p-0 overflow-hidden">
              {/* Complex SVG Chart Simulation */}
              <div className="absolute inset-0 p-8 flex items-end justify-between gap-1 opacity-20">
                 {Array.from({length: 40}).map((_, i) => (
                    <motion.div 
                       key={i}
                       initial={{ height: 0 }}
                       animate={{ height: `${20 + Math.random() * 80}%` }}
                       transition={{ duration: 1, delay: i * 0.02, repeat: Infinity, repeatType: 'reverse' }}
                       className="flex-1 bg-primary rounded-t-sm"
                    />
                 ))}
              </div>
              <div className="relative z-10 text-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20">
                 <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Feather.PieChart className="w-8 h-8" />
                 </div>
                 <h4 className="text-xl font-bold text-gray-800 dark:text-white">ApexCharts Ready</h4>
                 <p className="text-sm text-gray-500 mt-2 max-w-xs">Integrate high-performance charts to visualize your portfolio growth.</p>
                 <Button variant="soft-primary" className="mt-6">Explore Datasets</Button>
              </div>
           </CardBody>
        </Card>

        {/* Top Assets */}
        <Card className="lg:col-span-4 border-0 shadow-sm">
           <CardHeader>
              <CardTitle>Portfolio Distribution</CardTitle>
           </CardHeader>
           <CardBody className="space-y-6">
              {[
                 { name: 'Bitcoin', symbol: 'BTC', val: '$14,250', pct: 45, color: 'primary' },
                 { name: 'Ethereum', symbol: 'ETH', val: '$8,120', pct: 28, color: 'info' },
                 { name: 'Solana', symbol: 'SOL', val: '$3,400', pct: 15, color: 'success' },
                 { name: 'Polkadot', symbol: 'DOT', val: '$1,200', pct: 12, color: 'warning' },
              ].map(asset => (
                 <div key={asset.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                       <span className="font-bold text-gray-800 dark:text-white">{asset.name}</span>
                       <span className="text-gray-400 font-mono">{asset.pct}%</span>
                    </div>
                    <div className="h-2 bg-gray-50 dark:bg-slate-800 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${asset.pct}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-full bg-${asset.color}`}
                       />
                    </div>
                 </div>
              ))}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Stake</p>
                       <h5 className="text-lg font-black text-gray-800 dark:text-white">$26,970.00</h5>
                    </div>
                    <Button variant="outline" size="sm">Manage Assets</Button>
                 </div>
              </div>
           </CardBody>
        </Card>

        {/* Recent Transactions */}
        <Card className="lg:col-span-12 border-0 shadow-sm overflow-hidden">
           <CardHeader className="flex justify-between items-center">
              <div>
                 <CardTitle>Recent Activity</CardTitle>
                 <p className="text-xs text-gray-500">Detailed logs of your latest financial operations</p>
              </div>
              <Button variant="ghost" size="sm" className="text-primary font-bold">View History</Button>
           </CardHeader>
           <CardBody className="p-0">
              <TableContainer className="rounded-none border-0 shadow-none">
                 <TBody>
                    {recentTransactions.map(tx => (
                       <TR key={tx.id} hover={false} className="border-b last:border-0 border-gray-50 dark:border-slate-700/50 hover:bg-gray-50/50 dark:hover:bg-slate-800/30">
                          <TD className="w-16">
                             <Avatar size="sm" fallback={tx.initials} className="bg-primary/10 text-primary font-bold" />
                          </TD>
                          <TD>
                             <div className="flex flex-col">
                                <span className="font-bold text-gray-800 dark:text-white">{tx.asset}</span>
                                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{tx.type}</span>
                             </div>
                          </TD>
                          <TD className="font-mono text-xs font-bold text-gray-600 dark:text-slate-400">{tx.amount}</TD>
                          <TD className="text-sm font-bold text-gray-800 dark:text-white">{tx.price}</TD>
                          <TD className="text-xs text-gray-400">{tx.date}</TD>
                          <TD className="text-right">
                             <Badge variant={tx.status === 'Completed' ? 'soft-success' : 'soft-warning'} size="sm">
                                {tx.status}
                             </Badge>
                          </TD>
                       </TR>
                    ))}
                 </TBody>
              </TableContainer>
           </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
