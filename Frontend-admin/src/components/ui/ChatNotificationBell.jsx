import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, MessageSquare } from 'react-feather';
import { useChatbotStore, LAST_SEEN_KEY } from '../../store/chatbotStore';
import { cn } from '../../lib/utils';

const GRADIENTS = [
  ['#1d7a52', '#1a6fa8'],
  ['#6b3fa0', '#a0285a'],
  ['#a07020', '#a04020'],
  ['#107898', '#1040a0'],
  ['#1a7a50', '#0a6a60'],
];

const getGradient = (name = '') => GRADIENTS[(name.charCodeAt(0) || 0) % GRADIENTS.length];
const getInitials = (name = '') =>
  name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();

const timeAgo = (dateStr) => {
  if (!dateStr) return 'just now';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
};

const ONE_HOUR_MS = 60 * 60 * 1000;
const CHATBOT_PATH = '/chat-bot/conversations';

const ChatNotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isOnChatbotPage = location.pathname === CHATBOT_PATH;

  const { sessions, unreadCounts, fetchSessions, setSelectedSession, markAsRead } =
    useChatbotStore();

  // Poll sessions only when NOT on the chatbot page (ChatBot.jsx handles its own polling)
  useEffect(() => {
    if (isOnChatbotPage) return;
    fetchSessions();
    const id = setInterval(fetchSessions, 15000);
    return () => clearInterval(id);
  }, [isOnChatbotPage]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close on outside click / Escape
  useEffect(() => {
    const onOut = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    const onEsc = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('mousedown', onOut);
    document.addEventListener('keydown', onEsc);
    return () => { document.removeEventListener('mousedown', onOut); document.removeEventListener('keydown', onEsc); };
  }, []);

  // Build notification items — unread sessions with a user msg in the last hour
  const notifItems = React.useMemo(() => {
    const now = Date.now();
    let lastSeen = {};
    try { lastSeen = JSON.parse(localStorage.getItem(LAST_SEEN_KEY) || '{}'); } catch {}

    return sessions
      .filter(s => (unreadCounts[s.id] || 0) > 0)
      .map(s => {
        const lastId = lastSeen[s.id] || 0;
        const unreadMsgs = s.messages.filter(m => m.sender_type === 'user' && m.id > lastId);
        const latestMsg = unreadMsgs[unreadMsgs.length - 1];
        return { session: s, latestMsg, count: unreadCounts[s.id] };
      })
      .filter(({ latestMsg }) => {
        if (!latestMsg) return false;
        if (!latestMsg.created_at) return true;
        return (now - new Date(latestMsg.created_at).getTime()) <= ONE_HOUR_MS;
      })
      .sort((a, b) => {
        const aT = a.latestMsg?.created_at ? new Date(a.latestMsg.created_at).getTime() : 0;
        const bT = b.latestMsg?.created_at ? new Date(b.latestMsg.created_at).getTime() : 0;
        return bT - aT;
      });
  }, [sessions, unreadCounts]);

  // Never show badge while admin is already on the chatbot page
  const badgeCount = isOnChatbotPage ? 0 : notifItems.length;

  const handleClick = (sessionId) => {
    // Mark as read immediately so badge clears, then navigate.
    // ChatBot.jsx will detect the openSessionId state and auto-open that chat.
    markAsRead(sessionId);
    navigate(CHATBOT_PATH, { state: { openSessionId: sessionId } });
    setIsOpen(false);
  };

  const handleMarkAllRead = () => {
    sessions.forEach(s => { if ((unreadCounts[s.id] || 0) > 0) markAsRead(s.id); });
  };

  const handleViewAll = () => {
    navigate(CHATBOT_PATH);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-flex">
      {/* Bell trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(o => !o)}
        className={cn(
          'relative inline-flex items-center justify-center w-10 h-10 rounded-lg',
          'text-gray-500 dark:text-gray-400',
          'hover:bg-primary/10 dark:hover:bg-emerald-900/20',
          'hover:text-primary dark:hover:text-emerald-400',
          'transition-all duration-200',
        )}
        aria-label="Chat notifications"
      >
        <Bell className="w-5 h-5" />
        {badgeCount > 0 && (
          <span
            className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-[16px] px-1 text-[9px] font-black text-white rounded-full ring-2 ring-white dark:ring-slate-800"
            style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}
          >
            {badgeCount > 99 ? '99+' : badgeCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full right-0 mt-2 z-50 w-80 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden"
          >
            {/* Dropdown header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <h6 className="text-sm font-bold text-gray-800 dark:text-white">Chat Messages</h6>
                {badgeCount > 0 && (
                  <span
                    className="text-[10px] font-black text-white px-1.5 py-0.5 rounded-full"
                    style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}
                  >
                    {badgeCount}
                  </span>
                )}
              </div>
              {badgeCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:underline"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notification list — max ~6-7 items height then scroll */}
            <div className="overflow-y-auto" style={{ maxHeight: '336px' }}>
              {notifItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 gap-2">
                  <MessageSquare className="w-8 h-8" style={{ color: 'rgba(49,151,96,0.25)' }} />
                  <p className="text-xs font-semibold text-gray-400 dark:text-slate-500">
                    No new messages in the last hour
                  </p>
                </div>
              ) : (
                notifItems.map(({ session, latestMsg, count }) => {
                  const [from, to] = getGradient(session.name);
                  return (
                    <button
                      key={session.id}
                      onClick={() => handleClick(session.id)}
                      className="w-full flex gap-3 px-4 py-3 text-left transition-colors border-b border-gray-50 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                    >
                      {/* Avatar with unread badge */}
                      <div className="relative flex-shrink-0">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-[11px]"
                          style={{ background: `linear-gradient(135deg,${from},${to})` }}
                        >
                          {getInitials(session.name)}
                        </div>
                        {count > 0 && (
                          <span
                            className="absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-[14px] px-1 text-[8px] font-black text-white rounded-full ring-1 ring-white dark:ring-slate-800"
                            style={{ background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))' }}
                          >
                            {count > 9 ? '9+' : count}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
                            {session.name}
                          </p>
                          <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">
                            {timeAgo(latestMsg?.created_at)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {latestMsg?.files?.length
                            ? '📎 Attachment'
                            : (latestMsg?.message || '…')}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-2 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-700">
              <button
                onClick={handleViewAll}
                className="w-full py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors"
                style={{ color: 'var(--color-primary)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(49,151,96,0.10)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
              >
                View All Conversations
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatNotificationBell;
