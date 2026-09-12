import React, { useState } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';

const FormUploads = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type,
      preview: URL.createObjectURL(file)
    }));
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <PageTitle 
        title="File Upload" 
        breadcrumbs={[
          { label: 'Forms', path: '#' },
          { label: 'File Upload', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 gap-6">
        <Card className="border-0 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Dropzone Upload</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Drag and drop files here or click to browse. Supports multiple files with instant preview.</p>
          </CardHeader>
          <CardBody>
             <div className="space-y-8">
                {/* Custom Dropzone */}
                <label className="relative block">
                   <input 
                      type="file" 
                      multiple 
                      className="sr-only" 
                      onChange={handleFileChange}
                   />
                   <div className="group border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-3xl p-12 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer bg-gray-50/50 dark:bg-slate-800/30">
                      <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                         <Feather.UploadCloud className="w-10 h-10 text-primary" />
                      </div>
                      <h5 className="text-lg font-bold text-gray-800 dark:text-white">Drop files here or click to upload</h5>
                      <p className="text-sm text-gray-500 mt-2 max-w-xs mx-auto">Selected files will be displayed below for your review before submission.</p>
                   </div>
                </label>

                {/* File Previews */}
                <AnimatePresence>
                   {files.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                         {files.map((file, idx) => (
                            <motion.div
                               key={idx}
                               initial={{ opacity: 0, scale: 0.9, y: 10 }}
                               animate={{ opacity: 1, scale: 1, y: 0 }}
                               exit={{ opacity: 0, scale: 0.9 }}
                               className="relative p-3 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm group"
                            >
                               <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
                                     {file.type.startsWith('image/') ? (
                                        <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                                     ) : (
                                        <Feather.File className="w-6 h-6 text-primary" />
                                     )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                     <p className="text-xs font-bold text-gray-800 dark:text-white truncate">{file.name}</p>
                                     <p className="text-[10px] text-gray-400 font-medium">{file.size}</p>
                                  </div>
                                  <button 
                                     onClick={() => removeFile(idx)}
                                     className="w-6 h-6 bg-danger/10 text-danger rounded-full flex items-center justify-center hover:bg-danger hover:text-white transition-colors"
                                  >
                                     <Feather.X className="w-3.5 h-3.5" />
                                  </button>
                               </div>
                            </motion.div>
                         ))}
                      </div>
                   )}
                </AnimatePresence>

                <div className="flex justify-center pt-6 border-t border-gray-100 dark:border-slate-700">
                   <Button 
                      className="px-10 py-6 text-base font-bold shadow-xl shadow-primary/20"
                      disabled={files.length === 0}
                   >
                      Submit {files.length > 0 && `(${files.length})`} Files
                   </Button>
                </div>
             </div>
          </CardBody>
        </Card>

        {/* Alternative State (Conceptual) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <Card className="border-0 shadow-sm">
              <CardBody className="flex items-center gap-6 p-6">
                 <div className="w-14 h-14 bg-success/10 text-success rounded-2xl flex items-center justify-center shrink-0">
                    <Feather.Shield className="w-7 h-7" />
                 </div>
                 <div>
                    <h6 className="font-bold text-gray-800 dark:text-white">Secure Transfer</h6>
                    <p className="text-xs text-gray-500 leading-relaxed">All uploads are encrypted via AES-256 and scanned for malware before storage.</p>
                 </div>
              </CardBody>
           </Card>
           <Card className="border-0 shadow-sm">
              <CardBody className="flex items-center gap-6 p-6">
                 <div className="w-14 h-14 bg-info/10 text-info rounded-2xl flex items-center justify-center shrink-0">
                    <Feather.Cloud className="w-7 h-7" />
                 </div>
                 <div>
                    <h6 className="font-bold text-gray-800 dark:text-white">Cloud Integration</h6>
                    <p className="text-xs text-gray-500 leading-relaxed">Directly import files from Google Drive, Dropbox, or OneDrive storage.</p>
                 </div>
              </CardBody>
           </Card>
        </div>
      </div>
    </div>
  );
};

export default FormUploads;
