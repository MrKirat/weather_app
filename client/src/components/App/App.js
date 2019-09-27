import React from 'react';
import axios from 'axios';
import './App.scss';
import Table from '../Table/Table/Table';
import Search from '../Search/Search';
import WeatherOverview from '../Weather/Overview/Overview';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherList: {},
      currentWeather: {},
      cityInfo: {},
      searchCityName: 'Lviv',
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.updateWeather = this.updateWeather.bind(this);
  }

  updateWeather() {
    axios.get(process.env.REACT_APP_WEATHER_DOMAIN + "api/weather?city=" + this.state.searchCityName + "&count=8")
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
  }

  componentDidMount() {
    this.updateWeather();
  }

  prepareWeatherForTable(weatherList) {
    let infoColumn = {
      time: 'Time',
      data: 'Data (d.m.y)',
      temp: 'Temperature (°C)',
      pressure: 'Pressure (mbar)',
      humidity: 'Humidity (%)',
      windSpeed: 'Wind speed (m/s)'
    }

    let dataColumns = Object
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

    return [infoColumn, ...dataColumns];
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

  handleSearchChange(event) {
    this.setState({ searchCityName: event.target.value })
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    this.updateWeather();
  }

  render() {

    let description = this.validateNestedField(this.state.currentWeather, 'weather', '0', 'description');
    let weatherIconCode = this.validateNestedField(this.state.currentWeather, 'weather', '0', 'icon');
    let temperature = this.validateNestedField(this.state.currentWeather, 'main', 'temp');

    return (
      <div className="App">
        <Search
          onSubmit={this.handleSearchSubmit}
          name="searchCityName"
          value={this.state.searchCityName}
          onChange={this.handleSearchChange} />

        <WeatherOverview
          cityName={this.state.cityInfo.name}
          description={description}
          iconCode={weatherIconCode}
          temperatureCelsius={temperature} />

        <Table columns={this.prepareWeatherForTable(this.state.weatherList)} />
      </div>
    );
  }
}

export default App;
