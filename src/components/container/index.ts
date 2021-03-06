import { Container } from "unstated"
import startCase from 'lodash/startCase'

import { ICity, IWeather, ICondition, IBestCondition } from '@Service/interface'
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
      selectedCityId: '',
      selectedCityName: '',
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
      break
      case 'city':
      this.setState({
        selectedCityId: selectedOption.value.woeid,
        selectedCityName: selectedOption.value.district
      })
      break
    }

  }

  setVacationDays(days: string) {
    this.setState({
      vacationDays: days
    })
  }

  showTimeTable() {
    const { selectedCityId, selectedWeather, currentYear } = this.state
    if (selectedCityId && currentYear) {
      this.service
        .getConditions(selectedCityId, currentYear)
        .then((conditions: ICondition) => {
          const filterConditions = Object.values(conditions).filter((condition: ICondition) => {
            return startCase(condition.weather) === startCase(selectedWeather)
          })
          const newConditions: IBestCondition[] = filterConditions.map((condition: ICondition) => {
            return {
              cityName: this.state.selectedCityName,
              weatherName: this.state.selectedWeather,
              date: condition.date,
              temperatureMin: `${condition.temperature.min} ${condition.temperature.unit}`,
              temperatureMax: `${condition.temperature.max} ${condition.temperature.unit}`
            }
          })
          if (newConditions.length >= Number(this.state.vacationDays)) {
            this.setState({
              perfectConditions: newConditions
            })
          } else {
            console.log('Not enough days with this kind of weather')
          }
        })

    } else {
      console.log('There is nothing to return')
    }
  }
}

export default AppContainer
