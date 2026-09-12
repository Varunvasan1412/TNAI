const BASE = `${import.meta.env.VITE_API_BASE_URL}/api/chatbot/chat`;

export interface ChatFile {
  id: number;
  file_path: string;
}

export interface ChatMessage {
  id: number;
  sender_type: 'user' | 'admin';
  message: string;
  files: ChatFile[];
}

export interface ChatSession {
  id: number;
  name: string;
  email: string;
  phone: string;
  session_type: string;
  status: string;
  is_user_online: boolean;
  messages: ChatMessage[];
}

export async function checkAdminStatus(): Promise<boolean> {
  const res = await fetch(`${BASE}/status`);
  const data = await res.json();
  return Boolean(data.is_online);
}

export async function initiateChat(body: FormData): Promise<ChatSession> {
  const res = await fetch(`${BASE}/initiate`, { method: 'POST', body });
  const data = await res.json();
  if (!data.status) throw new Error(data.message ?? 'Failed to initiate chat');
  return data.data.session as ChatSession;
}

export async function sendMessage(body: FormData): Promise<ChatMessage> {
  const res = await fetch(`${BASE}/message`, { method: 'POST', body });
  const data = await res.json();
  if (!data.status) throw new Error(data.message ?? 'Failed to send message');
  return data.data as ChatMessage;
}

export async function updatePresence(chatSessionId: number, isUserOnline: boolean): Promise<void> {
  await fetch(`${BASE}/presence`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_session_id: chatSessionId, is_user_online: isUserOnline }),
  });
}

// Returns messages sent after afterId (exclusive). Backend endpoint: GET /api/chatbot/chat/messages?session_id=X&after_id=Y
// export async function fetchNewMessages(sessionId: number, afterId: number): Promise<ChatMessage[]> {
//   const res = await fetch(`${BASE}/messages?session_id=${sessionId}&after_id=${afterId}`);
//   const data = await res.json();
//   if (!data.status) return [];
//   return (data.data ?? []) as ChatMessage[];
// }

export async function fetchNewMessages(
  sessionId: number
): Promise<ChatMessage[]> {
  const res = await fetch(`${BASE}/messages/${sessionId}`);
  const data = await res.json();

  if (!data.status) return [];

  return (data.data ?? []) as ChatMessage[];
}


// Sign in with email + phone to retrieve an existing session and its full history.
// Backend endpoint: POST /api/chatbot/chat/signin  body: { email, phone }
export async function signIn(login: string): Promise<ChatSession> {
  const res = await fetch(`${BASE}/chat-signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
    }),
  });

  const data = await res.json();

  if (!data.status) {
    throw new Error(
      data.message ?? 'Sign-in failed. Please check your details.'
    );
  }

  return data.data.session as ChatSession;
}
