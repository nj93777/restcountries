import React, { useState, useEffect } from 'react';

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (!country.capital || country.capital.length === 0) return;

    const capital = country.capital[0];
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => setWeather(data))
      .catch(error => console.error('Error fetching weather data:', error));
  }, [country, apiKey]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="200" />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Weather:</strong> {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
