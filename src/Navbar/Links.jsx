import React from 'react';
import { Link } from 'react-router-dom';

class Links extends React.Component {
  render() {
    let a = ['help', 'logout', 'alert'];
    return (
      <React.Fragment>
        {a.map((name, i) => (
          <Link key={`${i}${name}`} to={`/${name}`}>
            <li className="nav-item text-capitalize">
              <img
                src={`${process.env.PUBLIC_URL}/images/${name}.svg`}
                alt={name}
              />
            </li>
          </Link>
        ))}
      </React.Fragment>
    );
  }
}

export default Links;
