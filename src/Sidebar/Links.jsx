import React from 'react';
import { Link } from 'react-router-dom';

import './styles/styles.css';

class Links extends React.Component {
  handleLogout() {
    localStorage.removeItem('userData');
    window.location.href = '/';
  }

  render() {
    let a = [];
    const isVerified = JSON.parse(localStorage.getItem('userData')).isVerified;
    isVerified
      ? (a = ['profile', 'favorites', 'feedback', 'logout'])
      : (a = ['profile', 'feedback', 'logout']);
    return (
      <div className="links">
        <ul className="list-unstyled">
          {a.map(
            (name, i) =>
              name === 'logout' ? (
                <li
                  className="p-3"
                  key={name}
                  onClick={this.handleLogout.bind(this)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/${name}.svg`}
                    alt={name}
                  />
                  <span className="mx-4 text-capitalize">{name}</span>
                </li>
              ) : (
                <Link
                  to={`/${name}`}
                  style={{ textDecoration: 'none' }}
                  key={`${name}${i}`}
                >
                  <li className="p-3">
                    <img
                      src={`${process.env.PUBLIC_URL}/images/${name}.svg`}
                      alt={name}
                    />
                    <span className="mx-4 text-capitalize">{name}</span>
                  </li>
                </Link>
              )
          )}
        </ul>
      </div>
    );
  }
}

export default Links;
