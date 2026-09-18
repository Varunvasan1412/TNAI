import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardBody, Badge } from '../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../lib/utils';
import ModuleSelectionHeader from '../../components/Layout/ModuleSelectionHeader';

const modules = [
  {
    id: 1,
    name: 'CRM',
    icon: Feather.Users,
    color: 'bg-primary',
    desc: 'Manage leads, customers, follow-ups and business relationships.',
    path: '/admin/dashboard'
  }
  // { id: 2, name: 'Sales', icon: Feather.MessageSquare, color: 'bg-info', desc: 'Orders, dealers & revenue tracking.' },
  // { id: 3, name: 'Inventory', icon: Feather.Mail, color: 'bg-success', desc: 'Stock levels, raw materials & warehousing.' },
  // { id: 4, name: 'Quality', icon: Feather.FileText, color: 'bg-warning', desc: 'QC checks, compliance & batch testing.' },
  // { id: 5, name: 'Dispatch', icon: Feather.Users, color: 'bg-danger', desc: 'Shipments, logistics & delivery tracking.' },
  // { id: 6, name: 'Account', icon: Feather.Layout, color: 'bg-indigo-500', desc: 'Billing, ledgers & financial statements.' },
  // { id: 7, name: 'Reports', icon: Feather.Grid, color: 'bg-teal-500', desc: 'Analytics, dashboards & export tools.' },
  // { id: 8, name: 'HR Department', icon: Feather.Layers, color: 'bg-purple-500', desc: 'Payroll, attendance & employee records.'},
];

const ModuleSelection = () => {
  const navigate = useNavigate(); 

  const handleModuleClick = (path) => {
    navigate(path || '/dashboard');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col overflow-x-hidden">
      <ModuleSelectionHeader />

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 pt-24 md:pt-28">
        <div className="max-w-7xl w-full space-y-8 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <Badge variant="soft-primary" className="px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-black">
              Welcome back, Admin
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-white tracking-tight">
              Select a <span className="text-primary">Module</span> to Start
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
              Choose the application module you'd like to manage today. Each module is fully integrated with our atomic Tailwind system.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <motion.div key={module.id} variants={itemVariants}>
                  <Card
                    className="group cursor-pointer border-0 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden bg-white dark:bg-slate-800 h-full"
                    onClick={() => handleModuleClick(module.path)}
                  >
                    <CardBody className="p-8 xl:p-10 flex flex-col h-full justify-between">
                      <div className="flex items-start justify-between mb-6">
                        <div className={cn(
                          "w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 duration-300",
                          module.color
                        )}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-slate-700 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                          <Feather.ArrowRight className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-gray-800 dark:text-white group-hover:text-primary transition-colors tracking-tight mt-4">
                          {module.name}
                        </h3>
                        <p className="text-[15px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed mt-2">
                          {module.desc}
                        </p>
                      </div>
                    </CardBody>


                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center pt-8"
          >
            <p className="text-sm text-gray-500 font-medium">
              Need help? Contact our <span className="text-primary font-bold cursor-pointer hover:underline">Support Center</span> or view <span className="text-primary font-bold cursor-pointer hover:underline">Documentation</span>.
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ModuleSelection;
