export interface Recommendation {
  messageAz: string;
  messageEn: string;
  recommendedIds: string[]; // List of matching MenuItem IDs
}

export function getWeatherAndTimeRecommendation(
  temp: number,
  isRaining: boolean,
  currentHour: number
): Recommendation {
  
  // --- COLD OR RAINY WEATHER (Below 18°C or Raining) ---
  if (temp < 18 || isRaining) {
    if (currentHour >= 8 && currentHour < 12) {
      return {
        messageAz: "Səhər sərinliyi üçün isidici Kapuçino və təzə Badambura əla seçimdir!",
        messageEn: "A warm Cappuccino and fresh Badambura are a great match for a cool morning!",
        recommendedIds: ["h4", "m1"] // Cappuccino, Badambura
      };
    }
    if (currentHour >= 12 && currentHour < 18) {
      return {
        messageAz: "Bu gün hava sərindir. Sizi isidəcək zərif Qaymaqlı Raf və dadlı Spartak tortu tövsiyə edirik.",
        messageEn: "It is chilly today. We suggest a smooth Creamy Raf and a slice of Spartak cake to warm you up.",
        recommendedIds: ["h9", "d9"] // Raf, Spartak Cake
      };
    }
    return {
      messageAz: "Sərin axşam üçün ətirli dağ kəklikotu çayı və isti şokoladlı Sufle harmoniyası.",
      messageEn: "A warm cup of herbal mountain tea paired with hot chocolate Soufflé is ideal for a chilly evening.",
      recommendedIds: ["t3", "d7"] // Herbal Tea, Soufflé
    };
  }

  // --- HOT WEATHER (24°C and above) ---
  if (temp >= 24) {
    if (currentHour >= 8 && currentHour < 12) {
      return {
        messageAz: "Günün isti başlanğıcı üçün soyuq Buzlu Latte və yüngül Magnolia deserti!",
        messageEn: "Keep cool this morning with an Iced Latte and a light Magnolia dessert!",
        recommendedIds: ["c1", "d6"] // Iced Latte, Magnolia
      };
    }
    if (currentHour >= 12 && currentHour < 18) {
      return {
        messageAz: "Günorta istisində təravətlənmək üçün tropik Mango Maracuja Limonadı və dondurmalı Affoqato seçin!",
        messageEn: "Cool down this afternoon with an exotic Mango Maracuja Lemonade and Affogato!",
        recommendedIds: ["l2", "h10"] // Mango Maracuja Lemonade, Affogato
      };
    }
    return {
      messageAz: "İsti yay axşamı üçün sərinlədici giləmeyvə limonadı və premium dondurma.",
      messageEn: "A chilled forest berry lemonade and premium ice cream scoop for a warm evening.",
      recommendedIds: ["l6", "ic2"] // Berry Lemonade, Premium Gelato
    };
  }

  // --- MILD/PLEASANT WEATHER (18°C to 23°C) ---
  if (currentHour >= 12 && currentHour < 18) {
    return {
      messageAz: "Gözəl günorta havasında klassik Latte və San Sebastian ləzzətindən zövq alın.",
      messageEn: "Enjoy the pleasant afternoon weather with a classic Latte and San Sebastian cheesecake.",
      recommendedIds: ["h5", "d1"] // Latte, San Sebastian
    };
  }
  
  return {
    messageAz: "Günün bu vaxtı üçün sevilən zərif Flat White və milli Şəkərbura tövsiyəmizdir.",
    messageEn: "We highly recommend a velvety Flat White and traditional Shekerbura for this hour.",
    recommendedIds: ["h6", "m3"] // Flat White, Shekerbura
  };
}