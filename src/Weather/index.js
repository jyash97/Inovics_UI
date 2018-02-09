import React from 'react';
import Input from '../Presentational/Input';
import Cards from '../Presentational/Cards';
import BackButton from '../Presentational/BackButton';
import cities from './cities.json';
const city = cities;
class Weather extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleQuery(value) {
    var data = city
      .filter(c => c.city.toUpperCase().includes(value.toUpperCase()))
      .filter((key, index) => index < 8);
    this.setState({
      data
    });
  }

  async handleClick(text) {
    this.handleQuery(text);
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
        <div className="ml-5 mb-3">
          {this.state.data
            ? this.state.data.map((data, i) => (
                <BackButton
                  url={`/weather/${data.city}`}
                  key={i}
                  name={data.city}
                />
              ))
            : null}
        </div>
        <Cards number={4} category="weather" data={dataCity} />
      </React.Fragment>
    );
  }
}

export default Weather;
