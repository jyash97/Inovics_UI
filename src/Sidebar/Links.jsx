import React from 'react';
import { Link } from 'react-router-dom';

import './styles/styles.css';

class Links extends React.Component{
  render(){
    const a = ['profile','recent searches','favorites','feedback','settings','logout'];
    return(
      <div className="links">
        <ul className="list-unstyled">
          {
            a.map((name,i) => (
              <Link to='/' style={{'textDecoration':'none'}} key={`${name}${i}`}>
                <li className="p-3">
                  <img  src={`${process.env.PUBLIC_URL}/images/${name}.svg`} alt={name}/>
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
