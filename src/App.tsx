import React, { useState, useEffect } from 'react';
import { menuItems, categories, cafeInfo } from './data/menuData';
import { TrayItem, Language } from './types';
import MenuHeader from './components/MenuHeader';
import MenuItemCard from './components/MenuItemCard';
import MyTrayModal from './components/MyTrayModal';
import CafeClockStatus from './components/CafeClockStatus';
import * as Icons from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WeatherState {
  temp: number;
  isRaining: boolean;
}

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

  // Weather & Live Suggestions State
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(true);

  // Fetch local weather for Imishli (Lat: 39.8711, Lon: 48.0600)
  const fetchWeather = async () => {
    try {
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=39.8711&longitude=48.0600&current=temperature_2m,weather_code'
      );
      const data = await res.json();
      if (data && data.current) {
        setWeather({
          temp: data.current.temperature_2m,
          isRaining: data.current.weather_code >= 51,
        });
      }
    } catch (err) {
      console.error("Failed to retrieve current weather data", err);
    } finally {
      setWeatherLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tableParam = params.get('table');
      if (tableParam) {
        setTableNumber(tableParam);
      }

      try {
        const savedTray = localStorage.getItem('vanillia_menu_tray');
        if (savedTray) {
          setTrayItems(JSON.parse(savedTray));
        }
      } catch (err) {
        console.error("Failed to parse saved tray from local storage", err);
      }
    }

    fetchWeather();
    const weatherInterval = setInterval(fetchWeather, 600000);

    return () => clearInterval(weatherInterval);
  }, []);

  useEffect(() => {
    localStorage.setItem('vanillia_menu_tray', JSON.stringify(trayItems));
  }, [trayItems]);

  const handleAddToTray = (newTrayItem: Omit<TrayItem, 'id'>) => {
    setTrayItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.menuItem.id === newTrayItem.menuItem.id &&
          item.selectedMilk === newTrayItem.selectedMilk &&
          item.selectedSize === newTrayItem.selectedSize &&
          item.selectedSugar === newTrayItem.selectedSugar &&
          item.notes === newTrayItem.notes
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        const uniqueId = `${newTrayItem.menuItem.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        return [...prevItems, { ...newTrayItem, id: uniqueId }];
      }
    });
  };

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

  const handleRemoveItem = (id: string) => {
    setTrayItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearTray = () => {
    setTrayItems([]);
  };

  const filteredItems = menuItems.filter((item) => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const searchMatch = !normalizedQuery || 
      item.nameAz.toLowerCase().includes(normalizedQuery) ||
      item.nameEn.toLowerCase().includes(normalizedQuery) ||
      item.descriptionAz.toLowerCase().includes(normalizedQuery) ||
      item.descriptionEn.toLowerCase().includes(normalizedQuery);

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

  const traySubtotal = trayItems.reduce((sum, item) => sum + (item.finalUnitPrice * item.quantity), 0);
  const trayCount = trayItems.reduce((sum, item) => sum + item.quantity, 0);

  const getDynamicRecommendation = () => {
    if (!weather) return null;
    const currentHour = new Date().getHours();
    const { temp, isRaining } = weather;

    if (temp < 18 || isRaining) {
      if (currentHour >= 8 && currentHour < 12) {
        return {
          text: lang === 'az' 
            ? "Səhər sərinliyi üçün isidici Kapuçino və zərif Badambura əla seçimdir!" 
            : "A warm Cappuccino and fresh Badambura are a great match for a cool morning!",
          itemIds: ["h4", "m1"]
        };
      }
      if (currentHour >= 12 && currentHour < 18) {
        return {
          text: lang === 'az'
            ? "Bu gün hava sərindir. Sizi isidəcək zərif Qaymaqlı Raf və dadlı Spartak tortu tövsiyə edirik."
            : "It is chilly today. We suggest a smooth Creamy Raf and a slice of Spartak cake to warm you up.",
          itemIds: ["h9", "d9"]
        };
      }
      return {
        text: lang === 'az'
          ? "Sərin axşam üçün ətirli dağ kəklikotu çayı və isti şokoladlı Sufle harmoniyası."
          : "A warm cup of herbal mountain tea paired with hot chocolate Soufflé is ideal for a chilly evening.",
        itemIds: ["t3", "d7"]
      };
    }

    if (temp >= 24) {
      if (currentHour >= 8 && currentHour < 12) {
        return {
          text: lang === 'az'
            ? "Günün isti başlanğıcı üçün soyuq Buzlu Latte və yüngül Magnolia deserti!"
            : "Keep cool this morning with an Iced Latte and a light Magnolia dessert!",
          itemIds: ["c1", "d6"]
        };
      }
      if (currentHour >= 12 && currentHour < 18) {
        return {
          text: lang === 'az'
            ? "Günorta istisində təravətlənmək üçün tropik Mango Maracuja Limonadı və dondurmalı Affoqato seçin!"
            : "Cool down this afternoon with an exotic Mango Maracuja Lemonade and Affogato!",
          itemIds: ["l2", "h10"]
        };
      }
      return {
        text: lang === 'az'
          ? "İsti yay axşamı üçün sərinlədici giləmeyvə limonadı və premium dondurma."
          : "A chilled forest berry lemonade and premium ice cream scoop for a warm evening.",
        itemIds: ["l6", "ic2"]
      };
    }

    if (currentHour >= 12 && currentHour < 18) {
      return {
        text: lang === 'az'
          ? "Gözəl günorta havasında klassik Latte və San Sebastian ləzzətindən zövq alın."
          : "Enjoy the pleasant afternoon weather with a classic Latte and San Sebastian cheesecake.",
        itemIds: ["h5", "d1"]
      };
    }
    return {
      text: lang === 'az'
        ? "Günün bu vaxtı üçün sevilən zərif Flat White və milli Şəkərbura tövsiyəmizdir."
        : "We highly recommend a velvety Flat White and traditional Shekerbura for this hour.",
      itemIds: ["h6", "m3"]
    };
  };

  const activeRecommendation = getDynamicRecommendation();
  const suggestedProducts = activeRecommendation 
    ? menuItems.filter(item => activeRecommendation.itemIds.includes(item.id))
    : [];

  return (
    <div className="min-h-screen bg-[#FCF9F5] pb-8 font-sans text-[#3D2B1F] antialiased flex flex-col justify-between">
      
      <div>
        <MenuHeader 
          lang={lang} 
          setLang={setLang} 
          tableNumber={tableNumber} 
          setTableNumber={setTableNumber} 
        />

        <div className="px-4 py-2 flex justify-center">
          <CafeClockStatus lang={lang} />
        </div>

        {weather && activeRecommendation && (
          <div className="max-w-4xl mx-auto px-4 py-2">
            <div className="bg-white rounded-2xl border border-[#3D2B1F]/10 p-4 shadow-xs">
              
              <div className="flex items-center justify-between border-b border-[#3D2B1F]/5 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Icons.Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <h3 className="text-xs font-black tracking-tight uppercase text-[#3D2B1F]/80">
                    {lang === 'az' ? 'Günün Təklifi' : 'Today\'s Pick'}
                  </h3>
                </div>
                
                <div className="flex items-center gap-1.5 bg-[#FCF9F5] px-2.5 py-1 rounded-lg border border-[#3D2B1F]/5">
                  {weather.isRaining ? (
                    <Icons.CloudRain className="w-4 h-4 text-blue-500" />
                  ) : weather.temp >= 24 ? (
                    <Icons.Sun className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Icons.Cloud className="w-4 h-4 text-[#8C7B6E]" />
                  )}
                  <span className="text-xs font-bold text-[#3D2B1F] font-mono">
                    {weather.temp.toFixed(0)}°C
                  </span>
                </div>
              </div>

              <p className="text-xs md:text-sm font-medium text-[#3D2B1F] leading-relaxed mb-4">
                {activeRecommendation.text}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedProducts.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-2 rounded-xl bg-[#FCF9F5] border border-[#3D2B1F]/5 hover:border-[#3D2B1F]/20 transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img 
                        src={item.image} 
                        alt={item.nameAz} 
                        className="w-10 h-10 rounded-lg object-cover bg-stone-100 shrink-0" 
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-extrabold text-[#3D2B1F] block truncate">
                          {lang === 'az' ? item.nameAz : item.nameEn}
                        </span>
                        <span className="text-[11px] font-bold text-amber-600 block font-mono">
                          {item.price.toFixed(2)} ₼
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToTray({
                        menuItem: item,
                        quantity: 1,
                        finalUnitPrice: item.price,
                      })}
                      className="p-1.5 bg-white hover:bg-[#3D2B1F] text-[#3D2B1F] hover:text-white rounded-lg border border-[#3D2B1F]/10 cursor-pointer transition-colors"
                    >
                      <Icons.Plus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* Filters and Navigation layout */}
        <section className="bg-white border-b border-[#3D2B1F]/10 py-4 sticky top-0 z-30 shadow-xs print:hidden" id="menu-section-nav">
          <div className="max-w-7xl mx-auto px-4 space-y-3.5">
            
            <div className="flex flex-col md:flex-row gap-3 items-stretch justify-between">
              
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

            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none border-t border-[#3D2B1F]/10 pt-3.5" id="categories-scroller">
              {categories.map((cat) => {
                const IconComponent = (Icons as any)[cat.icon] || Icons.Utensils;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSearchQuery('');
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

      {/* NEW: GOOGLE REVIEW BANNER CARD */}
      <section className="max-w-4xl mx-auto px-4 my-8">
        <div className="bg-gradient-to-r from-[#3D2B1F] via-[#4A3527] to-[#3D2B1F] rounded-3xl p-6 md:p-8 text-center text-white shadow-xl relative overflow-hidden border border-amber-500/20">
          <div className="relative z-10 flex flex-col items-center">
            
            {/* 5 Animated Golden Stars */}
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icons.Star 
                  key={star} 
                  className="w-6 h-6 text-amber-400 fill-amber-400 animate-bounce" 
                  style={{ animationDelay: `${star * 0.15}s` }} 
                />
              ))}
            </div>

            <h3 className="text-xl md:text-2xl font-black font-serif mb-2">
              {lang === 'az' ? 'Xidmətimizi bəyəndiniz?' : 'Enjoyed Your Experience?'}
            </h3>
            <p className="text-xs md:text-sm text-stone-300 max-w-md mb-6 leading-relaxed">
              {lang === 'az' 
                ? 'Google-da bizə 5 ulduzlu rəy yazaraq Vanillia ailəsinə dəstək olun!' 
                : 'Help Vanillia Coffee grow by leaving us a 5-star review on Google Maps!'}
            </p>

            <a
              href="https://maps.app.goo.gl/xLGwLQT73JugC7qC9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#FEF08A] hover:bg-amber-300 text-[#3D2B1F] font-extrabold px-6 py-3 rounded-full text-xs md:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Icons.Star className="w-4 h-4 fill-[#3D2B1F]" />
              <span>{lang === 'az' ? 'Google-da Rəy Yazın ➔' : 'Leave a Google Review ➔'}</span>
            </a>

          </div>
        </div>
      </section>

      {/* FOOTER SECTION WITH LOGO */}
      <footer className="bg-[#3D2B1F] text-[#FCF9F5]/80 pt-10 pb-16 px-4 border-t border-black/20" id="footer">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          
          <img 
            src="/logo.png" 
            alt="Vanillia Logo" 
            className="w-16 h-16 object-contain mb-3 rounded-full bg-black/20 border border-amber-400/20 p-1" 
          />
          <h3 className="text-lg font-serif font-bold text-white mb-1">
            Vanillia Şirniyyat Evi
          </h3>
          <p className="text-xs text-[#FCF9F5]/60 max-w-md mb-6">
            {lang === 'az' ? 'Təbii maddələrlə hazırlanan ləziz kofe və şirniyyat dünyası.' : 'Delicious coffee and sweets prepared with natural ingredients.'}
          </p>

          <div className="w-full border-t border-white/10 text-xs text-[#FCF9F5]/40 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
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

      <MyTrayModal
        isOpen={isTrayOpen}
        onClose={() => setIsTrayOpen(false)}
        trayItems={trayItems}
        lang={lang}
        tableNumber={tableNumber || '5'}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearTray={handleClearTray}
      />

    </div>
  );
}