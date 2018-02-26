import React from 'react';

class ButtonWithDelete extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h5 className="text-muted text-capitalize">
          {this.props.title.toLowerCase() === 'details'
            ? 'Contact'
            : this.props.title}
        </h5>
        {this.props.data.map((arrayData, index) => (
          <div key={index} className="d-inline mx-1">
            <p className="d-inline-block p-1 bg-light border border-danger text-danger">
              {arrayData.contact}
            </p>
            <button
              className="btn btn-sm btn-danger p-1 rounded-0 d-inline-block"
              onClick={() =>
                this.props.handleDelete(
                  this.props.title.toLowerCase(),
                  arrayData.id
                )
              }
            >
              Delete
            </button>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

export default ButtonWithDelete;
