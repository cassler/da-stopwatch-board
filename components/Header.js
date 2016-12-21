import React from 'react';
import Stopwatch from './Stopwatch'
import Stats from './Stats'

function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>
      <Stopwatch />
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
};

export default Header;

