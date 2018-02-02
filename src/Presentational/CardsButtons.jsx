import React from 'react';
import { Link } from 'react-router-dom';

import './styles/styleButton.css';

const CardsButtons = props =>
  props.data.map((data, index) => (
    <React.Fragment key={`${data.id}`}>
      <Link
        to={{ pathname: `/${props.category}/${data.title}`, query: data }}
        style={{
          textDecoration: 'none',
          color: 'white'
        }}
        key={data.id}
        className="btn btn-card btn-sm btn-primary text-capitalize text-center rounded mx-1 my-1"
      >
        <span>{data.title}</span>
      </Link>
      {(index + 1) % 4 === 0 ? <div className="w-100" /> : null}
    </React.Fragment>
  ));

export default CardsButtons;
