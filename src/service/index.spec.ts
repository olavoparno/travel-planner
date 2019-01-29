import {GlobalWithFetchMock} from "jest-fetch-mock"

import TravelService from './index'
import { ICity, IWeather, ICondition } from './interface'
import Config from '@Config/index'
import Mock from '@Mock/index'

let service: TravelService
let customGlobal: GlobalWithFetchMock
let serviceFail: TravelService

describe('Test for TravelService class failures', () => {
  beforeAll(() => {
    serviceFail = new TravelService()
  })
  it('should throw an error', done => {
    const wrongConfig = {
      id: '123456',
      year: '2018'
    }
    serviceFail
      .getConditions(wrongConfig.id, wrongConfig.year)
      .then((response: any) => {
        expect(response).toEqual(
          `Error on fetching data for ${Config.api.baseUrl}/cities/${wrongConfig.id}/year/${wrongConfig.year}/.`
        )
        done()
      })
    })
})

describe('Tests for TravelService class', () => {
  beforeAll(() => {
    customGlobal = global as GlobalWithFetchMock
    customGlobal.fetch.resetMocks()
    service = new TravelService()
  })
  it('should retrieve all cities', done => {
    customGlobal.fetch.mockResponseOnce(
      JSON.stringify(
        Mock.citiesResponse
       )
    )
    service
      .getCities()
      .then((response: ICity) => {
        expect(response).toBeDefined()
        done()
      })
  })
  it('should retrieve all weather', done => {
    customGlobal.fetch.mockResponseOnce(
      JSON.stringify(
        Mock.weatherResponse
       )
    )
    service
      .getWeather()
      .then((response: IWeather) => {
        expect(response).toBeDefined()
        done()
      })
  })
  it('should retrieve specific conditions', done => {
    customGlobal.fetch.mockResponseOnce(
      JSON.stringify(
        Mock.conditionsResponse
       )
    )
    const config = {
      id: '455825',
      year: '2018'
    }
    service
      .getConditions(config.id, config.year)
      .then((response: ICondition) => {
        const firstResponse = response[0]
        expect(response).toBeDefined()
        expect(firstResponse.woeid).toEqual(config.id)
        expect(firstResponse.date).toContain(config.year)
        done()
      })
  })
})
