import React from 'react';

import Input from '../Presentational/Input';
import Cards from '../Presentational/Cards';
import BackButton from '../Presentational/BackButton';

class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleQuery(value) {
    if (value !== '') {
      const data = await fetch(
        `http://api.themoviedb.org/3/search/movie?api_key=cc4b67c52acb514bdf4931f7cedfd12b&query=${value}`
      )
        .then(response => response.json())
        .then(data => data.results);
      const filteredData = data
        .filter(data => data.backdrop_path !== null)
        .sort((a, b) => {
          if (a.vote_average > b.vote_average) return -1;
          else if (a.vote_average < b.vote_average) return 1;
          else {
            return 0;
          }
        });
      this.setState({
        data: filteredData
      });
    }
  }

  handleClick(text) {
    this.handleQuery(text);
  }

  async componentDidMount() {
    const data = await fetch(
      'https://api.themoviedb.org/3/discover/movie?api_key=cc4b67c52acb514bdf4931f7cedfd12b&sort_by=popularity.desc'
    )
      .then(response => response.json())
      .then(data => data.results);
    const reducedData = data.filter((key, index) => index < 4);
    this.setState({
      data: reducedData
    });
  }

  render() {
    let dataComponent = [];
    this.state.data.map(data =>
      dataComponent.push({
        title: data.original_title,
        image: `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
        description: data.overview,
        date: data.release_date,
        poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        id: data.id
      })
    );

    return (
      <React.Fragment>
        <Input
          category="Movies"
          handleClick={this.handleClick}
          handleQuery={this.handleQuery}
        />
        <Cards number={4} category="movies" data={dataComponent} />
        <div className="mx-5">
          <BackButton url="/" name="Back to home" />
        </div>
      </React.Fragment>
    );
  }
}

export default Movie;
