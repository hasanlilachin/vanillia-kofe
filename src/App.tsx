import React, { useState, useEffect } from 'react';
import { menuItems, categories, cafeInfo } from './data/menuData';
import { TrayItem, Language } from './types';
import MenuHeader from './components/MenuHeader';
import MenuItemCard from './components/MenuItemCard';
import MyTrayModal from './components/MyTrayModal';
import QrCodePrinter from './components/QrCodePrinter';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Locale State
  const [lang, setLang] = useState<Language>('az');

  // Table Number extraction from URL query parameters (e.g. ?table=A4)
  const [tableNumber, setTableNumber] = useState<string>('');

  // Active Search and Categorization Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string>('all'); // all, vegan, glutenfree, sugarfree, popular

  // Order Tray state
  const [trayItems, setTrayItems] = useState<TrayItem[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState<boolean>(false);

  // Read URL params and load local storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tableParam = params.get('table');
      if (tableParam) {
        setTableNumber(tableParam);
      }

      // Restore tray from local storage if available
      try {
        const savedTray = localStorage.getItem('vanillia_menu_tray');
        if (savedTray) {
          setTrayItems(JSON.parse(savedTray));
        }
      } catch (err) {
        console.error("Failed to parse saved tray from local storage", err);
      }
    }
  }, []);

  // Save tray to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('vanillia_menu_tray', JSON.stringify(trayItems));
  }, [trayItems]);

  // Handle Adding Item to the Order Tray
  const handleAddToTray = (newTrayItem: Omit<TrayItem, 'id'>) => {
    setTrayItems((prevItems) => {
      // Find if an identical item (same menuItem id AND same customizations) already exists in the tray
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.menuItem.id === newTrayItem.menuItem.id &&
          item.selectedMilk === newTrayItem.selectedMilk &&
          item.selectedSize === newTrayItem.selectedSize &&
          item.selectedSugar === newTrayItem.selectedSugar &&
          item.notes === newTrayItem.notes
      );

      if (existingItemIndex > -1) {
        // Increment quantity of existing customized item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Add as a new individual customized choice
        const uniqueId = `${newTrayItem.menuItem.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        return [...prevItems, { ...newTrayItem, id: uniqueId }];
      }
    });
  };

  // Update Item Quantity in Tray
  const handleUpdateQuantity = (id: string, delta: number) => {
    setTrayItems((prevItems) => 
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: Math.max(1, newQty) };
          }
          return item;
        })
    );
  };

  // Remove Item from Tray
  const handleRemoveItem = (id: string) => {
    setTrayItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Clear entire Tray
  const handleClearTray = () => {
    setTrayItems([]);
  };

  // Filtered Menu Items Calculations
  const filteredItems = menuItems.filter((item) => {
    // 1. Matches Category
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    
    // 2. Matches Search term (in either language)
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const searchMatch = !normalizedQuery || 
      item.nameAz.toLowerCase().includes(normalizedQuery) ||
      item.nameEn.toLowerCase().includes(normalizedQuery) ||
      item.descriptionAz.toLowerCase().includes(normalizedQuery) ||
      item.descriptionEn.toLowerCase().includes(normalizedQuery);

    // 3. Matches Dietary tag filters
    let tagMatch = true;
    if (activeTag === 'vegan') {
      tagMatch = item.tags?.includes('vegan') || false;
    } else if (activeTag === 'glutenfree') {
      tagMatch = item.tags?.includes('glutenfree') || false;
    } else if (activeTag === 'sugarfree') {
      tagMatch = item.tags?.includes('sugarfree') || false;
    } else if (activeTag === 'popular') {
      tagMatch = item.isPopular || false;
    }

    return categoryMatch && searchMatch && tagMatch;
  });

  // Calculate Tray Totals
  const traySubtotal = trayItems.reduce((sum, item) => sum + (item.finalUnitPrice * item.quantity), 0);
  const trayCount = trayItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FCF9F5] pb-8 font-sans text-[#3D2B1F] antialiased flex flex-col justify-between">
      
      <div>
        {/* Dynamic Header Module */}
        <MenuHeader 
          lang={lang} 
          setLang={setLang} 
          tableNumber={tableNumber} 
          setTableNumber={setTableNumber} 
        />

        {/* Filters and Navigation layout */}
        <section className="bg-white border-b border-[#3D2B1F]/10 py-4 sticky top-0 z-30 shadow-xs print:hidden" id="menu-section-nav">
          <div className="max-w-7xl mx-auto px-4 space-y-3.5">
            
            {/* Search Input and Filter tag pills */}
            <div className="flex flex-col md:flex-row gap-3 items-stretch justify-between">
              
              {/* Search input field */}
              <div className="relative flex-1">
                <Icons.Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#8C7B6E]" />
                <input
                  type="text"
                  placeholder={lang === 'az' ? 'Kofe, şirniyyat və ya səhər yeməyi axtar...' : 'Search coffee, sweets or breakfast...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#FCF9F5] border border-[#3D2B1F]/10 focus:border-[#3D2B1F] text-[#3D2B1F] font-medium placeholder-stone-400 text-xs rounded-xl pl-10 pr-4 py-3 focus:outline-hidden transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-stone-200 text-stone-400 hover:text-stone-700 rounded-full"
                  >
                    <Icons.X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Tag Filtes Pills (Dietary preferences) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none" id="dietary-tags-rail">
                {[
                  { id: 'all', labelAz: 'Hamısı', labelEn: 'All' },
                  { id: 'popular', labelAz: '★ Populyar', labelEn: '★ Popular' },
                ].map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setActiveTag(tag.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-colors shrink-0 whitespace-nowrap ${
                      activeTag === tag.id
                        ? 'bg-[#3D2B1F] text-[#FCF9F5]'
                        : 'bg-[#F2EDE7]/60 text-[#8C7B6E] hover:bg-[#F2EDE7] hover:text-[#3D2B1F]'
                    }`}
                  >
                    {lang === 'az' ? tag.labelAz : tag.labelEn}
                  </button>
                ))}
              </div>

            </div>

            {/* Scrolling categories navigation rail */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none border-t border-[#3D2B1F]/10 pt-3.5" id="categories-scroller">
              {categories.map((cat) => {
                const IconComponent = (Icons as any)[cat.icon] || Icons.Utensils;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSearchQuery(''); // auto reset search to display category clearly
                    }}
                    className={`flex items-center gap-2 px-4.5 py-3.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all duration-300 shrink-0 select-none ${
                      isSelected 
                        ? 'bg-[#3D2B1F] text-[#FCF9F5] shadow-xs scale-[1.02]' 
                        : 'bg-white hover:bg-[#F2EDE7]/45 border border-[#3D2B1F]/10 text-[#8C7B6E]'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-[#8C7B6E]'}`} />
                    <span>{lang === 'az' ? cat.nameAz : cat.nameEn}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </section>

        {/* Food & Drink List Grid */}
        <main className="max-w-7xl mx-auto px-4 py-6 md:py-8" id="menu-items-grid">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-[#3D2B1F] font-serif tracking-tight">
                {categories.find((c) => c.id === selectedCategory)?.[lang === 'az' ? 'nameAz' : 'nameEn']}
              </h2>
              <p className="text-stone-400 text-xs mt-0.5">
                {lang === 'az' 
                  ? `${filteredItems.length} məhsul rəflərimizdədir` 
                  : `${filteredItems.length} items available on shelf`}
              </p>
            </div>
          </div>

          {/* Grid Layout of Items */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <MenuItemCard 
                  key={item.id} 
                  item={item} 
                  lang={lang} 
                  onAddToTray={handleAddToTray} 
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center text-center py-20 px-4 space-y-4 bg-white rounded-2xl border border-[#3D2B1F]/10">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-[#3D2B1F] border border-[#3D2B1F]/10">
                <Icons.Coffee className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-stone-800">
                  {lang === 'az' ? 'Nəticə tapılmadı' : 'No matches found'}
                </h4>
                <p className="text-xs text-stone-400 mt-1 max-w-sm leading-relaxed">
                  {lang === 'az' 
                    ? 'Axtarışınıza uyğun heç bir təbii təam tapılmadı. Zəhmət olmasa digər kateqoriyalara keçid edin.' 
                    : 'We couldn\'t find any items matching your parameters. Try changing the filter tags or query.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setActiveTag('all');
                }}
                className="px-5 py-2.5 bg-[#3D2B1F] text-[#FCF9F5] rounded-xl text-xs font-bold hover:bg-[#3D2B1F]/90 transition-all cursor-pointer"
              >
                {lang === 'az' ? 'Menyunu Sıfırla' : 'Reset All Filters'}
              </button>
            </div>
          )}
        </main>
      </div>

      {/* FOOTER SECTION: Standard branding info + interactive QR Creator for Administrative/Demonstration purposes */}
      <footer className="bg-[#3D2B1F] text-[#FCF9F5]/80 pt-10 pb-16 px-4 mt-12 border-t border-black/20" id="footer">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Logo and contacts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 border-b border-white/5">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 bg-black/25 p-2.5 rounded-xl border border-white/5">
                <Icons.Coffee className="w-6 h-6 text-amber-400" />
                <span className="text-[#FCF9F5] font-extrabold font-serif tracking-wider text-sm select-none">
                  VANILLIA
                </span>
              </div>
              <p className="text-xs text-[#FCF9F5]/70 leading-relaxed mt-2 max-w-sm">
                {lang === 'az' 
                  ? 'Keyfiyyətli qovrulmuş kofe dənələri, ətirli çaylar və ev üsulu təravətli lemonade çeşidləri ilə Bakının premium rəqəmsal menyu ünvanı.' 
                  : 'Baku\'s premium home for high-quality roasted coffee beans, aromatic teas, and freshly-made artisanal lemonades.'}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest">{lang === 'az' ? 'BİZİMLƏ ƏLAQƏ' : 'SAY HELLO'}</h4>
              <p className="text-xs flex items-center gap-2 text-[#FCF9F5]/75">
                <Icons.Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{cafeInfo.phone}</span>
              </p>
              <p className="text-xs flex items-center gap-2 text-[#FCF9F5]/75">
                <Icons.MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{lang === 'az' ? cafeInfo.addressAz : cafeInfo.addressEn}</span>
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-white text-xs font-bold uppercase tracking-widest">{lang === 'az' ? 'HƏR GÜN TƏZƏ' : 'DAILY FRESH'}</h4>
              <p className="text-xs leading-relaxed text-[#FCF9F5]/70">
                {lang === 'az' 
                  ? 'Bütün lemonade içkilərimiz hər gün süzülmüş təbii meyvə ekstraktları və təzə nanə yarpaqları ilə komandamız tərəfindən təzə bişmiş buzla servis edilir.' 
                  : 'All of our signature lemonades are prepared fresh daily using real fruit extracts, premium herbs, and filtered ice cubes.'}
              </p>
            </div>
          </div>

          {/* Interactive QR printing module in footer (highly integrated owner action workflow) */}
          <section className="bg-black/25 p-5 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2.5">
              <Icons.QrCode className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-sm font-bold text-[#FCF9F5] uppercase tracking-wider">
                  {lang === 'az' ? 'ADMIN PANEL / MASALARA QR KOD ÇAPI' : 'CAFE OWNER QR-MENU DESK'}
                </h3>
                <p className="text-[11px] text-[#FCF9F5]/65">
                  {lang === 'az' 
                    ? 'Bu alət vasitəsilə masadan masaya uyğunlaşdırılmış QR etiketləri çıxarıb istifadə edə bilərsiniz.' 
                    : 'Download or print table-top tent cards with pre-assigned table numbers for your establishment.'}
                </p>
              </div>
            </div>

            {/* Reusable QR generator */}
            <QrCodePrinter lang={lang} />
          </section>

          <div className="text-center text-xs text-[#FCF9F5]/40 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <p>© {new Date().getFullYear()} {cafeInfo.name}. All rights reserved.</p>
            <p className="text-[11px] font-mono tracking-wider text-[#FCF9F5]/40 select-none">
              v1.4.0 • {lang === 'az' ? 'Rəqəmsal Masa Menyu' : 'Digital Menu Experience'}
            </p>
          </div>

        </div>
      </footer>

      {/* Floating Action Bar Trigger for Order Tray */}
      <AnimatePresence>
        {trayItems.length > 0 && !isTrayOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 z-40 print:hidden"
            id="tray-floating-button"
          >
            <button
              onClick={() => setIsTrayOpen(true)}
              className="w-full bg-[#3D2B1F] hover:bg-[#3D2B1F]/95 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between border border-white/10 cursor-pointer group active:scale-98 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="relative p-2 bg-black/25 rounded-xl group-hover:scale-105 transition-transform">
                  <Icons.ShoppingBag className="w-5 h-5 text-amber-400" />
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white font-sans text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#3D2B1F]">
                    {trayCount}
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-amber-100 block">{lang === 'az' ? 'Hesabınızı idarə edin' : 'Check Tray Calculations'}</span>
                  <span className="text-[10px] text-stone-300 block">{lang === 'az' ? 'Sifarişi tamamla' : 'Show checkout summary'}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-amber-300 font-mono">
                  {traySubtotal.toFixed(2)} ₼
                </span>
                <Icons.ChevronRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-out Order Tray Module Drawer */}
      <MyTrayModal
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        trayItems={trayItems}
        lang={lang}
        tableNumber={tableNumber || '5'} // dynamic fallback table
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearTray={handleClearTray}
      />

    </div>
  );
}
