// Libs
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Player from './components/Player';
import Header from './components/Header';
import AddPlayerForm from './components/AddPlayerForm';

import './app.scss';

var PLAYERS = [
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

var nextId = 4;
  


var Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },
  
  getDefaultProps: function() {
    return {
      title: "Scoreboard",
    }
  },
  
  getInitialState: function() {
    return {
      players: this.props.initialPlayers,
    };
  },
  
  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  },
    
  onPlayerAdd: function(name) {
    this.state.players.push({
      name: name,
      score: 0,
      id: nextId,
    });
    this.setState(this.state);
    nextId += 1;
  },
    
  onRemovePlayer: function(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },
  
  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title} players={this.state.players} />
      
        <div className="players">
          {this.state.players.map(function(player, index) {
            return (
              <Player 
                onScoreChange={function(delta) {this.onScoreChange(index ,delta)}.bind(this)}
                onRemove={function() {this.onRemovePlayer(index)}.bind(this)}
                name={player.name} 
                score={player.score} 
                key={player.id} />
            );
          }.bind(this))}
        </div>
        <AddPlayerForm onAdd={this.onPlayerAdd} />
      </div>
    );
  }
});  

ReactDOM.render(<Application initialPlayers={PLAYERS}/>, document.getElementById('container'));