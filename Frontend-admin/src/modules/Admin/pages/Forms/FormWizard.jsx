import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Input, 
  FormLabel, 
  Textarea,
  Select,
  Button,
  Badge
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const FormWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Seller Details', icon: Feather.User, description: 'Personal Information' },
    { id: 2, title: 'Documents', icon: Feather.FileText, description: 'Business Verification' },
    { id: 3, title: 'Bank Details', icon: Feather.CreditCard, description: 'Payment Settlement' },
  ];

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  const direction = currentStep === 1 ? 0 : 1; // Simplistic direction for demo

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Form Wizard" 
        breadcrumbs={[
          { label: 'Forms', path: '#' },
          { label: 'Form Wizard', active: true },
        ]} 
      />

      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="bg-primary/5 dark:bg-slate-800/50 p-6 border-b border-gray-100 dark:border-slate-700">
           <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between relative">
                 {/* Progress Bar Background */}
                 <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-slate-700 -translate-y-1/2 z-0"></div>
                 {/* Active Progress Bar */}
                 <motion.div 
                    className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 origin-left"
                    animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                 />

                 {steps.map((step) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;

                    return (
                       <div key={step.id} className="relative z-10 flex flex-col items-center">
                          <motion.button
                             onClick={() => isCompleted && setCurrentStep(step.id)}
                             animate={{ 
                                scale: isActive ? 1.1 : 1,
                                backgroundColor: isActive || isCompleted ? 'var(--color-primary, #5156be)' : 'var(--bg-card, white)'
                             }}
                             className={`w-12 h-12 rounded-full flex items-center justify-center border-4 shadow-sm transition-colors ${
                                isActive || isCompleted 
                                   ? 'border-primary text-white' 
                                   : 'border-gray-200 dark:border-slate-700 text-gray-400 dark:bg-slate-800'
                             }`}
                          >
                             {isCompleted ? <Feather.Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                          </motion.button>
                          <div className="absolute top-14 text-center whitespace-nowrap">
                             <p className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                                {step.title}
                             </p>
                          </div>
                       </div>
                    );
                 })}
              </div>
           </div>
        </div>

        <CardBody className="p-8 pt-16">
           <div className="max-w-3xl mx-auto min-h-[400px]">
              <AnimatePresence mode="wait" custom={direction}>
                 <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                       x: { type: 'spring', stiffness: 300, damping: 30 },
                       opacity: { duration: 0.2 }
                    }}
                 >
                    {currentStep === 1 && (
                       <div className="space-y-6">
                          <div className="text-center mb-8">
                             <h4 className="text-xl font-bold text-gray-800 dark:text-white">Seller Information</h4>
                             <p className="text-sm text-gray-500">Please provide your personal contact details</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <FormLabel required>First Name</FormLabel>
                                <Input placeholder="Enter your first name" />
                             </div>
                             <div>
                                <FormLabel required>Last Name</FormLabel>
                                <Input placeholder="Enter your last name" />
                             </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <FormLabel>Phone Number</FormLabel>
                                <Input type="tel" placeholder="+1 (555) 000-0000" />
                             </div>
                             <div>
                                <FormLabel>Email Address</FormLabel>
                                <Input type="email" placeholder="john@example.com" />
                             </div>
                          </div>
                          <div>
                             <FormLabel>Residential Address</FormLabel>
                             <Textarea placeholder="Enter your full address" rows={3} />
                          </div>
                       </div>
                    )}

                    {currentStep === 2 && (
                       <div className="space-y-6">
                          <div className="text-center mb-8">
                             <h4 className="text-xl font-bold text-gray-800 dark:text-white">Company Documents</h4>
                             <p className="text-sm text-gray-500">Upload your business registration certificates</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <FormLabel required>PAN Card Number</FormLabel>
                                <Input placeholder="ABCDE1234F" />
                             </div>
                             <div>
                                <FormLabel required>VAT/TIN Registration</FormLabel>
                                <Input placeholder="Enter VAT Number" />
                             </div>
                          </div>
                          <div className="p-8 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl text-center hover:border-primary/50 transition-colors cursor-pointer group">
                             <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Feather.UploadCloud className="w-6 h-6" />
                             </div>
                             <p className="text-sm font-bold text-gray-800 dark:text-white">Click to upload document</p>
                             <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG (Max 5MB)</p>
                          </div>
                       </div>
                    )}

                    {currentStep === 3 && (
                       <div className="space-y-6">
                          <div className="text-center mb-8">
                             <h4 className="text-xl font-bold text-gray-800 dark:text-white">Bank & Settlement</h4>
                             <p className="text-sm text-gray-500">Configure where you'd like to receive payments</p>
                          </div>
                          <div>
                             <FormLabel>Name on Bank Account</FormLabel>
                             <Input placeholder="John Doe" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <FormLabel>Card Type</FormLabel>
                                <Select>
                                   <option>Visa</option>
                                   <option>MasterCard</option>
                                   <option>Amex</option>
                                </Select>
                             </div>
                             <div>
                                <FormLabel>Account Number</FormLabel>
                                <Input type="password" value="••••••••••••4242" readOnly />
                             </div>
                          </div>
                          <div className="bg-success/5 p-4 rounded-xl border border-success/10 flex items-start gap-3">
                             <div className="w-8 h-8 bg-success/10 text-success rounded-full flex items-center justify-center shrink-0">
                                <Feather.Info className="w-4 h-4" />
                             </div>
                             <p className="text-xs text-success/80 leading-relaxed">
                                Your payment information is encrypted and stored securely. Settlement happens every Friday at 12:00 PM UTC.
                             </p>
                          </div>
                       </div>
                    )}
                 </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-700 flex justify-between">
                 <Button 
                    variant="ghost" 
                    onClick={prevStep} 
                    disabled={currentStep === 1}
                    className="gap-2"
                 >
                    <Feather.ArrowLeft className="w-4 h-4" /> Previous
                 </Button>
                 
                 {currentStep < steps.length ? (
                    <Button onClick={nextStep} className="gap-2 px-8">
                       Next Step <Feather.ArrowRight className="w-4 h-4" />
                    </Button>
                 ) : (
                    <Button variant="success" className="gap-2 px-8 shadow-lg shadow-success/20">
                       Finish & Submit <Feather.CheckCircle className="w-4 h-4" />
                    </Button>
                 )}
              </div>
           </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default FormWizard;
