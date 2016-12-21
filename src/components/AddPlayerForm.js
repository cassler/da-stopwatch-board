import React, { Component, PropTypes } from 'react';

export default class AddPlayerForm extends Component {
  
  static propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  };

  state = {
    name: ''
  };

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState({ name: name });
  };

  onSubmit = (e) => {
    if (e) e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({ name: '' });
  };

  render() {
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
};