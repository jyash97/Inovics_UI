import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = props => (
  <Link className="btn btn-outline-primary text-capitalize m-1" to={props.url}>
    {props.name}
  </Link>
);

export default BackButton;
