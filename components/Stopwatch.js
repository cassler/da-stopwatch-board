import React from 'react';

const Stopwatch = React.createClass({
  
  getInitialState: function() {
    return {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    }
  },
  
  componentDidMount: function() {
    this.interval = setInterval(this.onTick, 80);
  },
  
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  
  onTick: function() {
    if ( this.state.running ) {
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),  
      });
    }
  }, 
  onStart: function() {
    this.setState({ 
      running: true,
      previousTime: Date.now(),
    })
  },
  onStop: function() {
    this.setState({ running: false })
  },
  onReset: function() {
    this.setState({ 
      elapsedTime: 0,
      previousTime: Date.now(),
    })
  },
  render: function() {
    var seconds = (this.state.elapsedTime / 1000).toFixed(2);
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        { this.state.running ? <button onClick={this.onStop}>Stop</button> : <button onClick={this.onStart}>Start</button> }
        <button onClick={this.onReset}>Reset</button>
      </div>
    )
  }  
});

export default Stopwatch;