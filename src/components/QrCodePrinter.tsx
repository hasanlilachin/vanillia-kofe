import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Language } from '../types';
import { cafeInfo } from '../data/menuData';
import { QrCode, Download, Printer, Settings, Eye, Info, Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface QrCodePrinterProps {
  lang: Language;
}

export default function QrCodePrinter({ lang }: QrCodePrinterProps) {
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [targetTable, setTargetTable] = useState<string>('5');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    // Safely extract window location in browser
    if (typeof window !== 'undefined') {
      // Get the base URL without query parameters
      const baseUrl = window.location.origin + window.location.pathname;
      setCurrentUrl(baseUrl);
    }
  }, []);

  const qrValue = `${currentUrl || 'https://vanillia.baku'}${targetTable ? `?table=${encodeURIComponent(targetTable)}` : ''}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrValue);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EADBC8] p-5 sm:p-6 shadow-sm max-w-4xl mx-auto my-8 print:border-none print:shadow-none print:p-0 print:my-0" id="qr-generator-studio">
      <div className="flex flex-col md:flex-row gap-6 items-stretch">
        
        {/* Admin Left configuration panel controls (hidden when printing) */}
        <div className="flex-1 space-y-4 print:hidden">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-900">
              <QrCode className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#2C1B14] font-serif tracking-tight">
                {lang === 'az' ? 'QR Kod & Masa Kart Generatoru' : 'QR Menu Table-Tent Studio'}
              </h3>
              <p className="text-xs text-stone-400">
                {lang === 'az' ? 'Müştəriləriniz üçün hər masaya aid fərqli QR çap edin.' : 'Generate cards for each table with pre-coded table links.'}
              </p>
            </div>
          </div>

          <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/40 text-xs text-amber-950 space-y-2">
            <div className="flex items-start gap-1.5 font-medium leading-relaxed">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                {lang === 'az' 
                  ? 'QR kodu skan edən müştərilərin telefonunda avtomatik olaraq bu masa nömrəsi aktivləşir. Beləcə sifariş xətalarının qarşısı alınır.' 
                  : 'Scanning this pre-embeds the table number, so visitors can order checkout flawlessly without typing.'}
              </span>
            </div>
          </div>

          <div className="space-y-3.5 pt-2">
            {/* Table Selector */}
            <div>
              <label htmlFor="target-table-select" className="block text-xs font-bold text-stone-700 mb-1">
                {lang === 'az' ? 'Masa nömrəsini daxil edin (məs. 4, 12, A1):' : 'Configure Table identification (e.g. 5, 23, B2):'}
              </label>
              <input
                id="target-table-select"
                type="text"
                value={targetTable}
                maxLength={6}
                onChange={(e) => setTargetTable(e.target.value)}
                className="w-full bg-stone-50 border border-stone-200 focus:border-amber-900 focus:bg-white focus:outline-hidden rounded-xl px-3.5 py-2.5 text-xs font-bold text-stone-800"
                placeholder="Masa kodu"
              />
            </div>

            {/* Live Link viewer */}
            <div>
              <span className="block text-xs font-bold text-stone-500 mb-1 uppercase tracking-wider">
                {lang === 'az' ? 'QR Link Sürəti:' : 'Resulting QR Target Link:'}
              </span>
              <div className="flex gap-1.5">
                <span className="flex-1 bg-stone-50 border border-stone-100 rounded-lg py-1.5 px-2.5 text-[10px] text-stone-600 font-mono select-all truncate block">
                  {qrValue}
                </span>
                <button
                  onClick={handleCopyLink}
                  className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-[10px] px-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  {copiedLink ? (lang === 'az' ? 'Kopyalandı!' : 'Copied!') : (lang === 'az' ? 'Kopyala' : 'Copy')}
                </button>
              </div>
            </div>

            {/* Quick Helper and Instructions */}
            <div className="pt-2 text-[11px] text-stone-500 space-y-1 bg-[#FAF6F0] p-3 rounded-lg border border-[#EADBC8]/40">
              <span className="font-bold text-[#2C1B14] block">💡 {lang === 'az' ? 'Necə istifadə etməli?' : 'How to display to diners?'}</span>
              <ol className="list-decimal list-inside space-y-1 pl-1 text-[10px] text-stone-600">
                <li>{lang === 'az' ? 'Öz Masa nömrənizi daxil edin.' : 'Input the table identifier.'}</li>
                <li>{lang === 'az' ? 'Brauzeriniz vasitəsilə çap pəncərəsini açaraq bu kartı çıxarın.' : 'Open your browser print dialog to print this QR card.'}</li>
                <li>{lang === 'az' ? 'Ağ-Qara və ya rəngli A4/A5 kağızında çıxarıb bükərək masaya qoyun.' : 'Fold and place the printed card directly on your dining tables.'}</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Dynamic Canvas Table Tent representation */}
        <div className="flex-1 bg-[#F9F7F2] border border-[#EADBC8] rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-xs border-dashed print:border-none print:shadow-none print:bg-white print:p-0 print:m-0">
          
          {/* Subtle design accents */}
          <div className="absolute top-2 left-2 text-[8px] font-mono font-bold text-stone-300 pointer-events-none select-none print:hidden uppercase tracking-widest">
            QR Table Card Preview (A6 Tent)
          </div>

          <div className="w-full max-w-xs bg-white border-4 border-amber-950 p-5 rounded-xl shadow-lg relative flex flex-col items-center text-center space-y-4 print:border-4 print:shadow-none print:max-w-none print:mx-auto">
            {/* Elegant Header frame */}
            <div className="border-b-2 border-double border-amber-900 pb-2 w-full">
              <div className="flex justify-center mb-1 text-amber-900">
                <Sparkles className="w-4 h-4 fill-current text-amber-700" />
              </div>
              <h4 className="text-amber-950 font-serif font-extrabold text-sm tracking-wide uppercase">
                {cafeInfo.name}
              </h4>
              <p className="text-[8px] tracking-wider text-amber-900/80 uppercase font-mono font-bold">
                Kofe və Şirniyyat Evi
              </p>
            </div>

            {/* Big table number card indicator */}
            <div className="bg-amber-950 text-[#FAF6F0] rounded-md px-3 py-1 font-mono text-[11px] font-extrabold tracking-widest border border-amber-800">
              {lang === 'az' ? 'MASA' : 'TABLE'} {targetTable || '#'}
            </div>

            {/* Dynamic visual QR code generation */}
            <div className="p-3 bg-white border border-[#EADBC8] rounded-xl shadow-xs">
              <QRCodeSVG
                value={qrValue}
                size={140}
                level="H"
                includeMargin={false}
                imageSettings={{
                  src: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=60",
                  x: undefined,
                  y: undefined,
                  height: 24,
                  width: 24,
                  excavate: true,
                }}
              />
            </div>

            {/* Instruction Callouts */}
            <div className="space-y-2 pt-1">
              <p className="text-amber-950 font-sans font-bold text-xs leading-tight">
                {lang === 'az' ? 'RƏQƏMSAL MENYU İÇİN QR KODU SKAN EDİN' : 'SCAN FOR DIGITAL MENU & PRICING'}
              </p>
              <p className="text-[9px] text-[#5C4D3C] font-medium leading-relaxed max-w-[210px] mx-auto">
                {lang === 'az' 
                  ? 'Kameranı QR kodun üzərinə gətirərək tam menyumuzu və qiymətlərimizi birbaşa telefonunuzda izləyin.' 
                  : 'Point your camera over the QR code to read menu items, details, and price catalog digitally.'}
              </p>
            </div>

            {/* Elegant gold ribbon footer details */}
            <div className="pt-2 border-t border-amber-900/30 w-full text-[8.5px] font-semibold font-mono text-stone-400 flex items-center justify-between">
              <span>wifi: {cafeInfo.wifiName}</span>
              <span>@{cafeInfo.instagram}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
