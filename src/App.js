import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';
import useWeatherAPI from './hooks/useWeatherAPI';
import Favorites from './components/Favorites';
import SearchHistory from './components/SearchHistory';
import './App.css';

const App = () => {
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState('metric'); // State for unit toggle
    const [background, setBackground] = useState('linear-gradient(135deg, #4a90e2, #9013fe)'); // Default background
    const { weatherData, loading, error } = useWeatherAPI(city, unit);
    const [searchHistory, setSearchHistory] = useState([]);

    const getLocationWeather = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setCity(`${latitude},${longitude}`);
            });
        }
    };

    useEffect(() => {
        getLocationWeather();
    }, []);

    useEffect(() => {
      if (weatherData && weatherData.weather) {
          const condition = weatherData.weather[0].main.toLowerCase();
          switch (condition) {
              case 'clear':
                  setBackground('url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHN1bm55JTIwc2t5fGVufDB8fHx8MTY3MTE0ODgwNQ&ixlib=rb-4.0.3&q=80&w=1080")');
                  break;
              case 'rain':
                  setBackground('url("https://images.unsplash.com/photo-1535905558360-7ed92877834b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHJhaW55JTIwd2VhdGhlcnxlbnwwfHx8fDE2NzExNDg4MTM&ixlib=rb-4.0.3&q=80&w=1080")');
                  break;
              case 'clouds':
                  setBackground('url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGNsb3VkeSUyMHNreXxlbnwwfHx8fDE2NzExNDg4MjY&ixlib=rb-4.0.3&q=80&w=1080")');
                  break;
              case 'snow':
                  setBackground('url("https://images.unsplash.com/photo-1485568861181-6b0cf63adf17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHNub3clMjB3aW50ZXJ8ZW58MHx8fHwxNjcxMTQ4ODM1&ixlib=rb-4.0.3&q=80&w=1080")');
                  break;
              case 'thunderstorm':
                  setBackground('url("https://images.unsplash.com/photo-1572617562992-41f9b3f0e6a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHRodW5kZXJzdG9ybXxlbnwwfHx8fDE2NzExNDg4NDk&ixlib=rb-4.0.3&q=80&w=1080")');
                  break;
              case 'mist':
              case 'fog':
                  setBackground('url("https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGZvZyUyMG1pc3R8ZW58MHx8fHwxNjcxMTQ4ODU4&ixlib=rb-4.0.3&q=80&w=1080")');
                  break;
              case 'drizzle':
                  setBackground('url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGRyaXp6bGV8ZW58MHx8fHwxNjcxMTQ4ODYx&ixlib=rb-4.0.3&q=80&w=1080")');
                  break;
              case 'haze':
                  setBackground('url("https://images.unsplash.com/photo-1535930749574-1399327ce78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGhhenklMjBza3l8ZW58MHx8fHwxNjcxMTQ4ODY4&ixlib=rb-4.0.3&q=80&w=1080")');
                  break;
              default:
                  setBackground('url("https://images.unsplash.com/photo-1516919885422-f77b1e7a7f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fG5pZ2h0JTIwc2t5fGVufDB8fHx8MTY3MTE0ODgzNg&ixlib=rb-4.0.3&q=80&w=1080")');
          }
      }
  }, [weatherData]);
  
  

    const handleSearch = (newCity) => {
        setCity(newCity);
        if (!searchHistory.includes(newCity)) {
            const updatedHistory = [...searchHistory, newCity];
            setSearchHistory(updatedHistory);
            localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        }
    };

    return (
        <div className="App" style={{ backgroundImage: background }}>
            <SearchBar onSearch={handleSearch} />
            <button className="button toggle-units" onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}>
                Toggle Units
            </button>
            <Favorites currentCity={city} />
            <SearchHistory history={searchHistory} />
            {loading && <p className="loading">Loading...</p>}
            {error && <p>{error}</p>}
            <WeatherInfo data={weatherData} />
        </div>
    );
};

export default App;
