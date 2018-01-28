import React from 'react';

import Input from '../Presentational/Input';
import RenderingData from '../Presentational/RenderingData';

class Movie extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
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
        <Input />
        <RenderingData category="movie" data={this.state.data} />
      </React.Fragment>
    );
  }
}

export default Movie;
