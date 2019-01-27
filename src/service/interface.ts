/**
 * Typings for Cities object
 * @interface ICities
 */
export interface ICities {
  woeid: string;
  district: string;
  province: string;
  state_acronym: string;
  country: string;
}

/**
 * Typings for Weather object
 * @interface IWeather
 */
export interface IWeather {
  id: string;
  name: string;
}

/**
 * Typings for Conditions object
 * @interface IConditions
 */
export interface IConditions {
  date: string;
  temperature: ITemperature;
  weather: string;
  woeid: string;
}

/**
 * Typings for Temperature object
 * @interface ITemperature
 */
export interface ITemperature {
  max: number;
  min: number;
  unit: string;
}

/**
 * Typings for TravelService class
 * @interface ITravelService
 */
export interface ITravelService {
  getCities: () => Promise<ICities>
  getWeather: () => Promise<IWeather>
  getConditions: (id: string, year: string) => Promise<IConditions>
}
