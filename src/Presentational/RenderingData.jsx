import React from 'react';
import './styles/styleData.css';

class RenderingData extends React.Component {
  render() {
    let dataComponent = [];
    if (this.props.category === 'movie') {
      this.props.data.map(data =>
        dataComponent.push({
          title: data.original_title,
          image: `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
          id: data.id
        })
      );
    }
    return (
      <div className="container">
        <div className="row py-5">
          {dataComponent.map(data => (
            <div
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(168,218,220,0.2), rgba(1,22,39,.2)),url(${
                  data.image
                })`
              }}
              key={data.id}
              className="col p-5 presentational text-capitalize text-center rounded m-2"
            >
              <h2 className="p-2">{data.title}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RenderingData;
