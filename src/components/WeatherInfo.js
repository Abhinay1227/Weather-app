import React from 'react';

const WeatherInfo = ({ data }) => {
    if (!data) return null;

    const { main, weather, name } = data;
    const iconCode = weather && weather[0].icon;
    const iconUrl = iconCode ? `http://openweathermap.org/img/wn/${iconCode}@2x.png` : '';

    return (
        <div className="weather-info">
            <h2>{name}</h2>
            {iconUrl && <img src={iconUrl} alt={weather[0].description} />} {/* Weather icon */}
            <p>{weather[0].description}</p>
            <p>Temperature: {Math.round(main.temp)}°</p>
            <p>Feels Like: {Math.round(main.feels_like)}°</p>
            <p>Humidity: {main.humidity}%</p>
        </div>
    );
};

export default WeatherInfo;
