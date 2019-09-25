import React from 'react';

const WeatherOverview = props => {
  return (
    <div className="WeatherOverview">
      <p>{props.cityName}</p>
      <p>{props.description}</p>
      <p>{props.temperature}</p>
      <img src={getIconUrl(props.iconCode)} />
    </div>
  );
}

const getIconUrl = iconcode => {
  return "http://openweathermap.org/img/w/" + iconcode + ".png";
}

export default WeatherOverview;
