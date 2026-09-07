import React from 'react';
import { useWeather } from '../hooks/useWeather';
import { getWeatherAndTimeRecommendation } from '../utils/recommender';
import { menuItems } from '../data/menuData';
import { TrayItem, Language } from '../types';
import * as Icons from 'lucide-react';

interface WeatherSuggestionsProps {
  lang: Language;
  onAddToTray: (item: Omit<TrayItem, 'id'>) => void;
}

export default function WeatherSuggestions({ lang, onAddToTray }: WeatherSuggestionsProps) {
  const { weather, loading } = useWeather();
  const currentHour = new Date().getHours();

  if (loading || !weather) return null;

  const recommendation = getWeatherAndTimeRecommendation(
    weather.temp,
    weather.isRaining,
    currentHour
  );

  // Find the actual item details from the menu items array
  const suggestedItems = menuItems.filter(item => 
    recommendation.recommendedIds.includes(item.id)
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-3 mt-2">
      <div className="bg-white rounded-2xl border border-[#3D2B1F]/10 p-4 shadow-xs">
        
        {/* Header containing Temp & Weather Icon */}
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
              <Icons.Cloud className="w-4 h-4 text-stone-500" />
            )}
            <span className="text-xs font-bold text-[#3D2B1F] font-mono">
              {weather.temp.toFixed(0)}°C
            </span>
          </div>
        </div>

        {/* Suggestion Text */}
        <p className="text-xs md:text-sm font-medium text-[#3D2B1F] leading-relaxed mb-4">
          {lang === 'az' ? recommendation.messageAz : recommendation.messageEn}
        </p>

        {/* Suggested Items Quick Add */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestedItems.map((item) => (
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
                onClick={() => onAddToTray({
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
  );
}