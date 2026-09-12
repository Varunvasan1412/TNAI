import React, { useState, useEffect } from 'react';
import * as Feather from 'react-feather';

const LiveTime = ({ location }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getZone = (c) => {
    if (!c) return Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lower = c.toLowerCase();
    if (lower.includes('india') || lower === 'in') return 'Asia/Kolkata';
    if (lower.includes('aus') || lower === 'au') return 'Australia/Sydney';
    if (lower.includes('uk') || lower === 'gb') return 'Europe/London';
    if (lower.includes('us') || lower.includes('america')) return 'America/New_York';
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  const dateTimeString = new Intl.DateTimeFormat('en-US', {
    timeZone: getZone(location),
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(time);

  return (
    <div className="flex items-center gap-2 px-4 h-10 bg-gray-100/50 dark:bg-slate-900/50 rounded-xl border border-gray-200/50 dark:border-slate-700/50">
      <Feather.Clock className="w-4 h-4 text-primary" />
      <span className="text-sm font-black text-gray-700 dark:text-gray-200 tracking-wide">{dateTimeString}</span>
    </div>
  );
};

export default LiveTime;
