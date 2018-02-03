import React from 'react';
import { Link } from 'react-router-dom';

import './styles/styleButton.css';

const LinkButton = props => (
  <Link
    to={props.url}
    style={{
      textDecoration: 'none',
      color: 'white'
    }}
    key={props.id}
    className="btn btn-card btn-sm btn-primary text-capitalize text-center rounded mx-1 my-1"
  >
    <span>{props.title}</span>
  </Link>
);

export default LinkButton;
