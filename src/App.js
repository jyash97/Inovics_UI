import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Routing from './Routing';
import MovieIndiviual from './Movie/MovieIndiviual';
import BooksIndividual from './Books/BooksIndividual';
import NewsByChannel from './News/NewsByChannel';
import NewsChannel from './News/NewsChannel';
import NewsByTopic from './News/NewsByTopic';
import SearchByTitle from './Books/SearchByTitle';
import SearchByAuthor from './Books/SearchByAuthor';
import NotFound from './Presentational/NotFound';
import FoodHome from './Food/FoodHome';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:component" component={Routing} />
      <Route exact path="/movies/:id" component={MovieIndiviual} />
      <Route exact path="/news/channel/:id" component={NewsChannel} />
      <Route exact path="/news/search by channel" component={NewsByChannel} />
      <Route exact path="/news/search by topic" component={NewsByTopic} />
      <Route exact path="/books/title/:id" component={BooksIndividual} />
      <Route exact path="/books/author/:id" component={BooksIndividual} />
      <Route exact path="/books/search by title" component={SearchByTitle} />
      <Route exact path="/books/search by author" component={SearchByAuthor} />
      <Route exact path="/food" component={FoodHome} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
