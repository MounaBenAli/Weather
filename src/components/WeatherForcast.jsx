import cold from "../assets/cold-weather.jpg";
import hot from "../assets/hot.jpg";
import WeatherInfo from "./WeatherInfo/WeatherInfo";
import { WiThermometer } from "react-icons/wi";
import getWeatherData from "../weatherData";
import { useState, useEffect } from "react";

export default function WeatherForcast() {
  const [background, setBackground] = useState(cold);
  const [city, setCity] = useState(localStorage.getItem("city") || "Tunis"); // Use localStorage to get the city value, or use a default value
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeatherData(city, units);
      setWeather(data);

      // dynamic background
      if (units === "metric" && data.temp > 20 && data.temp < 40) {
        setBackground(hot);
      } else if (units === "imperial" && data.temp > 68 && data.temp < 104) {
        setBackground(hot);
      } else {
        setBackground(cold);
      }

    };
    fetchData();
  }, [units, city]);

  const changeUnits = (e) => {
    const btn = e.target;
    if (btn.textContent === "°F") {
      btn.textContent = "°C";
      setUnits("imperial");
    } else {
      btn.textContent = "°F";
      setUnits("metric");
    }
  };

  const enterkey = (e) => {
    if (e.keyCode === 13) {
      const newCity = e.target.value;
      setCity(newCity);
      localStorage.setItem("city", newCity); // Store the city value in localStorage
    }
  };

  return (
    <div className="app-box" style={{ backgroundImage: `url(${background})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={(e) => enterkey(e)}
                type="text"
                name="city"
                placeholder="Enter City..."
                defaultValue={city} // Set the default value of the input to the city value
              />
              <button onClick={(e) => changeUnits(e)}>°F</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>
                  <WiThermometer />
                  {`
                  ${weather.temp.toFixed()} 
                  °
                  ${units === "metric" ? "C" : "F"}
                  `}
                </h1>
              </div>
            </div>
            <WeatherInfo weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}
