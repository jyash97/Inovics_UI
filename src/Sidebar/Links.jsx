import React from 'react';
import { Link } from 'react-router-dom';

import './styles/styles.css';
import Profile from './images/user.svg';
import Search from './images/recent.svg';
import Favorites from './images/fav.svg';
import Feedback from './images/feedback.svg';
import Logout from './images/logout.svg';
import Settings from './images/settings.svg';

class Links extends React.Component{

  constructor(){
    super();
    this.handleImage = this.handleImage.bind(this);
  }

  handleImage(name){
    switch(name){
      case 'profile':
        return Profile;
      case 'recent searches':
        return Search;
      case 'favorites':
        return Favorites;
      case 'feedback':
        return Feedback;
      case 'settings':
        return Settings;
      case 'logout':
        return Logout;
      default:
        return '';
    }
  }

  render(){
    const a = ['profile','recent searches','favorites','feedback','settings','logout'];
    return(
      <div className="links">
        <ul className="list-unstyled">
          {
            a.map((name,i) => (
              <Link to='/' style={{'textDecoration':'none'}} key={`${name}${i}`}>
                <li className="p-3">
                  <img  src={this.handleImage(name)} alt={name}/>
                  <span className="mx-4 text-capitalize">{name}</span>
                </li>
              </Link>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Links;
