import * as Feather from 'react-feather';

const chatBotMenu = [
  { id: 'chatbot-title', label: 'Chat Bot', isTitle: true },
  {
    id: 'chatbot-dashboard',
    label: 'Dashboard',
    icon: Feather.Home,
    path: '/chat-bot/dashboard',
  },
  {
    id: 'chatbot-conversations',
    label: 'Conversations',
    icon: Feather.MessageSquare,
    path: '/chat-bot/conversations',
  },
  // {
  //   id: 'chatbot-knowledge-base',
  //   label: 'Knowledge Base',
  //   icon: Feather.BookOpen,
  //   path: '/chat-bot/knowledge-base',
  // },
  // {
  //   id: 'chatbot-analytics',
  //   label: 'Analytics',
  //   icon: Feather.BarChart2,
  //   path: '/chat-bot/analytics',
  // },
  // {
  //   id: 'chatbot-settings',
  //   label: 'Bot Settings',
  //   icon: Feather.Sliders,
  //   path: '/chat-bot/settings',
  // },
];

export default chatBotMenu;
