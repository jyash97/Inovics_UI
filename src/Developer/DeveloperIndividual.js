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

  handleData(title) {
    let dataCourses = [];
    const data = courses.filter(data => title === data.course);
    data[0].tutorial.map((data, i) =>
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
    this.handleData(this.props.match.params.id);
  }

  extraData(data) {
    return (
      <div className="my-2">
        <p
          key={data}
          className="border rounded border-primary text-primary text-center d-inline-block px-2 m-1 text-capitalize"
        >
          {data.source}
        </p>
        <p
          key={data}
          className="border rounded border-primary text-primary text-center d-inline-block px-2 m-1 text-capitalize"
        >
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
