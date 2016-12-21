import React from 'react';

const INITIAL_STATE = {
  players: [
    {
      name: 'Jim Hoskins',
      score: 31,
    },
    {
      name: 'Andrew Chalkley',
      score: 20,
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

// Move to components/Header.js
// ----------------------------------------------
function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>Scoreboard</h1>
      <Stopwatch />
    </div>
  );
}

Header.propTypes = {
  players: React.PropTypes.array.isRequired,
};

// Move to components/Stats.js
// -----------------------------------------------------------------------
function Stats(props) {
  const playerCount = props.players.length;
  const totalPoints = props.players.reduce(function(total, player) {
    return total + player.score;
  }, 0);

  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{playerCount}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}

Stats.propTypes = {
  players: React.PropTypes.array.isRequired,
};

// Move to components/Stopwatch.js
// ------------------------------------------------------------------------
const Stopwatch = React.createClass({
  getInitialState: function () {
    return ({
      running: false,
      previouseTime: 0,
      elapsedTime: 0,
    });
  },

  componentDidMount: function () {
    this.interval = setInterval(this.onTick);
  },

  componentWillUnmount: function () {
    clearInterval(this.interval);
  },


  onStart: function () {
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  },

  onStop: function () {
    this.setState({
      running: false,
    });
  },

  onReset: function () {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    });
  },

  onTick: function () {
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
        previousTime: Date.now(),
      });
    }
  },

  render: function () {
    
    var seconds = (this.state.elapsedTime / 1000).toFixed(2);
    return (
      <div className="stopwatch" >
        <h2>Stopwatch</h2>
        <div className="stopwatch-time"> {seconds} </div>
        { this.state.running ?
          <button onClick={this.onStop}>Stop</button>
          :
          <button onClick={this.onStart}>Start</button>
        }
        <button onClick={this.onReset}>Reset</button>
      </div>
    )
  }
});

// Move to components/Player.js
// ----------------------------------------------------------------------
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>✖</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter onChange={props.onScoreChange} score={props.score} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
};

// Move to components/Counter.js
// ----------------------------------------------------------
function Counter(props) {
 return (
   <div className="counter" >
     <button className="counter-action decrement" onClick={() => props.onChange(-1)}>
       -
     </button>
     <div className="counter-score"> {props.score} </div>
     <button className="counter-action increment" onClick={() => props.onChange(1)}>
       +
     </button>
   </div>
 );
}

Counter.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  score: React.PropTypes.number.isRequired,
};

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