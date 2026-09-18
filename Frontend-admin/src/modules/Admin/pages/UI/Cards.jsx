import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  CardFooter,
  PageTitle, 
  Button 
} from '../../../../components/ui';

const Cards = () => {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Cards" 
        breadcrumbs={[
          { label: 'Components', path: '#' },
          { label: 'Cards', active: true },
        ]} 
      />

      {/* Basic Cards with Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-xl transition-all duration-500">
          <div className="overflow-hidden aspect-video">
            <img 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              src="/assets/images/small/img-1.jpg" 
              alt="Card image" 
            />
          </div>
          <CardBody>
            <CardTitle className="mb-2">Modern Layouts</CardTitle>
            <p className="text-sm text-gray-500 font-medium mb-4">
              Beautifully crafted cards that adapt to any screen size with smooth hover effects.
            </p>
            <Button size="sm" className="w-full">Explore More</Button>
          </CardBody>
        </Card>

        <Card className="group">
          <div className="overflow-hidden aspect-video">
            <img 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              src="/assets/images/small/img-2.jpg" 
              alt="Card image" 
            />
          </div>
          <CardBody>
            <CardTitle className="mb-1">UI Components</CardTitle>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Essentials</p>
            <p className="text-sm text-gray-500 font-medium">
              A comprehensive library of reusable interface elements.
            </p>
          </CardBody>
          <CardFooter className="flex gap-4">
            <a href="#!" className="text-xs font-bold text-primary hover:underline">Documentation</a>
            <a href="#!" className="text-xs font-bold text-gray-500 hover:underline">Change Log</a>
          </CardFooter>
        </Card>

        <Card>
          <div className="overflow-hidden aspect-video">
            <img 
              className="w-full h-full object-cover" 
              src="/assets/images/small/img-3.jpg" 
              alt="Card image" 
            />
          </div>
          <CardBody>
             <p className="text-sm text-gray-500 font-medium italic">
               "Designing for the web should be as expressive as print, but with the power of interactivity."
             </p>
          </CardBody>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
             <CardTitle>Content Focus</CardTitle>
             <p className="text-xs text-gray-400 font-medium mt-1">Subtitle secondary text</p>
          </CardHeader>
          <div className="flex-1 overflow-hidden aspect-video">
            <img 
              className="w-full h-full object-cover" 
              src="/assets/images/small/img-4.jpg" 
              alt="Card image" 
            />
          </div>
          <CardBody>
            <p className="text-sm text-gray-500 font-medium">
              Centered image with header and body text wrapping.
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Glass & Colored Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card variant="glass" className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
             <div className="w-32 h-32 bg-primary rounded-full blur-3xl"></div>
          </div>
          <CardBody className="relative z-10">
            <CardTitle className="mb-3 text-primary">Glassmorphism Card</CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
              Using backdrop-blur and semi-transparent backgrounds to create a high-end, futuristic feel for your UI.
            </p>
          </CardBody>
          <CardFooter className="bg-transparent border-t border-gray-100 dark:border-slate-700/30">
             <Button variant="soft" size="sm">Try it now</Button>
          </CardFooter>
        </Card>

        <Card variant="primary">
          <CardBody>
            <CardTitle className="mb-3">Primary Action</CardTitle>
            <p className="text-sm text-white/80 font-medium leading-relaxed">
              Solid colored cards are perfect for drawing attention to critical information or main feature sets.
            </p>
          </CardBody>
          <CardFooter className="bg-white/10">
             <Button variant="light" size="sm" className="w-full">Get Started</Button>
          </CardFooter>
        </Card>

        <Card variant="success">
          <CardBody>
            <CardTitle className="mb-3 text-white">System Healthy</CardTitle>
            <p className="text-sm text-white/80 font-medium leading-relaxed">
              All services are currently operational. No issues detected in the last 24 hours.
            </p>
          </CardBody>
          <CardFooter className="bg-black/10">
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Last check: 2 mins ago</span>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Cards;
