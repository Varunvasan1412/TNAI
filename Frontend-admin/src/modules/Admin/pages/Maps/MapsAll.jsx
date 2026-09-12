import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Badge,
  Button
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const MapPlaceholder = ({ title, type = 'google', library = 'Google Maps' }) => (
  <div className="flex flex-col items-center justify-center py-24 px-4 bg-gray-50/50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-gray-200 dark:border-slate-700 group hover:border-primary/30 transition-all overflow-hidden relative">
     {/* Decorative Map Pattern */}
     <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
           <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
           </defs>
           <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
     </div>

    <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10">
      {type === 'google' && <Feather.MapPin className="w-12 h-12 text-primary" />}
      {type === 'vector' && <Feather.Globe className="w-12 h-12 text-info" />}
      {type === 'satellite' && <Feather.Layers className="w-12 h-12 text-success" />}
    </div>
    
    <div className="relative z-10 text-center">
       <h5 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h5>
       <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
          Integrate with <span className="font-bold text-primary">{library}</span> for immersive location-based services. 
          Includes markers, cluster support, and custom theme layering.
       </p>
       <div className="mt-8 flex justify-center gap-3">
          <Button variant="soft-primary" className="font-bold px-8">
             Enable Services
          </Button>
          <Button variant="ghost" className="font-bold">
             API Settings
          </Button>
       </div>
    </div>
  </div>
);

export const MapsGoogle = () => (
  <div className="space-y-6">
    <PageTitle title="Google Maps" breadcrumbs={[{ label: 'Maps', path: '#' }, { label: 'Google Maps', active: true }]} />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader><CardTitle>Basic Map Layout</CardTitle></CardHeader>
          <CardBody className="p-2">
             <MapPlaceholder title="Street View Integration" type="google" />
          </CardBody>
       </Card>
       <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader><CardTitle>Satellite Discovery</CardTitle></CardHeader>
          <CardBody className="p-2">
             <MapPlaceholder title="Orbital Imaging" type="satellite" library="Google Satellite API" />
          </CardBody>
       </Card>
    </div>
  </div>
);

export const MapsVector = () => (
  <div className="space-y-6">
    <PageTitle title="Vector Maps" breadcrumbs={[{ label: 'Maps', path: '#' }, { label: 'Vector Maps', active: true }]} />
    <Card className="border-0 shadow-sm overflow-hidden">
      <CardHeader>
         <div className="flex justify-between items-center w-full">
            <CardTitle>Global Distribution</CardTitle>
            <Badge variant="soft-info">jsvectormap</Badge>
         </div>
      </CardHeader>
      <CardBody className="p-2">
        <MapPlaceholder title="World Vector Representation" type="vector" library="JSVectorMap" />
      </CardBody>
    </Card>
  </div>
);

export const MapsLeaflet = () => (
  <div className="space-y-6">
    <PageTitle title="Leaflet Maps" breadcrumbs={[{ label: 'Maps', path: '#' }, { label: 'Leaflet', active: true }]} />
    <Card className="border-0 shadow-sm overflow-hidden">
      <CardHeader>
         <div className="flex justify-between items-center w-full">
            <CardTitle>OpenSource Mapping</CardTitle>
            <Badge variant="soft-primary">Leaflet v1.9</Badge>
         </div>
      </CardHeader>
      <CardBody className="p-2">
        <MapPlaceholder title="Interactive Leaflet Grid" type="google" library="Leaflet.js" />
      </CardBody>
    </Card>
  </div>
);
