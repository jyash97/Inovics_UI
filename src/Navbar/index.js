import React from 'react';
import { Link } from 'react-router-dom';

import './styles/style.css';
import Navigation from '../Chatbot/Navigation';

class Navbar extends React.Component {
  handleLogout() {
    localStorage.removeItem('userData');
    window.location.href = '/';
  }

  render() {
    let imageURL = JSON.parse(localStorage.getItem('userData')).image;
    fetch(imageURL)
      .then(res => res.blob())
      .then(blob => (imageURL = window.URL.createObjectURL(blob)));

    // Should be uploaded from Backend just for UI purpose.
    const styleProfile = {
      backgroundImage: `url(${imageURL})`
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
              <li className="nav-item text-capitalize">
                <img
                  src={`${process.env.PUBLIC_URL}/images/logout.svg`}
                  onClick={() => this.handleLogout()}
                  alt="Logout Button"
                />
              </li>
              <Link
                to="/profile"
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
