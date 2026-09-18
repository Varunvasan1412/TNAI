import React, { useState } from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle, 
  Alert,
  Button
} from '../../../../components/ui';
import * as Feather from 'react-feather';

const Alerts = () => {
  const [showDismissible, setShowDismissible] = useState({
    success: true,
    danger: true,
    warning: true,
    info: true,
    primary: true
  });

  const handleDismiss = (key) => {
    setShowDismissible(prev => ({ ...prev, [key]: false }));
  };

  const handleReset = () => {
    setShowDismissible({
      success: true,
      danger: true,
      warning: true,
      info: true,
      primary: true
    });
  };

  return (
    <div className="space-y-6">
      <PageTitle 
        title="Alerts" 
        breadcrumbs={[
          { label: 'Components', path: '#' },
          { label: 'Alerts', active: true },
        ]} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Default / Soft Alerts */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Soft Alerts</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Standard alerts with soft background colors and subtle borders.</p>
          </CardHeader>
          <CardBody className="space-y-4">
            <Alert variant="primary">A simple primary alert—check it out!</Alert>
            <Alert variant="success">A simple success alert—check it out!</Alert>
            <Alert variant="info">A simple info alert—check it out!</Alert>
            <Alert variant="warning">A simple warning alert—check it out!</Alert>
            <Alert variant="danger">A simple danger alert—check it out!</Alert>
          </CardBody>
        </Card>

        {/* Solid Alerts */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Solid Alerts</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Bold, high-contrast alerts with solid background colors.</p>
          </CardHeader>
          <CardBody className="space-y-4">
            <Alert variant="primary" solid>A simple primary alert—check it out!</Alert>
            <Alert variant="success" solid>A simple success alert—check it out!</Alert>
            <Alert variant="info" solid>A simple info alert—check it out!</Alert>
            <Alert variant="warning" solid>A simple warning alert—check it out!</Alert>
            <Alert variant="danger" solid>A simple danger alert—check it out!</Alert>
          </CardBody>
        </Card>

        {/* Dismissing */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Dismissible Alerts</CardTitle>
              <p className="text-xs text-gray-500 font-medium">Interactive alerts that can be dismissed by the user.</p>
            </div>
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-[10px] font-bold uppercase tracking-wider">
               Reset All
            </Button>
          </CardHeader>
          <CardBody className="space-y-4">
            <Alert 
              variant="success" 
              dismissible 
              show={showDismissible.success} 
              onDismiss={() => handleDismiss('success')}
              title="Success Message"
            >
              Great! Everything is working correctly.
            </Alert>
            <Alert 
              variant="danger" 
              dismissible 
              show={showDismissible.danger} 
              onDismiss={() => handleDismiss('danger')}
              title="Error Occurred"
            >
              Oops! Something went wrong with your request.
            </Alert>
            <Alert 
              variant="warning" 
              dismissible 
              show={showDismissible.warning} 
              onDismiss={() => handleDismiss('warning')}
            >
              Be careful! This action cannot be easily undone.
            </Alert>
          </CardBody>
        </Card>

        {/* Alerts with Custom Icons & Content */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Rich Content Alerts</CardTitle>
            <p className="text-xs text-gray-500 font-medium">Alerts with custom icons and multi-line descriptions.</p>
          </CardHeader>
          <CardBody className="space-y-4">
            <Alert 
              variant="primary" 
              icon={<Feather.Zap className="w-5 h-5" />}
              title="New Update Available!"
            >
              We've just released a new version of the dashboard with improved performance and several bug fixes.
            </Alert>
            <Alert 
              variant="info" 
              icon={<Feather.Bell className="w-5 h-5" />}
            >
              <div className="space-y-2">
                <p>You have 3 unread messages in your inbox from earlier today.</p>
                <Link to="/apps-email-inbox" className="inline-flex items-center gap-1 text-xs font-bold underline decoration-2 underline-offset-2">
                  View Inbox <Feather.ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </Alert>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const Link = ({ to, children, className }) => (
  <a href="#!" onClick={(e) => e.preventDefault()} className={className}>
    {children}
  </a>
);

export default Alerts;
