import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Input, 
  Select, 
  Textarea, 
  FormLabel, 
  FormHelperText, 
  Checkbox, 
  Radio, 
  Switch, 
  InputGroup, 
  InputGroupText,
  Button
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const FormElements = () => {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Form Elements" 
        breadcrumbs={[
          { label: 'Forms', path: '#' },
          { label: 'Basic Elements', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Textual Inputs */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Textual Inputs</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Standard text-based input fields with various types and states.</p>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <FormLabel required>Standard Text</FormLabel>
              <Input placeholder="Enter your name" defaultValue="Artisanal kale" />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <FormLabel>Email Address</FormLabel>
                  <Input type="email" placeholder="name@example.com" />
               </div>
               <div>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="••••••••" />
               </div>
            </div>
            <div>
              <FormLabel>Search</FormLabel>
              <Input type="search" placeholder="Type to search..." />
              <FormHelperText>Try searching for "How do I shoot web"</FormHelperText>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <FormLabel>Telephone</FormLabel>
                  <Input type="tel" defaultValue="1-(555)-555-5555" />
               </div>
               <div>
                  <FormLabel>Number</FormLabel>
                  <Input type="number" defaultValue="42" />
               </div>
            </div>
            <div>
              <FormLabel>Date & Time</FormLabel>
              <Input type="datetime-local" defaultValue="2023-05-07T13:45" />
            </div>
          </CardBody>
        </Card>

        {/* Advanced & Selection */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Selection & Special</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Dropdowns, range inputs, and other non-textual elements.</p>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <FormLabel>Native Select</FormLabel>
              <Select defaultValue="large">
                 <option value="default">Open this select menu</option>
                 <option value="large">Large select</option>
                 <option value="small">Small select</option>
              </Select>
            </div>
            <div>
              <FormLabel>Color Picker</FormLabel>
              <div className="flex items-center gap-3">
                 <input type="color" className="w-12 h-10 rounded border border-gray-200 dark:border-slate-700 bg-white p-1 cursor-pointer" defaultValue="#5156be" />
                 <span className="text-sm font-mono text-gray-500">#5156be</span>
              </div>
            </div>
            <div>
               <FormLabel>Range Control</FormLabel>
               <input type="range" className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary" />
               <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-1 uppercase">
                  <span>Min: 0</span>
                  <span>Max: 100</span>
               </div>
            </div>
            <div>
              <FormLabel>Textarea</FormLabel>
              <Textarea placeholder="Write your message here..." rows={4} />
            </div>
          </CardBody>
        </Card>

        {/* Input Groups */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Input Groups</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Extend form controls by adding text, buttons, or button groups on either side.</p>
          </CardHeader>
          <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <InputGroup>
                  <InputGroupText>@</InputGroupText>
                  <Input placeholder="Username" />
               </InputGroup>
               <InputGroup>
                  <Input placeholder="Recipient's username" />
                  <InputGroupText>@example.com</InputGroupText>
               </InputGroup>
               <InputGroup>
                  <InputGroupText>$</InputGroupText>
                  <Input type="number" placeholder="Amount" />
                  <InputGroupText>.00</InputGroupText>
               </InputGroup>
            </div>
            <div className="space-y-4">
               <InputGroup>
                  <Input placeholder="Search project..." />
                  <Button className="rounded-l-none">Search</Button>
               </InputGroup>
               <InputGroup>
                  <Button variant="soft-info" className="rounded-r-none">Options</Button>
                  <Input placeholder="Config parameter..." />
               </InputGroup>
               <InputGroup>
                  <InputGroupText className="bg-primary/5"><Feather.Link className="w-4 h-4 text-primary" /></InputGroupText>
                  <Input defaultValue="https://minia.react/dashboard/analytics" readOnly />
                  <Button variant="outline" className="rounded-l-none">Copy</Button>
               </InputGroup>
            </div>
          </CardBody>
        </Card>

        {/* Checkboxes, Radios & Switches */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Checks & Radios</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Multiple choice and binary selection components.</p>
          </CardHeader>
          <CardBody className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
               <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Checkboxes</h5>
               <div className="space-y-2 flex flex-col">
                  <Checkbox label="Default Checkbox" id="c1" />
                  <Checkbox label="Checked by Default" id="c2" defaultChecked />
                  <Checkbox label="Disabled Checkbox" id="c3" disabled />
               </div>
            </div>
            <div className="space-y-4">
               <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Radio Buttons</h5>
               <div className="space-y-2 flex flex-col">
                  <Radio name="radio-group" label="Option One" id="r1" defaultChecked />
                  <Radio name="radio-group" label="Option Two" id="r2" />
                  <Radio name="radio-group" label="Disabled Radio" id="r3" disabled />
               </div>
            </div>
          </CardBody>
        </Card>

        {/* Switches */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Toggle Switches</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Modern alternative to checkboxes for binary settings.</p>
          </CardHeader>
          <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
               <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Examples</h5>
               <div className="space-y-3 flex flex-col">
                  <Switch label="Enable Notifications" defaultChecked />
                  <Switch label="Dark Mode" />
                  <Switch label="Read Only Access" disabled />
               </div>
            </div>
            <div className="space-y-4">
               <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Visual States</h5>
               <div className="space-y-3 flex flex-col">
                  <Switch label="Primary Toggle" className="peer-checked:bg-primary" defaultChecked />
                  <Switch label="Success Toggle" className="peer-checked:bg-success" defaultChecked />
                  <Switch label="Danger Toggle" className="peer-checked:bg-danger" defaultChecked />
               </div>
            </div>
          </CardBody>
        </Card>

        {/* Form Layouts Showcase */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Layout Examples</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Horizontal, stacked, and grid-based form architectures.</p>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               {/* Vertical / Stacked */}
               <form className="space-y-4">
                  <h5 className="text-sm font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                     <div className="w-1.5 h-4 bg-primary rounded-full"></div> Vertical Form
                  </h5>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <FormLabel>First Name</FormLabel>
                        <Input placeholder="John" />
                     </div>
                     <div>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder="Doe" />
                     </div>
                  </div>
                  <div>
                     <FormLabel>Work Email</FormLabel>
                     <Input type="email" placeholder="john@company.com" />
                  </div>
                  <div>
                     <FormLabel>Password</FormLabel>
                     <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="pt-2">
                     <Checkbox label="I agree to the Terms of Service" />
                  </div>
                  <Button className="w-full md:w-auto px-10">Register Account</Button>
               </form>

               {/* Horizontal */}
               <div className="space-y-4">
                  <h5 className="text-sm font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                     <div className="w-1.5 h-4 bg-success rounded-full"></div> Horizontal Form
                  </h5>
                  <div className="space-y-5">
                     <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="mb-0 text-right">Full Name</FormLabel>
                        <div className="col-span-3">
                           <Input placeholder="Enter your full name" />
                        </div>
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <FormLabel className="mb-0 text-right">Department</FormLabel>
                        <div className="col-span-3">
                           <Select>
                              <option>Engineering</option>
                              <option>Product Design</option>
                              <option>Marketing</option>
                           </Select>
                        </div>
                     </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                        <FormLabel className="mt-2 text-right">Biography</FormLabel>
                        <div className="col-span-3">
                           <Textarea placeholder="Tell us about yourself..." rows={3} />
                        </div>
                     </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <div className="col-start-2 col-span-3">
                           <Switch label="Sign me up for the newsletter" defaultChecked />
                        </div>
                     </div>
                     <div className="grid grid-cols-4 gap-4 pt-2">
                        <div className="col-start-2 col-span-3 flex gap-3">
                           <Button variant="soft-success">Save Changes</Button>
                           <Button variant="ghost">Cancel</Button>
                        </div>
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

export default FormElements;
