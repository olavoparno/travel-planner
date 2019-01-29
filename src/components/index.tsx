import React from 'react'
import { Provider, Subscribe } from 'unstated'

import AppContainer from '@Components/container'
import Select from '@Components/select'
import TravelTable from '@Components/table'

const App = () => {
  const handleDays = (event: any, container: AppContainer) => {
    container.setVacationDays(event.target.value)
  }
  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {
          (container: AppContainer) => {
          return (
            <div className="app-container">
              <h1>Travel Planner</h1>
              <div className="input-div">
                <span>How many vacation days?</span>
                <input
                  name="Days"
                  type="text"
                  placeholder="15"
                  onChange={() => handleDays(event, container)}
                />
              </div>
              <div className="select-div">
                <span>Select destination</span>
                <Select selectOptions={container.state.cities}/>
              </div>
              <div className="select-div">
                <span>Select weather</span>
                <Select selectOptions={container.state.weathers}/>
              </div>
              <button type="button" onClick={() => container.showTimeTable()}>Give best timetable!</button>
              <TravelTable tableData={container.state.perfectConditions}/>
            </div>
            )
          }
        }
      </Subscribe>
    </Provider>
  )
}

export default App
