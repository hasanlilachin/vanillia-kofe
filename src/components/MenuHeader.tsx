import React, { useState } from 'react';
import { cafeInfo, CafeInfo } from '../data/menuData';
import { Language } from '../types';
import { Coffee, MapPin, Phone, Wifi, Clock, Globe, Copy, Check, Instagram, Music } from 'lucide-react';
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
      <div className="relative h-60 w-full sm:h-72 overflow-hidden">
        <div className="absolute inset-0 bg-black/45 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=1200"
          alt="La Vanillia Café House Banner"
          className="h-full w-full object-cover object-center scale-105 motion-safe:animate-[pulse_8s_ease-in-out_infinite]"
          referrerPolicy="no-referrer"
        />
        
        {/* Floating Controls inside Banner */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-end items-center">
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

        {/* Cafe Title & Tagline overlapping banner */}
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-1.5 bg-[#B8860B] text-white font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
          >
            <Coffee className="w-3 h-3" />
            Vanillia Kofe
          </motion.div>
          
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
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white shadow-xs border border-[#3D2B1F]/10">
          <div className="p-2 rounded-lg bg-amber-50 text-[#8C7B6E] self-start">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-[#8C7B6E] uppercase tracking-wider">
              {lang === 'az' ? 'ÜNVAN' : 'ADDRESS'}
            </h4>
            <p className="text-xs font-medium text-stone-800 leading-tight mt-0.5">
              {lang === 'az' ? cafeInfo.addressAz : cafeInfo.addressEn}
            </p>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white shadow-xs border border-[#3D2B1F]/10">
          <div className="p-2 rounded-lg bg-amber-50 text-[#8C7B6E] self-start">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-[#8C7B6E] uppercase tracking-wider">
              {lang === 'az' ? 'İŞ SAATLƏRİ' : 'HOURS'}
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

        {/* Social Media links (Instagram & TikTok) */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white shadow-xs border border-[#3D2B1F]/10">
          <div className="p-2 rounded-lg bg-amber-50 text-[#8C7B6E] self-start flex flex-col gap-1.5">
            <Instagram className="w-4 h-4 text-pink-600" />
            <Music className="w-4 h-4 text-rose-500" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[11px] font-bold text-[#8C7B6E] uppercase tracking-wider">
              {lang === 'az' ? 'SOSİAL ŞƏBƏKƏ' : 'SOCIAL MEDIA'}
            </h4>
            <div className="flex flex-col gap-[3px] mt-0.5">
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
              ? 'Rəqəmsal Menyumuza xoş gəlmisiniz! Sifarişinizi piştaxtaya yaxınlaşaraq edə və oradan özünüz götürə bilərsiniz.' 
              : 'Welcome to our Digital Menu! Please place your order and pick it up directly at the counter.'}
          </p>
        </div>
      </div>

      {/* Modern Wi-Fi Drawer Modal */}
      <AnimatePresence>
        {wifiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWifiModalOpen(false)}
              className="fixed inset-0 bg-neutral-900/60 backdrop-blur-xs"
            />

            {/* Modal Body */}
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
