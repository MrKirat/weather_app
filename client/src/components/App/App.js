import React from 'react';
import axios from 'axios';
import { prepareWeatherForTable, validateNestedField } from '../../helpers/helpers';
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
      wrongCityName: false
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.updateWeather = this.updateWeather.bind(this);
  }

  componentDidMount() {
    this.updateWeather();
  }

  updateWeather() {
    axios.get(process.env.REACT_APP_WEATHER_DOMAIN + "api/weather?city=" + this.state.searchCityName + "&count=8")
      .then(response => {
        this.setState({
          weatherList: response.data.list,
          currentWeather: response.data.list[0],
          cityInfo: response.data.city,
          wrongCityName: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ wrongCityName: true });
      });
  }

  handleSearchChange(event) {
    this.setState({
      searchCityName: event.target.value,
      wrongCityName: false
    })
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    this.updateWeather();
  }

  render() {

    let description = validateNestedField(this.state.currentWeather, 'weather', '0', 'description');
    let weatherIconCode = validateNestedField(this.state.currentWeather, 'weather', '0', 'icon');
    let temperature = validateNestedField(this.state.currentWeather, 'main', 'temp');

    return (
      <div className="App">

        <div className="defaultWrapper">
          <p className="HelpMessage">Please, enter city name:</p>
        </div>

        <Search
          onSubmit={this.handleSearchSubmit}
          name="searchCityName"
          value={this.state.searchCityName}
          validDataFlag={!this.state.wrongCityName}
          onChange={this.handleSearchChange}
          autoFocus="true" />

        <WeatherOverview
          cityName={this.state.cityInfo.name}
          description={description}
          iconCode={weatherIconCode}
          temperatureCelsius={temperature} />

        <Table columns={prepareWeatherForTable(this.state.weatherList)} />
      </div>
    );
  }
}

export default App;
