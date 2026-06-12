import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';
import { Language, TrayItem } from '../types';
import { Sparkles, Leaf, ShieldAlert, Plus, Check, ChevronDown, ChevronUp, Clock, Snowflake, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuItemCardProps {
  key?: string;
  item: MenuItem;
  lang: Language;
  onAddToTray: (trayItem: Omit<TrayItem, 'id'>) => void;
}

export default function MenuItemCard({ item, lang, onAddToTray }: MenuItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Customization Options
  const [selectedMilk, setSelectedMilk] = useState<string>('Normal');
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L'>('S');
  const [selectedSugar, setSelectedSugar] = useState<string>('Normal');
  const [notes, setNotes] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Price Calculation depending on selections
  const calculateCurrentPrice = () => {
    let basePrice = item.price;
    
    if (item.options?.size) {
      if (selectedSize === 'M') basePrice += 0.80;
      if (selectedSize === 'L') basePrice += 1.50;
    }

    if (item.options?.milk) {
      if (selectedMilk === 'Badam' || selectedMilk === 'Almond') basePrice += 1.20;
      if (selectedMilk === 'Kokos' || selectedMilk === 'Coconut') basePrice += 1.00;
      if (selectedMilk === 'Yulaf' || selectedMilk === 'Oat') basePrice += 1.00;
    }

    return parseFloat(basePrice.toFixed(2));
  };

  const handleAdd = () => {
    const finalPrice = calculateCurrentPrice();
    onAddToTray({
      menuItem: item,
      quantity: 1,
      selectedMilk: item.options?.milk ? selectedMilk : undefined,
      selectedSize: item.options?.size ? selectedSize : undefined,
      selectedSugar: item.options?.sugar ? selectedSugar : undefined,
      notes: notes.trim() ? notes : undefined,
      finalUnitPrice: finalPrice
    });

    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1500);
  };

  const hasOptions = item.options?.milk || item.options?.size || item.options?.sugar;
  const currentPrice = calculateCurrentPrice();

  return (
    <motion.div 
      layout
      className="bg-white rounded-2xl overflow-hidden border border-[#3D2B1F]/10 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
      id={`menu-item-${item.id}`}
    >
      {/* Product Image and Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-amber-50">
        <img 
          src={item.image} 
          alt={lang === 'az' ? item.nameAz : item.nameEn}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        
        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 z-10">
          {item.isPopular && (
            <span className="flex items-center gap-1 bg-amber-400 text-[#3D2B1F] border border-amber-300 font-bold text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-full shadow-xs">
              <Star className="w-2.5 h-2.5 fill-current" />
              {lang === 'az' ? 'POPULYAR' : 'POPULAR'}
            </span>
          )}
          {item.isNew && (
            <span className="flex items-center gap-1 bg-emerald-500 text-white font-bold text-[9px] uppercase tracking-wide px-2 py-0.5 rounded-full shadow-xs">
              <Sparkles className="w-2.5 h-2.5" />
              {lang === 'az' ? 'YENİ' : 'NEW'}
            </span>
          )}
          {item.tags?.includes('signature') && (
            <span className="bg-[#3D2B1F] text-[#FCF9F5] border border-[#3D2B1F]/20 text-[9px] font-bold px-2 py-0.5 rounded-full">
              ★ {lang === 'az' ? 'MÜƏLLİF' : 'SIGNATURE'}
            </span>
          )}
        </div>

        {/* Hot/Cold Floating Indicator */}
        <div className="absolute bottom-2.5 right-2.5 flex gap-1">
          {item.tags?.includes('hot') && (
            <span className="p-1 px-[7px] bg-red-100/90 border border-red-200 rounded-lg text-red-700 text-xs shadow-xs" title="Hot">
              🔥
            </span>
          )}
          {item.tags?.includes('cold') && (
            <span className="p-1 px-[7px] bg-sky-100/90 border border-sky-200 rounded-lg text-sky-700 text-xs shadow-xs" title="Iced">
              ❄️
            </span>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-base font-extrabold text-[#3D2B1F] font-serif tracking-tight leading-tight">
              {lang === 'az' ? item.nameAz : item.nameEn}
            </h3>
            <span className="text-base font-black text-[#B8860B] font-mono shrink-0 whitespace-nowrap">
              {item.price.toFixed(2)} ₼
            </span>
          </div>

          <p className="text-stone-500 text-xs mt-1.5 leading-relaxed font-sans font-medium line-clamp-3">
            {lang === 'az' ? item.descriptionAz : item.descriptionEn}
          </p>

          {/* Tag Badges (Vegan, Gluten-Free, Sugar-Free) */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {item.tags.includes('vegan') && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  <Leaf className="w-2.5 h-2.5" />
                  {lang === 'az' ? 'Vegetarian' : 'Vegan'}
                </span>
              )}
              {item.tags.includes('glutenfree') && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  {lang === 'az' ? 'Glutensiz' : 'Gluten-Free'}
                </span>
              )}
              {item.tags.includes('sugarfree') && (
                <span className="inline-flex items-center gap-1 text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  {lang === 'az' ? 'Şəkərsiz' : 'Sugar-Free'}
                </span>
              )}
            </div>
          )}

          {/* Allergens segment */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="mt-2.5 text-[10px] text-stone-400 font-mono flex items-center gap-1 flex-wrap">
              <ShieldAlert className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{lang === 'az' ? 'Allergenlər:' : 'Allergens:'}</span>
              <span className="font-semibold text-stone-500">{item.allergens.join(', ')}</span>
            </div>
          )}
        </div>

        {/* Buttons and Customizers */}
        <div className="mt-4 pt-3 border-t border-[#FCFCFC]">
          {/* Customizer trigger if options exist */}
          {hasOptions && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between text-stone-500 hover:text-[#3D2B1F] text-[11px] font-bold py-1 px-1.5 rounded-lg hover:bg-[#F2EDE7]/40 transition-[#3D2B1F] transition-colors cursor-pointer"
              id={`config-btn-${item.id}`}
            >
              <span className="flex items-center gap-1">
                ⚙️ {lang === 'az' ? 'Seçimləri fərdiləşdir (Sifariş zamanı bildirin)' : 'Customize options (Request at counter)'}
              </span>
              <span className="flex items-center">
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </span>
            </button>
          )}

          {/* Animated Customization Panel */}
          <AnimatePresence>
            {isExpanded && hasOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden bg-[#F2EDE7]/30 p-3 rounded-xl border border-[#3D2B1F]/10 mt-2 text-xs space-y-2.5"
                id={`expand-panel-${item.id}`}
              >
                {/* Sizing options */}
                {item.options?.size && (
                  <div>
                    <label className="font-bold text-[#3D2B1F] block mb-1">
                      {lang === 'az' ? 'Ölçü seçimi (Həcm):' : 'Select Size:'}
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['S', 'M', 'L'] as const).map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSelectedSize(sz)}
                          className={`py-1 px-1 text-center font-bold rounded-md border transition-all cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-[#3D2B1F] text-[#FCF9F5] border-[#3D2B1F]'
                              : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          {sz} {sz === 'S' ? '' : sz === 'M' ? '(+0.80₼)' : '(+1.50₼)'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Milk Options */}
                {item.options?.milk && (
                  <div>
                    <label className="font-bold text-[#3D2B1F] block mb-1">
                      {lang === 'az' ? 'Süd alternativi:' : 'Milk Options:'}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[(lang === 'az' ? 'Normal' : 'Normal'), 
                        (lang === 'az' ? 'Badam (+1.20₼)' : 'Almond (+1.20₼)'), 
                        (lang === 'az' ? 'Kokos (+1.00₼)' : 'Coconut (+1.00₼)'), 
                        (lang === 'az' ? 'Yulaf (+1.00₼)' : 'Oat (+1.00₼)')].map((mOption) => {
                        const cleanVal = mOption.split(' ')[0];
                        return (
                          <button
                            key={mOption}
                            type="button"
                            onClick={() => setSelectedMilk(cleanVal)}
                            className={`py-1 px-1 text-center font-semibold rounded-md text-[10px] border transition-all cursor-pointer whitespace-nowrap ${
                              selectedMilk === cleanVal
                                ? 'bg-[#3D2B1F] text-[#FCF9F5] border-[#3D2B1F]'
                                : 'bg-white text-stone-600 border-stone-200 hover:border-[#3D2B1F]/30'
                            }`}
                          >
                            {mOption}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Sugar Level */}
                {item.options?.sugar && (
                  <div>
                    <label className="font-bold text-[#3D2B1F] block mb-1">
                      {lang === 'az' ? 'Şəkər dərəcəsi:' : 'Sugar Level:'}
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[(lang === 'az' ? 'Siz' : 'None'), 
                        (lang === 'az' ? 'Az' : 'Low'), 
                        (lang === 'az' ? 'Orta' : 'Medium'), 
                        (lang === 'az' ? 'Çox' : 'Extra')].map((sLevel) => (
                        <button
                          key={sLevel}
                          type="button"
                          onClick={() => setSelectedSugar(sLevel)}
                          className={`py-1 text-center font-semibold rounded-md border text-[11px] transition-all cursor-pointer ${
                            selectedSugar === sLevel
                              ? 'bg-[#3D2B1F] text-[#FCF9F5] border-[#3D2B1F] shadow-xs'
                              : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          {sLevel}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Private request/Notes */}
                <div>
                  <input
                    type="text"
                    placeholder={lang === 'az' ? 'Xüsusi qeyd (məs: şokoladsız)...' : 'Special note (e.g. no ice)...'}
                    value={notes}
                    maxLength={60}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-[#3D2B1F]/15 rounded-md px-2 py-1 text-[11px] focus:outline-hidden focus:border-[#3D2B1F] placeholder-stone-400 text-stone-800"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
