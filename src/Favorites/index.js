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
        `http://localhost:3554/courseFavorites/${
          JSON.parse(localStorage.getItem('userData')).email
        }`
      )
      .then(response => {
        courseData = response.data;
      })
      .catch(err => console.log(err));
    await axios
      .get(
        `http://localhost:3554/jobFavorites/${
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
        <div className="container-fluid">
          <div className="row">
            <ImageCard
              number={4}
              heading="Favorite Courses"
              data={this.state.courseData}
              extraData={this.extraData}
              extraLinks={this.extraLinks}
              handleFavorites={this.handleFavorites}
            />
            <ImageCard
              number={4}
              heading="favorite Jobs"
              data={this.state.jobData}
              extraData={this.extraData}
              extraLinks={this.extraLinks}
              handleFavorites={this.handleFavorites}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Favorites;
