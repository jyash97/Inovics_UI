import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './FoodStyles/foodhomestyle.css';
import LinkButton from '../Presentational/LinkButton';
const cities = [
  'Agra',
  'Ahmedabad',
  'Amritsar',
  'Bangalore',
  'Bhopal',
  'Chandigarh',
  'Chennai',
  'Coimbatore',
  'Delhi',
  'Ernakulam',
  'Guwahati',
  'Hyderabad',
  'Indore',
  'Jaipur',
  'Kanpur',
  'Kolkata',
  'Kochi',
  'Lucknow',
  'Mumbai',
  'Nagpur',
  'Patna',
  'Pune',
  'Ranchi',
  'Surat',
  'Visakhapatnam'
];
const data = [
  'Hungry ?',
  'Quick Food',
  'Guests At Home',
  'Food Binging',
  'Want To Eat Something New!',
  'Movie Marathon'
];
class FoodHome extends Component {
  constructor() {
    super();
    this.state = {
      current: data[0],
      track: 0,
      city: 'Indore'
    };
    this.timer = this.timer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.time = setInterval(() => this.timer(this.state.track), 3000);
  }
  componentWillUnmount() {
    clearInterval(this.time);
  }

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

  handleChange(e) {
    e.preventDefault();
    this.setState({
      city: e.target.value
    });
  }
  render() {
    return (
      <div style={{ padding: '40px' }}>
        <div
          className="container-fluid "
          style={{ backgroundColor: '#2A335E', padding: '0' }}
        >
          <div
            className="container-fluid clearfix "
            style={{ height: '100px' }}
          >
            <div className="tags float-left my-4 h-50 d-inline-block ml-4">
              <h1 className="text-white">{this.state.current}</h1>
            </div>
            <div className="input-form float-right my-4 h-50 mr-1 ">
              <div className="input-group border border-primary rounded-0 input-style">
                <input
                  type="text"
                  className="form-control rounded-0 input-size"
                  onChange={this.handleChange}
                  placeholder="Indore"
                />
                <div className="input-group-append">
                  <Link
                    className="btn btn-primary rounded-0 px-5"
                    role="button"
                    to={`/food/restaurants/${this.state.city}`}
                  >
                    Search
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid" id="hero">
            <div className="position-relative">
              <div className="heading-box position-absolute mt-5">
                <h1 className="heading-primary">
                  <span className="heading-main">Best Restaurants</span>
                  <span className="heading-sub">In your city</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid pt-4">
          <h3>Direct Search</h3>
          {cities.map((city, index) => {
            return (
              <LinkButton
                key={index}
                url={`/food/restaurants/${city}`}
                id={index}
                title={city}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default FoodHome;
