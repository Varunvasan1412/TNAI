import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Tabs, 
  TabList, 
  Tab, 
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Button
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const TabsAccordions = () => {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Tabs & Accordions" 
        breadcrumbs={[
          { label: 'Components', path: '#' },
          { label: 'Tabs & Accordions', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Default Tabs */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Default Tabs</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Standard line-style tabs with smooth transitions.</p>
          </CardHeader>
          <CardBody>
            <Tabs defaultValue="home">
              <TabList>
                <Tab value="home" icon={Feather.Home}>Home</Tab>
                <Tab value="profile" icon={Feather.User}>Profile</Tab>
                <Tab value="messages" icon={Feather.Mail}>Messages</Tab>
                <Tab value="settings" icon={Feather.Settings}>Settings</Tab>
              </TabList>
              <TabPanel value="home" className="pt-6">
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth.
                </p>
              </TabPanel>
              <TabPanel value="profile" className="pt-6">
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee.
                </p>
              </TabPanel>
              <TabPanel value="messages" className="pt-6">
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard.
                </p>
              </TabPanel>
              <TabPanel value="settings" className="pt-6">
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche.
                </p>
              </TabPanel>
            </Tabs>
          </CardBody>
        </Card>

        {/* Justified Pills Tabs */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Pills Tabs</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Modern pill-style navigation with shared background animation.</p>
          </CardHeader>
          <CardBody>
            <Tabs defaultValue="home" variant="pills">
              <TabList className="grid grid-cols-4">
                <Tab value="home">Home</Tab>
                <Tab value="profile">Profile</Tab>
                <Tab value="messages">Messages</Tab>
                <Tab value="settings">Settings</Tab>
              </TabList>
              <TabPanel value="home" className="pt-6">
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  A modern alternative to line tabs, providing a more contained and focused navigation experience within cards or sections.
                </p>
              </TabPanel>
              <TabPanel value="profile" className="pt-6">
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                   Pills work great for sub-navigation or filtering content within a dashboard view where multiple tabs are needed.
                </p>
              </TabPanel>
              {/* Panels for messages and settings omitted for brevity */}
            </Tabs>
          </CardBody>
        </Card>

        {/* Vertical Tabs */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Vertical Navigation</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Left-aligned vertical tabs for deep content hierarchies.</p>
          </CardHeader>
          <CardBody>
            <Tabs defaultValue="v-home" orientation="vertical">
              <TabList className="w-48">
                <Tab value="v-home" icon={Feather.Grid}>Overview</Tab>
                <Tab value="v-team" icon={Feather.Users}>Team Members</Tab>
                <Tab value="v-security" icon={Feather.Shield}>Security</Tab>
                <Tab value="v-billing" icon={Feather.CreditCard}>Billing Info</Tab>
              </TabList>
              <div className="flex-1">
                <TabPanel value="v-home">
                   <h5 className="text-base font-bold text-gray-800 dark:text-white mb-3">Overview</h5>
                   <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      Vertical tabs are ideal for settings pages or administrative views where you have many categories that don't fit horizontally. They provide a clear vertical scan line for the user.
                   </p>
                </TabPanel>
                <TabPanel value="v-team">
                   <h5 className="text-base font-bold text-gray-800 dark:text-white mb-3">Team Management</h5>
                   <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      Manage your team members, roles, and permissions from this central interface.
                   </p>
                </TabPanel>
                {/* Panels for security and billing omitted for brevity */}
              </div>
            </Tabs>
          </CardBody>
        </Card>

        {/* Accordions */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Collapsible Accordion</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Stacked content panels that expand and contract.</p>
          </CardHeader>
          <CardBody>
            <Accordion defaultValue="item-1" type="single">
              <AccordionItem value="item-1">
                <AccordionTrigger>Accordion Item #1</AccordionTrigger>
                <AccordionContent>
                  <p>
                    <strong>This is the first item's accordion body.</strong> It is shown by default. The transition and height management is handled automatically by Framer Motion for a smooth experience.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Accordion Item #2</AccordionTrigger>
                <AccordionContent>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Accordion Item #3</AccordionTrigger>
                <AccordionContent>
                  Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free carles. DIY synth PBR banksy irony.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Multi-Open Accordion */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Multi-Expandable</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Accordion that allows multiple items to stay open simultaneously.</p>
          </CardHeader>
          <CardBody>
            <Accordion type="multiple" className="border-none space-y-2">
              <AccordionItem value="m1" className="border rounded-xl">
                <AccordionTrigger className="hover:bg-transparent">Question #1</AccordionTrigger>
                <AccordionContent>You can open this and others at the same time.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="m2" className="border rounded-xl">
                <AccordionTrigger className="hover:bg-transparent">Question #2</AccordionTrigger>
                <AccordionContent>Each item's state is managed independently.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="m3" className="border rounded-xl">
                <AccordionTrigger className="hover:bg-transparent">Question #3</AccordionTrigger>
                <AccordionContent>Useful for FAQs where users might want to compare information.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default TabsAccordions;
