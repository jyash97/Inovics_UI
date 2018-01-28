import React from 'react';

import Help from '../Help';
import Alert from '../Alert';
import Home from '../Home';
import Navbar from '../Navbar';
import Movie from '../Movie';

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
      default:
        return <Home />;
    }
  }

  render() {
    return (
      <React.Fragment>
        {' '}
        <Navbar /> {this.handleRoute()}
      </React.Fragment>
    );
  }
}

export default Routing;
