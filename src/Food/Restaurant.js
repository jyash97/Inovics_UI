import React from 'react';

import NotFound from '../Presentational/NotFound';
import BackButton from '../Presentational/BackButton';
import ImageCard from '../Presentational/ImageCard';

class Restaurant extends React.Component {
  constructor() {
    super();
    this.state = {
      flag: false,
      data: []
    };
    this.extraLinks = this.extraLinks.bind(this);
    this.extraData = this.extraData.bind(this);
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

    let p = promise['location_suggestions'][0];
    if (!p) {
      this.setState({ flag: true });
    } else {
      this.setState({
        city_id: p['id']
      });

      const promise2 = await fetch(
        `https://developers.zomato.com/api/v2.1/search?entity_id=${
          this.state.city_id
        }&entity_type=city`,
        {
          headers: {
            Accept: 'application/json',
            'user-key': '7289772cf8a7a24afd94d46b6b0d9a1c'
          }
        }
      ).then(r => r.json());
      let res_array = promise2['restaurants']
        .filter(elem => elem['restaurant']['featured_image'] !== '')
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

      let dataComponent = [];
      res_array.map((data, index) =>
        dataComponent.push({
          id: index,
          title: data['restaurant']['name'],
          image: data['restaurant']['featured_image'],
          link: data['restaurant']['menu_url'],
          linktitle: 'Menu',
          images: data['restaurant']['photos_url'],
          description: data['restaurant']['location']['address'],
          cuisines: data['restaurant']['cuisines']
        })
      );
      this.setState({
        data: dataComponent
      });
    }
  }

  extraData(data) {
    let array = data.cuisines.split(',');
    return (
      <div className="my-2">
        {array.map(data => (
          <p
            key={data}
            className="border rounded border-primary text-primary text-center d-inline-block p-1 m-1"
          >
            {data}
          </p>
        ))}
      </div>
    );
  }

  extraLinks(data) {
    return (
      <a
        className="btn mx-1 btn-sm btn-primary"
        href={data.images}
        target="_blank"
      >
        Images
      </a>
    );
  }

  render() {
    let { flag, data } = this.state;

    return (
      <React.Fragment>
        {flag ? (
          <NotFound />
        ) : (
          <React.Fragment>
            <BackButton
              classes="mx-5 my-3 btn-lg"
              url="/food"
              key={1}
              name="Back to Food Search"
            />
            <ImageCard
              extraLinks={this.extraLinks}
              extraData={this.extraData}
              heading={this.props.match.params.city}
              data={data}
            />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default Restaurant;
