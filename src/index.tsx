import React from 'react';
import { render } from 'react-dom';

import App from "@Components/index";

import './styles/index.scss';

import TravelService from './service';

const cityService = new TravelService();

// cityService.getCities().then((data) => {
//   console.log(data)
// })

cityService.getWeather().then((data) => {
  console.log(data)
})

cityService.getConditions('455825', '2018').then((data) => {
  console.log(data)
})

render(
  <App />,
  document.getElementById('root') as HTMLElement
);
