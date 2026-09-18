import React from 'react';
import { Route } from 'react-router-dom';
import ChatBotLayout from '../components/ChatBotLayout';
import Dashboard     from '../pages/Dashboard';
import ChatBot       from '../pages/ChatBot';

const ChatBotRoutes = [
  <Route key="chatbot-dashboard"
    path="/chat-bot/dashboard"
    element={<ChatBotLayout><Dashboard /></ChatBotLayout>}
  />,
  <Route key="chatbot-conversations"
    path="/chat-bot/conversations"
    element={<ChatBotLayout fullHeight><ChatBot /></ChatBotLayout>}
  />,
];

export default ChatBotRoutes;
