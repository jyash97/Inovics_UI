import React from 'react';
import ImageCard from '../Presentational/ImageCard';
import axios from 'axios';

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
    let data = [];
    await axios
      .get(
        `http://localhost:3554/favorites/${
          JSON.parse(localStorage.getItem('userData')).email
        }`
      )
      .then(response => {
        data = response.data;
      })
      .catch(err => console.log(err));
    console.log(data);
    data.courses.map((data, i) =>
      dataCourses.push({
        title: data.name,
        time: Date(),
        image: '',
        link: data.link,
        price: data.price,
        source: data.author,
        linktitle: 'Visit Now',
        id: data._id
      })
    );
    data.jobs.map((data, i) =>
      dataJobs.push({
        title: data.title,
        time: Date(),
        image: '',
        link: data.link,
        salary: data.salary,
        company: data.company,
        linktitle: 'Visit Now',
        id: data._id
      })
    );
    this.setState({
      courseData: dataCourses,
      jobData: dataJobs
    });
    console.log(this.state.data);
  }

  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}
export default Favorites;
