import React from 'react';
import { TrayItem, Language } from '../types';
import { ShoppingBag, Trash2, Plus, Minus, X, Store, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MyTrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  trayItems: TrayItem[];
  lang: Language;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearTray: () => void;
}

export default function MyTrayModal({
  isOpen,
  onClose,
  trayItems,
  lang,
  onUpdateQuantity,
  onRemoveItem,
  onClearTray
}: MyTrayModalProps) {

  // Təmiz Yekun Məbləğ (XİDMƏT HAQQISIZ, YALNIZ MƏHSULLARIN ÖZ CƏMİ)
  const total = trayItems.reduce((acc, item) => acc + (item.finalUnitPrice * item.quantity), 0);
  const totalQuantity = trayItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" id="tray-modal-overlay">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
          />

          {/* Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-[#FCF9F5] h-full shadow-2xl flex flex-col z-50 border-l border-[#3D2B1F]/10"
          >
            {/* Drawer Header */}
            <div className="p-4 bg-[#3D2B1F] text-[#FCF9F5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <h3 className="text-lg font-bold font-serif">
                  {lang === 'az' ? 'Seçim Siyahınız' : 'Your Selected Items'}
                </h3>
                <span className="bg-amber-400 text-stone-950 font-sans text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalQuantity}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-amber-100 hover:text-white hover:bg-white/10 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inner Content Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {trayItems.length === 0 ? (
                /* --- EMPTY TRAY VIEW --- */
                <div className="flex flex-col items-center justify-center text-center py-20 px-4 space-y-3">
                  <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-[#3D2B1F]/40 border border-dashed border-[#3D2B1F]/10">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-stone-800">
                      {lang === 'az' ? 'Səbətiniz boşdur' : 'Your cart is empty'}
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
                      {lang === 'az' 
                        ? 'Menyudan bəyəndiyiniz təamları əlavə edərək ümumi qiyməti öyrənə bilərsiniz.' 
                        : 'Explore desserts, coffee and add them here to calculate check total.'}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 bg-[#F2EDE7] text-[#3D2B1F] rounded-xl text-xs font-bold hover:bg-[#F2EDE7]/90 transition-colors cursor-pointer"
                  >
                    {lang === 'az' ? 'Məhsul seçiminə qayıt' : 'Back to menu'}
                  </button>
                </div>
              ) : (
                /* --- ACTIVE TRAY CONTENTS --- */
                <div className="space-y-4">
                  {/* List of items */}
                  <div className="space-y-3">
                    {trayItems.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-white rounded-xl p-3 border border-[#3D2B1F]/10 flex gap-3 shadow-xs"
                      >
                        <img 
                          src={item.menuItem.image}
                          alt={lang === 'az' ? item.menuItem.nameAz : item.menuItem.nameEn}
                          className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <h5 className="text-xs font-bold text-stone-800 truncate">
                                {lang === 'az' ? item.menuItem.nameAz : item.menuItem.nameEn}
                              </h5>
                              <span className="text-xs font-black text-amber-950 font-mono">
                                {(item.finalUnitPrice * item.quantity).toFixed(2)} ₼
                              </span>
                            </div>

                            {/* Options visualization */}
                            <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] text-stone-400 font-medium mt-0.5">
                              {item.selectedSize && (
                                <span>{lang === 'az' ? 'Ölçü' : 'Size'}: <strong className="text-stone-600">{item.selectedSize}</strong></span>
                              )}
                              {item.selectedMilk && (
                                <span>{lang === 'az' ? 'Süd' : 'Milk'}: <strong className="text-stone-600">{item.selectedMilk}</strong></span>
                              )}
                              {item.selectedSugar && (
                                <span>{lang === 'az' ? 'Şəkər' : 'Sugar'}: <strong className="text-stone-600">{item.selectedSugar}</strong></span>
                              )}
                            </div>
                            
                            {item.notes && (
                              <p className="text-[10px] text-amber-700 font-medium mt-1 select-none">
                                💬 "{item.notes}"
                              </p>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#FAF6F0]">
                            {/* Quantity Adjusters */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-5 h-5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-stone-800">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-5 h-5 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Trash Button */}
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-stone-400 hover:text-red-500 p-1 rounded hover:bg-stone-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CƏMİ MƏBLƏĞ PANENLİ (XİDMƏT HAQQISIZ) */}
                  <div className="bg-white rounded-xl p-4 border border-[#3D2B1F]/10 shadow-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-stone-800">
                        {lang === 'az' ? 'ÜMUMİ MƏBLƏĞ' : 'TOTAL PRICE'}
                      </span>
                      <span className="text-xl font-black text-amber-950 font-mono">
                        {total.toFixed(2)} ₼
                      </span>
                    </div>
                  </div>

                  {/* KASSAYA YAXINLAŞIN BİLDİRİŞİ (SİFARİŞ DÜYMƏSİ ƏVƏZİNƏ) */}
                  <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3 shadow-xs">
                    <Store className="w-6 h-6 text-amber-800 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h5 className="text-xs font-extrabold text-amber-950 uppercase tracking-wide">
                        {lang === 'az' ? 'Sİfariş üçün kassaya yaxınlaşın' : 'Please Order at the Counter'}
                      </h5>
                      <p className="text-xs text-amber-900 leading-relaxed font-medium">
                        {lang === 'az'
                          ? 'Zəhmət olmasa, seçimlərinizi təyin etdikdən sonra kassirə yaxınlaşaraq sifarişinizi verin.'
                          : 'Once you have selected your items, please visit the cashier counter to place your order.'}
                      </p>
                    </div>
                  </div>

                  {/* Clear Tray Button */}
                  <button
                    onClick={onClearTray}
                    className="w-full text-center text-xs text-stone-400 hover:text-red-500 font-semibold py-1 transition-colors cursor-pointer"
                  >
                    {lang === 'az' ? 'Səbəti təmizlə' : 'Clear all selection'}
                  </button>
                </div>
              )}
            </div>

            {/* Sticky Footnote */}
            <div className="p-3 bg-[#F2EDE7]/50 border-t border-[#3D2B1F]/10 text-center text-[10px] text-stone-400 flex items-center justify-center gap-1 select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{lang === 'az' ? 'Xidmət haqqı yoxdur. Şəffaf qiymət.' : 'No service charge. Transparent pricing.'}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}