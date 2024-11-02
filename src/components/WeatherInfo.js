import React from 'react';

const WeatherInfo = ({ data }) => {
    if (!data) return null;

    const { main, weather, name, dt } = data; // Include dt for date and time formatting
    const iconCode = weather && weather[0].icon;
    const iconUrl = iconCode ? `http://openweathermap.org/img/wn/${iconCode}@2x.png` : '';

    // Function to format date and time
    const formatDateTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert from seconds to milliseconds
        const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const optionsTime = { hour: 'numeric', minute: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, optionsDate);
        const formattedTime = date.toLocaleTimeString(undefined, optionsTime);
        return `${formattedDate}, ${formattedTime}`; // Return formatted date and time
    };

    return (
        <div className="weather-info">
            <h2>{name}</h2>
            <p>{formatDateTime(dt)}</p> {/* Display formatted date and time */}
            {iconUrl && <img src={iconUrl} alt={weather[0].description} />} {/* Weather icon */}
            <p>{weather[0].description}</p>
            <p>Temperature: {Math.round(main.temp)}°</p>
            <p>Feels Like: {Math.round(main.feels_like)}°</p>
            <p>Humidity: {main.humidity}%</p>
        </div>
    );
};

export default WeatherInfo;
