import React, { useState } from 'react';
import { cafeInfo, CafeInfo } from '../data/menuData';
import { Language } from '../types';
import { Coffee, MapPin, Phone, Wifi, Clock, Globe, Copy, Check, Instagram } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuHeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  tableNumber: string;
  setTableNumber: (num: string) => void;
}

export default function MenuHeader({ lang, setLang, tableNumber, setTableNumber }: MenuHeaderProps) {
  const [wifiModalOpen, setWifiModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyWifiPass = () => {
    navigator.clipboard.writeText(cafeInfo.wifiPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="relative w-full overflow-hidden bg-[#FCF9F5] border-b border-[#3D2B1F]/10">
      {/* Visual Splash Art Banner */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=1200"
          alt="La Vanillia Café House Banner"
          className="h-full w-full object-cover object-center scale-105 motion-safe:animate-[pulse_8s_ease-in-out_infinite]"
          referrerPolicy="no-referrer"
        />
        
        {/* Floating Controls inside Banner */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
          
          {/* SINGLE 2X LARGER LOGO FOR BOTH PC AND MOBILE */}
          <div className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Vanillia Logo" 
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain rounded-full bg-black/70 backdrop-blur-md border-2 border-amber-400/60 p-2 shadow-2xl hover:scale-105 transition-transform"
            />
          </div>

          {/* Language Switcher */}
          <div className="flex bg-black/70 backdrop-blur-md p-1 rounded-full border border-white/10" id="lang-toggle-container">
            <button
              onClick={() => setLang('az')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                lang === 'az' 
                  ? 'bg-amber-100 text-[#3D2B1F] shadow-sm' 
                  : 'text-amber-100/70 hover:text-white'
              }`}
            >
              AZ
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 cursor-pointer ${
                lang === 'en' 
                ? 'bg-amber-100 text-[#3D2B1F] shadow-sm' 
                : 'text-amber-100/70 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Cafe Title & Tagline */}
        <div className="absolute bottom-6 left-6 right-6 z-20">
         
          
          <h1 className="text-white text-3xl sm:text-4xl font-extrabold tracking-tight font-serif select-none">
            {cafeInfo.name}
          </h1>
          <p className="text-amber-100/90 text-xs sm:text-sm mt-1 max-w-md italic font-sans font-medium line-clamp-2">
            {lang === 'az' ? cafeInfo.taglineAz : cafeInfo.taglineEn}
          </p>
        </div>
      </div>

      {/* Info segments section */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#FCF9F5]">
        
        {/* Address */}
        <a 
          href="https://maps.app.goo.gl/xLGwLQT73JugC7qC9" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-2.5 p-3 rounded-xl bg-white hover:bg-stone-50 transition-colors border border-[#3D2B1F]/10 cursor-pointer text-left"
        >
          <div className="p-2 rounded-lg bg-amber-50 text-[#8C7B6E] self-start">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-[#8C7B6E] uppercase tracking-wider flex items-center justify-between min-w-[120px]">
              <span>{lang === 'az' ? 'ÜNVAN' : 'ADDRESS'}</span>
              <span className="text-[9px] text-amber-800 underline uppercase tracking-tight ml-2">
                {lang === 'az' ? 'Xərİtədə bax' : 'View Map'}
              </span>
            </h4>
            <p className="text-xs font-medium text-stone-800 leading-tight mt-0.5">
              {lang === 'az' ? cafeInfo.addressAz : cafeInfo.addressEn}
            </p>
          </div>
        </a>

        {/* Operating Hours */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white shadow-xs border border-[#3D2B1F]/10">
          <div className="p-2 rounded-lg bg-amber-50 text-[#8C7B6E] self-start">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-[#8C7B6E] uppercase tracking-wider">
              {lang === 'az' ? 'İŞ SAATLARI' : 'HOURS'}
            </h4>
            <p className="text-xs font-medium text-stone-800 leading-tight mt-0.5">
              {lang === 'az' ? cafeInfo.workingHoursAz : cafeInfo.workingHoursEn}
            </p>
          </div>
        </div>

        {/* Wi-Fi Segment with action */}
        <button 
          onClick={() => setWifiModalOpen(true)}
          className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F2EDE7]/60 hover:bg-[#F2EDE7]/90 transition-colors border border-[#3D2B1F]/10 cursor-pointer text-left w-full"
        >
          <div className="p-2 rounded-lg bg-[#3D2B1F]/5 text-[#3D2B1F] self-start">
            <Wifi className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-[11px] font-bold text-[#3D2B1F]/70 uppercase tracking-wider flex items-center justify-between">
              <span>{lang === 'az' ? 'PULSUZ WI-FI' : 'FREE WI-FI'}</span>
              <span className="text-[9px] bg-[#3D2B1F]/10 px-1.5 py-0.5 rounded text-[#3D2B1F] font-bold font-mono">Bax</span>
            </h4>
            <p className="text-xs font-semibold text-stone-900 truncate mt-0.5">
              SSID: {cafeInfo.wifiName}
            </p>
          </div>
        </button>

        {/* Social Media links */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white shadow-xs border border-[#3D2B1F]/10">
          <div className="p-2 rounded-lg bg-amber-50 text-[#8C7B6E] self-start flex flex-col gap-1.5">
            <svg 
              className="w-4 h-4 text-[#25D366]" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 00-6.974-2.895c-5.45 0-9.887 4.372-9.89 9.802-.001 1.772.463 3.504 1.344 5.043l-.98 3.578 3.661-.951zm11.235-6.72c-.31-.156-1.838-.907-2.119-1.01-.28-.101-.485-.156-.69.156-.205.312-.79.992-.968 1.199-.18.206-.359.233-.67.078-.31-.156-1.309-.48-2.493-1.537-.919-.818-1.54-1.83-1.72-2.14-.18-.31-.02-.477.136-.633.14-.139.31-.361.464-.543.154-.18.206-.31.31-.515.103-.207.051-.387-.026-.543-.077-.156-.69-1.662-.944-2.27-.249-.599-.5-.518-.69-.527-.178-.008-.383-.01-.59-.01-.205 0-.537.077-.818.387-.28.31-1.074 1.047-1.074 2.553 0 1.506 1.099 2.964 1.248 3.166.15.203 2.163 3.303 5.242 4.627.733.315 1.305.503 1.751.644.737.234 1.407.2 1.938.12.59-.09 1.838-.752 2.094-1.446.256-.695.256-1.29.179-1.415-.077-.125-.281-.203-.591-.359z" />
            </svg>
            <Instagram className="w-4 h-4 text-pink-600" />
            <svg 
              className="w-4 h-4 text-black" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.21-.15-.42-.32-.62-.49v7.07c.02 1.11-.21 2.26-.78 3.22-1.34 2.27-4.04 3.48-6.62 2.92-2.52-.54-4.57-2.69-5.01-5.23-.55-3.15 1.5-6.42 4.67-7.01.81-.15 1.65-.12 2.44.1v4.05c-.5-.15-1.05-.18-1.55-.05-1.2.32-2.03 1.53-1.85 2.77.15 1.03.99 1.89 2.02 2.01 1.05.12 2.11-.53 2.37-1.57.1-.41.08-.84.08-1.26V.02z" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[11px] font-bold text-[#8C7B6E] uppercase tracking-wider">
              {lang === 'az' ? 'SOSİAL ŞƏBƏKƏLƏR' : 'SOCIAL MEDIA'}
            </h4>
            <div className="flex flex-col gap-[3px] mt-0.5">
              <a 
                href="https://wa.me/994504658525"
                target="_blank" 
                rel="noreferrer" 
                className="text-[11px] font-extrabold text-[#3D2B1F] hover:underline flex items-center gap-1"
              >
                050-465-85-25 (WhatsApp)
              </a>
              <a 
                href={`https://instagram.com/${cafeInfo.instagram}`}
                target="_blank" 
                rel="noreferrer" 
                className="text-[11px] font-extrabold text-[#3D2B1F] hover:underline flex items-center gap-1"
              >
                @{cafeInfo.instagram}
              </a>
              <a 
                href={`https://tiktok.com/@${cafeInfo.tiktok}`}
                target="_blank" 
                rel="noreferrer" 
                className="text-[11px] font-extrabold text-[#3D2B1F] hover:underline flex items-center gap-1"
              >
                @{cafeInfo.tiktok}
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Manual Table Selection & Quick Instructions Bar */}
      <div className="bg-[#F2EDE7]/60 px-4 py-3 border-t border-[#3D2B1F]/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <p className="text-xs text-[#3D2B1F] font-bold text-center leading-relaxed">
            ⚡ {lang === 'az' 
              ? 'SİFARİŞ ÜÇÜN TELEFON: 050-465-85-25' 
              : 'Welcome to our Digital Menu! Please place your order and pick it up directly at the counter.'}
          </p>
        </div>
      </div>

      {/* Modern Wi-Fi Drawer Modal */}
      <AnimatePresence>
        {wifiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWifiModalOpen(false)}
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs"
            />

            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border border-[#FAF6F0] z-50 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-amber-50 text-amber-800">
                  <Wifi className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-stone-900">
                    {lang === 'az' ? 'Wi-Fi Şifrəsi' : 'Wi-Fi Credentials'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {lang === 'az' ? 'Sürətli və təhlükəsiz pulsuz qoşulma' : 'Enjoy high-speed guest internet'}
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 my-5 bg-amber-50/50 p-4 rounded-xl border border-amber-200/50">
                <div>
                  <span className="text-[10px] font-mono font-bold text-stone-400 block tracking-wider">NETWORK SSiD</span>
                  <span className="text-sm font-extrabold text-stone-800">{cafeInfo.wifiName}</span>
                </div>
                <hr className="border-[#FAF6F0]" />
                <div>
                  <span className="text-[10px] font-mono font-bold text-stone-400 block tracking-wider">{lang === 'az' ? 'ŞİFRƏ' : 'PASSWORD'}</span>
                  <span className="text-sm font-extrabold text-stone-800 font-mono tracking-wide">{cafeInfo.wifiPass}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyWifiPass}
                  className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-amber-950 text-white rounded-xl py-3 text-xs font-bold hover:bg-amber-900 transition-colors shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      {lang === 'az' ? 'Kopyalandı!' : 'Copied!'}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      {lang === 'az' ? 'Şifrəni Kopyala' : 'Copy Password'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setWifiModalOpen(false)}
                  className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold rounded-xl text-xs transition-colors"
                >
                  {lang === 'az' ? 'Bağla' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}