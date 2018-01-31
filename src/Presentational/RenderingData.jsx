import React from 'react';
import { Link } from 'react-router-dom';

import './styles/styleData.css';

class RenderingData extends React.Component {
  render() {
    let dataComponent = [];
    if (this.props.category === 'movie') {
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
          {dataComponent.map((data, index) => (
            <React.Fragment key={`${data.id}`}>
              <Link
                to={{ pathname: `/movies/${data.title}`, query: data }}
                style={{
                  textDecoration: 'none',
                  backgroundImage: `linear-gradient(to bottom, rgba(168,218,220,0.2), rgba(1,22,39,.2)),url(${
                    data.image
                  })`
                }}
                key={data.id}
                className="col p-5 presentational text-capitalize text-center rounded m-2"
              >
                <h2 className="p-2">{data.title}</h2>
              </Link>
              {(index + 1) % 4 === 0 ? <div className="w-100" /> : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default RenderingData;
