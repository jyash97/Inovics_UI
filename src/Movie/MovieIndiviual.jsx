import React from 'react';

import IndiviualData from '../Presentational/IndiviualData';
import LinkButton from '../Presentational/LinkButton';
import BackButton from '../Presentational/BackButton';

class MovieIndiviual extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      mount: false,
      extradata: []
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.handleSimilarMovie = this.handleSimilarMovie.bind(this);
  }

  componentWillUnmount() {
    this.setState({
      mount: false
    });
  }

  async handleSimilarMovie(id) {
    if (id) {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?page=1&language=en-US&api_key=cc4b67c52acb514bdf4931f7cedfd12b`
      )
        .then(response => response.json())
        .then(data => data.results);
      const filteredData = data
        .filter((data, index) => index < 4)
        .filter(data => data.backdrop_path !== null)
        .sort((a, b) => {
          if (a.vote_average > b.vote_average) return -1;
          else if (a.vote_average < b.vote_average) return 1;
          else {
            return 0;
          }
        });
      const finalData = [];
      filteredData.map(data =>
        finalData.push({
          title: data.original_title,
          image: `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
          description: data.overview,
          rating: data.vote_average,
          date: data.release_date,
          poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          id: data.id
        })
      );

      this.setState({
        extradata: finalData
      });
    }
  }

  async handleLoad(data) {
    const dataloaded = await fetch(
      `http://api.themoviedb.org/3/search/movie?api_key=cc4b67c52acb514bdf4931f7cedfd12b&query=${data}`
    )
      .then(response => response.json())
      .then(data => data.results);
    const dataMovie = {
      title: dataloaded[0].original_title,
      image: `https://image.tmdb.org/t/p/w1280${dataloaded[0].backdrop_path}`,
      id: dataloaded[0].id,
      description: dataloaded[0].overview,
      date: dataloaded[0].release_date,
      poster: `https://image.tmdb.org/t/p/w500${dataloaded[0].poster_path}`
    };

    this.setState(
      {
        data: dataMovie
      },
      () => this.handleSimilarMovie(this.state.data.id)
    );
  }

  componentDidMount() {
    this.handleLoad(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.handleLoad(nextProps.match.params.id);
  }

  renderButtons() {
    return (
      <React.Fragment>
        <h6 className="text-dark">Recommendations</h6>
        {this.state.extradata.map(data => (
          <LinkButton
            url={`/movies/${data.title}`}
            key={data.id}
            title={data.title}
          />
        ))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <IndiviualData
          data={this.state.data}
          extraRender={this.renderButtons}
          renderBack={() => <BackButton url="/movies" name="back to movies" />}
        />
      </React.Fragment>
    );
  }
}

export default MovieIndiviual;
