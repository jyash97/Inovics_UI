import React from 'react';
import Input from '../Presentational/Input';
import Cards from '../Presentational/Cards';
import BackButton from '../Presentational/BackButton';
import cities from './cities.json';

class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleQuery(value) {
    let data = [];
    if (value !== '') {
      data = cities
        .filter(c => c.city.toUpperCase().startsWith(value.toUpperCase()))
        .filter((key, index) => index < 14);
    }
    this.setState({
      data
    });
  }

  handleClick(text) {
    window.location.href = `/weather/${text}`;
  }

  render() {
    let city = [
      'Mumbai',
      'Delhi',
      'Chennai',
      'Hyderabad',
      'Bangalore',
      'Pune',
      'Ahmedabad',
      'Amritsar'
    ];
    let dataCity = [];
    city.map((data, i) =>
      dataCity.push({
        title: city[i],
        image: `${process.env.PUBLIC_URL}/images/cityImg${i}.jpg`,
        id: i
      })
    );

    return (
      <React.Fragment>
        <Input
          category="Weather"
          handleClick={this.handleClick}
          handleQuery={this.handleQuery}
        />
        <div className="mx-5">
          {this.state.data.map((data, i) => (
            <BackButton
              url={`/weather/${data.city}`}
              key={i}
              name={data.city}
            />
          ))}
        </div>
        <Cards number={4} category="weather" data={dataCity} />
        <div className="mx-5">
          <BackButton
            url="/"
            classes="float-left btn-outline-notfound"
            name="Back to Home"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Weather;
