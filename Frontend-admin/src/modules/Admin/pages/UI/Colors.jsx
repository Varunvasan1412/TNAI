import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle 
} from '../../../../components/ui';

const Colors = () => {
  const mainColors = [
    { name: 'Primary', slug: 'primary', hex: '#5156be' },
    { name: 'Success', slug: 'success', hex: '#2ab57d' },
    { name: 'Info', slug: 'info', hex: '#4ba6ef' },
    { name: 'Warning', slug: 'warning', hex: '#ffbf53' },
    { name: 'Danger', slug: 'danger', hex: '#fd625e' },
    { name: 'Dark', slug: 'slate-800', hex: '#343a40' },
  ];

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Colors" 
        breadcrumbs={[
          { label: 'Components', path: '#' },
          { label: 'Colors', active: true },
        ]} 
      />

      {/* Main Brand Colors */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Brand Color Palette</CardTitle>
          <p className="text-xs text-gray-500 font-medium">The core color system used across the dashboard components.</p>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {mainColors.map((color) => (
               <div key={color.slug} className="space-y-3">
                  <div className={`h-24 w-full rounded-2xl bg-${color.slug} shadow-lg shadow-${color.slug}/20 flex items-end p-4 text-white`}>
                     <div>
                        <p className="text-sm font-bold">{color.name}</p>
                        <p className="text-[10px] font-mono opacity-80 uppercase">{color.hex}</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                     {[100, 200, 300, 700, 900].map(shade => (
                       <div key={shade} className="space-y-1">
                          <div className={`h-8 rounded-md bg-${color.slug}-${shade}`}></div>
                          <p className="text-[9px] text-center font-bold text-gray-400">{shade}</p>
                       </div>
                     ))}
                  </div>
               </div>
             ))}
          </div>
        </CardBody>
      </Card>

      {/* Extended Neutrals */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Neutrals & Grays</CardTitle>
          <p className="text-xs text-gray-500 font-medium">Standard gray scales used for borders, backgrounds, and text.</p>
        </CardHeader>
        <CardBody>
           <div className="space-y-8">
              <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Slate (Default Neutrals)</p>
                 <div className="flex flex-wrap gap-2">
                    {shades.map(shade => (
                      <div key={shade} className="flex-1 min-w-[60px] space-y-2">
                         <div className={`h-12 rounded-lg bg-slate-${shade} border border-black/5`}></div>
                         <p className="text-[10px] text-center font-medium text-gray-500">{shade}</p>
                      </div>
                    ))}
                 </div>
              </div>
              <div>
                 <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Utility Classes</p>
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <div className="p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                       <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">Soft Backgrounds</p>
                       <div className="h-8 bg-primary/10 rounded mb-1"></div>
                       <div className="h-8 bg-success/10 rounded"></div>
                    </div>
                    <div className="p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                       <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">Gradients</p>
                       <div className="h-8 bg-gradient-to-r from-primary to-info rounded mb-1"></div>
                       <div className="h-8 bg-gradient-to-r from-success to-primary rounded"></div>
                    </div>
                    <div className="p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                       <p className="text-[10px] text-gray-400 font-bold uppercase mb-2">Text Colors</p>
                       <p className="text-sm font-bold text-primary">Primary Text</p>
                       <p className="text-sm font-bold text-success">Success Text</p>
                    </div>
                 </div>
              </div>
           </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Colors;
