import React from 'react';
import ImageCard from '../Presentational/ImageCard';
import BackButton from '../Presentational/BackButton';
import axios from 'axios';

class JobsIndividual extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleData = this.handleData.bind(this);
    this.extraData = this.extraData.bind(this);
    this.extraLinks = this.extraLinks.bind(this);
  }

  async handleData() {
    let dataJobs = [];
    let data = [];
    let tag = this.props.match.params.id.toLowerCase();
    await axios
      .get(`http://localhost:3554/jobs/${tag}`)
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
    console.log(dataJobs);
  }

  async handleFavorites(data) {
    const tag = this.props.match.params.id.toLowerCase();
    await axios
      .post(`http://localhost:3554/jobs/${tag}/${data.id}`, {
        email: JSON.parse(localStorage.getItem('userData')).email,
        user_id: JSON.parse(localStorage.getItem('userData')).id
      })
      .then(async res => {
        console.log(res);
      });
  }

  async handleDelete(data) {
    await axios
      .post('http://localhost:3554/delete/jobs', {
        job_id: data.id
      })
      .then(async res => {
        console.log(res);
      });
  }

  componentDidMount() {
    this.handleData();
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
    return (
      <span>
        <button
          className="btn btn-sm btn-primary ml-1"
          onClick={() => this.handleFavorites(data)}
        >
          Add To Favorites
        </button>
        {data.user === JSON.parse(localStorage.getItem('userData')).email ? (
          <button
            className="btn btn-sm btn-primary ml-1"
            onClick={() => this.handleDelete(data)}
          >
            Delete Job
          </button>
        ) : (
          ''
        )}
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
        <ImageCard
          number={4}
          heading={this.props.match.params.id}
          data={this.state.data}
          extraData={this.extraData}
          extraLinks={this.extraLinks}
        />
      </React.Fragment>
    );
  }
}
export default JobsIndividual;
