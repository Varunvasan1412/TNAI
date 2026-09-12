import * as Feather from 'react-feather';

const crmMenu = [
  { id: 'inst-title', label: 'Institution Admin', isTitle: true },
  {
    id: 'inst-dashboard',
    label: 'Dashboard',
    icon: Feather.Home,
    path: '/admin/dashboard',
  },
  {
    id: 'inst-executive-members',
    label: 'Executive Members',
    icon: Feather.Users,
    path: '/admin/executive-members',
  },
  {
    id: 'inst-events',
    label: 'Events',
    icon: Feather.Calendar,
    path: '/admin/events',
  },
  {
    id: 'inst-institutions',
    label: 'Institutions',
    icon: Feather.Briefcase,
    path: '/admin/institutions',
  },
  {
    id: 'inst-news-circulars',
    label: 'News & Circulars',
    icon: Feather.FileText,
    path: '/admin/news-circulars',
  },
  {
    id: 'inst-newsletter',
    label: 'Newsletter',
    icon: Feather.Mail,
    path: '/admin/newsletter',
  },
  {
    id: 'inst-snai-articles',
    label: 'SNAI Articles',
    icon: Feather.BookOpen,
    path: '/admin/snai-articles',
  },
  {
    id: 'inst-statistics',
    label: 'Statistics',
    icon: Feather.BarChart2,
    path: '/admin/statistics',
  },
  {
    id: 'inst-gallery',
    label: 'Gallery',
    icon: Feather.Image,
    children: [
      { id: 'gallery-albums', label: 'Albums', path: '/admin/gallery/albums' },
      { id: 'gallery-images', label: 'Images', path: '/admin/gallery/images' },
    ],
  },
  {
    id: 'inst-downloads',
    label: 'Downloads',
    icon: Feather.Download,
    path: '/admin/downloads',
  },
  {
    id: 'inst-voice-concern',
    label: 'Voice Your Concern',
    icon: Feather.MessageSquare,
    path: '/admin/voice-concern',
  },
  {
    id: 'inst-activities',
    label: 'Our Activities',
    icon: Feather.Activity,
    path: '/admin/activities',
  },
  {
    id: 'inst-sna-units',
    label: 'SNA Units',
    icon: Feather.Shield,
    path: '/admin/sna-units',
  },
  {
    id: 'inst-tnai-units',
    label: 'TNAI Units',
    icon: Feather.Award,
    path: '/admin/tnai-units',
  },
  {
    id: 'inst-impacts',
    label: 'Our Impacts',
    icon: Feather.Target,
    path: '/admin/impacts',
  },
  {
    id: 'inst-students',
    label: 'Student Details',
    icon: Feather.User,
    path: '/admin/students',
  },
  {
    id: 'inst-sna-office-bearers',
    label: 'SNA Office Bearers',
    icon: Feather.Users,
    path: '/admin/sna-office-bearers',
  },
  {
    id: 'inst-profile',
    label: 'Institution Profile',
    icon: Feather.Settings,
    path: '/admin/institution-profile',
  },
  { id: 'security-title', label: 'Security & Access', isTitle: true },
  {
    id: 'security-users',
    label: 'Manage Users',
    icon: Feather.Lock,
    path: '/admin/manage-users',
  },
];

export default crmMenu;
