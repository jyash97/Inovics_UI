import React from 'react';
import ImageCard from '../Presentational/ImageCard';
import BackButton from '../Presentational/BackButton';
import axios from 'axios';

class DeveloperIndividual extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      filterData: []
    };
    this.handleData = this.handleData.bind(this);
    this.extraData = this.extraData.bind(this);
    this.extraLinks = this.extraLinks.bind(this);
    this.handleFavorites = this.handleFavorites.bind(this);
  }

  async handleData() {
    let dataCourses = [];
    let data = [];
    const language = this.props.match.params.id.toLowerCase();
    await axios
      .get(`http://localhost:3554/courses/${language}`)
      .then(response => {
        data = response.data;
      })
      .catch(err => console.log(err));
    data.map((data, i) =>
      dataCourses.push({
        title: data.name,
        time: Date(),
        image: '',
        link: data.link,
        price: data.price,
        source: data.author,
        linktitle: 'Visit Now',
        id: data._id,
        user: data.user
      })
    );
    this.setState({
      data: dataCourses,
      allData: dataCourses
    });
    console.log(this.state.data);
  }

  async handleFavorites(data) {
    const language = this.props.match.params.id.toLowerCase();
    await axios
      .post(`http://localhost:3554/courses/${language}/${data.id}`, {
        email: JSON.parse(localStorage.getItem('userData')).email,
        user_id: JSON.parse(localStorage.getItem('userData')).id
      })
      .then(async res => {
        console.log(res);
      });
  }

  async handleDelete(data) {
    await axios
      .post('http://localhost:3554/delete/courses', {
        course_id: data.id
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
          {data.price}
        </p>
      </div>
    );
  }

  handleFilter(value) {
    if (value !== 'all') {
      const FilteredData = this.state.allData.filter(
        data => data.price.toLowerCase() === value
      );
      this.setState({
        data: FilteredData
      });
    } else {
      this.setState({
        data: this.state.allData
      });
    }
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
            Delete Course
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
            url="/developer"
            key={1}
            name="Back to Courses"
          />

          <div className="form-group w-10 float-right mt-4 border rounded border-primary">
            <select
              className="form-control  text-center text-primary"
              id="exampleFormControlSelect1"
              onChange={event => this.handleFilter(event.target.value)}
            >
              {' '}
              <option value="all">All</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
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
export default DeveloperIndividual;
