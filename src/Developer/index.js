import React from 'react';
import Input from '../Presentational/Input';
import Cards from '../Presentational/Cards';
import BackButton from '../Presentational/BackButton';
import courses from './courses.json';
class Developer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleQuery(value) {
    let data = [];
    if (value !== '') {
      data = courses
        .filter(c => c.course.toUpperCase().startsWith(value.toUpperCase()))
        .filter((key, index) => index < 14);
    }
    this.setState({
      data
    });
  }

  handleClick(text) {
    window.location.href = `/developer/${text}`;
  }

  render() {
    let course = ['React', 'Javascript', 'Node.js', 'MongoDB'];
    let dataCourses = [];
    course.map((data, i) =>
      dataCourses.push({
        title: course[i],
        image: `${process.env.PUBLIC_URL}/images/developerImg${i}.png`,
        id: i
      })
    );

    return (
      <React.Fragment>
        <Input
          category="Course"
          handleClick={this.handleClick}
          handleQuery={this.handleQuery}
        />
        <div className="mx-5">
          {this.state.data.map((data, i) => (
            <BackButton
              url={`/developer/${data.course}`}
              key={i}
              name={data.course}
            />
          ))}
        </div>
        <Cards number={4} category="developer" data={dataCourses} />
        <div className="mx-5">
          <BackButton
            url="/"
            classes="float-left btn-outline-notfound"
            name="Back to Home"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Developer;
