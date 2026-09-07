import { useState, useEffect } from 'react';

export interface WeatherData {
  temp: number;
  isRaining: boolean;
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchWeather = async () => {
    try {
      // Fetching current temperature and weather codes for Imishli
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=39.8711&longitude=48.0600&current=temperature_2m,weather_code'
      );
      const data = await res.json();
      
      if (data && data.current) {
        const temp = data.current.temperature_2m;
        const code = data.current.weather_code;
        
        // WMO Weather codes >= 51 indicate rain, drizzle, or snow
        const isRaining = code >= 51;

        setWeather({ temp, isRaining });
      }
    } catch (err) {
      console.error("Failed to fetch weather data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();

    // 10-minute interval (10 * 60 * 1000 ms)
    const interval = setInterval(fetchWeather, 600000);

    return () => clearInterval(interval);
  }, []);

  return { weather, loading };
}