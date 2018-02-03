import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import News from './News';
import Routing from './Routing';
import MovieIndiviual from './Movie/MovieIndiviual';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:component" component={Routing} />
      <Route exact path="/movies/:id" component={MovieIndiviual} />
      <Route exact path="/news/search by channel" component={News} />
      <Route exact path="/news/search by topic" component={News} />
      <Route component={Home} />
    </Switch>
  </Router>
);

export default App;
