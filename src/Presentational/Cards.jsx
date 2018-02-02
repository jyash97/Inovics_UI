import React from 'react';
import { Link } from 'react-router-dom';

const Cards = props =>
  props.data.map((data, index) => (
    <React.Fragment key={`${data.id}`}>
      <Link
        to={{ pathname: `/${props.category}/${data.title}`, query: data }}
        style={{
          textDecoration: 'none',
          backgroundImage: `linear-gradient(to bottom, rgba(168,218,220,0.2), rgba(1,22,39,.2)),url(${
            data.image
          })`
        }}
        key={data.id}
        className="col p-5 presentational text-capitalize text-center rounded m-2"
      >
        <h2 className="p-2">{data.title}</h2>
      </Link>
      {(index + 1) % 4 === 0 ? <div className="w-100" /> : null}
    </React.Fragment>
  ));

export default Cards;
