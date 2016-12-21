import React from 'react';
import { render } from 'react-dom';
// style
import './src/styles/app.scss';
import Scoreboard from './src/containers/Scoreboard';

render(
  <Scoreboard />,
  document.getElementById('root')
);