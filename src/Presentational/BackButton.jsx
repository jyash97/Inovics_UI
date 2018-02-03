import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = props => (
  <Link className="btn btn-outline-primary text-capitalize" to={props.url}>
    Back to {props.name}
  </Link>
);

export default BackButton;
