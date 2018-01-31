import React from 'react';

import './styles/styleInput.css';
import Send from './images/send.svg';

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState(
      {
        text: event.target.value
      },
      () => this.props.handleQuery(this.state.text)
    );
  }

  render() {
    return (
      <div className="input-container my-4">
        <input
          placeholder={`Search ${this.props.category}`}
          value={this.state.text}
          onChange={this.handleChange}
          type="text"
        />
        <img src={Send} alt="Send Icon" onClick={this.handleChange} />
      </div>
    );
  }
}

export default Input;
