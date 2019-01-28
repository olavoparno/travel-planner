import { ICity, IWeather, ICondition, ITravelService } from './interface';
import Config from '@Config/index'

/**
 * This class fetchs travelling information
 * @example
 * const service = new TravelService()
 * const cities = service.getCities()
 *
 * @exports TravelService
 * @implements {ITravelService}
 */
class TravelService implements ITravelService {
  /**
   * Fetchs cities from the TravelService
   *
   * @returns Promise<ICities>
   * @memberof TravelService
   */
  public getCities = (): Promise<ICity> => {
    const path = `${Config.api.baseUrl}/cities/`
    return this.fetchData(path)
  }

  /**
   * Fetchs weather from the TravelService
   *
   * @returns Promise<IWeather>
   * @memberof TravelService
   */
  public getWeather = (): Promise<IWeather> => {
    const path = `${Config.api.baseUrl}/weather/`
    return this.fetchData(path)
  }

  /**
   * Fetchs conditions from the TravelService
   *
   * @param {number} id - Represents the City ID
   * @param {string} year - Year parameter for ideal weather conditions
   * @returns Promise<IConditions>
   * @memberof TravelService
   */
  public getConditions = (id: string, year: string): Promise<ICondition> => {
    const path = `${Config.api.baseUrl}/cities/${id}/year/${year}/`
    return this.fetchData(path)
  }

  /**
   * Private fetch method
   *
   * @param {string} path - Endpoint complete URL used by the fetch method
   * @returns Promise<any>
   * @memberof TravelService
   */
  private fetchData = (path: string): Promise<any> => {
    return fetch(path)
      .then(response => {
        return response.json()
      })
      .then(data => {
        return data
      })
      .catch(() => `Error on fetching data for ${path}.`)
  }
}

export default TravelService;
