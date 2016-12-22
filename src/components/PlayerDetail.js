import React, { PropTypes } from 'react';

const PlayerDetail = ({ selectedPlayer }) => {
  if( selectedPlayer ){
    return (
      <div>
        <h5>More about</h5>
        <h3>{ selectedPlayer.name }</h3>
        <ul>
          <li>
            <span>Score</span> 
            { selectedPlayer.score }
          </li>
          <li>
            <span>Created</span> 
            { selectedPlayer.created }
          </li>
          <li>
            <span>Updated</span> 
            { selectedPlayer.updated }
          </li>        
        </ul>
      </div>
    );
  }
  else {
    return (<p>Click on a player to see more details</p>);
  }
};


export default PlayerDetail;