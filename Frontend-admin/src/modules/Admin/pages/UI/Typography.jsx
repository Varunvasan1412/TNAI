import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle 
} from '../../../../components/ui';

const Typography = () => {
  return (
    <div className="space-y-6">
      <PageTitle 
        title="Typography" 
        breadcrumbs={[
          { label: 'Components', path: '#' },
          { label: 'Typography', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Font Info */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center gap-6">
               <div className="text-8xl font-black text-gray-200 dark:text-slate-700 select-none">Aa</div>
               <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Primary Font</p>
                  <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Inter / IBM Plex Sans</h4>
                  <p className="text-sm text-gray-500 font-medium">Standard body and heading font for the dashboard.</p>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-l border-gray-100 dark:border-slate-700 pl-8">
               <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Weights</p>
                  <div className="space-y-1">
                     <p className="font-light text-sm">Light (300)</p>
                     <p className="font-normal text-sm">Regular (400)</p>
                     <p className="font-medium text-sm">Medium (500)</p>
                     <p className="font-semibold text-sm">Semibold (600)</p>
                     <p className="font-bold text-sm">Bold (700)</p>
                  </div>
               </div>
               <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Metrics</p>
                  <div className="space-y-1">
                     <p className="text-sm">Base: 16px</p>
                     <p className="text-sm">Line Height: 1.5</p>
                     <p className="text-sm">Letter Spacing: -0.01em</p>
                  </div>
               </div>
            </div>
          </CardBody>
        </Card>

        {/* Headings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Headings</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Semantic heading elements with responsive sizing.</p>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-baseline justify-between border-b border-gray-50 dark:border-slate-700 pb-2">
               <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Heading 1</h1>
               <span className="text-xs text-gray-400 font-mono">text-4xl</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-gray-50 dark:border-slate-700 pb-2">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Heading 2</h2>
               <span className="text-xs text-gray-400 font-mono">text-3xl</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-gray-50 dark:border-slate-700 pb-2">
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Heading 3</h3>
               <span className="text-xs text-gray-400 font-mono">text-2xl</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-gray-50 dark:border-slate-700 pb-2">
               <h4 className="text-xl font-bold text-gray-900 dark:text-white">Heading 4</h4>
               <span className="text-xs text-gray-400 font-mono">text-xl</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-gray-50 dark:border-slate-700 pb-2">
               <h5 className="text-lg font-bold text-gray-900 dark:text-white">Heading 5</h5>
               <span className="text-xs text-gray-400 font-mono">text-lg</span>
            </div>
            <div className="flex items-baseline justify-between">
               <h6 className="text-base font-bold text-gray-900 dark:text-white">Heading 6</h6>
               <span className="text-xs text-gray-400 font-mono">text-base</span>
            </div>
          </CardBody>
        </Card>

        {/* Display Headings */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Display Headings</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Large, high-impact headings for hero sections.</p>
          </CardHeader>
          <CardBody className="space-y-6">
            <h1 className="text-8xl font-black text-gray-900 dark:text-white tracking-tighter">Display 1</h1>
            <h1 className="text-7xl font-black text-gray-900 dark:text-white tracking-tighter">Display 2</h1>
            <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">Display 3</h1>
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">Display 4</h1>
          </CardBody>
        </Card>

        {/* Inline Elements */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Inline text elements</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Styling for common inline text elements.</p>
          </CardHeader>
          <CardBody className="space-y-3">
             <p className="text-lg text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
               This is a lead paragraph that stands out from regular text.
             </p>
             <p className="text-sm">You can use the mark tag to <mark className="bg-yellow-100 dark:bg-yellow-900/50 dark:text-yellow-200 px-1 rounded">highlight</mark> important text.</p>
             <p className="text-sm"><del className="text-gray-400">This line of text is meant to be treated as deleted text.</del></p>
             <p className="text-sm"><u>This line of text will render as underlined</u></p>
             <p className="text-sm"><strong>This line rendered as bold text.</strong></p>
             <p className="text-sm"><em>This line rendered as italicized text.</em></p>
             <p className="text-sm font-mono text-primary bg-primary/5 px-1.5 py-0.5 rounded">inline-code-snippet</p>
          </CardBody>
        </Card>

        {/* Lists & Blockquotes */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Quotes & Lists</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Styled blockquotes and list structures.</p>
          </CardHeader>
          <CardBody className="space-y-6">
            <blockquote className="border-l-4 border-primary pl-4 py-1 italic text-gray-700 dark:text-gray-300">
               <p className="text-base mb-2">"The details are not the details. They make the design."</p>
               <footer className="text-xs font-bold text-gray-400 uppercase tracking-widest">— Charles Eames</footer>
            </blockquote>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">Unordered</p>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400">
                     <li>Navigation components</li>
                     <li>Data visualization</li>
                     <li>Form validation</li>
                  </ul>
               </div>
               <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">Ordered</p>
                  <ol className="list-decimal list-inside text-sm space-y-1 text-gray-600 dark:text-gray-400">
                     <li>Install dependencies</li>
                     <li>Configure environment</li>
                     <li>Run development server</li>
                  </ol>
               </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Typography;
