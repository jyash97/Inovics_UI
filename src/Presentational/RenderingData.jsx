import React from 'react';

import Cards from './Cards';
import CardsButtons from './CardsButtons';
import './styles/styleData.css';

class RenderingData extends React.Component {
  render() {
    let dataComponent = [];
    if (this.props.category === 'movies') {
      this.props.data.map(data =>
        dataComponent.push({
          title: data.original_title,
          image: `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
          description: data.overview,
          rating: data.vote_average,
          date: data.release_date,
          poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          id: data.id
        })
      );
    }
    return (
      <div className="container">
        <div className="row py-5">
          {this.props.type === 'cards' ? (
            <Cards category={this.props.category} data={dataComponent} />
          ) : (
            <CardsButtons />
          )}
        </div>
      </div>
    );
  }
}

export default RenderingData;
