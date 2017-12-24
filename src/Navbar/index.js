import React from 'react';
import { Link } from 'react-router-dom';

import Links from './Links';
import './styles/style.css';

import Profile from './Images/profile.jpg';

class Navbar extends React.Component{
  render(){
    const styleProfile = {
      'backgroundImage':`url(${Profile})`
    };
    return(
      <nav className="navbar navbar-expand-lg navbar-dark" style={{'backgroundColor':'#29335c'}}>
        <Link to='/'><span className="navbar-brand">Inovics</span></Link>
        <div className="navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <Links />
            <li className="rounded-circle bg-light profile" style={styleProfile}>

            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
