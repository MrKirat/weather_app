import React from 'react';
import axios from 'axios';
import './App.scss';
import WeatherOverview from '../Weather/Overview/Overview';
import Table from '../Table/Table/Table';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherList: {},
      currentWeather: {},
      cityInfo: {},
    }
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_WEATHER_DOMAIN + "api/weather?city=Lviv&count=8")
      .then(response => {
        this.setState({
          weatherList: response.data.list,
          currentWeather: response.data.list[0],
          cityInfo: response.data.city
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.prepareWeatherForTable(this.state.weatherList);
  }

  prepareWeatherForTable(weatherList) {
    let infoRow = {
      time: 'Time',
      data: 'Data (d.m.y)',
      temp: 'Temperature (°C)',
      pressure: 'Pressure (mbar)',
      humidity: 'Humidity (%)',
      windSpeed: 'Wind speed (m/s)'
    }

    let dataRows = Object
      .keys(weatherList)
      .map(key => {
        return {
          time: weatherList[key].dt_txt.split(' ')[1].slice(0, -3),
          data: this.transformOwmDateFormat(weatherList[key].dt_txt.split(' ')[0]),
          temp: weatherList[key].main.temp,
          pressure: weatherList[key].main.pressure,
          humidity: weatherList[key].main.humidity,
          windSpeed: weatherList[key].wind.speed
        }
      });

    return [infoRow, ...dataRows];
  }

  transformOwmDateFormat(data) {
    let day = data.split('-')[2];
    let month = data.split('-')[1];
    let year = data.split('-')[0];

    return day + '.' + month + '.' + year;
  }

  validateNestedField(obj, level, ...rest) {
    if (obj === undefined) return null
    if (rest.length === 0 && obj.hasOwnProperty(level)) return obj[level]
    return this.validateNestedField(obj[level], ...rest)
  }

  render() {

    let description = this.validateNestedField(this.state.currentWeather, 'weather', '0', 'description');
    let weatherIconCode = this.validateNestedField(this.state.currentWeather, 'weather', '0', 'icon');
    let temperature = this.validateNestedField(this.state.currentWeather, 'main', 'temp');

    return (
      <div className="App">
        <WeatherOverview
          cityName={this.state.cityInfo.name}
          description={description}
          iconCode={weatherIconCode}
          temperatureCelsius={temperature} />
        <Table rows={this.prepareWeatherForTable(this.state.weatherList)} />
      </div>
    );
  }
}

export default App;
