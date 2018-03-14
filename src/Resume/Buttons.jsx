import React from 'react';

const Buttons = props => (
  <React.Fragment>
    {props.data.map((value, index) => (
      <React.Fragment key={index}>
        <h6 className="btn btn-sm btn-outline-primary m-0 mx-2 font-weight-normal">
          {value}
        </h6>
        {props.data.length - 1 !== index ? (
          <span className="text-dark font-weight-bold">|</span>
        ) : null}
      </React.Fragment>
    ))}
  </React.Fragment>
);

export default Buttons;
