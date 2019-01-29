/**
 * Typings for Cities object
 * @interface ICity
 */
export interface ICity {
  woeid: string
  district: string
  province: string
  state_acronym: string
  country: string
}

/**
 * Typings for Weather object
 * @interface IWeather
 */
export interface IWeather {
  id: string
  name: string
}

/**
 * Typings for Conditions object
 * @interface ICondition
 */
export interface ICondition {
  date: string
  temperature: ITemperature
  weather: string
  woeid: string
}

/**
 * Typings for Best Conditions object
 * @interface IBestCondition
 */
export interface IBestCondition {
  cityName: string
  weatherName: string
  date: string
  temperatureMin: string
  temperatureMax: string
}

/**
 * Typings for Temperature object
 * @interface ITemperature
 */
export interface ITemperature {
  max: number
  min: number
  unit: string
}

/**
 * Typings for TravelService class
 * @interface ITravelService
 */
export interface ITravelService {
  getCities: () => Promise<ICity>
  getWeather: () => Promise<IWeather>
  getConditions: (id: string, year: string) => Promise<ICondition>
}
