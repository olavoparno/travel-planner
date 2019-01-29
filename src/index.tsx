import React from 'react'
import { render } from 'react-dom'

import App from "@Components/index"

import './styles/index.scss'

render(
  <App />,
  document.getElementById('root') as HTMLElement
)
