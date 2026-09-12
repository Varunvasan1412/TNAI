import { create } from "zustand";
import toast from "react-hot-toast";
import {
  toggleChatbotStatusApi,
  getChatSessionsApi,
  sendChatReplyApi,
} from "../api/chatbotApi";

// ── localStorage helpers ───────────────────────────────────────────────────

const ONLINE_KEY = "chatbot_is_online";
const LAST_SEEN_KEY = "chatbot_last_seen";
const AUTO_REPLIED_KEY = "chatbot_auto_replied";

const DEFAULT_WELCOME_MESSAGE =
  "Haii! 👋 Welcome to Rsi Store! Thanks for reaching out. Our team has received your message and will be with you shortly. Feel free to share more details about how we can help you!";

const DEFAULT_OFFLINE_MESSAGE =
  "Haii! 👋 Thanks for reaching out to Rsi Store! Our admin is currently offline, but don't worry — our team will contact you as soon as possible. We'll get back to you shortly!";

const getLastSeen = () => {
  try {
    return JSON.parse(localStorage.getItem(LAST_SEEN_KEY) || "{}");
  } catch {
    return {};
  }
};

const saveLastSeen = (map) =>
  localStorage.setItem(LAST_SEEN_KEY, JSON.stringify(map));

const getAutoReplied = () => {
  try {
    return new Set(JSON.parse(localStorage.getItem(AUTO_REPLIED_KEY) || "[]"));
  } catch {
    return new Set();
  }
};

const saveAutoReplied = (set) =>
  localStorage.setItem(AUTO_REPLIED_KEY, JSON.stringify([...set]));

// Count user messages the admin hasn't seen yet (id > lastSeen).
// sendReply and setSelectedSession both update lastSeen, so the count
// naturally drops to 0 after admin replies or opens the chat — no need
// for a separate "last-message-is-admin" check here.
const computeUnread = (sessions) => {
  const lastSeen = getLastSeen();
  const counts = {};
  sessions.forEach((s) => {
    const lastId = lastSeen[s.id] || 0;
    counts[s.id] = (s.messages || []).filter(
      (m) => m.sender_type === "user" && m.id > lastId,
    ).length;
  });
  return counts;
};

// ── Store ──────────────────────────────────────────────────────────────────

