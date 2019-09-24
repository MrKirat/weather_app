import React from 'react';
import WeatherRow from '../Row/Row';
import WeatherTab from '../Tab/Tab';
import WeatherOverview from '../Overview/Overview';

const WeatherTable = props => {
  const rows = Object.keys(props.weatherList).map((key) => {
    return (
      <WeatherRow key={key} info={props.weatherList[key]} />
    )
  });

  console.log(JSON.stringify(props));

  return (
    <div className="WeatherTable">
      <WeatherRow type='info' />
      <WeatherOverview />
      <WeatherTab />
      {rows}
    </div>
  );
}

export default WeatherTable;
