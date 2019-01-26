export interface ICities {
  woeid: string;
  district: string;
  province: string;
  state_acronym: string;
  country: string;
}

export interface IWeather {
  id: string;
  name: string;
}

export interface IConditions {
  date: string;
  temperature: ITemperature;
  weather: string;
  woeid: string;
}

interface ITemperature {
  max: number;
  min: number;
  unit: string;
}
