import React from 'react'
import { Provider } from 'unstated';

import Select from '@Components/select'

const App = () => {
    return (
      <Provider>
        <div>
          <Select />
          <span>Sasasa</span>
        </div>
      </Provider>
    )
}

export default App
