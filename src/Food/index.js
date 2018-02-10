import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FoodHome from './FoodHome';
import Restaurant from './Restaurant';

const FoodRoute = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/food" component={FoodHome} />
        <Route path="/food/restaurants/:city" component={Restaurant} />
      </Switch>
    </Router>
  );
};
export default FoodRoute;
