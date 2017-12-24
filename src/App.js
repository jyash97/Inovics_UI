import React  from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

import Home from './Home';
import Alert from './Alert';
import Help from './Help';

const App = () =>(
  <Router>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/help' component={Help}/>
      <Route exact path='/alert' component={Alert}/>
      <Route component={Home}/>
    </Switch>
  </Router>
);

export default App;
