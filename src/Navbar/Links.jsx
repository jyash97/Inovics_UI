import React from 'react';
import { Link } from 'react-router-dom';

import Help from './Images/help.svg';
import Logout from './Images/logout.svg';
import Alert from './Images/alert.svg';

class Links extends React.Component{

  constructor(){
    super();
    this.handleImage = this.handleImage.bind(this);
  }

  handleImage(name){
    switch(name){
      case 'Help':
        return Help;
      case 'Logout':
        return Logout;
      case 'Alert':
        return Alert;
      default:
        return '';
    }
  }

  render(){
    let a = ['Help','Logout','Alert'];
    return(
      <React.Fragment>
        {
          a.map((name,i) => (
            <Link key={`${i}${name}`} to={`/${name}`}>
              <li className='nav-item text-capitalize'>
                <img src={this.handleImage(name)} alt={name}/>
              </li>
            </Link>
          ))
        }
      </React.Fragment>
    );
  }
}

export default Links;
