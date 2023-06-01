import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { Col, Form } from 'react-bootstrap';
import WeatherInfo from './WeatherInfo';

export default function Header() {
  const cities = ['Tunis', 'New York', 'Paris', 'London', 'Delhi', 'Rome', 'Montreal', 'Athens', 'Colombo', 'Zanzibar'];
  const [selectedCity, setSelectedCity] = useState('');

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="header-container">
      <div className="header-img">
        <img src={logo} alt="Logo" className="logo" height="100px" width="100px" style={{ borderRadius: '20px' }} />
      </div>
      <div className="header-text">
        <h1>Weather Forcast</h1>
      </div>

      <div className="header-select">
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>
              <h3>Select a city</h3>
            </Form.Label>
            <Form.Select
              className="custom-select"
              onChange={(e) => handleCitySelect(e.target.value)}
              value={selectedCity}
            >
              <option value=""></option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </div>

      {selectedCity && <WeatherInfo city={selectedCity} />}
    </div>
  );
}
