import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button,
  Input,
  FormLabel
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const Modals = () => {
  const [modalStates, setModalStates] = useState({
    standard: false,
    small: false,
    large: false,
    xlarge: false,
    full: false,
    centered: false,
    static: false,
    glass: false,
    form: false
  });

  const toggleModal = (key) => {
    setModalStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Modals" 
        breadcrumbs={[
          { label: 'Components', path: '#' },
          { label: 'Modals', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Standard Modals */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Standard Modals</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Versatile dialog boxes for general purpose interactions.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-3">
            <Button onClick={() => toggleModal('standard')}>Standard Modal</Button>
            <Button variant="soft" onClick={() => toggleModal('centered')}>Centered Modal</Button>
            <Button variant="outline" onClick={() => toggleModal('glass')}>Glassmorphism</Button>
          </CardBody>
        </Card>

        {/* Modal Sizes */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Optional Sizes</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Choose from various sizes to fit your content requirements.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-3">
            <Button variant="soft-info" onClick={() => toggleModal('small')}>Small</Button>
            <Button variant="soft-info" onClick={() => toggleModal('large')}>Large</Button>
            <Button variant="soft-info" onClick={() => toggleModal('xlarge')}>Extra Large</Button>
            <Button variant="soft-info" onClick={() => toggleModal('full')}>Fullscreen</Button>
          </CardBody>
        </Card>

        {/* Special Behaviors */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Behaviors & Context</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Static backdrops, scrollable content, and form integrations.</p>
          </CardHeader>
          <CardBody className="flex flex-wrap gap-3">
            <Button variant="soft-danger" onClick={() => toggleModal('static')}>Static Backdrop</Button>
            <Button variant="primary" onClick={() => toggleModal('form')}>Form Modal</Button>
          </CardBody>
        </Card>
      </div>

      {/* --- Actual Modal Components --- */}

      {/* Standard */}
      <Modal isOpen={modalStates.standard} onClose={() => toggleModal('standard')}>
        <ModalHeader onClose={() => toggleModal('standard')}>Modal Heading</ModalHeader>
        <ModalBody>
           <h5 className="text-base font-bold mb-2">Overflowing text example</h5>
           <p className="text-sm text-gray-500 font-medium leading-relaxed">
             Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
           </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => toggleModal('standard')}>Close</Button>
          <Button onClick={() => toggleModal('standard')}>Save Changes</Button>
        </ModalFooter>
      </Modal>

      {/* Centered */}
      <Modal isOpen={modalStates.centered} onClose={() => toggleModal('centered')}>
        <ModalHeader onClose={() => toggleModal('centered')}>Vertically Centered</ModalHeader>
        <ModalBody className="text-center py-10">
           <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Feather.CheckCircle className="w-8 h-8" />
           </div>
           <h5 className="text-lg font-bold mb-2">Operation Successful</h5>
           <p className="text-sm text-gray-500 font-medium px-6">
             Your profile information has been updated successfully. All changes are now live.
           </p>
        </ModalBody>
        <ModalFooter>
           <Button className="w-full" onClick={() => toggleModal('centered')}>Understood</Button>
        </ModalFooter>
      </Modal>

      {/* Glass */}
      <Modal isOpen={modalStates.glass} onClose={() => toggleModal('glass')} variant="glass">
        <ModalHeader onClose={() => toggleModal('glass')} className="border-white/10">Premium Glassmorphism</ModalHeader>
        <ModalBody>
           <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
             This modal uses backdrop-blur and a semi-transparent background for a modern, high-end aesthetic that stands out from standard UI patterns.
           </p>
        </ModalBody>
        <ModalFooter className="border-white/10">
           <Button variant="primary" onClick={() => toggleModal('glass')}>Continue</Button>
        </ModalFooter>
      </Modal>

      {/* Static */}
      <Modal 
        isOpen={modalStates.static} 
        onClose={() => toggleModal('static')} 
        closeOnOverlay={false}
      >
        <ModalHeader onClose={() => toggleModal('static')}>Static Backdrop</ModalHeader>
        <ModalBody>
           <p className="text-sm text-gray-500 font-medium">
             I will not close if you click outside me. You must explicitly click the close button or an action button to dismiss this dialog.
           </p>
        </ModalBody>
        <ModalFooter>
           <Button variant="ghost" onClick={() => toggleModal('static')}>Cancel</Button>
           <Button variant="danger" onClick={() => toggleModal('static')}>Confirm Delete</Button>
        </ModalFooter>
      </Modal>

      {/* Form */}
      <Modal isOpen={modalStates.form} onClose={() => toggleModal('form')} size="md">
        <ModalHeader onClose={() => toggleModal('form')}>Create New Post</ModalHeader>
        <ModalBody className="space-y-4">
           <div>
              <FormLabel>Post Title</FormLabel>
              <Input placeholder="Enter title..." />
           </div>
           <div>
              <FormLabel>Category</FormLabel>
              <Input placeholder="Select category..." />
           </div>
           <div>
              <FormLabel>Content</FormLabel>
              <textarea 
                className="w-full rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                rows="4" 
                placeholder="Write something..."
              ></textarea>
           </div>
        </ModalBody>
        <ModalFooter>
           <Button variant="ghost" onClick={() => toggleModal('form')}>Discard</Button>
           <Button onClick={() => toggleModal('form')}>Publish Post</Button>
        </ModalFooter>
      </Modal>

      {/* Sizes */}
      <Modal isOpen={modalStates.small} onClose={() => toggleModal('small')} size="sm">
        <ModalHeader onClose={() => toggleModal('small')}>Small Modal</ModalHeader>
        <ModalBody><p className="text-sm text-gray-500">Compact dialog for small alerts.</p></ModalBody>
      </Modal>

      <Modal isOpen={modalStates.large} onClose={() => toggleModal('large')} size="lg">
        <ModalHeader onClose={() => toggleModal('large')}>Large Modal</ModalHeader>
        <ModalBody><p className="text-sm text-gray-500">Wider dialog for data tables or complex forms.</p></ModalBody>
      </Modal>

      <Modal isOpen={modalStates.xlarge} onClose={() => toggleModal('xlarge')} size="xl">
        <ModalHeader onClose={() => toggleModal('xlarge')}>Extra Large Modal</ModalHeader>
        <ModalBody><p className="text-sm text-gray-500">Maximum width for deep dashboards.</p></ModalBody>
      </Modal>

      <Modal isOpen={modalStates.full} onClose={() => toggleModal('full')} size="full">
        <ModalHeader onClose={() => toggleModal('full')}>Fullscreen Experience</ModalHeader>
        <ModalBody><p className="text-sm text-gray-500">Immersive view that covers the entire screen.</p></ModalBody>
      </Modal>
    </div>
  );
};

export default Modals;
