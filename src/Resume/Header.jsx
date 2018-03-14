import React from 'react';
import Buttons from './Buttons';

const Header = props => {
  const data = props.details.map(data => data.contact);
  return (
    <div
      className="border-dark text-center p-2 m-1 my-2"
      style={{ borderBottom: '5px solid' }}
    >
      <h4 className="text-dark text-uppercase mx-2 font-weight-bold">
        {props.name} {props.surname}
      </h4>
      <Buttons data={data} />
    </div>
  );
};

export default Header;
