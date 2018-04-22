import React from 'react';

const Errors = props =>
  props.errors.map(errorMsg => (
    <div key={errorMsg} className="alert alert-danger">
      {errorMsg}
    </div>
  ));

export default Errors;
