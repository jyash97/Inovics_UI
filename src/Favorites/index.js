import React from 'react';
import ImageCard from '../Presentational/ImageCard';
import axios from 'axios';
import Sidebar from '../Sidebar';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      courseData: [],
      jobData: []
    };
    this.handleData = this.handleData.bind(this);
    this.extraData = this.extraData.bind(this);
    this.extraLinks = this.extraLinks.bind(this);
    this.handleFavorites = this.handleFavorites.bind(this);
  }

  async handleData() {}

  extraData() {}
  extraLinks() {}
  handleFavorites() {}

  async componentDidMount() {
    let dataCourses = [];
    let dataJobs = [];
    let courseData = [];
    let jobsData = [];
    await axios
      .get(
        `https://inovics.herokuapp.com/courseFavorites/${
          JSON.parse(localStorage.getItem('userData')).email
        }`
      )
      .then(response => {
        courseData = response.data;
      })
      .catch(err => console.log(err));
    await axios
      .get(
        `https://inovics.herokuapp.com/jobFavorites/${
          JSON.parse(localStorage.getItem('userData')).email
        }`
      )
      .then(response => {
        jobsData = response.data;
      })
      .catch(err => console.log(err));
    courseData.courses.map((data, i) =>
      dataCourses.push({
        title: data.name,
        time: Date(),
        image: '',
        link: data.link,
        linktitle: 'Visit Now',
        id: data._id
      })
    );

    jobsData.jobs.map((data, i) =>
      dataJobs.push({
        title: data.title,
        time: Date(),
        image: '',
        link: data.link,
        linktitle: 'Visit Now',
        id: data._id
      })
    );
    this.setState({
      courseData: dataCourses,
      jobData: dataJobs
    });
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar />
        <div className="container-fluid p-5">
          <div className="row">
            {this.state.courseData.length > 0 ? (
              <ImageCard
                number={4}
                heading="Favorite Courses"
                data={this.state.courseData}
                classes="card-deck p-2"
                extraData={this.extraData}
                extraLinks={this.extraLinks}
                handleFavorites={this.handleFavorites}
              />
            ) : (
              <div className="alert alert-danger w-75 mx-auto">
                No Courses Saved!
              </div>
            )}
            {this.state.jobData.length > 0 ? (
              <ImageCard
                number={4}
                heading="favorite Jobs"
                data={this.state.jobData}
                classes="card-deck p-2"
                extraData={this.extraData}
                extraLinks={this.extraLinks}
                handleFavorites={this.handleFavorites}
              />
            ) : (
              <div className="alert alert-danger w-75 mx-auto">
                No Jobs Saved!
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Favorites;
