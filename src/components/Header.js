import React, { PropTypes } from 'react';
import Stats from './Stats';
import Stopwatch from './Stopwatch';
// ----------------------------------------------
const Header = props => {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>Time<small><em>&</em></small>Score</h1>
      <Stopwatch />
    </div>
  );
}

Header.propTypes = {
  players: React.PropTypes.array.isRequired,
};

export default Header;