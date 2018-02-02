import React from 'react';

import Input from '../Presentational/Input';
import RenderingData from '../Presentational/RenderingData';

class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleQuery = this.handleQuery.bind(this);
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
        .filter(data => data.vote_average > 5)
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

  async componentWillMount() {
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
    return (
      <React.Fragment>
        <Input category="Movies" handleQuery={this.handleQuery} />
        <RenderingData type="cards" category="movies" data={this.state.data} />
      </React.Fragment>
    );
  }
}

export default Movie;
