import React from 'react';
import Stopwatch from '../components/Stopwatch';
import Stats from '../components/Stats';
import Counter from '../components/Counter';
import Player from '../components/Player';
import Header from '../components/Header';

const INITIAL_STATE = {
  players: [
    {
      name: 'Jim Hoskins',
      score: 331,
    },
    {
      name: 'Andrew Chalkley',
      score: 420,
    },
    {
      name: 'Alena Holligan',
      score: 50,
    },
  ],
}

const Scoreboard = React.createClass({
  getInitialState: function () {
    return INITIAL_STATE;
  },
  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  },

  onAddPlayer: function(name) {
    this.state.players.push({ name: name, score: 0 });
    this.setState(this.state);
  },

  onRemovePlayer: function(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },

  render: function() {
    return (
      <div className="scoreboard">
        <Header players={this.state.players} />
        <div className="players">
          {this.state.players.map(function(player, index) {
             return (
               <Player
                 name={player.name}
                 score={player.score}
                 key={player.name}
                 onScoreChange={(delta) => this.onScoreChange(index, delta)}
                 onRemove={() => this.onRemovePlayer(index)}
               />
             );
           }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onAddPlayer} />
      </div>
    );
  }
});


const AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },

  getInitialState: function () {
    return { name: '' };
  },

  onNameChange: function (e) {
    const name = e.target.value;
    this.setState({ name: name });
  },

  onSubmit: function (e) {
    if (e) e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({ name: '' });
  },

  render: function () {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.onNameChange}
            placeholder="Player Name"
          />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
});

export default Scoreboard;