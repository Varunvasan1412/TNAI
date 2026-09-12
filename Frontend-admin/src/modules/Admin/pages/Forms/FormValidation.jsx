import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Input, 
  FormLabel, 
  FormHelperText, 
  Checkbox, 
  Button,
  Select,
  InputGroup,
  InputGroupText,
  Tooltip
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const FormValidation = () => {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Form Validation" 
        breadcrumbs={[
          { label: 'Forms', path: '#' },
          { label: 'Form Validation', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Normal Validation States */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Validation States</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Visual feedback for required fields and formatting errors.</p>
          </CardHeader>
          <CardBody className="space-y-6">
            <form className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <FormLabel required>First Name</FormLabel>
                     <Input defaultValue="Mark" />
                     <FormHelperText className="text-success flex items-center gap-1">
                        <Feather.CheckCircle className="w-3 h-3" /> Looks good!
                     </FormHelperText>
                  </div>
                  <div>
                     <FormLabel required>Last Name</FormLabel>
                     <Input defaultValue="Otto" />
                     <FormHelperText className="text-success flex items-center gap-1">
                        <Feather.CheckCircle className="w-3 h-3" /> Looks good!
                     </FormHelperText>
                  </div>
               </div>
               <div>
                  <FormLabel required>City</FormLabel>
                  <Input error="Please provide a valid city." placeholder="City" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <FormLabel required>State</FormLabel>
                     <Input error="Invalid state" placeholder="State" />
                  </div>
                  <div>
                     <FormLabel required>Zip Code</FormLabel>
                     <Input error="Invalid zip" placeholder="Zip" />
                  </div>
               </div>
               <div>
                  <Checkbox label="Agree to terms and conditions" required className="border-danger" />
                  <FormHelperText error>You must agree before submitting.</FormHelperText>
               </div>
               <Button className="w-full md:w-auto">Submit Application</Button>
            </form>
          </CardBody>
        </Card>

        {/* Tooltip Validation */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Tooltip Validation</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Use tooltips for a more compact validation feedback layout.</p>
          </CardHeader>
          <CardBody className="space-y-6">
             <div className="space-y-6">
                <div>
                   <FormLabel>Username</FormLabel>
                   <div className="relative">
                      <InputGroup>
                         <InputGroupText>@</InputGroupText>
                         <Input error placeholder="Username" />
                      </InputGroup>
                      <div className="absolute -top-8 right-0">
                         <div className="bg-danger text-white text-[10px] px-2 py-1 rounded shadow-lg animate-bounce">
                            Choose a unique username
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4">
                   <div className="relative">
                      <FormLabel>Location</FormLabel>
                      <Input defaultValue="San Francisco" />
                      <div className="absolute -top-6 right-0">
                         <div className="bg-success text-white text-[10px] px-2 py-1 rounded shadow-lg">
                            Valid city
                         </div>
                      </div>
                   </div>
                   <div className="relative">
                      <FormLabel>Postal Code</FormLabel>
                      <Input error placeholder="94103" />
                      <div className="absolute -top-6 right-0">
                         <div className="bg-danger text-white text-[10px] px-2 py-1 rounded shadow-lg">
                            Zip required
                         </div>
                      </div>
                   </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-700">
                   <p className="text-xs text-gray-500 mb-3">Interactive validation example:</p>
                   <div className="flex items-center gap-3">
                      <Input placeholder="Type 'antigravity'..." />
                      <Tooltip content="Success! You found the secret key." position="right">
                         <div className="w-8 h-8 bg-success/10 text-success rounded-full flex items-center justify-center">
                            <Feather.Check className="w-4 h-4" />
                         </div>
                      </Tooltip>
                   </div>
                </div>
             </div>
          </CardBody>
        </Card>

        {/* Advanced Field Validations */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Real-time & Complex Validation</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Password strength, pattern matching, and data synchronization.</p>
          </CardHeader>
          <CardBody>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                   <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400">Password Security</h5>
                   <div>
                      <FormLabel>New Password</FormLabel>
                      <Input type="password" defaultValue="hunter2" error="Weak password" />
                      <div className="flex gap-1 mt-2">
                         <div className="h-1 flex-1 bg-danger rounded-full"></div>
                         <div className="h-1 flex-1 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                         <div className="h-1 flex-1 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                         <div className="h-1 flex-1 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                      </div>
                      <FormHelperText error>Minimum 8 characters, one number.</FormHelperText>
                   </div>
                </div>

                <div className="space-y-4">
                   <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400">Pattern Match</h5>
                   <div>
                      <FormLabel>Decimal Value</FormLabel>
                      <Input placeholder="0.00" error="Value must have 2 decimal points" />
                      <FormHelperText>Example: 12.99</FormHelperText>
                   </div>
                </div>

                <div className="space-y-4">
                   <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400">Selection Sync</h5>
                   <div>
                      <FormLabel>Account Type</FormLabel>
                      <Select error="Please select an account type">
                         <option value="">Select Type</option>
                         <option>Personal</option>
                         <option>Business</option>
                      </Select>
                   </div>
                </div>
             </div>

             <div className="mt-10 flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-slate-700">
                <Button variant="ghost">Reset Form</Button>
                <Button className="px-8">Save Profile</Button>
             </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default FormValidation;
