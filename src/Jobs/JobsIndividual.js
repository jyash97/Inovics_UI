import React from 'react';
import axios from 'axios';

import ImageCard from '../Presentational/ImageCard';
import BackButton from '../Presentational/BackButton';
import Warning from '../Presentational/Warning';

class JobsIndividual extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleData = this.handleData.bind(this);
    this.extraData = this.extraData.bind(this);
    this.extraLinks = this.extraLinks.bind(this);
    this.fetchUserFavorites = this.fetchUserFavorites.bind(this);
  }

  async handleData() {
    let dataJobs = [];
    let data = [];
    let tag = this.props.match.params.id.toLowerCase();
    await axios
      .get(`https://inovics.herokuapp.com/jobs/${tag}`)
      .then(response => {
        data = response.data;
      })
      .catch(err => console.log(err));
    data.map((data, i) =>
      dataJobs.push({
        title: data.title,
        time: Date(),
        image: '',
        link: data.link,
        price: data.salary,
        source: data.company,
        linktitle: 'Visit Now',
        id: data._id,
        salary: data.salary,
        user: data.user
      })
    );
    this.setState({
      data: dataJobs
    });
  }

  async handleFavorites(data) {
    const tag = this.props.match.params.id.toLowerCase();
    await axios
      .post(`https://inovics.herokuapp.com/jobs/${tag}/${data.id}`, {
        email: JSON.parse(localStorage.getItem('userData')).email,
        user_id: JSON.parse(localStorage.getItem('userData')).id
      })
      .then(res => {
        this.fetchUserFavorites();
      });
  }

  async handleDelete(data) {
    await axios
      .post('https://inovics.herokuapp.com/delete/jobs', {
        job_id: data.id
      })
      .then(res => {
        if (res.data === null) {
          this.setState({
            data: []
          });
        } else {
          const dataJobs = [];
          res.data.map((data, i) =>
            dataJobs.push({
              title: data.title,
              time: Date(),
              image: '',
              link: data.link,
              price: data.salary,
              source: data.company,
              linktitle: 'Visit Now',
              id: data._id,
              salary: data.salary,
              user: data.user
            })
          );
          this.setState({
            data: dataJobs
          });
        }
      });
  }

  async fetchUserFavorites() {
    await axios
      .get(
        `https://inovics.herokuapp.com/jobFavorites/${
          JSON.parse(localStorage.getItem('userData')).email
        }`
      )
      .then(response => {
        this.setState({
          favorites: response.data
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.handleData();
    this.fetchUserFavorites();
  }

  extraData(data) {
    return (
      <div className="my-2">
        <p className="border rounded btn-sm px-2 border-muted bg-light text-muted text-center d-inline-block m-1 text-capitalize">
          {data.source}
        </p>
        <p className="border rounded btn-sm px-2 border-muted bg-light text-muted text-center d-inline-block m-1 text-capitalize">
          {data.salary}
        </p>
      </div>
    );
  }

  extraLinks(data) {
    let isadd = false;
    if (this.state.favorites) {
      const specifiedJob = this.state.favorites.jobs.filter(
        job => job._id === data.id
      );
      isadd = specifiedJob.length > 0 ? true : false;
    }
    return (
      <span>
        <button
          className={`btn btn-sm btn-primary ml-1 ${
            isadd ? 'btn-danger' : 'btn-success'
          }`}
          onClick={() => this.handleFavorites(data)}
        >
          {isadd ? 'Remove Favorite' : 'Add Favorite'}
        </button>
        {data.user === JSON.parse(localStorage.getItem('userData')).email ? (
          <button
            className="btn btn-sm btn-info ml-1"
            onClick={() => this.handleDelete(data)}
          >
            Delete Course
          </button>
        ) : null}
      </span>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="mx-5">
          <BackButton
            classes="mx-5 my-3"
            url="/jobs"
            key={1}
            name="Back to Jobs"
          />
        </div>
        {this.state.data.length > 0 ? (
          <ImageCard
            number={4}
            heading={`${this.props.match.params.id} Jobs`}
            data={this.state.data}
            extraData={this.extraData}
            extraLinks={this.extraLinks}
          />
        ) : (
          <Warning msg={`No jobs found for ${this.props.match.params.id}`} />
        )}
      </React.Fragment>
    );
  }
}
export default JobsIndividual;
