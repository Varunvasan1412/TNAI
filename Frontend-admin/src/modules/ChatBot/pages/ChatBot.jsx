import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, MessageSquare, Calendar, Paperclip, X, FileText } from 'react-feather';
import { useChatbotStore } from '../../../store/chatbotStore';

// ── Helpers ────────────────────────────────────────────────────────────────

const getInitials = (name = '') =>
  name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();

const formatMsgTime = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const GRADIENTS = [
  ['#1d7a52', '#1a6fa8'],
  ['#6b3fa0', '#a0285a'],
  ['#a07020', '#a04020'],
  ['#107898', '#1040a0'],
  ['#1a7a50', '#0a6a60'],
];
const getGradient = (name = '') => GRADIENTS[name.charCodeAt(0) % GRADIENTS.length];

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const isImage = (path = '') => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(path);

// ── Electronics schematic background SVG ──────────────────────────────────

const SchematicBg = () => {
  // Three-color palette from image — opacity raised so it shows through panel layers
  const B = { stroke: '#1e3d8a', fill: 'none', strokeWidth: 1.5, opacity: 0.28 };
  const G = { stroke: '#3a7a18', fill: 'none', strokeWidth: 1.5, opacity: 0.28 };
  const O = { stroke: '#c07010', fill: 'none', strokeWidth: 1.5, opacity: 0.28 };
  const BT = { fill: '#1e3d8a', stroke: 'none', opacity: 0.28 };
  const GT = { fill: '#3a7a18', stroke: 'none', opacity: 0.28 };
  const OT = { fill: '#c07010', stroke: 'none', opacity: 0.28 };
  const sw = 1.5;

  const lPins = [12, 24, 36, 48, 60, 72];

  return (
    <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>

      {/* ── TOP-LEFT: Ohm's Law + resistor circuit ── */}
      <text x="52" y="62" fontSize="18" fontFamily="Georgia,serif" fontStyle="italic" {...BT}>Ohm's Law</text>
      <text x="68" y="96" fontSize="22" fontFamily="Georgia,serif" {...BT}>V = IR</text>
      {/* Horizontal resistor */}
      <g {...B} transform="translate(52,118)">
        <path d="M0,0 H10 L12,-8 L16,8 L20,-8 L24,8 L28,-8 L30,0 H42" />
      </g>
      {/* Loop circuit */}
      <g {...B}>
        <path d="M72,118 V148 H112 V118" />
        <circle cx="72" cy="118" r="2.2" fill="#1e3d8a" opacity="0.28" />
        <circle cx="112" cy="118" r="2.2" fill="#1e3d8a" opacity="0.28" />
      </g>
      {/* Capacitor */}
      <g {...G} transform="translate(122,143)">
        <path d="M0,0 H16 M16,-10 V10 M20,-10 V10 M20,0 H36" />
      </g>
      {/* Ground */}
      <g {...B} transform="translate(88,175)">
        <path d="M0,-14 V0 M-13,0 H13 M-8,5 H8 M-3,10 H3" />
      </g>
      {/* Diode top-left */}
      <g {...G} transform="translate(198,72)">
        <path d="M0,0 H10" />
        <polygon points="10,-8 10,8 24,0" fill="rgba(58,122,24,0.07)" stroke="#3a7a18" strokeWidth={sw} />
        <path d="M24,-8 V8 M24,0 H34" />
      </g>
      {/* Vertical resistor */}
      <g {...B} transform="translate(240,44)">
        <path d="M0,0 V10 L-8,12 L8,16 L-8,20 L8,24 L-8,28 L0,30 V42" />
      </g>
      <g {...B}>
        <path d="M234,44 H198 V80" />
        <circle cx="234" cy="44" r="2.2" fill="#1e3d8a" opacity="0.28" />
      </g>

      {/* ── TOP-CENTER: E=mc² + NPN transistor ── */}
      <text x="438" y="52" fontSize="20" fontFamily="Georgia,serif" fontStyle="italic" {...GT}>E = mc</text>
      <text x="530" y="44" fontSize="13" fontFamily="Georgia,serif" {...GT}>2</text>
      <g {...G} transform="translate(488,76)">
        <circle cx="14" cy="18" r="18" />
        <line x1="-10" y1="18" x2="0" y2="18" />
        <line x1="0" y1="4" x2="0" y2="32" />
        <line x1="0" y1="8" x2="14" y2="0" />
        <line x1="0" y1="28" x2="14" y2="36" />
        <polygon points="12,33 14,36 8,36" fill="rgba(58,122,24,0.12)" stroke="#3a7a18" strokeWidth={sw} />
        <text x="9" y="-4" fontSize="7" {...GT}>C</text>
        <text x="-18" y="21" fontSize="7" {...GT}>B</text>
        <text x="9" y="48" fontSize="7" {...GT}>E</text>
      </g>
      {/* Zener diode */}
      <g {...O} transform="translate(568,96)">
        <path d="M0,0 H10 M10,-8 L10,8 L22,0 Z M19,-10 L22,-8 V8 L25,10 M22,0 H32" />
      </g>
      {/* Trace */}
      <g {...G}>
        <path d="M478,74 V46 H578 V94" />
        <circle cx="478" cy="74" r="2.2" fill="#3a7a18" opacity="0.28" />
      </g>

      {/* ── TOP-RIGHT: Op-amp + I=V/R ── */}
      <g {...B} transform="translate(818,36)">
        <polygon points="0,0 0,50 38,25" strokeLinejoin="round" />
        <line x1="-18" y1="13" x2="0" y2="13" />
        <line x1="-18" y1="37" x2="0" y2="37" />
        <line x1="38" y1="25" x2="56" y2="25" />
        <text x="-12" y="17" fontSize="9" {...BT}>+</text>
        <text x="-12" y="41" fontSize="9" {...BT}>-</text>
      </g>
      <text x="918" y="52" fontSize="20" fontFamily="Georgia,serif" fontStyle="italic" {...BT}>I =</text>
      <text x="956" y="44" fontSize="15" fontFamily="Georgia,serif" {...BT}>V</text>
      <line x1="956" y1="48" x2="974" y2="48" stroke="#1e3d8a" strokeWidth="1.2" opacity="0.28" />
      <text x="958" y="63" fontSize="15" fontFamily="Georgia,serif" {...BT}>R</text>
      {/* Resistor + R label */}
      <g {...G} transform="translate(1048,56)">
        <path d="M0,0 H10 L12,-8 L16,8 L20,-8 L24,8 L28,-8 L30,0 H42" />
        <text x="16" y="-13" fontSize="8" {...GT}>R</text>
      </g>
      {/* Capacitor */}
      <g {...B} transform="translate(1118,76)">
        <path d="M0,0 H16 M16,-10 V10 M20,-10 V10 M20,0 H36" />
      </g>
      {/* Dots */}
      <circle cx="1158" cy="76" r="5.5" fill="none" stroke="#1e3d8a" strokeWidth="1.35" opacity="0.28" />
      <circle cx="1048" cy="116" r="5.5" fill="none" stroke="#3a7a18" strokeWidth="1.35" opacity="0.28" />

      {/* ── FAR TOP-RIGHT: I=V/T + ground ── */}
      <text x="1238" y="118" fontSize="18" fontFamily="Georgia,serif" fontStyle="italic" {...BT}>I =</text>
      <text x="1274" y="110" fontSize="14" fontFamily="Georgia,serif" {...BT}>V</text>
      <line x1="1274" y1="114" x2="1292" y2="114" stroke="#1e3d8a" strokeWidth="1.2" opacity="0.28" />
      <text x="1276" y="128" fontSize="14" fontFamily="Georgia,serif" {...BT}>T</text>
      <g {...B} transform="translate(1310,96)">
        <path d="M0,-14 V0 M-13,0 H13 M-8,5 H8 M-3,10 H3" />
      </g>

      {/* ── LEFT SIDE: Inductor + diode chain ── */}
      {/* Vertical inductor */}
      <g {...B} transform="translate(42,318)">
        <path d="M0,0 V8 Q-10,11 0,14 Q10,17 0,20 Q-10,23 0,26 Q10,29 0,32 V42" />
      </g>
      {/* Horizontal inductor */}
      <g {...O} transform="translate(68,338)">
        <path d="M0,0 H7 Q9,-10 11,0 Q13,-10 15,0 Q17,-10 19,0 Q21,-10 23,0 H30" />
      </g>
      {/* Diode left */}
      <g {...B} transform="translate(58,396)">
        <path d="M0,0 H10" />
        <polygon points="10,-8 10,8 24,0" fill="rgba(30,61,138,0.07)" stroke="#1e3d8a" strokeWidth={sw} />
        <path d="M24,-8 V8 M24,0 H34" />
      </g>
      {/* LED with light rays */}
      <g {...O} transform="translate(78,448)">
        <path d="M0,0 H8" />
        <polygon points="8,-7 8,7 20,0" fill="rgba(192,112,16,0.07)" stroke="#c07010" strokeWidth={sw} />
        <path d="M20,-7 V7 M20,0 H28" />
        <line x1="16" y1="-11" x2="22" y2="-18" />
        <line x1="12" y1="-11" x2="18" y2="-18" />
        <line x1="20" y1="-11" x2="26" y2="-18" />
      </g>
      {/* Left circuit trace */}
      <g {...B}>
        <path d="M42,308 V498 H118 V458" />
        <circle cx="42" cy="396" r="2.2" fill="#1e3d8a" opacity="0.28" />
      </g>
      {/* Resistor left mid */}
      <g {...G} transform="translate(28,508)">
        <path d="M0,0 H10 L12,-8 L16,8 L20,-8 L24,8 L28,-8 L30,0 H42" />
      </g>
      {/* Battery */}
      <g {...O} transform="translate(88,538)">
        <path d="M0,5 H10 M10,0 V10 M13,-4 V14 M13,5 H24" />
        <text x="8" y="-2" fontSize="7" {...OT}>+</text>
      </g>
      {/* Ground left */}
      <g {...B} transform="translate(54,598)">
        <path d="M0,-14 V0 M-13,0 H13 M-8,5 H8 M-3,10 H3" />
      </g>

      {/* ── CENTER-LEFT: Kirchhoff's + op-amp ── */}
      <text x="182" y="342" fontSize="17" fontFamily="Georgia,serif" fontStyle="italic" {...BT}>Kirchhoff's</text>
      <text x="196" y="378" fontSize="22" fontFamily="Georgia,serif" fontStyle="italic" {...BT}>ΣI = 0</text>
      <g {...B} transform="translate(193,408)">
        <polygon points="0,0 0,40 30,20" strokeLinejoin="round" />
        <line x1="-14" y1="11" x2="0" y2="11" />
        <line x1="-14" y1="29" x2="0" y2="29" />
        <line x1="30" y1="20" x2="44" y2="20" />
        <text x="-8" y="15" fontSize="8" {...BT}>+</text>
        <text x="-8" y="33" fontSize="8" {...BT}>-</text>
      </g>
      {/* Capacitor center-left */}
      <g {...G} transform="translate(178,474)">
        <path d="M0,0 H16 M16,-10 V10 M20,-10 V10 M20,0 H36" />
      </g>
      {/* Trace */}
      <g {...B}>
        <path d="M173,408 H152 V518 H238" />
        <circle cx="152" cy="428" r="2.2" fill="#1e3d8a" opacity="0.28" />
      </g>
      {/* Vertical resistor centre-left */}
      <g {...O} transform="translate(278,478)">
        <path d="M0,0 V10 L-8,12 L8,16 L-8,20 L8,24 L-8,28 L0,30 V42" />
      </g>
      <circle cx="278" cy="478" r="3.5" fill="none" stroke="#c07010" strokeWidth="1.35" opacity="0.28" />
      <circle cx="278" cy="522" r="3.5" fill="none" stroke="#c07010" strokeWidth="1.35" opacity="0.28" />

      {/* ── CENTER: Vcc + mixed components ── */}
      <text x="538" y="308" fontSize="18" fontFamily="Georgia,serif" {...GT}>Vcc</text>
      <g {...G}>
        <path d="M563,314 V340" />
        <polygon points="556,322 563,308 570,322" fill="rgba(58,122,24,0.09)" stroke="#3a7a18" strokeWidth={sw} />
      </g>
      {/* Zener centre */}
      <g {...B} transform="translate(518,352)">
        <path d="M0,0 H10 M10,-8 L10,8 L22,0 Z M19,-10 L22,-8 V8 L25,10 M22,0 H32" />
      </g>
      {/* Two capacitors */}
      <g {...G} transform="translate(578,396)">
        <path d="M0,0 H16 M16,-10 V10 M20,-10 V10 M20,0 H36" />
        <text x="6" y="-14" fontSize="7" {...GT}>+</text>
      </g>
      <g {...B} transform="translate(578,438)">
        <path d="M0,0 H16 M16,-10 V10 M20,-10 V10 M20,0 H36" />
      </g>
      {/* Op-amp center */}
      <g {...O} transform="translate(648,328)">
        <polygon points="0,0 0,44 32,22" strokeLinejoin="round" />
        <line x1="-14" y1="11" x2="0" y2="11" />
        <line x1="-14" y1="33" x2="0" y2="33" />
        <line x1="32" y1="22" x2="46" y2="22" />
        <text x="-8" y="15" fontSize="8" {...OT}>+</text>
        <text x="-8" y="37" fontSize="8" {...OT}>-</text>
      </g>
      {/* Trace centre */}
      <g {...G}>
        <path d="M524,352 H480 V468 H578" />
        <path d="M638,498 H698 V418" />
        <circle cx="638" cy="498" r="2.2" fill="#3a7a18" opacity="0.28" />
      </g>
      <text x="698" y="528" fontSize="18" fontFamily="Georgia,serif" fontWeight="bold" {...BT}>GND</text>
      <g {...B} transform="translate(712,532)">
        <path d="M0,-5 V10 M-13,10 H13 M-8,15 H8 M-3,20 H3" />
      </g>
      {/* Horizontal inductor centre */}
      <g {...O} transform="translate(488,508)">
        <path d="M0,0 H7 Q9,-10 11,0 Q13,-10 15,0 Q17,-10 19,0 Q21,-10 23,0 Q25,-10 27,0 H34" />
      </g>

      {/* ── CENTRE-RIGHT: Small IC + traces ── */}
      <g {...G} transform="translate(788,378)">
        <rect width="50" height="70" rx="2" />
        <path d="M18,0 A7,7 0 0,1 32,0" />
        <circle cx="8" cy="5" r="2.2" />
        {[12, 24, 36, 48, 62].map((y, i) => <line key={i} x1="-12" y1={y} x2="0" y2={y} />)}
        {[12, 24, 36, 48, 62].map((y, i) => <line key={i} x1="50" y1={y} x2="62" y2={y} />)}
      </g>
      {/* PCB trace right of IC */}
      <g {...G}>
        <path d="M850,390 H900 V428 H940" />
        <path d="M850,414 H880" />
        <path d="M850,426 H868 V468 H940" />
        <circle cx="850" cy="390" r="2.2" fill="#3a7a18" opacity="0.28" />
        <circle cx="850" cy="426" r="2.2" fill="#3a7a18" opacity="0.28" />
      </g>
      {/* Resistor after IC trace */}
      <g {...B} transform="translate(940,422)">
        <path d="M0,0 H10 L12,-8 L16,8 L20,-8 L24,8 L28,-8 L30,0 H42" />
      </g>

      {/* ── RIGHT: Multimeter (large) ── */}
      <g {...B} transform="translate(1058,326)">
        <rect width="66" height="82" rx="5" />
        <rect x="7" y="10" width="52" height="28" rx="2" />
        <line x1="24" y1="32" x2="44" y2="16" />
        <circle cx="33" cy="62" r="12" />
        <line x1="29" y1="57" x2="40" y2="60" />
        <circle cx="18" cy="78" r="3" />
        <circle cx="48" cy="78" r="3" />
      </g>
      {/* Second multimeter (orange) */}
      <g {...O} transform="translate(1218,478)">
        <rect width="56" height="68" rx="5" />
        <rect x="6" y="9" width="44" height="22" rx="2" />
        <line x1="20" y1="26" x2="36" y2="14" />
        <circle cx="28" cy="52" r="10" />
        <line x1="24" y1="48" x2="34" y2="51" />
        <circle cx="14" cy="64" r="2.5" />
        <circle cx="42" cy="64" r="2.5" />
      </g>
      {/* Components right column */}
      <g {...G} transform="translate(1148,458)">
        <path d="M0,0 H10 L12,-8 L16,8 L20,-8 L24,8 L28,-8 L30,0 H42" />
      </g>
      <g {...B} transform="translate(1143,498)">
        <path d="M0,0 H16 M16,-10 V10 M20,-10 V10 M20,0 H36" />
        <text x="6" y="-13" fontSize="7" {...BT}>+</text>
      </g>
      <g {...O} transform="translate(1143,548)">
        <path d="M0,0 H10" />
        <polygon points="10,-7 10,7 22,0" fill="rgba(192,112,16,0.07)" stroke="#c07010" strokeWidth={sw} />
        <path d="M22,-7 V7 M22,0 H32" />
      </g>
      <g {...B} transform="translate(1178,598)">
        <path d="M0,-14 V0 M-13,0 H13 M-8,5 H8 M-3,10 H3" />
      </g>
      <g {...B}>
        <path d="M1058,448 H1020 V548 H1060" />
        <circle cx="1058" cy="448" r="2.2" fill="#1e3d8a" opacity="0.28" />
      </g>

      {/* ── FAR-RIGHT: Large IC chip ── */}
      <g {...G} transform="translate(1318,258)">
        <rect width="46" height="102" rx="2" />
        <path d="M16,0 A7,7 0 0,1 30,0" />
        <circle cx="8" cy="6" r="2" />
        {[14, 26, 38, 50, 62, 74, 88].map((y, i) => <line key={i} x1="-12" y1={y} x2="0" y2={y} />)}
        {[14, 26, 38, 50, 62, 74, 88].map((y, i) => <line key={i} x1="46" y1={y} x2="58" y2={y} />)}
      </g>

      {/* ── BOTTOM-LEFT: Dual IC strips ── */}
      <g {...O} transform="translate(78,738)">
        <rect width="82" height="18" rx="1" />
        {[10, 20, 30, 40, 50, 60, 70].map((x, i) => <line key={i} x1={x} y1="-10" x2={x} y2="0" />)}
        {[10, 20, 30, 40, 50, 60, 70].map((x, i) => <line key={i} x1={x} y1="18" x2={x} y2="28" />)}
      </g>
      <g {...B} transform="translate(218,748)">
        <rect width="82" height="18" rx="1" />
        {[10, 20, 30, 40, 50, 60, 70].map((x, i) => <line key={i} x1={x} y1="-10" x2={x} y2="0" />)}
        {[10, 20, 30, 40, 50, 60, 70].map((x, i) => <line key={i} x1={x} y1="18" x2={x} y2="28" />)}
      </g>
      <g {...O}>
        <path d="M160,756 H215" />
        <path d="M98,768 V808 H208 V778" />
        <circle cx="98" cy="768" r="2.2" fill="#c07010" opacity="0.28" />
      </g>
      {/* Resistor bottom-left */}
      <g {...G} transform="translate(48,818)">
        <path d="M0,0 H10 L12,-8 L16,8 L20,-8 L24,8 L28,-8 L30,0 H42" />
      </g>

      {/* ── BOTTOM-CENTER: Waveforms + P=VI ── */}
      {/* Sine wave */}
      <g {...B} transform="translate(418,698)">
        <path d="M-15,10 H0 Q5,-10 10,10 Q15,30 20,10 Q25,-10 30,10 Q35,30 40,10 H55" fill="none" />
      </g>
      {/* Square wave */}
      <g {...G} transform="translate(378,758)">
        <path d="M0,0 V-18 H14 V0 H28 V-18 H42 V0 H56" fill="none" />
      </g>
      <text x="548" y="748" fontSize="20" fontFamily="Georgia,serif" fontStyle="italic" {...OT}>P = VI</text>
      {/* Inductor bottom */}
      <g {...B} transform="translate(678,758)">
        <path d="M0,0 H7 Q9,-10 11,0 Q13,-10 15,0 Q17,-10 19,0 Q21,-10 23,0 Q25,-10 27,0 H34" />
      </g>
      {/* Resistor bottom-center */}
      <g {...O} transform="translate(738,798)">
        <path d="M0,0 H10 L12,-8 L16,8 L20,-8 L24,8 L28,-8 L30,0 H42" />
      </g>
      {/* Diode bottom */}
      <g {...G} transform="translate(598,808)">
        <path d="M0,0 H10" />
        <polygon points="10,-7 10,7 22,0" fill="rgba(58,122,24,0.07)" stroke="#3a7a18" strokeWidth={sw} />
        <path d="M22,-7 V7 M22,0 H32" />
      </g>
      {/* Capacitor bottom */}
      <g {...B} transform="translate(488,818)">
        <path d="M0,0 H16 M16,-10 V10 M20,-10 V10 M20,0 H36" />
        <text x="6" y="-13" fontSize="7" {...BT}>+</text>
      </g>

      {/* ── BOTTOM-RIGHT: Two IC chips + components ── */}
      <g {...B} transform="translate(928,718)">
        <rect width="70" height="80" rx="2" />
        <path d="M28,0 A7,7 0 0,1 42,0" />
        <circle cx="10" cy="6" r="2" />
        {lPins.map((y, i) => <line key={i} x1="-12" y1={y} x2="0" y2={y} />)}
        {lPins.map((y, i) => <line key={i} x1="70" y1={y} x2="82" y2={y} />)}
      </g>
      <g {...G} transform="translate(1058,738)">
        <rect width="70" height="80" rx="2" />
        <path d="M28,0 A7,7 0 0,1 42,0" />
        {lPins.map((y, i) => <line key={i} x1="-12" y1={y} x2="0" y2={y} />)}
        {lPins.map((y, i) => <line key={i} x1="70" y1={y} x2="82" y2={y} />)}
      </g>
      {/* Zener bottom-right */}
      <g {...O} transform="translate(1198,778)">
        <path d="M0,0 H10 M10,-8 L10,8 L22,0 Z M19,-10 L22,-8 V8 L25,10 M22,0 H32" />
      </g>
      {/* Resistor bottom-right */}
      <g {...B} transform="translate(1248,738)">
        <path d="M0,0 H10 L12,-8 L16,8 L20,-8 L24,8 L28,-8 L30,0 H42" />
      </g>
      {/* Ground bottom-right */}
      <g {...G} transform="translate(1308,788)">
        <path d="M0,-14 V0 M-13,0 H13 M-8,5 H8 M-3,10 H3" />
      </g>
      <g {...O}>
        <path d="M1010,738 H1058" />
        <path d="M928,798 H898 V858 H1018" />
        <circle cx="928" cy="798" r="2.2" fill="#c07010" opacity="0.28" />
      </g>

      {/* ── SCATTERED ACCENT DOTS / JUNCTION NODES ── */}
      {[
        [348, 198, '#3a7a18'], [748, 178, '#1e3d8a'], [1078, 218, '#c07010'],
        [338, 648, '#1e3d8a'], [778, 618, '#3a7a18'], [468, 278, '#c07010'],
        [868, 698, '#3a7a18'], [1148, 668, '#1e3d8a'], [448, 618, '#c07010'],
      ].map(([cx, cy, s], i) => (
        <circle key={i} cx={cx} cy={cy} r="4.5" fill="none" stroke={s} strokeWidth="1.35" opacity="0.28" />
      ))}

      {/* ── PLUS / MINUS ACCENT LABELS ── */}
      <text x="348" y="142" fontSize="14" {...BT}>+</text>
      <text x="998" y="488" fontSize="14" {...OT}>+</text>
      <text x="418" y="558" fontSize="14" {...GT}>+</text>
      <text x="858" y="278" fontSize="14" {...BT}>+</text>

      {/* ── SCREWDRIVER / PROBE TOOLS ── */}
      <g {...O} transform="translate(328,718) rotate(-45)">
        <rect x="0" y="-2" width="40" height="4" rx="1" />
        <polygon points="40,-4 40,4 52,0" />
        <rect x="-8" y="-4" width="8" height="8" rx="1" />
      </g>
      <g {...G} transform="translate(478,778) rotate(-50)">
        <rect x="0" y="-2" width="36" height="4" rx="1" />
        <polygon points="36,-3 36,3 46,0" />
        <rect x="-7" y="-4" width="7" height="8" rx="1" />
      </g>

      {/* ── SMALL COIL SPRINGS ── */}
      <g {...B} transform="translate(368,588)">
        <path d="M0,0 Q5,-12 10,0 Q15,-12 20,0 Q25,-12 30,0" fill="none" />
      </g>
      <g {...O} transform="translate(868,618)">
        <path d="M0,0 Q5,-12 10,0 Q15,-12 20,0 Q25,-12 30,0 Q35,-12 40,0" fill="none" />
      </g>
    </svg>
  );
};

