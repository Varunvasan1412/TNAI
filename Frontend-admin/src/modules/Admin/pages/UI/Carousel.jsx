import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Carousel 
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const CarouselPage = () => {
  const slides = [
    {
      image: '/assets/images/small/img-1.jpg',
      title: 'First Slide Label',
      description: 'Some representative placeholder content for the first slide of the carousel.'
    },
    {
      image: '/assets/images/small/img-2.jpg',
      title: 'Second Slide Label',
      description: 'The second slide features a different high-resolution image with matched typography.'
    },
    {
      image: '/assets/images/small/img-3.jpg',
      title: 'Third Slide Label',
      description: 'Smooth transitions and elegant overlays make for a premium browsing experience.'
    }
  ];

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Carousel" 
        breadcrumbs={[
          { label: 'Components', path: '#' },
          { label: 'Carousel', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Standard Carousel */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Slides Only</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Standard carousel with automatic transitions and indicators.</p>
          </CardHeader>
          <CardBody>
            <Carousel items={slides} showArrows={true} />
          </CardBody>
        </Card>

        {/* Carousel with Captions */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>With Captions</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Add titles and descriptions to your slides with gradient overlays.</p>
          </CardHeader>
          <CardBody>
            <Carousel items={slides} interval={3000} />
          </CardBody>
        </Card>

        {/* Crossfade / Fade Effect Showcase (conceptual) */}
        <Card className="border-0 shadow-sm overflow-hidden lg:col-span-2">
          <CardHeader>
            <CardTitle>Interactive Experience</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Premium slide effects with spring physics and scale transitions.</p>
          </CardHeader>
          <CardBody className="max-w-4xl mx-auto">
            <Carousel 
              items={slides} 
              aspectRatio="aspect-[21/9]" 
              className="shadow-2xl" 
            />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="text-center p-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                     <FeatherIcon name="Zap" />
                  </div>
                  <h6 className="font-bold text-gray-800 dark:text-white">Fast Transitions</h6>
                  <p className="text-xs text-gray-500 mt-1">Optimized for performance and smoothness.</p>
               </div>
               <div className="text-center p-4">
                  <div className="w-10 h-10 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-3">
                     <FeatherIcon name="Layout" />
                  </div>
                  <h6 className="font-bold text-gray-800 dark:text-white">Responsive</h6>
                  <p className="text-xs text-gray-500 mt-1">Adapts perfectly to any screen size.</p>
               </div>
               <div className="text-center p-4">
                  <div className="w-10 h-10 bg-info/10 text-info rounded-full flex items-center justify-center mx-auto mb-3">
                     <FeatherIcon name="MousePointer" />
                  </div>
                  <h6 className="font-bold text-gray-800 dark:text-white">Interactive</h6>
                  <p className="text-xs text-gray-500 mt-1">Touch and click support for all devices.</p>
               </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};


const FeatherIcon = ({ name }) => {
  const Icon = Feather[name];
  if (!Icon) return null;
  return <Icon className="w-5 h-5" />;
};

export default CarouselPage;
