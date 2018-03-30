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
import WeatherIndividual from './Weather/WeatherIndividual';
import Restaurant from './Food/Restaurant';
import QuotesIndividual from './Quotes/QuotesIndividual';
import UpcomingMatches from './Cricket/UpcomingMatches';
import LiveScore from './Cricket/LiveScore';
import Resume from './Resume';
import Instructions from './Resume/Instructions';
import PrintResume from './Resume/PrintResume';
import DeveloperIndividual from './Developer/DeveloperIndividual';
import Dictionary from './Education/Dictionary';
import JobsIndividual from './Jobs/JobsIndividual';
import WebSearchBot from './Chatbot/WebSearchBot';
import NotFound from './Presentational/NotFound';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:component" component={Routing} />
      <Route exact path="/movies/:id" component={MovieIndiviual} />
      <Route exact path="/news/channel/:id" component={NewsChannel} />
      <Route exact path="/weather/:id" component={WeatherIndividual} />
      <Route exact path="/news/search by channel" component={NewsByChannel} />
      <Route exact path="/news/search by topic" component={NewsByTopic} />
      <Route exact path="/education/resume" component={Resume} />
      <Route
        exact
        path="/education/resume/instructions"
        component={Instructions}
      />
      <Route exact path="/resume/print" component={PrintResume} />
      <Route exact path="/books/title/:id" component={BooksIndividual} />
      <Route exact path="/books/author/:id" component={BooksIndividual} />
      <Route exact path="/books/search by title" component={SearchByTitle} />
      <Route exact path="/books/search by author" component={SearchByAuthor} />
      <Route exact path="/developer/:id" component={DeveloperIndividual} />
      <Route exact path="/jobs/:id" component={JobsIndividual} />
      <Route exact path="/education/dictionary" component={Dictionary} />
      <Route exact path="/food/restaurants/:city" component={Restaurant} />
      <Route exact path="/quotes" component={QuotesIndividual} />
      <Route
        exact
        path="/cricket/upcoming matches"
        component={UpcomingMatches}
      />
      <Route exact path="/cricket/live scores" component={LiveScore} />
      <Route exact path="/chat" component={WebSearchBot} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