// ── Main component ─────────────────────────────────────────────────────────

const ChatBot = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isOnline, statusLoading,
    sessions, sessionsLoading,
    unreadCounts,
    replyLoading,
    selectedSessionId,
    toggleStatus, fetchSessions, sendReply, setSelectedSession,
  } = useChatbotStore();
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const selected = sessions.find(s => s.id === selectedSessionId) || null;
  const selectedGradient = selected ? getGradient(selected.name) : ['#1d7a52', '#1a6fa8'];

  // Sort ascending by id — oldest message at top, newest at bottom (Telegram/WhatsApp style)
  const sortedMessages = selected
    ? [...(selected.messages || [])].sort((a, b) => a.id - b.id)
    : [];

  useEffect(() => {
    // If navigated here from a notification click, auto-open that session
    // and clear the location state so a page refresh doesn't re-open it.
    const openId = location.state?.openSessionId;
    if (openId) {
      useChatbotStore.getState().setSelectedSession(openId);
      navigate(location.pathname, { replace: true, state: {} });
    } else {
      // Normal navigation — show the chat list with no chat pre-selected
      useChatbotStore.getState().setSelectedSession(null);
    }

    fetchSessions();
    const interval = setInterval(fetchSessions, 3000);

    let pageLeave = false;                    
    const onBeforeUnload = () => { pageLeave = true; };
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', onBeforeUnload);
      // On SPA navigation away: mark all as read so only messages that arrive
      // AFTER leaving this page show as header notifications.
      // if (!pageLeave) {
      //   useChatbotStore.getState().markAllAsRead();
      // }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sortedMessages.length]);

  // Sort newest-first (highest message id = most recent), then apply search filter
  const filtered = [...sessions]
    .sort((a, b) => {
      const aMax = Math.max(0, ...(a.messages || []).map(m => m.id));
      const bMax = Math.max(0, ...(b.messages || []).map(m => m.id));
      return bMax - aMax;
    })
    .filter(s => {
      const q = search.toLowerCase();
      const msgs = s.messages || [];
      const last = msgs[msgs.length - 1]?.message || '';
      return s.name.toLowerCase().includes(q) || last.toLowerCase().includes(q);
    });

  const handleSend = async () => {
    if ((!message.trim() && files.length === 0) || !selectedSessionId || replyLoading) return;
    try {
      await sendReply(selectedSessionId, message.trim(), files);
      setMessage('');
      setFiles([]);
    } catch (_) { }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleFileChange = (e) => {
    setFiles(prev => [...prev, ...Array.from(e.target.files)]);
    e.target.value = '';
  };

  // Light premium electrode color palette
  const C = {
    sidebar: 'rgba(255, 255, 255, 0.82)',
    panel: 'rgba(255, 255, 255, 0.80)',
    chatArea: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(49, 151, 96, 0.14)',
    inputBg: 'rgba(255, 255, 255, 0.75)',
    hoverBg: 'rgba(49, 151, 96, 0.055)',
    activeBg: 'rgba(49, 151, 96, 0.09)',
    textPri: '#1a2e3d',
    textSec: '#6b8ea6',
    textMute: '#9db8cc',
    online: 'var(--color-primary)',
    offline: '#94a3b8',
  };

  return (
    <div className="flex h-full overflow-hidden relative"
      style={{ background: '#f8fbff' }}>

      {/* Animated circuit background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <SchematicBg />
      </div>

      {/* ── LEFT: Conversation list ─────────────────────────────────── */}
      <div className="relative z-10 w-75 shrink-0 flex flex-col backdrop-blur-xl"
        style={{ background: C.sidebar, borderRight: `1px solid ${C.border}` }}>

        {/* Agent status bar */}
        <div className="px-4 py-3 shrink-0"
          style={{
            borderBottom: `1px solid ${C.border}`,
            background: isOnline ? 'rgba(49,151,96,0.06)' : 'rgba(239,68,68,0.09)',
          }}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full shrink-0 ${isOnline ? 'animate-pulse' : ''}`}
                style={{ background: isOnline ? C.online : '#ef4444' }} />
              <span className="text-[12px] font-semibold"
                style={{ color: isOnline ? C.online : '#dc2626' }}>
                You are currently {isOnline ? 'ONLINE' : 'OFFLINE'}
              </span>
            </div>
            <button
              onClick={() => toggleStatus(!isOnline)}
              disabled={statusLoading}
              className="relative rounded-full flex items-center transition-all duration-300 shrink-0 disabled:opacity-50"
              style={{
                width: 36, height: 20, padding: '2px',
                background: isOnline ? 'var(--color-primary)' : '#ef4444'
              }}>
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300
                               ${isOnline ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>
          <p className="text-[10px] pl-4" style={{ color: C.textSec }}>
            {isOnline
              ? 'Clients can see you as available for live support.'
              : 'Clients will see "Live Support" disabled and can only leave messages.'}
          </p>
        </div>

        {/* Search */}
        <div className="px-3 py-2.5 shrink-0" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5"
              style={{ color: C.textSec }} />
            <input
              type="text" placeholder="Search conversations..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-xl text-[12px] font-medium outline-none transition-all"
              style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPri }} />
          </div>
        </div>

        {/* Chats label */}
        <div className="px-4 py-2 shrink-0" style={{ borderBottom: `1px solid ${C.border}` }}>
          <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: C.textMute }}>
            Chats ({filtered.length})
          </span>
        </div>

        {/* Session list */}
        <div className="flex-1 overflow-y-auto">
          {sessionsLoading && sessions.length === 0 ? (
            /* Only show spinner on the very first load — not on background 15s polls */
            <div className="flex items-center justify-center h-32">
              <p className="text-[12px] font-semibold" style={{ color: C.textSec }}>Loading…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32" style={{ color: C.textSec }}>
              <MessageSquare className="w-8 h-8 opacity-20 mb-2" />
              <p className="text-[12px] font-semibold">No conversations</p>
            </div>
          ) : filtered.map((session) => {
            const isActive = selectedSessionId === session.id;
            const [from, to] = getGradient(session.name);
            // Get the actual latest message by max id (API order is not guaranteed)
            const msgs = session.messages || [];
            const lastMsg = msgs.length
              ? msgs.reduce((prev, cur) => (cur.id > prev.id ? cur : prev))
              : null;
            const preview = lastMsg?.files?.length
              ? '📎 Attachment'
              : (lastMsg?.message || 'No messages yet');
            const unread = unreadCounts[session.id] || 0;

            return (
              <button key={session.id}
                onClick={() => setSelectedSession(session.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-150"
                style={{
                  borderBottom: `1px solid ${C.border}`,
                  borderLeft: `3px solid ${isActive ? 'var(--color-primary)' : 'transparent'}`,
                  background: isActive ? C.activeBg : 'transparent',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = C.hoverBg; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}>

                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center
                                  text-white font-black text-[12px]"
                    style={{ background: `linear-gradient(135deg,${from},${to})` }}>
                    {getInitials(session.name)}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full"
                    style={{
                      background: session.is_user_online ? C.online : C.offline,
                      outline: '2px solid #f0f6ff',
                    }} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Row 1: Name + last message time */}
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className={`text-[13px] truncate ${unread > 0 ? 'font-semibold' : 'font-medium'}`}
                      style={{ color: C.textPri }}>
                      {session.name}
                    </span>
                    <span className="text-[10px] shrink-0 font-medium" style={{ color: C.textMute }}>
                      {formatMsgTime(lastMsg?.created_at)}
                    </span>
                  </div>
                  {/* Row 2: Message preview + unread badge */}
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[11px] truncate flex-1 min-w-0"
                      style={{
                        color: unread > 0 ? C.textPri : C.textSec,
                        fontWeight: unread > 0 ? 600 : 400
                      }}>
                      {preview}
                    </p>
                    {unread > 0 && (
                      <span className="flex items-center justify-center text-white text-[9px] font-black
                                       shrink-0 rounded-full ml-1"
                        style={{
                          minWidth: 18, height: 18, padding: '0 4px',
                          background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))',
                          boxShadow: '0 2px 8px rgba(49,151,96,0.5)'
                        }}>
                        {unread > 99 ? '99+' : unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── RIGHT: Chat area ─────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0"
        style={{ background: C.chatArea }}>

        {selected ? (
          <>
            {/* Chat header */}
            <div className="flex items-center justify-between px-6 py-4 shrink-0 backdrop-blur-xl"
              style={{ borderBottom: `1px solid ${C.border}`, background: C.panel }}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center
                                  text-white font-black text-[12px]"
                    style={{ background: `linear-gradient(135deg,${selectedGradient[0]},${selectedGradient[1]})` }}>
                    {getInitials(selected.name)}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full"
                    style={{
                      background: selected.is_user_online ? C.online : C.offline,
                      outline: '2px solid #f4f9ff',
                    }} />
                </div>
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: C.textPri }}>
                    {selected.name}
                  </p>
                  <p className="text-[11px]" style={{ color: C.textSec }}>
                    {selected.is_user_online
                      ? <span style={{ color: C.online, fontWeight: 700 }}>Online now</span>
                      : 'Offline — reply will be sent via email'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                  style={{ background: C.inputBg, border: `1px solid ${C.border}` }}>
                  <Calendar className="w-3.5 h-3.5" style={{ color: C.textSec }} />
                  <span className="text-[12px] font-medium" style={{ color: C.textPri }}>
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
                  style={{ background: 'rgba(49,151,96,0.10)', border: '1px solid rgba(49,151,96,0.22)' }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.online }} />
                  <span className="text-[11px] font-semibold" style={{ color: C.online }}>Connected</span>
                </div>
              </div>
            </div>

            {/* ── Messages: oldest at top → newest at bottom ─────────── */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
              <AnimatePresence initial={false}>
                {sortedMessages.map((msg, idx) => {
                  const isAdmin = msg.sender_type === 'admin';
                  return (
                    <motion.div key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2, delay: idx < 4 ? idx * 0.04 : 0 }}
                      className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-[62%] flex flex-col gap-1">

                        {/* Text bubble */}
                        {msg.message && (
                          <div className="px-4 py-2.5 text-[13px] font-medium leading-relaxed"
                            style={isAdmin
                              ? {
                                background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))',
                                color: '#fff',
                                borderRadius: '18px 18px 4px 18px',
                                boxShadow: '0 4px 16px rgba(49,151,96,0.3)'
                              }
                              : {
                                background: 'rgba(255, 255, 255, 0.96)',
                                border: '1px solid rgba(49,151,96,0.14)',
                                color: C.textPri,
                                borderRadius: '18px 18px 18px 4px',
                                boxShadow: '0 2px 14px rgba(49,151,96,0.08),0 1px 4px rgba(0,0,0,0.07)'
                              }}>
                            {msg.message}
                          </div>
                        )}

                        {/* File attachments */}
                        {msg.files?.length > 0 && (
                          <div className="flex flex-col gap-1.5">
                            {msg.files.map((f, fi) => {
                              const src = `${API_BASE}/${f.file_path}`;
                              if (isImage(f.file_path)) {
                                return (
                                  <a key={fi} href={src} target="_blank" rel="noreferrer">
                                    <img src={src} alt="attachment"
                                      className="max-w-full rounded-xl max-h-48 object-cover"
                                      style={{
                                        border: `1px solid ${C.border}`,
                                        boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
                                      }} />
                                  </a>
                                );
                              }
                              return (
                                <a key={fi} href={src} target="_blank" rel="noreferrer"
                                  className="flex items-center gap-2 px-3 py-2 rounded-xl
                                              text-[12px] font-semibold transition-colors"
                                  style={{
                                    background: 'rgba(255,255,255,0.95)',
                                    border: `1px solid ${C.border}`,
                                    color: 'var(--color-primary)'
                                  }}>
                                  <FileText className="w-3.5 h-3.5 shrink-0" />
                                  {f.file_path.split('/').pop()}
                                </a>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="px-5 py-4 shrink-0 backdrop-blur-xl"
              style={{ borderTop: `1px solid ${C.border}`, background: C.panel }}>

              {/* Selected file chips */}
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {files.map((f, i) => (
                    <div key={i}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                      style={{
                        background: 'rgba(49,151,96,0.12)',
                        border: `1px solid ${C.border}`, color: 'var(--color-primary)'
                      }}>
                      📎 {f.name.length > 20 ? f.name.slice(0, 18) + '…' : f.name}
                      <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}
                        className="ml-0.5 hover:text-red-400 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3">
                <input ref={fileInputRef} type="file" multiple className="hidden"
                  onChange={handleFileChange} />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-10 h-11 flex items-center justify-center rounded-xl shrink-0 transition-all"
                  style={{ color: C.textSec }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--color-primary)';
                    e.currentTarget.style.background = 'rgba(49,151,96,0.10)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = C.textSec;
                    e.currentTarget.style.background = 'transparent';
                  }}>
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text" value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message…"
                  className="flex-1 h-11 px-4 rounded-xl text-[13px] font-medium outline-none transition-all"
                  style={{ background: C.inputBg, border: `1px solid ${C.border}`, color: C.textPri }} />

                <button
                  onClick={handleSend}
                  disabled={(!message.trim() && files.length === 0) || replyLoading}
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0
                             hover:-translate-y-0.5 active:scale-[0.96] transition-all duration-200
                             disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))',
                    boxShadow: '0 4px 18px rgba(49,151,96,0.38)'
                  }}>
                  {replyLoading
                    ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    : <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No session selected */
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center"
              style={{
                background: 'rgba(49,151,96,0.08)',
                border: '1px solid rgba(49,151,96,0.20)',
                boxShadow: '0 8px 32px rgba(49,151,96,0.12)'
              }}>
              <MessageSquare className="w-9 h-9" style={{ color: 'rgba(49,151,96,0.45)' }} />
            </div>
            <div className="text-center">
              <p className="text-[15px] font-semibold" style={{ color: C.textPri }}>Select a chat</p>
              <p className="text-[12px] font-medium mt-1" style={{ color: C.textSec }}>
                Choose a conversation to start replying
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(49,151,96,0.09)', border: '1px solid rgba(49,151,96,0.20)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: C.online }} />
              <span className="text-[11px] font-semibold" style={{ color: C.online }}>Connected</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
