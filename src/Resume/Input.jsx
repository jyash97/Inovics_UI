import React from 'react';

class Input extends React.Component {
  render() {
    return (
      <React.Fragment>
        {this.props.names.map(data => {
          if (data === 'description' || data === 'extratext')
            return (
              <input
                className="d-inline text-capitalize"
                style={{ width: '55%' }}
                key={data}
                type="text"
                placeholder={data}
                name={data}
                value={this.props.inputValues[data]}
                onChange={this.props.handleChange}
              />
            );
          else if (data.toLowerCase() === 'contact')
            return (
              <input
                className="d-inline"
                key={data}
                type="text"
                placeholder={data}
                name={data}
                value={this.props.inputValues[data]}
                onChange={this.props.handleChange}
              />
            );
          return (
            <input
              className="d-inline text-capitalize"
              key={data}
              type="text"
              placeholder={data}
              name={data}
              value={this.props.inputValues[data]}
              onChange={this.props.handleChange}
            />
          );
        })}
        <button
          className="btn btn-outline-dark btn-sm my-2 d-block rounded-0"
          onClick={this.props.handleClick}
        >
          Add {this.props.section}
        </button>
      </React.Fragment>
    );
  }
}

export default Input;
