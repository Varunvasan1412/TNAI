import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Button, 
  Badge 
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const FormEditors = () => {
    return (
        <div className="space-y-6">
            <PageTitle 
                title="Rich Text Editors" 
                breadcrumbs={[
                    { label: 'Forms', path: '#' },
                    { label: 'Form Editor', active: true },
                ]} 
            />

            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div>
                        <CardTitle>CKEditor 5 Classic</CardTitle>
                        <p className="text-xs text-gray-500 font-medium">Standard rich text editing experience for content management.</p>
                    </div>
                    <Badge variant="soft-primary" pill>CKEditor</Badge>
                </CardHeader>
                <CardBody className="p-0">
                    <div className="bg-white dark:bg-slate-900 min-h-[400px] flex flex-col">
                        {/* Editor Toolbar Mockup */}
                        <div className="p-3 border-b border-gray-100 dark:border-slate-800 flex flex-wrap gap-2 items-center bg-gray-50/50 dark:bg-slate-800/50">
                            <ToolbarGroup>
                                <ToolbarButton icon={Feather.Bold} />
                                <ToolbarButton icon={Feather.Italic} />
                                <ToolbarButton icon={Feather.Underline} />
                            </ToolbarGroup>
                            <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1" />
                            <ToolbarGroup>
                                <ToolbarButton icon={Feather.List} />
                                <ToolbarButton icon={Feather.Hash} />
                            </ToolbarGroup>
                            <div className="w-px h-6 bg-gray-200 dark:bg-slate-700 mx-1" />
                            <ToolbarGroup>
                                <ToolbarButton icon={Feather.Link} />
                                <ToolbarButton icon={Feather.Image} />
                                <ToolbarButton icon={Feather.Code} />
                            </ToolbarGroup>
                            <div className="flex-1" />
                            <Button variant="ghost" size="sm" icon={Feather.HelpCircle}>Markdown Support</Button>
                        </div>
                        
                        {/* Editor Content Area Mockup */}
                        <div className="flex-1 p-8 prose prose-slate dark:prose-invert max-w-none">
                            <h2 className="text-gray-800 dark:text-white font-extrabold tracking-tight">Draft your content here...</h2>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                The classic editor provides a familiar interface for creating rich content. 
                                It supports images, tables, and nested lists out of the box. 
                                <span className="text-primary cursor-text animate-pulse ml-1">|</span>
                            </p>
                            <div className="h-24 w-full bg-gray-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center space-y-2 group cursor-pointer hover:border-primary/50 transition-colors mt-8">
                                <Feather.Upload className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest group-hover:text-primary transition-colors">Drop files to upload</span>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <div className="px-6 py-4 border-t border-gray-50 dark:border-slate-800 flex justify-between items-center bg-gray-50/30 dark:bg-slate-800/30">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">324 Words</span>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm">Save Draft</Button>
                        <Button size="sm" className="px-6 shadow-lg shadow-primary/20">Publish Now</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const ToolbarGroup = ({ children }) => (
    <div className="flex items-center gap-0.5">
        {children}
    </div>
);

const ToolbarButton = ({ icon: Icon }) => (
    <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-white dark:hover:bg-slate-700 hover:text-primary hover:shadow-sm transition-all">
        <Icon className="w-4 h-4" />
    </button>
);

export default FormEditors;
