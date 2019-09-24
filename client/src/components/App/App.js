import React from 'react';
import axios from 'axios';
import './App.css';
import WeatherTable from '../Weather/Table/Table';

const WEATHER_TIMESTAMPS_NUMBER_PER_DAY = 8;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weatherList: {},
      cityInfo: {},
      currentWeatherTab: 1
    }
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_WEATHER_DOMAIN + "weather?city=Lviv")
      .then(response => {

        const newWeatherList = Object
          .keys(response.data.list)
          .filter(key =>
            key < WEATHER_TIMESTAMPS_NUMBER_PER_DAY * this.state.currentWeatherTab &&
            key >= WEATHER_TIMESTAMPS_NUMBER_PER_DAY * (this.state.currentWeatherTab - 1)
          )
          .map(key => response.data.list[key]);

        this.setState({
          weatherList: newWeatherList,
          cityInfo: response.data.city
        });
        
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <WeatherTable weatherList={this.state.weatherList} cityInfo={this.state.cityInfo} />
      </div>
    );
  }
}

export default App;
