import React from 'react';

import './styles/style.css';
import BackButton from '../Presentational/BackButton';
import Input from '../Presentational/Input';
import FoodImage from './images/food.png';

const cities = [
  'Ahmedabad',
  'Bangalore',
  'Chandigarh',
  'Chennai',
  'Delhi',
  'Hyderabad',
  'Indore',
  'Kolkata',
  'Lucknow',
  'Mumbai',
  'Pune'
];

const data = [
  'Hungry ?',
  'Quick Food',
  'Guests At Home',
  'Food Binging',
  'Want To Eat Something New!',
  'Movie Marathon'
];

class FoodHome extends React.Component {
  constructor() {
    super();
    this.state = {
      current: data[0],
      track: 0,
      city: 'Indore'
    };
    this.timer = this.timer.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.time = setInterval(() => this.timer(this.state.track), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.time);
  }

  handleClick(value) {
    this.props.push(`/food/restaurants/${value}`);
  }

  handleQuery() {}

  timer(i) {
    if (i === 5) {
      i = 0;
      this.setState({
        track: i,
        current: data[i]
      });
    } else {
      i++;
      this.setState({
        track: i,
        current: data[i]
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="restaurant-image">
          <img src={FoodImage} alt="Restaurant" />
        </div>
        <h6 className="food-text p-1 font-italic my-0 text-center text-danger">
          {this.state.current}
        </h6>
        <Input
          handleClick={this.handleClick}
          handleQuery={this.handleQuery}
          category="city"
        />
        <div className="px-5 text-center my-3">
          {cities.map(data => (
            <BackButton
              classes="btn-outline-danger btn-sm mx-1"
              url={`food/restaurants/${data}`}
              key={data}
              name={data}
            />
          ))}
        </div>
        <BackButton
          classes="btn-outline-notfound my-5 mx-5"
          url="/"
          name="go back to home"
        />
      </React.Fragment>
    );
  }
}

export default FoodHome;
