import React from 'react';
import { Link } from 'react-router-dom';

const Instructions = () => (
  <React.Fragment>
    <ul className="list-group">
      <li className="list-group-item text-capitalize list-group-item-primary">
        Add Email, github and Linkedin Profile in Contact Input and then Click{' '}
        <span className="font-weight-bold">Add Contact</span>
      </li>
      <li className="list-group-item text-capitalize list-group-item-success">
        In duration Input you can give other details also and separating them
        with commas. For eg:{' '}
        <span className="font-weight-bold">4 Months,Remote Job</span>
      </li>
      <li className="list-group-item text-capitalize list-group-item-danger">
        In description , you can add the languages used by separting them with
        commas. For eg: <span className="font-weight-bold">React,Node</span> or
        can give multiple points by separting them with commas.
      </li>
      <li className="list-group-item text-capitalize list-group-item-warning">
        In university Input you can add the board affiliated like CBSE,ICSE,etc
        and can also give location of the school or college by separating with
        commas.
      </li>
      <li className="list-group-item text-capitalize list-group-item-info">
        use extratitle to add achievements,skills and extratext to add the
        details in the specific section by separting with commas as above.
      </li>
    </ul>
    <Link
      to="/"
      className="btn btn-outline-primary text-uppercase font-weight-bold btn-block rounded-0 m-2"
    >
      Go Back
    </Link>
  </React.Fragment>
);

export default Instructions;
