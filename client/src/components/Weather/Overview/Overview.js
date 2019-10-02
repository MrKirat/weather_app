import React from 'react';
import './Overview.scss';

const WeatherOverview = props => {
  return (
    <div className="weather-overview">
      <header className="weather-overview__header">
        <h2 className="weather-overview__title">{props.cityName}</h2>
        <p className="weather-overview__temperature">{props.temperatureCelsius}°C</p>
      </header>
      <div className="weather-overview__footer">
        <p className="weather-overview__description">{props.description}</p>
        <img className="weather-overview__icon" alt={props.description} src={getIconUrl(props.iconCode)} />
      </div>
    </div>
  );
}

const getIconUrl = iconcode => {
  return "http://openweathermap.org/img/w/" + iconcode + ".png";
}

export default WeatherOverview;
