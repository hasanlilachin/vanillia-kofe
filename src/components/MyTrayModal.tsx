import React, { useState } from 'react';
import { TrayItem, Language } from '../types';
import { ShoppingBag, Trash2, Plus, Minus, X, Receipt, Bell, ShieldCheck, ClipboardCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MyTrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  trayItems: TrayItem[];
  lang: Language;
  tableNumber: string;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearTray: () => void;
}

export default function MyTrayModal({
  isOpen,
  onClose,
  trayItems,
  lang,
  tableNumber,
  onUpdateQuantity,
  onRemoveItem,
  onClearTray
}: MyTrayModalProps) {
  const [serviceChargeRate, setServiceChargeRate] = useState<number>(10); // Default 10% service charge standard in Baku
  const [customTableNumber, setCustomTableNumber] = useState<string>(tableNumber);
  const [checkedOut, setCheckedOut] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  // Sync state if prop changes
  React.useEffect(() => {
    setCustomTableNumber(tableNumber);
  }, [tableNumber]);

  const subtotal = trayItems.reduce((acc, item) => acc + (item.finalUnitPrice * item.quantity), 0);
  const serviceFee = subtotal * (serviceChargeRate / 100);
  const total = subtotal + serviceFee;

  const handleCreateMockOrder = () => {
    // Generate a unique Baku cafe sequence ID: VN-1234
    const randNum = Math.floor(1000 + Math.random() * 9000);
    setOrderId(`VN-${randNum}`);
    setCheckedOut(true);
  };

  const handleCloseReceipt = () => {
    setCheckedOut(false);
    onClearTray();
    onClose();
  };

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
                  {lang === 'az' ? 'Sifariş Qabı' : 'My Dining Tray'}
                </h3>
                <span className="bg-amber-400 text-stone-950 font-sans text-xs font-bold px-2 py-0.5 rounded-full">
                  {trayItems.reduce((sum, i) => sum + i.quantity, 0)}
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
              {checkedOut ? (
                /* --- THE HIGH-FIDELITY RECEIPT VIEW --- */
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white rounded-2xl p-5 border border-[#3D2B1F]/10 shadow-md text-center space-y-4"
                  id="checkout-receipt"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                    <ClipboardCheck className="w-7 h-7" />
                  </div>

                  <div>
                    <h4 className="text-xl font-extrabold text-stone-900 font-serif">
                      {lang === 'az' ? 'Sifariş Hazırdır!' : 'Order Summary Ready!'}
                    </h4>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {lang === 'az' 
                        ? 'Zəhmət olmasa bu rəqəmsal vərəqi masanıza gələn ofisianta təqdim edin.' 
                        : 'Simply present this digital ticket screen to your waiter to place the purchase.'}
                    </p>
                  </div>

                  <div className="bg-[#FCF9F5] p-4.5 rounded-xl border border-[#3D2B1F]/10 text-left space-y-2 font-mono text-xs">
                    <div className="flex justify-between font-bold text-stone-800 text-sm pb-1.5 border-b border-dashed border-[#3D2B1F]/10">
                      <span>{lang === 'az' ? 'Masa No:' : 'Table No:'} {customTableNumber || 'Seçilməyib'}</span>
                      <span className="text-amber-800">#{orderId}</span>
                    </div>

                    <div className="space-y-1.5 pt-1.5" id="receipt-items-list">
                      {trayItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-start text-stone-700">
                          <span className="max-w-[70%]">
                            {item.quantity} x {lang === 'az' ? item.menuItem.nameAz : item.menuItem.nameEn}
                            {item.selectedSize && <span className="text-[10px] text-stone-400 block ml-2">({lang === 'az' ? 'Ölçü' : 'Size'}: {item.selectedSize})</span>}
                            {item.selectedMilk && <span className="text-[10px] text-stone-400 block ml-2">({lang === 'az' ? 'Süd' : 'Milk'}: {item.selectedMilk})</span>}
                            {item.selectedSugar && <span className="text-[10px] text-stone-400 block ml-2">({lang === 'az' ? 'Şəkər' : 'Sugar'}: {item.selectedSugar})</span>}
                            {item.notes && <span className="text-[10px] text-amber-700 block ml-2 italic">"{item.notes}"</span>}
                          </span>
                          <span className="font-sans font-medium">{(item.finalUnitPrice * item.quantity).toFixed(2)} ₼</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-dashed border-[#3D2B1F]/10 space-y-1 text-stone-600">
                      <div className="flex justify-between">
                        <span>{lang === 'az' ? 'Məhsul məbləği:' : 'Items subtotal:'}</span>
                        <span className="font-sans font-medium">{subtotal.toFixed(2)} ₼</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{lang === 'az' ? 'Xidmət haqqı:' : 'Service charge'} ({serviceChargeRate}%)</span>
                        <span className="font-sans font-medium">{serviceFee.toFixed(2)} ₼</span>
                      </div>
                      <div className="flex justify-between font-extrabold text-stone-900 text-sm pt-1.5 border-t border-[#3D2B1F]/10">
                        <span>CƏMİ ÖDƏNİS:</span>
                        <span className="font-sans">{total.toFixed(2)} ₼</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-2.5 text-left text-amber-900">
                    <Bell className="w-5 h-5 shrink-0 animate-bounce" />
                    <span className="text-[11px] font-sans font-semibold leading-snug">
                      {lang === 'az' 
                        ? 'Ofisiant hazırda zənginizi qəbul etdi və qısa müddətdə masanıza yaxınlaşacaq.'
                        : 'Waiter has been summoned to your table and will verify this receipt shortly.'}
                    </span>
                  </div>

                  <button
                    onClick={handleCloseReceipt}
                    className="w-full bg-[#3D2B1F] hover:bg-[#3D2B1F]/90 text-[#FCF9F5] rounded-xl py-3 text-xs font-bold transition-all cursor-pointer shadow-sm"
                  >
                    {lang === 'az' ? 'Yeni Sifariş üçün Səbəti Təmizlə və Bağla' : 'Clear Tray & Start New'}
                  </button>
                </motion.div>
              ) : trayItems.length === 0 ? (
                /* --- EMPTY TRAY VIEW --- */
                <div className="flex flex-col items-center justify-center text-center py-20 px-4 space-y-3">
                  <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-[#3D2B1F]/40 border border-dashed border-[#3D2B1F]/10">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-stone-800">
                      {lang === 'az' ? 'Səbətiniz boşdur' : 'Your tray is empty'}
                    </h4>
                    <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
                      {lang === 'az' 
                        ? 'Menyudan bəyəndiyiniz şirniyyat və kofeləri əlavə edərək sifariş siyahınızı burda izləyə bilərsiniz.' 
                        : 'Explore desserts, coffee and add them here to calculate check and checkout.'}
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

                  {/* Calculations card */}
                  <div className="bg-white rounded-xl p-4 border border-[#3D2B1F]/10 space-y-3 shadow-xs">
                    <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                      {lang === 'az' ? 'Yekun Hesablama' : 'Pricing Breakdown'}
                    </h5>

                    {/* Table Input inside checkout screen */}
                    <div className="flex items-center justify-between p-2.5 bg-[#F2EDE7]/30 rounded-lg border border-[#3D2B1F]/10">
                      <span className="text-xs font-bold text-[#3D2B1F]">
                        {lang === 'az' ? 'Sifariş Masası:' : 'Your Table Number:'}
                      </span>
                      <input
                        type="text"
                        value={customTableNumber}
                        maxLength={4}
                        onChange={(e) => setCustomTableNumber(e.target.value)}
                        className="w-16 bg-white border border-[#3D2B1F]/15 focus:border-[#3D2B1F] focus:outline-hidden text-center rounded px-2 py-0.5 text-xs font-bold text-[#3D2B1F]"
                        placeholder="A2"
                      />
                    </div>

                    <div className="space-y-1.5 text-xs text-stone-500">
                      <div className="flex justify-between">
                        <span>{lang === 'az' ? 'Məhsul məbləği:' : 'Subtotal:'}</span>
                        <span className="font-mono text-stone-700 font-semibold">{subtotal.toFixed(2)} ₼</span>
                      </div>

                      {/* Interactive Service Charge switcher */}
                      <div className="flex justify-between items-center py-0.5">
                        <span className="flex items-center gap-1">
                          <Receipt className="w-3.5 h-3.5 text-stone-400" />
                          {lang === 'az' ? 'Xidmət haqqı:' : 'Service charge:'}
                        </span>
                        
                        <div className="flex gap-1 bg-stone-100 p-0.5 rounded-md" id="service-charge-selector">
                          {[0, 5, 10].map((rate) => (
                            <button
                              key={rate}
                              onClick={() => setServiceChargeRate(rate)}
                              className={`px-1.5 py-0.5 text-[9px] font-extrabold rounded-sm transition-colors cursor-pointer ${
                                serviceChargeRate === rate 
                                  ? 'bg-[#3D2B1F] text-white' 
                                  : 'text-stone-500 hover:text-stone-900'
                              }`}
                            >
                              {rate}%
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between text-stone-400">
                        <span className="text-[10px] italic">
                          {serviceChargeRate === 10 ? (lang === 'az' ? '*Bakıda standart 10% tətbiq olunur' : '*Standard Baku fee applied') : ''}
                        </span>
                        <span className="font-mono text-[11px] text-stone-600 font-bold">{serviceFee.toFixed(2)} ₼</span>
                      </div>
                    </div>

                    <hr className="border-[#FAF6F0]" />

                    <div className="flex justify-between items-center pt-1">
                      <span className="text-sm font-bold text-stone-800">
                        {lang === 'az' ? 'CƏMİ ÖDƏNİLƏCƏK' : 'TOTAL CHECK'}
                      </span>
                      <span className="text-xl font-black text-amber-950 font-mono">
                        {total.toFixed(2)} ₼
                      </span>
                    </div>
                  </div>

                  {/* Checkout triggers */}
                  <div className="pt-2">
                    <button
                      onClick={handleCreateMockOrder}
                      disabled={!customTableNumber.trim()}
                      className="w-full bg-[#3D2B1F] hover:bg-[#3D2B1F]/90 text-[#FCF9F5] rounded-xl py-3.5 text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      id="submit-order-tray"
                    >
                      <span>
                        {lang === 'az' ? 'Sifarişi Tamamla' : 'Confirm Order'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-amber-200" />
                    </button>
                    {!customTableNumber.trim() && (
                      <p className="text-[10px] text-red-500 text-center mt-1.5 font-semibold">
                        ⚠️ {lang === 'az' ? 'Zəhmət olmasa masa nömrəsini daxil edin!' : 'Please fill in table number to proceed!'}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Footnote */}
            <div className="p-3 bg-[#F2EDE7]/50 border-t border-[#3D2B1F]/10 text-center text-[10px] text-stone-400 flex items-center justify-center gap-1 select-none">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{lang === 'az' ? 'Şəffaf qiymət. Gizli ödənişlər yoxdur.' : 'Fully transparent pricing.'}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
