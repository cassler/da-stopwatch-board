import React, { Component, PropTypes } from 'react';

// Move to components/Stopwatch.js
// ------------------------------------------------------------------------
export default class Stopwatch extends Component {

  state = {
    running: false,
    previousTime: 0,
    elapsedTime: 0,
  };
  
  componentDidMount() {
    this.interval = setInterval(this.onTick);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onStart = () => {
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  }

  onStop = () => {
    this.setState({
      running: false,
    });
  }

  onReset = () => {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    });
  }

  onTick = () => {
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
        previousTime: Date.now(),
      });
    }
  }

  render() {
    var seconds = (this.state.elapsedTime / 1000).toFixed(2);
    return (
      <div className="stopwatch" >
      <div className="stopwatch-time"><div>{seconds}</div></div>
        <div className="stopwatch-buttons">
          <h2>Stopwatch</h2>
          { this.state.running ?
            <button onClick={this.onStop}>Stop</button>
            :
            <button onClick={this.onStart}>Start</button>
          }
          <button onClick={this.onReset}>Reset</button>
        </div>
      </div>
    )
  }
}