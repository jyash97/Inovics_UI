import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Routing from './Routing';
import MovieIndiviual from './Movie/MovieIndiviual';
import BooksIndividual from './Books/BooksIndividual';
import NewsByChannel from './News/NewsByChannel';
import NewsChannel from './News/NewsChannel';
import NewsByTopic from './News/NewsByTopic';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:component" component={Routing} />
      <Route exact path="/movies/:id" component={MovieIndiviual} />
      <Route exact path="/books/:id" component={BooksIndividual} />
      <Route exact path="/news/channel/:id" component={NewsChannel} />
      <Route exact path="/news/search by channel" component={NewsByChannel} />
      <Route exact path="/news/search by topic" component={NewsByTopic} />
      <Route component={Home} />
    </Switch>
  </Router>
);

export default App;