export const useChatbotStore = create((set, get) => ({
  // Persist online status across page reloads
  isOnline: localStorage.getItem(ONLINE_KEY) === "true",
  statusLoading: false,

  sessions: [],
  sessionsLoading: false,
  sessionsError: null,

  unreadCounts: {}, // { [sessionId]: number }

  selectedSessionId: null, // shared across modules so header notifications can open a chat

  replyLoading: false,

  autoReplyEnabled: true,
  autoReplyMessage: DEFAULT_WELCOME_MESSAGE,
  offlineAutoReplyMessage: DEFAULT_OFFLINE_MESSAGE,

  setAutoReplyEnabled: (enabled) => set({ autoReplyEnabled: enabled }),
  setAutoReplyMessage: (msg) => set({ autoReplyMessage: msg }),
  setOfflineAutoReplyMessage: (msg) => set({ offlineAutoReplyMessage: msg }),

  // Toggle admin online/offline — persists to localStorage
  toggleStatus: async (isOnline) => {
    try {
      set({ statusLoading: true });
      const response = await toggleChatbotStatusApi(isOnline);
      const next = response.data.is_online;
      localStorage.setItem(ONLINE_KEY, String(next));
      set({ isOnline: next, statusLoading: false });
      toast.success(response.message || "Status updated successfully");
    } catch (error) {
      set({ statusLoading: false });
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  },

  // Fetch all sessions + recompute unread counts
  fetchSessions: async () => {
    try {
      set({ sessionsLoading: true, sessionsError: null });
      const response = await getChatSessionsApi();
      const sessions = response.data || [];

      set({
        sessions,
        unreadCounts: computeUnread(sessions),
        sessionsLoading: false,
      });

      // Auto-reply: send a welcome message to any session that has only user
      // messages (no admin reply yet) and hasn't been auto-replied before.
      const { autoReplyEnabled, autoReplyMessage, offlineAutoReplyMessage, isOnline } = get();
      if (autoReplyEnabled) {
        const autoReplied = getAutoReplied();
        const pending = sessions.filter(
          (s) =>
            !autoReplied.has(s.id) &&
            (s.messages || []).some((m) => m.sender_type === "user") &&
            !(s.messages || []).some((m) => m.sender_type === "admin"),
        );

        // When online: send 1 welcome message.
        // When offline: send welcome message first, then the offline notice.
        const messagesToSend = isOnline
          ? [autoReplyMessage]
          : [autoReplyMessage, offlineAutoReplyMessage];

        for (const session of pending) {
          // Mark before sending to prevent duplicate sends across rapid polls
          autoReplied.add(session.id);
          saveAutoReplied(autoReplied);

          try {
            for (const text of messagesToSend) {
              const formData = new FormData();
              formData.append("chat_session_id", session.id);
              formData.append("message", text);
              const reply = await sendChatReplyApi(formData);

              set((state) => ({
                sessions: state.sessions.map((s) =>
                  s.id === session.id
                    ? { ...s, messages: [...(s.messages || []), reply.data] }
                    : s,
                ),
              }));
            }
          } catch (_) {
            // If send fails, remove from set so it retries on the next poll
            autoReplied.delete(session.id);
            saveAutoReplied(autoReplied);
          }
        }
      }
    } catch (error) {
      set({
        sessionsLoading: false,
        sessionsError:
          error.response?.data?.message || "Failed to fetch sessions",
      });
    }
  },

  // Mark all messages in a session as read
  markAsRead: (sessionId) => {
    set((state) => {
      const session = state.sessions.find((s) => s.id === sessionId);
      if (session?.messages?.length) {
        const maxId = Math.max(...session.messages.map((m) => m.id));
        const lastSeen = getLastSeen();
        lastSeen[sessionId] = maxId;
        saveLastSeen(lastSeen);
      }
      return { unreadCounts: { ...state.unreadCounts, [sessionId]: 0 } };
    });
  },

  // Mark every session as read — called when admin visits the chatbot page
  markAllAsRead: () => {
    set((state) => {
      const lastSeen = getLastSeen();
      state.sessions.forEach((s) => {
        if (s.messages?.length) {
          const maxId = Math.max(...s.messages.map((m) => m.id));
          lastSeen[s.id] = maxId;
        }
      });
      saveLastSeen(lastSeen);
      const zeroCounts = {};
      state.sessions.forEach((s) => {
        zeroCounts[s.id] = 0;
      });
      return { unreadCounts: zeroCounts };
    });
  },

  // Select a session and immediately mark it as read (used from header notification click)
  setSelectedSession: (sessionId) => {
    set((state) => {
      if (!sessionId) return { selectedSessionId: null };
      const session = state.sessions.find((s) => s.id === sessionId);
      const updates = { selectedSessionId: sessionId };
      if (session?.messages?.length) {
        const maxId = Math.max(...session.messages.map((m) => m.id));
        const lastSeen = getLastSeen();
        lastSeen[sessionId] = maxId;
        saveLastSeen(lastSeen);
        updates.unreadCounts = { ...state.unreadCounts, [sessionId]: 0 };
      }
      return updates;
    });
  },

  // Send admin reply (text + optional files), append to session optimistically
  sendReply: async (sessionId, message, files) => {
    try {
      set({ replyLoading: true });

      const formData = new FormData();
      formData.append("chat_session_id", sessionId);
      if (message) formData.append("message", message);
      if (files?.length) {
        files.forEach((file) => formData.append("files[]", file));
      }

      const response = await sendChatReplyApi(formData);

      set((state) => {
        const updatedSessions = state.sessions.map((s) =>
          s.id === sessionId
            ? { ...s, messages: [...(s.messages || []), response.data] }
            : s,
        );
        // Mark as read after admin replies so badge stays 0
        const updated = updatedSessions.find((s) => s.id === sessionId);
        if (updated?.messages?.length) {
          const maxId = Math.max(...updated.messages.map((m) => m.id));
          const ls = getLastSeen();
          ls[sessionId] = maxId;
          saveLastSeen(ls);
        }
        return {
          replyLoading: false,
          sessions: updatedSessions,
          unreadCounts: { ...state.unreadCounts, [sessionId]: 0 },
        };
      });

      toast.success(response.message || "Reply sent successfully");
      return response.data;
    } catch (error) {
      set({ replyLoading: false });
      toast.error(error.response?.data?.message || "Failed to send reply");
      throw error;
    }
  },
}));

// Exported so logout can clear chatbot state without importing the store hook
// AUTO_REPLIED_KEY is intentionally kept across logouts so sessions don't get
// re-auto-replied when the admin logs back in.
export { ONLINE_KEY, LAST_SEEN_KEY, AUTO_REPLIED_KEY };
