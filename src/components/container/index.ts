import { Container } from "unstated"
import startCase from 'lodash/startCase'

import { ICity, IWeather, ICondition } from '@Service/interface'
import TravelService from '@Service/index'
import { ISelectedValues } from '@Components/container/interface'

class AppContainer extends Container<ISelectedValues> {
  constructor() {
    super()

    this.state = {
      vacationDays: '15',
      cities: this.fetchCities(),
      weathers: this.fetchWeather(),
      perfectConditions: [],
      selectedCity: '',
      selectedWeather: '',
      currentYear: '2018'
    }
  }

  service: TravelService = new TravelService()

  fetchCities(): any {
    this.service
      .getCities()
      .then((cities: ICity) => {
        const newCities = Object.values(cities).map((city: ICity) => {
          return {
            value: city,
            label: city.district,
            type: 'city'
          }
        })
        this.setState({
          cities: newCities.sort((a, b) => a.label.localeCompare(b.label))
        })
      })
  }

  fetchWeather() {
    this.service
      .getWeather()
      .then((weathers: IWeather) => {
        const newWeathers = Object.values(weathers).map((weather: IWeather) => {
          return {
            value: weather,
            label: startCase(weather.name),
            type: 'weather'
          }
        })
        this.setState({
          weathers: newWeathers.sort()
        })
      })
  }

  setSelection(selectedOption: any) {
    switch (selectedOption.type) {
      case 'weather':
      this.setState({
        selectedWeather: startCase(selectedOption.value.name)
      })
      break;
      case 'city':
      this.setState({
        selectedCity: selectedOption.value.woeid
      })
      break;
    }

  }

  setVacationDays(days: string) {
    this.setState({
      vacationDays: days
    })
  }

  showTimeTable() {
    const { selectedCity, selectedWeather, currentYear } = this.state;
    if (selectedCity && currentYear) {
      this.service
        .getConditions(selectedCity, currentYear)
        .then((conditions: ICondition) => {
          const newConditions = Object.values(conditions).map((condition: ICondition) => {
            if (startCase(condition.weather) === selectedWeather) {
              console.log(condition)
            }
            return {
              value: condition,
              type: 'conditions'
            }
          })
          this.setState({
            perfectConditions: newConditions
          })
        })
    } else {
      console.log('There is nothing to return')
    }
  }
}

export default AppContainer;
