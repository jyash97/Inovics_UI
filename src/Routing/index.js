import React from 'react';

import Help from '../Help';
import Alert from '../Alert';
import Navbar from '../Navbar';
import Movie from '../Movie';
import Books from '../Books';
import News from '../News';
import Weather from '../Weather';
import FoodHome from '../Food/FoodHome';
import QuotesIndividual from '../Quotes/QuotesIndividual';
import NotFound from '../Presentational/NotFound';

class Routing extends React.Component {
  constructor() {
    super();
    this.handleRoute = this.handleRoute.bind(this);
  }

  handleRoute() {
    switch (this.props.match.params.component) {
      case 'help':
        return <Help />;
      case 'alert':
        return <Alert />;
      case 'movies':
        return <Movie />;
      case 'news':
        return <News />;
      case 'books':
        return <Books />;
      case 'weather':
        return <Weather />;
      case 'food':
        return <FoodHome />;
      case 'quotes':
        return <QuotesIndividual />;
      default:
        return <NotFound />;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar /> {this.handleRoute()}
      </React.Fragment>
    );
  }
}

export default Routing;
