import React from 'react';
import { Link } from 'react-router-dom';

import CardsButtons from './CardsButtons';
import './styles/styleIndiviual.css';

class IndiviualData extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      extradata: [],
      extra: false
    };
    this.handleMovie = this.handleMovie.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleExtraData = this.handleExtraData.bind(this);
    this.handleSimilarMovie = this.handleSimilarMovie.bind(this);
  }

  handleExtraData(value) {
    this.handleSimilarMovie(value.id);
  }

  async handleSimilarMovie(id) {
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
      extra: true,
      extradata: finalData
    });
  }

  async handleMovie() {
    const data = await fetch(
      `http://api.themoviedb.org/3/search/movie?api_key=cc4b67c52acb514bdf4931f7cedfd12b&query=${
        this.props.match.params.id
      }`
    )
      .then(response => response.json())
      .then(data => data.results);
    const dataMovie = {
      title: data[0].original_title,
      image: `https://image.tmdb.org/t/p/w1280${data[0].backdrop_path}`,
      id: data[0].id,
      description: data[0].overview,
      date: data[0].release_date,
      poster: `https://image.tmdb.org/t/p/w500${data[0].poster_path}`
    };
    this.setState(
      {
        data: dataMovie
      },
      () => this.handleExtraData(this.state.data)
    );
  }

  handleLoad(data) {
    if (data.location.query === undefined) {
      switch (data.match.params.component) {
        case 'movies':
          this.handleMovie();
          break;
        default:
          break;
      }
    } else {
      this.setState(
        {
          data: data.location.query
        },
        () => this.handleExtraData(this.state.data)
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    this.handleLoad(nextProps);
  }

  componentDidMount() {
    this.handleLoad(this.props);
  }

  render() {
    return (
      <div
        className="fluid-container  indiviual-container my-0"
        style={{
          backgroundImage: `linear-gradient(to right,rgba(168,218,220,0.25), rgba(238,249,237,.2)),url(${
            this.state.data.image
          })`
        }}
      >
        <div className="content m-0">
          <div className="float-left indiviual-image">
            <img className="align-middle" src={this.state.data.poster} alt="" />
          </div>
          <div className="float-right border-primary indiviual-content">
            <h1 className="font-weight-light text-primary">
              {this.state.data.title}
            </h1>
            <h5 className="font-weight-light text-muted">
              {this.state.data.date}
            </h5>
            <p>{this.state.data.description}</p>
            {this.state.extra ? (
              <React.Fragment>
                <h6 className="text-dark">Recommendations</h6>
                <CardsButtons
                  category={this.props.match.params.component}
                  data={this.state.extradata}
                />
              </React.Fragment>
            ) : null}
            <Link to={`/${this.props.match.params.component}`}>
              <button className="btn btn-outline-primary my-2 text-capitalize">
                Back to {this.props.match.params.component}
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default IndiviualData;
