import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

export default function WeatherInfo({ city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1cf2463e85f10c332b335e72a1651a16&units=metric`
        );
        setWeatherData(response.data.main);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [city]);

  return (
    <div>
      {weatherData && (
        <div>
          <h3>Weather Information</h3>
          <h3>Temperature: {weatherData.temp}</h3>
          <h3>Feels Like: {weatherData.feels_like}</h3>
          <h3>Minimum Temperature: {weatherData.temp_min}</h3>
          <h3>Maximum Temperature: {weatherData.temp_max}</h3>
          <h3>Pressure: {weatherData.pressure}</h3>
          <h3>Humidity: {weatherData.humidity}</h3>
        </div>
      )}
    </div>
  );
}
