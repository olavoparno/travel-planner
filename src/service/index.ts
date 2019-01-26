import { ICities, IWeather, IConditions } from './interface';

class TravelService {
  public getCities = (): Promise<ICities> => {
    const path = 'http://localhost:8882/cities/'
    return this.fetchData(path)
  }

  public getWeather = (): Promise<IWeather> => {
    const path = 'http://localhost:8882/weather/'
    return this.fetchData(path)
  }

  public getConditions = (id: number, year: string): Promise<IConditions> => {
    const path = `http://localhost:8882/cities/${id}/year/${year}`
    return this.fetchData(path)
  }

  private fetchData = (path: string): Promise<any> => {
    return fetch(path)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          throw Error(
            `Error on fetching data for ${path}.`
          );
        }
        return data
      }
    )
  }
}

export default TravelService;
