import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface CafeClockStatusProps {
  lang: Language;
}

export default function CafeClockStatus({ lang }: CafeClockStatusProps) {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Working Hours (08:00 - 00:00)
  const isOpen = hours >= 8 && hours < 24;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  const text = {
    az: {
      open: "Açıqdır",
      closed: "Bağlıdır",
      tagline: "Sizi gözləyirik!",
      closedTagline: "Səhər saat 08:00-da açılırıq",
    },
    en: {
      open: "Open",
      closed: "Closed",
      tagline: "We are waiting for you!",
      closedTagline: "We open at 08:00 AM",
    }
  };

  const currentText = text[lang];

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#3D2B1F]/10 shadow-xs max-w-xs mx-auto">
      {/* Mini Analog Clock SVG */}
      <div className="relative w-14 h-14 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            className="fill-[#FCF9F5] stroke-[#3D2B1F]/10" 
            strokeWidth="3.5" 
          />
          
          {/* Subtle hour markers */}
          <line x1="50" y1="8" x2="50" y2="13" className="stroke-[#3D2B1F]/40" strokeWidth="3" strokeLinecap="round" />
          <line x1="92" y1="50" x2="87" y2="50" className="stroke-[#3D2B1F]/40" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="92" x2="50" y2="87" className="stroke-[#3D2B1F]/40" strokeWidth="3" strokeLinecap="round" />
          <line x1="8" y1="50" x2="13" y2="50" className="stroke-[#3D2B1F]/40" strokeWidth="3" strokeLinecap="round" />

          {/* Hour Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="28"
            className="stroke-[#3D2B1F]"
            strokeWidth="4"
            strokeLinecap="round"
            transform={`rotate(${hourDeg} 50 50)`}
          />

          {/* Minute Hand */}
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="18"
            className="stroke-[#3D2B1F]/70"
            strokeWidth="2.5"
            strokeLinecap="round"
            transform={`rotate(${minuteDeg} 50 50)`}
          />

          {/* Second Hand */}
          <line
            x1="50"
            y1="54"
            x2="50"
            y2="14"
            className="stroke-amber-500"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${secondDeg} 50 50)`}
          />

          {/* Center Pin */}
          <circle cx="50" cy="50" r="3" className="fill-[#3D2B1F]" />
        </svg>
      </div>

      {/* Text Info */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            {isOpen && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
          </span>
          <span className="text-sm font-extrabold text-[#3D2B1F]">
            {isOpen ? currentText.open : currentText.closed}
          </span>
        </div>
        <p className="text-[11px] text-stone-500 font-medium leading-tight mt-0.5">
          {isOpen ? currentText.tagline : currentText.closedTagline}
        </p>
        <span className="text-[9px] text-stone-400 font-mono mt-1 tracking-wider">
          {time.toLocaleTimeString(lang === 'az' ? 'az-AZ' : 'en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      </div>
    </div>
  );
}