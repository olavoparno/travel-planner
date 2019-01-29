import React from 'react'
import { Provider, Subscribe } from 'unstated';

import AppContainer from '@Components/container'
import Select from '@Components/select'

const App = () => {
  const handleDays = (event: any, container: AppContainer) => {
    container.setVacationDays(event.target.value)
  }
  return (
    <Provider>
      <Subscribe to={[AppContainer]}>
        {
          (container: AppContainer) => {
          console.log('Container', container)
          return (
            <div>
              <input
                name="Days"
                type="text"
                placeholder="15"
                onChange={() => handleDays(event, container)}
              />
              <Select selectOptions={container.state.cities}/>
              <Select selectOptions={container.state.weathers}/>
              <button type="button" onClick={() => container.showTimeTable()}>Give best timetable!</button>
            </div>
            )
          }
        }
      </Subscribe>
    </Provider>
  )
}

export default App
