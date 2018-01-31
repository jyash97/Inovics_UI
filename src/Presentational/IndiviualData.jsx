import React from 'react';
import { Link } from 'react-router-dom';

import './styles/styleIndiviual.css';

class IndiviualData extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleMovie = this.handleMovie.bind(this);
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
      description: data[0].overview,
      date: data[0].release_date,
      poster: `https://image.tmdb.org/t/p/w500${data[0].poster_path}`
    };
    this.setState({
      data: dataMovie
    });
  }

  componentDidMount() {
    if (this.props.location.query === undefined) {
      switch (this.props.match.params.component) {
        case 'movies':
          this.handleMovie();
          break;
        default:
          break;
      }
    } else {
      this.setState({
        data: this.props.location.query
      });
    }
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
          <div className="float-left border-primary indiviual-image">
            <img src={this.state.data.poster} alt="" />
          </div>
          <div className="float-right indiviual-content">
            <h1 className="font-weight-light text-primary">
              {this.state.data.title}
            </h1>
            <h5 className="font-weight-light text-muted">
              {this.state.data.date}
            </h5>
            <p>{this.state.data.description}</p>
            <Link to={`/${this.props.match.params.component}`}>
              <button className="btn btn-outline-primary">
                Back to Movies
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default IndiviualData;
