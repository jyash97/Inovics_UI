import React from 'react';

import './styles/styleInput.css';
import Send from './images/send.svg';

class Input extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      oldText: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleClick() {
    this.setState(
      {
        oldText: ''
      },
      () => this.props.handleClick(this.state.text)
    );
  }

  handleEnter(event) {
    if (event.key === 'Enter') {
      this.setState({
        oldText: ''
      });
      this.handleClick();
    }
  }

  handleChange(event) {
    this.setState(
      {
        text: event.target.value,
        oldText: event.target.value
      },
      () => this.props.handleQuery(this.state.text)
    );
  }

  render() {
    return (
      <div className="input-container my-4">
        <input
          className="text-capitalize"
          placeholder={`Search ${this.props.category}`}
          value={this.state.oldText}
          onKeyPress={this.handleEnter}
          onChange={this.handleChange}
          type="text"
        />
        <img src={Send} alt="Send Icon" onClick={this.handleClick} />
      </div>
    );
  }
}

export default Input;
