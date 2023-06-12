import axios from 'axios';

const API_KEY = import.meta.env.VITE_REACT_API_KEY;
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const iconURL = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

const getWeatherData = async (city, units = 'metric') => {
  try {
    const { data } = await axios.get(
      `${API_URL}?q=${city}&appid=${API_KEY}&units=${units}`
    );

    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = data;

    const { description, icon } = weather[0];

    return {
      description,
      iconURL: iconURL(icon),
      temp,
      feels_like,
      temp_min,
      temp_max,
      pressure,
      humidity,
      speed,
      country,
      name,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getWeatherData;
