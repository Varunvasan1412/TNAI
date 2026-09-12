import React from 'react';
import { 
  Card, 
  CardBody, 
  CardHeader, 
  CardTitle, 
  PageTitle 
} from '../../../../components/ui';
import * as Feather from 'react-feather';
import { cn } from '../../../../lib/utils';

const IconCard = ({ name, icon: Icon, library }) => (
  <div className="group p-4 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-50 dark:bg-slate-700/50 text-gray-500 dark:text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors shrink-0">
        {Icon ? <Icon className="w-6 h-6" /> : <i className={cn(library, name, "text-xl")}></i>}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-bold text-gray-800 dark:text-white truncate uppercase tracking-tighter">{name.replace('bx-', '').replace('mdi-', '').replace('fa-', '')}</p>
        <p className="text-[9px] text-gray-400 font-mono">{library || 'Feather'}</p>
      </div>
    </div>
  </div>
);

const IconGrid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {children}
  </div>
);

export const IconsBoxicons = () => (
  <div className="space-y-6">
    <PageTitle title="Boxicons" breadcrumbs={[{ label: 'Icons', path: '#' }, { label: 'Boxicons', active: true }]} />
    <Card className="border-0 shadow-sm">
      <CardHeader><CardTitle>General Icons</CardTitle></CardHeader>
      <CardBody>
        <IconGrid>
          {['bx-home','bx-user','bx-cog','bx-bell','bx-search','bx-star','bx-heart','bx-lock','bx-mail-send','bx-calendar','bx-camera','bx-chart','bx-cloud','bx-code','bx-copy','bx-data','bx-download','bx-edit','bx-file','bx-filter','bx-flag','bx-folder','bx-gift','bx-globe','bx-grid'].map(icon => (
            <IconCard key={icon} name={icon} library="bx" />
          ))}
        </IconGrid>
      </CardBody>
    </Card>
  </div>
);

export const IconsMaterialDesign = () => (
  <div className="space-y-6">
    <PageTitle title="Material Design" breadcrumbs={[{ label: 'Icons', path: '#' }, { label: 'Material Design', active: true }]} />
    <Card className="border-0 shadow-sm">
      <CardHeader><CardTitle>Material Design Icons</CardTitle></CardHeader>
      <CardBody>
        <IconGrid>
          {['mdi-home','mdi-account','mdi-cog','mdi-bell','mdi-magnify','mdi-star','mdi-heart','mdi-lock','mdi-email','mdi-calendar','mdi-camera','mdi-chart-bar','mdi-cloud','mdi-code-tags','mdi-content-copy','mdi-database','mdi-download','mdi-pencil','mdi-file','mdi-filter','mdi-flag','mdi-folder','mdi-gift','mdi-earth','mdi-grid'].map(icon => (
            <IconCard key={icon} name={icon} library="mdi" />
          ))}
        </IconGrid>
      </CardBody>
    </Card>
  </div>
);

export const IconsDripicons = () => (
  <div className="space-y-6">
    <PageTitle title="Dripicons" breadcrumbs={[{ label: 'Icons', path: '#' }, { label: 'Dripicons', active: true }]} />
    <Card className="border-0 shadow-sm">
      <CardHeader><CardTitle>Drip Icons</CardTitle></CardHeader>
      <CardBody>
        <IconGrid>
          {['alarm','archive','arrow-down','arrow-left','arrow-right','arrow-up','article','backspace','basket','battery-empty','battery-full','bell','blog','bluetooth','bold','bookmark','briefcase','brightness-max','brightness-min','browser'].map(icon => (
            <IconCard key={icon} name={`dripicons-${icon}`} library="dripicons" />
          ))}
        </IconGrid>
      </CardBody>
    </Card>
  </div>
);

export const IconsFontAwesome = () => (
  <div className="space-y-6">
    <PageTitle title="Font Awesome 5" breadcrumbs={[{ label: 'Icons', path: '#' }, { label: 'Font Awesome', active: true }]} />
    <Card className="border-0 shadow-sm">
      <CardHeader><CardTitle>Solid Icons</CardTitle></CardHeader>
      <CardBody>
        <IconGrid>
          {['home','user','cog','bell','search','star','heart','lock','envelope','calendar','camera','chart-bar','cloud','code','copy','database','download','edit','file','filter','flag','folder','gift','globe','th'].map(icon => (
            <IconCard key={icon} name={`fa-${icon}`} library="fas" />
          ))}
        </IconGrid>
      </CardBody>
    </Card>
  </div>
);

export const IconsFeather = () => (
  <div className="space-y-6">
    <PageTitle title="Feather Icons" breadcrumbs={[{ label: 'Icons', path: '#' }, { label: 'Feather', active: true }]} />
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle>Feather Core Set</CardTitle>
        <p className="text-xs text-gray-500 font-medium">Modern, lightweight icons used throughout the Minia Dashboard.</p>
      </CardHeader>
      <CardBody>
        <IconGrid>
          {Object.keys(Feather).slice(0, 25).map(key => (
            <IconCard key={key} name={key} icon={Feather[key]} library="Feather" />
          ))}
        </IconGrid>
      </CardBody>
    </Card>
  </div>
);
