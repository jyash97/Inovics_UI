import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import News from './images/news.svg';
import Entertainment from './images/entertainment.svg';
import Music from './images/music.svg';
import Books from './images/book.svg';
import Movies from './images/movie.svg';
import Quotes from './images/quote.svg';
import Hotel from './images/hotel.svg';
import Transport from './images/transport.svg';
import Food from './images/food.svg';
import Chat from './images/chat.svg';
import Cricket from './images/cricket.svg';
import Weather from './images/weather.svg';

class Indiviual extends React.Component{

  constructor(){
    super();
    this.findImage = this.findImage.bind(this);
  }

  findImage(name){
    switch(name){
      case 'news':
        return News;
      case 'books':
        return Books;
      case 'entertainment':
        return Entertainment;
      case 'movies':
        return Movies;
      case 'quotes':
        return Quotes;
      case 'music':
        return Music;
      case 'hotels':
        return Hotel;
      case 'transport':
        return Transport;
      case 'food':
        return Food;
      case 'cricket':
        return Cricket;
      case 'chat':
        return Chat;
      case 'weather':
        return Weather;
      default:
        return '';
    }
  }

  render(){
    return(
      <Link to='/' className="col border rounded p-3 mx-5 ">
        <img src={this.findImage(this.props.name)} alt=""/>
        <h5 style={{'color': '#1d3557','fontWeight':'300'}} className="d-inline-block px-3">{this.props.data}</h5>
      </Link>
    );
  }
}

Indiviual.propTypes = {
  data: PropTypes.string,
  name: PropTypes.string
};

export default Indiviual;
