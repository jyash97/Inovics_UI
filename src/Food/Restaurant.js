import React, { Component } from 'react';
import NotFound from '../Presentational/NotFound';
import BackButton from '../Presentational/BackButton';
import ImageCard from '../Presentational/ImageCard';
class Restaurant extends Component {
  constructor() {
    super();
    this.state = {
      flag: false,
      city_name: '',
      city_id: '',
      res_array: [],
      data: []
    };
  }
  async componentDidMount() {
    let cityName = this.props.match.params.city;
    const promise = await fetch(
      `https://developers.zomato.com/api/v2.1/cities?q=${cityName}`,
      {
        headers: {
          Accept: 'application/json',
          'user-key': '7289772cf8a7a24afd94d46b6b0d9a1c'
        }
      }
    ).then(r => r.json());

    let { city_id } = this.state;
    let p = promise['location_suggestions'][0];
    if (p === undefined) {
      this.setState({ flag: true });
    } else {
      city_id = p['id'];
      await this.setState({ city_name: p['name'] });

      await this.setState({ city_id: p['id'] });

      const promise2 = await fetch(
        `https://developers.zomato.com/api/v2.1/search?entity_id=${city_id}&entity_type=city`,
        {
          headers: {
            Accept: 'application/json',
            'user-key': '7289772cf8a7a24afd94d46b6b0d9a1c'
          }
        }
      ).then(r => r.json());
      let res_array = promise2['restaurants']
        .filter(elem => {
          return elem['restaurant']['thumb'] !== '';
        })
        .sort((a, b) => {
          if (
            a['restaurant']['user_rating']['aggregate_rating'] >
            b['restaurant']['user_rating']['aggregate_rating']
          )
            return -1;
          else if (
            a['restaurant']['user_rating']['aggregate_rating'] <
            b['restaurant']['user_rating']['aggregate_rating']
          )
            return 1;
          else {
            return 0;
          }
        });
      await this.setState({ res_array });

      let dataComponent = [];
      this.state.res_array.map((data, index) =>
        dataComponent.push({
          id: index,
          title: data['restaurant']['name'],
          image: data['restaurant']['thumb'],
          link: data['restaurant']['menu_url'],
          linktitle: 'Menu',
          description: data['restaurant']['cuisines'],
          time: null
        })
      );
      await this.setState({
        data: dataComponent
      });
    }
  }
  render() {
    let { flag, data, city_name } = this.state;

    return (
      <React.Fragment>
        {flag ? (
          <NotFound />
        ) : (
          <React.Fragment>
            <ImageCard heading={city_name} data={data} number={4} />
            <BackButton
              classes="mx-5 my-3 btn-lg"
              url="/food"
              key={1}
              name="Back to Food Search"
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default Restaurant;
