import React, { useState, useEffect, useRef } from 'react';
import {
  checkAdminStatus, initiateChat, sendMessage, updatePresence,
  fetchNewMessages, signIn as signInUser,
} from '../../api/chatbotApi';
import type { ChatMessage, ChatSession } from '../../api/chatbotApi';

type View = 'closed' | 'landing' | 'signup' | 'signin' | 'chat';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface SignInState {
  login: string;
}

interface SignInErrors {
  general?: string;
}

const ChatPopup: React.FC = () => {
  const [view, setView] = useState<View>('closed');
  // null = still fetching from backend (don't assume online or offline yet)
  const [isAdminOnline, setIsAdminOnline] = useState<boolean | null>(null);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [offlineSignup, setOfflineSignup] = useState(false);
  const [offlineCountdown, setOfflineCountdown] = useState<number | null>(null);

  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleHide = () => {
      timeoutId = setTimeout(() => {
        setShowTooltip(false);
        scheduleShow();
      }, 5_000); // visible for 5s, then hide
    };

    const scheduleShow = () => {
      timeoutId = setTimeout(() => {
        setShowTooltip(true);
        scheduleHide();
      }, 5_000); // hidden for 5s, then show
    };

    scheduleHide(); // start by scheduling the first hide

    return () => clearTimeout(timeoutId);
  }, []);

  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [signUpEmailError, setSignUpEmailError] = useState('');
  // const [formFiles, setFormFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [siForm, setSiForm] = useState<SignInState>({ login: '' });
  const [siErrors, setSiErrors] = useState<SignInErrors>({});
  const [signing, setSigning] = useState(false);

  const [chatInput, setChatInput] = useState('');
  const [chatFiles, setChatFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatFileRef = useRef<HTMLInputElement>(null);
  const signUpErrRef = useRef<HTMLDivElement>(null);
  // const formFileRef = useRef<HTMLInputElement>(null);
  const lastMsgIdRef = useRef(0);

  // Initial admin status check
  useEffect(() => {
    checkAdminStatus().then(setIsAdminOnline).catch(() => { });
  }, []);

  // Poll admin status every 30s for live online/offline updates
  useEffect(() => {
    const id = setInterval(() => {
      checkAdminStatus().then(setIsAdminOnline).catch(() => { });
    }, 30_000);
    return () => clearInterval(id);
  }, []);

  // Keep lastMsgIdRef in sync so polling closure never goes stale
  useEffect(() => {
    if (messages.length > 0) {
      lastMsgIdRef.current = messages[messages.length - 1].id;
    }
  }, [messages]);

  // Poll for new messages every 3s while the chat view is open
  useEffect(() => {
    if (view !== 'chat' || !session) return;
    const id = setInterval(async () => {
      try {
        // const newMsgs = await fetchNewMessages(session.id, lastMsgIdRef.current);
        const newMsgs = await fetchNewMessages(session.id);
        console.log("NEW MESSAGES", newMsgs);
        // if (newMsgs.length > 0) setMessages(prev => [...prev, ...newMsgs]);
        if (newMsgs.length > 0) {
          setMessages(prev => {
            const existingIds = new Set(prev.map(m => m.id));

            const uniqueMsgs = newMsgs.filter(
              m => !existingIds.has(m.id)
            );

            return uniqueMsgs.length > 0
              ? [...prev, ...uniqueMsgs]
              : prev;
          });
        }
      } catch {
        // silent — network hiccup shouldn't crash the UI
      }
    }, 3000);
    return () => clearInterval(id);
  }, [view, session]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Scroll signup error into view so user sees it even if form is scrolled
  useEffect(() => {
    if (signUpEmailError) {
      signUpErrRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [signUpEmailError]);

  // Offline signup countdown — auto-close chat when it hits 0
  useEffect(() => {
    if (offlineCountdown === null) return;
    if (offlineCountdown <= 0) {
      setView('closed');
      setOfflineSignup(false);
      setOfflineCountdown(null);
      setSession(null);
      setMessages([]);
      return;
    }
    const t = setTimeout(() => setOfflineCountdown(c => (c !== null ? c - 1 : null)), 1000);
    return () => clearTimeout(t);
  }, [offlineCountdown]);

  // Update user presence when browser tab focus changes
  // useEffect(() => {
  //   if (!session) return;
  //   const onVisibility = () => {
  //     updatePresence(session.id, !document.hidden).catch(() => {});
  //   };
  //   document.addEventListener('visibilitychange', onVisibility);
  //   return () => document.removeEventListener('visibilitychange', onVisibility);
  // }, [session]);

  useEffect(() => {
    if (!session) return;

    const onVisibility = () => {
      updatePresence(session.id, !document.hidden).catch(() => { });
    };

    const onUnload = () => {
      updatePresence(session.id, false).catch(() => { });
    };

    // Tab switch
    document.addEventListener('visibilitychange', onVisibility);

    // Browser refresh / tab close
    window.addEventListener('beforeunload', onUnload);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [session]);

  // ── Validation ──
  const validateSignUp = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateSignIn = (): boolean => {
    const e: SignInErrors = {};

    if (!siForm.login.trim()) {
      e.general = 'Email is required';
    }

    setSiErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Handlers ──
  // const openSession = (newSession: ChatSession) => {
  //   setSession(newSession);
  //   setMessages(newSession.messages);
  //   lastMsgIdRef.current = newSession.messages[newSession.messages.length - 1]?.id ?? 0;
  //   setView('chat');
  // };

  const openSession = (newSession: ChatSession) => {
    setSession(newSession);
    setMessages(newSession.messages);

    lastMsgIdRef.current =
      newSession.messages[newSession.messages.length - 1]?.id ?? 0;

    updatePresence(newSession.id, true).catch(() => { });

    // Offline signup flow: show confirmation + auto-close after 10 s
    if (isAdminOnline === false) {
      setOfflineSignup(true);
      setOfflineCountdown(10);
    }

    setView('chat');
  };

  const handleSignUp = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validateSignUp() || submitting) return;
    setSubmitting(true);
    setSignUpEmailError('');
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      if (form.message.trim()) fd.append('message', form.message);
      // formFiles.forEach(f => fd.append('files[]', f));
      openSession(await initiateChat(fd));
    } catch (err: unknown) {
      const msg = (err instanceof Error ? err.message : '').toLowerCase();
      const isDuplicate = msg.includes('already') || msg.includes('exist') || msg.includes('taken') || msg.includes('registered');
      if (isDuplicate) {
        setSignUpEmailError(
          isAdminOnline === true
            ? 'This email already exists. Please sign in to access your chat.'
            : 'This email already exists. Our team will contact you soon.'
        );
      } else {
        setSignUpEmailError('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignIn = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validateSignIn() || signing) return;
    setSigning(true);
    setSiErrors({});
    try {
      openSession(
        await signInUser(siForm.login)
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign-in failed. Please check your details.';
      setSiErrors({ general: msg });
    } finally {
      setSigning(false);
    }
  };

  const handleSend = async () => {
    if (!session || (!chatInput.trim() && chatFiles.length === 0) || sending) return;
    setSending(true);
    try {
      const fd = new FormData();
      fd.append('chat_session_id', String(session.id));
      if (chatInput.trim()) fd.append('message', chatInput);
      chatFiles.forEach(f => fd.append('files[]', f));
      const msg = await sendMessage(fd);
      setMessages(prev => [...prev, msg]);
      setChatInput('');
      setChatFiles([]);
    } catch {
      // silent
    } finally {
      setSending(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { e.preventDefault(); handleSend(); }
  };

  const toggleWindow = () => setView(v => {
    if (v === 'closed') return session ? 'chat' : 'landing';
    return 'closed';
  });

  return (
    <>
      {/* WhatsApp floating button */}
      <div className="cp-wa-fab">
        <span className="cp-wa-fab__label">Chat on WhatsApp</span>
        <a
          href="https://wa.me/919677733363"
          target="_blank"
          rel="noopener noreferrer"
          className="cp-wa-fab__btn"
          aria-label="Chat on WhatsApp"
        >
          <i className="fab fa-whatsapp" />
        </a>
      </div>

      {/* Floating action button */}
      <div className="cp-fab">
        {view === 'closed' && <span className={`cp-fab__label ${showTooltip ? 'is-visible' : ''}`}>💬 Chat with The Wall Project Support</span>}
        <button
          className={`cp-fab__btn${view !== 'closed' ? ' is-open' : ''}`}
          onClick={toggleWindow}
          aria-label={view !== 'closed' ? 'Close chat' : 'Open chat'}
        >
          <i className={`fa ${view !== 'closed' ? 'fa-times' : 'fa-comments'}`} />
          {isAdminOnline === true && view === 'closed' && <span className="cp-fab__dot" />}
        </button>
      </div>

      {/* Chat window */}
      <div className={`cp-window${view !== 'closed' ? ' is-open' : ''}`}>

        {/* Header */}
        <div className="cp-header">
          <div className="cp-avatar">
            <span className="cp-avatar__initials">WP</span>
            <span className={`cp-avatar__dot${isAdminOnline === true ? ' is-online' : ''}`} />
          </div>
          <div className="cp-header__text">
            <span className="cp-header__name">The Wall Project Support</span>
            <span className="cp-header__sub">
              {isAdminOnline === null
                ? 'Checking status…'
                : isAdminOnline
                  ? 'Online — ready to help'
                  : 'Offline — leave a message'}
            </span>
          </div>
          <button className="cp-header__min" onClick={() => setView('closed')} aria-label="Minimize">
            <i className="fa fa-chevron-down" />
          </button>
        </div>

        {/* Body */}
        <div className="cp-body">

          {/* ── Landing view ── */}
          <div className={`cp-view cp-view--landing${view === 'landing' ? ' is-active' : ''}`}>
            <div className="cp-landing-scroll">
              <div className="cp-landing-icon">
                <i className="fa fa-comments" />
              </div>
              <p className="cp-landing-title">Welcome to The Wall Project Support</p>
              <p className="cp-landing-sub">
                {isAdminOnline === true
                  ? 'How would you like to connect with us?'
                  : 'Leave a message and we\'ll get back to you soon.'}
              </p>
              <div className="cp-auth-cards">
                <button className="cp-auth-card" onClick={() => setView('signup')}>
                  <div className="cp-auth-card__icon"><i className="fa fa-user-plus" /></div>
                  <div className="cp-auth-card__text">
                    <span className="cp-auth-card__title">Sign Up</span>
                    <span className="cp-auth-card__desc">New here? Create your chat account</span>
                  </div>
                  <i className="fa fa-chevron-right cp-auth-card__arrow" />
                </button>
                {isAdminOnline === true && (
                  <button className="cp-auth-card" onClick={() => setView('signin')}>
                    <div className="cp-auth-card__icon"><i className="fa fa-sign-in" /></div>
                    <div className="cp-auth-card__text">
                      <span className="cp-auth-card__title">Sign In</span>
                      <span className="cp-auth-card__desc">Returning user? Access your chat history</span>
                    </div>
                    <i className="fa fa-chevron-right cp-auth-card__arrow" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Sign Up view ── */}
          <div className={`cp-view cp-view--signup${view === 'signup' ? ' is-active' : ''}`}>
            <div className="cp-form-scroll">
              <button type="button" className="cp-back-btn" onClick={() => setView('landing')}>
                <i className="fa fa-arrow-left" /> Back
              </button>
              <p className="cp-form-intro">
                {isAdminOnline === true
                  ? "We're online! Send a message to get started."
                  : "Leave a message and we'll get back to you soon."}
              </p>
              <form onSubmit={handleSignUp} noValidate>
                <div className={`cp-field${errors.name ? ' has-error' : ''}`}>
                  <input
                    className="cp-field__inp"
                    type="text"
                    placeholder="Full Name *"
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  />
                  {errors.name && <span className="cp-field__msg">{errors.name}</span>}
                </div>

                <div className={`cp-field${errors.email ? ' has-error' : ''}`}>
                  <input
                    className="cp-field__inp"
                    type="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={e => { setSignUpEmailError(''); setForm(p => ({ ...p, email: e.target.value })); }}
                  />
                  {errors.email && <span className="cp-field__msg">{errors.email}</span>}
                </div>

                <div className={`cp-field${errors.phone ? ' has-error' : ''}`}>
                  <input
                    className="cp-field__inp"
                    type="tel"
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                  />
                  {errors.phone && <span className="cp-field__msg">{errors.phone}</span>}
                </div>

                <div className={`cp-field${errors.message ? ' has-error' : ''}`}>
                  <textarea
                    className="cp-field__inp cp-field__inp--ta"
                    placeholder="Your message (optional if attaching files)"
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  />
                  {errors.message && <span className="cp-field__msg">{errors.message}</span>}
                </div>

                {/* <div className="cp-field">
                  <button
                    type="button"
                    className="cp-attach-btn"
                    onClick={() => formFileRef.current?.click()}
                  >
                    <i className="fa fa-paperclip" />
                    <span>Attach Files</span>
                  </button>
                  <input
                    ref={formFileRef}
                    type="file"
                    multiple
                    hidden
                    onChange={e => {
                      if (e.target.files) setFormFiles(p => [...p, ...Array.from(e.target.files!)]);
                      e.target.value = '';
                    }}
                  />
                  {formFiles.length > 0 && (
                    <div className="cp-chips">
                      {formFiles.map((f, i) => (
                        <span key={i} className="cp-chip">
                          <i className="fa fa-file-o" />
                          {f.name}
                          <button
                            type="button"
                            onClick={() => setFormFiles(p => p.filter((_, j) => j !== i))}
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div> */}

                <button type="submit" className="cp-submit" disabled={submitting}>
                  {submitting
                    ? <span className="cp-dots"><span /><span /><span /></span>
                    : <><i className="fa fa-paper-plane" /> Start Chat</>}
                </button>

                {signUpEmailError && (
                  <div ref={signUpErrRef} className="cp-signup-email-err">
                    <i className="fa fa-exclamation-circle" />
                    <span>{signUpEmailError}</span>
                    {isAdminOnline === true && (
                      <button
                        type="button"
                        className="cp-signup-email-err__signin"
                        onClick={() => { setSignUpEmailError(''); setView('signin'); }}
                      >
                        Sign In <i className="fa fa-arrow-right" />
                      </button>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* ── Sign In view ── */}
          <div className={`cp-view cp-view--signin${view === 'signin' ? ' is-active' : ''}`}>
            <div className="cp-form-scroll">
              <button type="button" className="cp-back-btn" onClick={() => setView('landing')}>
                <i className="fa fa-arrow-left" /> Back
              </button>
              <p className="cp-form-intro">
                Enter your registered email to access your chat history.
              </p>
              <form onSubmit={handleSignIn} noValidate>
                <div className={`cp-field${siErrors.general ? ' has-error' : ''}`}>
                  <input
                    className="cp-field__inp"
                    type="text"
                    placeholder="Email or Phone Number"
                    value={siForm.login}
                    onChange={e =>
                      setSiForm({
                        login: e.target.value,
                      })
                    }
                  />
                  {siErrors.general && <span className="cp-field__msg">{siErrors.general}</span>}
                </div>
                {/* <div className={`cp-field${siErrors.phone ? ' has-error' : ''}`}>
                  <input
                    className="cp-field__inp"
                    type="tel"
                    placeholder="Phone Number *"
                    value={siForm.phone}
                    onChange={e => setSiForm(p => ({ ...p, phone: e.target.value }))}
                  />
                  {siErrors.phone && <span className="cp-field__msg">{siErrors.phone}</span>}
                </div> */}
                {siErrors.general && (
                  <div className="cp-field">
                    <span className="cp-signin-error">{siErrors.general}</span>
                  </div>
                )}
                <button type="submit" className="cp-submit" disabled={signing}>
                  {signing
                    ? <span className="cp-dots"><span /><span /><span /></span>
                    : <><i className="fa fa-sign-in" /> Sign In</>}
                </button>
              </form>
            </div>
          </div>

          {/* ── Chat view ── */}
          <div className={`cp-view cp-view--chat${view === 'chat' ? ' is-active' : ''}`}>
            <div className="cp-msgs">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`cp-msg${msg.sender_type === 'user' ? ' cp-msg--me' : ' cp-msg--them'}`}
                >
                  {msg.sender_type === 'admin' && <div className="cp-msg__av">RS</div>}
                  <div className="cp-msg__wrap">
                    {msg.message && <div className="cp-msg__bubble">{msg.message}</div>}
                    {msg.files && msg.files.length > 0 && (
                      <div className="cp-msg__files">
                        {msg.files.map(f => (
                          <a
                            key={f.id}
                            href={`${import.meta.env.VITE_API_BASE_URL}/${f.file_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cp-msg__file"
                          >
                            <i className="fa fa-file-o" />
                            {f.file_path.split('/').pop()}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {chatFiles.length > 0 && (
              <div className="cp-attach-chips">
                {chatFiles.map((f, i) => (
                  <span key={i} className="cp-chip">
                    <i className="fa fa-file-o" />
                    {f.name}
                    <button
                      type="button"
                      onClick={() => setChatFiles(p => p.filter((_, j) => j !== i))}
                    >×</button>
                  </span>
                ))}
              </div>
            )}

            {offlineSignup ? (
              <div className="cp-offline-bar">
                <i className="fa fa-check-circle cp-offline-bar__icon" />
                <div className="cp-offline-bar__text">
                  <span>Message received! Our team will contact you soon.</span>
                  <span className="cp-offline-bar__close">
                    Closing in {offlineCountdown}s…
                  </span>
                </div>
              </div>
            ) : (
              <div className="cp-input-bar">
                <button
                  type="button"
                  className="cp-ibar__btn"
                  onClick={() => chatFileRef.current?.click()}
                  aria-label="Attach file"
                >
                  <i className="fa fa-paperclip" />
                </button>
                <input
                  ref={chatFileRef}
                  type="file"
                  multiple
                  hidden
                  onChange={e => {
                    if (e.target.files) setChatFiles(p => [...p, ...Array.from(e.target.files!)]);
                    e.target.value = '';
                  }}
                />
                <input
                  className="cp-ibar__text"
                  type="text"
                  placeholder="Type a message…"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={onKeyDown}
                />
                <button
                  type="button"
                  className="cp-ibar__send"
                  onClick={handleSend}
                  disabled={sending || (!chatInput.trim() && chatFiles.length === 0)}
                  aria-label="Send"
                >
                  {sending
                    ? <span className="cp-dots small"><span /><span /><span /></span>
                    : <i className="fa fa-paper-plane" />}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default ChatPopup;
