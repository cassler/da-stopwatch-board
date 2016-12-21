// Libs
import React from 'react';
import ReactDOM from 'react-dom';

// style
import './app.scss';

// the app
import Application from './components/Application';

const PLAYERS = [
  {
    name: "Jim Hoskins",
    score: 31,
    id: 1,
  },
  {
    name: "Andrew Chalkley",
    score: 35,
    id: 2,
  },
  {
    name: "Alena Holligan",
    score: 42,
    id: 3,
  },
];

ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));