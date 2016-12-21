import React, { Component, PropTypes } from 'react';

// Redux Workers
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PlayerActionCreators from '../actions/player';

// Components
import Player from '../components/Player';
import Header from '../components/Header';
import AddPlayerForm from '../components/AddPlayerForm';



class Scoreboard extends Component {

  static propTypes = {
    players: PropTypes.array.isRequired,
  };

  render() {

    const { dispatch, players } = this.props;
    const addPlayer = bindActionCreators(PlayerActionCreators.addPlayer, dispatch);
    const removePlayer = bindActionCreators(PlayerActionCreators.removePlayer, dispatch);
    const updatePlayerScore = bindActionCreators(PlayerActionCreators.updatePlayerScore, dispatch);

    const playerComponents = players.map((player, index) => ( 
      <Player 
        index={index}
        name={player.name}
        score={player.score}
        key={player.name}
        updatePlayerScore={updatePlayerScore}
        removePlayer={removePlayer}
      />
    ));

    return (
      <div className="scoreboard">
        <Header players={players} />
        <div className="players">
          { playerComponents }
        </div>
        <AddPlayerForm addPlayer={addPlayer} />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    players: state
  }
);

/* 
 * Subscribe Scorboard container component to
 * any changes in state or Redux Store changes */

export default connect(mapStateToProps)(Scoreboard);


