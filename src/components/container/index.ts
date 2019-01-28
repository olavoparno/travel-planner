import { Container } from "unstated";

import { ICity, IWeather } from '@Service/interface'
import TravelService from '@Service/index'

type SelectedValues = {
  vacationDays: number
  cities: any,
  weather: any
};


class AppContainer extends Container<SelectedValues> {
  constructor() {
    super()

    this.state = {
      vacationDays: 15,
      cities: this.fetchCities(),
      weather: this.fetchWeather()
    }
  }

  service: TravelService = new TravelService()

  fetchCities() {
    this.service
      .getCities()
      .then((cities: ICity) => {
        const newCity = Object.values(cities).map((city: ICity) => {
          return {
            value: city.district,
            label: city.district
          }
        })
        this.setState({
          cities: newCity
        })
      })
  }

  fetchWeather() {
    this.service
      .getWeather()
      .then((weather: IWeather) => {
        const newWeather = Object.values(weather).map((city: IWeather) => {
          return {
            value: weather.name,
            label: weather.name
          }
        })
        this.setState({
          weather: newWeather
        })
      })
  }

  componentDidMount() {
    this.fetchCities();
    this.fetchWeather();
  }

}

export default AppContainer;
