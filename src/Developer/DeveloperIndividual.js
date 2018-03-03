import React from 'react';
import courses from './courses.json';
import ImageCard from '../Presentational/ImageCard';
import BackButton from '../Presentational/BackButton';
class DeveloperIndividual extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleData = this.handleData.bind(this);
    this.extraData = this.extraData.bind(this);
    this.extraLinks = this.extraLinks.bind(this);
  }

  handleData(title, value) {
    let dataCourses = [];
    let data = courses.filter(data => title === data.course);
    data = data[0].tutorial.filter(data => value === data.price);
    data.map((data, i) =>
      dataCourses.push({
        title: data.title,
        time: Date(),
        link: data.link,
        price: data.price,
        source: data.source,
        linktitle: 'Visit Now',
        id: i
      })
    );
    this.setState({
      data: dataCourses
    });
  }

  componentDidMount() {
    this.handleData(this.props.match.params.id, 'free');
  }

  extraData(data) {
    return (
      <div className="my-2">
        <p className="border rounded border-primary text-primary text-center d-inline-block px-2 m-1 text-capitalize">
          {data.source}
        </p>
        <p className="border rounded border-primary text-primary text-center d-inline-block px-2 m-1 text-capitalize">
          {data.price}
        </p>
      </div>
    );
  }

  extraLinks() {}

  render() {
    return (
      <React.Fragment>
        <div className="mx-5">
          <BackButton
            classes="mx-5 my-3 btn-lg"
            url="/developer"
            key={1}
            name="Back to Courses"
          />

          <div className="form-group w-10 float-right mt-4 border rounded border-primary">
            <select
              className="form-control  text-center text-primary"
              id="exampleFormControlSelect1"
              onChange={event =>
                this.handleData(this.props.match.params.id, event.target.value)
              }
            >
              <option value="free" selected>
                Free
              </option>
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
