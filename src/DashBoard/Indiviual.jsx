import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Indiviual extends React.Component {
  render() {
    return (
      <Link
        to={`/${this.props.name}`}
        className="col dashboard border rounded p-3 mx-5 "
      >
        <img
          src={`${process.env.PUBLIC_URL}/images/${this.props.name}.svg`}
          alt=""
        />
        <h5
          style={{ color: '#1d3557', fontWeight: '300' }}
          className="d-inline-block px-3"
        >
          {this.props.data}
        </h5>
      </Link>
    );
  }
}

Indiviual.propTypes = {
  data: PropTypes.string,
  name: PropTypes.string
};

export default Indiviual;
