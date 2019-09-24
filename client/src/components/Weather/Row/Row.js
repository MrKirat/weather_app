import React from 'react';
import './Row.scss';

function WeatherRow(props) {  
  const data = props.type === 'info' ? {
    time: 'Time',
    temp: 'Temperature',
    pressure: 'Pressure',
    humidity: 'Humidity',
    windSpeed: 'Wind speed'
  } : {
    time: props.info.dt_txt.split(" ")[1],
    temp: props.info.main.temp,
    pressure: props.info.main.pressure,
    humidity: props.info.main.humidity,
    windSpeed: props.info.wind.speed
  }

  const renderingData = Object.keys(data).map(key => <span>{data[key]}</span>);

  return (
    <div className="WeatherRow">
      {renderingData}
    </div>
  );
}

export default WeatherRow;
