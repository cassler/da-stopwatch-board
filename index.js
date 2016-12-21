import React from 'react';
import { render } from 'react-dom';
// style
import './app.scss';
import Scoreboard from './src/containers/Scoreboard';

render(
  <Scoreboard />,
  document.getElementById('root')
);