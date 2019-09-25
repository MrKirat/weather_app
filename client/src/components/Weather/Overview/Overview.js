import React from 'react';
import './Overview.scss';

const WeatherOverview = props => {
  return (
    <div className="defaultWrapper">
      <div className="WeatherOverview">
        <header className="WeatherOverviewHeader">
          <h2>{props.cityName}</h2>
          <p>{props.temperatureCelsius}°C</p>
        </header>
        <div className="WeatherOverviewFooter">
          <p>{props.description}</p>
          <img alt={props.description} src={getIconUrl(props.iconCode)} />
        </div>
      </div>
    </div>
  );
}

const getIconUrl = iconcode => {
  return "http://openweathermap.org/img/w/" + iconcode + ".png";
}

export default WeatherOverview;
