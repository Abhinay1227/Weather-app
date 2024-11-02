import { useState, useEffect } from 'react';
import axios from 'axios';

const useWeatherAPI = (city, unit) => {
   const [weatherData, setWeatherData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const apiKey = 'b848742b8067474bbc4a922dc41b0a4a'; // Replace with your actual API key

   useEffect(() => {
      if (!city) return;

      const fetchWeather = async () => {
         setLoading(true);
         setError(null);
         try {
            // Fetch current weather data only
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
               params: { q: city, appid: apiKey, units: unit },
            });
            setWeatherData(response.data);
         } catch (error) {
            setError(error.response ? error.response.data.message : 'Unable to fetch data');
         } finally {
            setLoading(false);
         }
      };

      fetchWeather();
   }, [city, unit]);

   return { weatherData, loading, error };
};

export default useWeatherAPI;
