import React from 'react';
import { Link } from 'react-router-dom';

import Links from './Links';
import './styles/style.css';
import Navigation from '../Chatbot/Navigation';

import Profile from './Images/profile.jpg';

class Navbar extends React.Component {
  render() {
    // Should be uploaded from Backend just for UI purpose.
    const styleProfile = {
      backgroundImage: `url(${Profile})`
    };
    return (
      <React.Fragment>
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{ backgroundColor: '#29335c' }}
        >
          <Link to="/">
            <span className="navbar-brand">Inovics</span>
          </Link>
          <div className="navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <Links />
              <li
                className="rounded-circle bg-light profile"
                style={styleProfile}
              />
            </ul>
          </div>
        </nav>
        <Navigation />
      </React.Fragment>
    );
  }
}

export default Navbar;
