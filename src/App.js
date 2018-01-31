import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import IndiviualData from './Presentational/IndiviualData';

import Home from './Home';
import Routing from './Routing';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:component" component={Routing} />
      <Route exact path="/:component/:id" component={IndiviualData} />
      <Route component={Home} />
    </Switch>
  </Router>
);

export default App;
