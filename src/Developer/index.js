import React from 'react';
import Input from '../Presentational/Input';
import BackButton from '../Presentational/BackButton';
import Modal from '../Presentational/Modal';
import axios from 'axios';

class Developer extends React.Component {
  constructor() {
    super();
    this.state = {
      data: ['React', 'Html', 'Javascript', 'CSS', 'Ruby', 'MongoDB', 'Node'],
      filter: ['React', 'Html', 'Javascript', 'CSS', 'Ruby', 'MongoDB', 'Node'],
      showModal: false,
      language: '',
      author: '',
      name: '',
      created: '',
      link: '',
      price: 'free'
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleQuery(value) {
    let course = [];
    if (value !== '') {
      course = this.state.data.filter(c =>
        c.toUpperCase().startsWith(value.toUpperCase())
      );
      this.setState({
        filter: course
      });
    } else {
      this.setState({
        filter: this.state.data
      });
    }
  }

  handleClick(text) {}

  handleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  handleChange(event) {
    console.log(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSave() {
    if (
      this.state.title === '' &&
      this.state.language === '' &&
      this.state.author === ''
    ) {
      alert('Please fill all details');
    } else {
      axios
        .post(
          'http://localhost:3554/create/courses',
          {
            language: this.state.language,
            author: this.state.author,
            link: this.state.link,
            name: this.state.name,
            price: this.state.price
          },
          {
            headers: { 'Access-Control-Allow-Origin': '*' },
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Input
          category="Course"
          handleClick={this.handleClick}
          handleQuery={this.handleQuery}
        />
        <div className="p-2 px-5 mx-5">
          <h4 className="text-uppercase text-dark font-weight-normal">
            All Languages
          </h4>
          {this.state.filter.map(data => (
            <BackButton url={`/developer/${data}`} key={data} name={data} />
          ))}
        </div>
        <div className="mx-3 my-3">
          <BackButton
            url="/"
            classes="float-left btn-outline-notfound"
            name="Back to Home"
          />
          <button
            className="btn btn-outline-success text-capitalize m-1"
            onClick={this.handleModal}
          >
            Add Courses
          </button>
        </div>
        <Modal isOpen={this.state.showModal} handleModal={this.handleModal}>
          <div className="form-container p-2">
            <label htmlFor="course">Title</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Enter Course Title"
              value={this.state.name}
              name="name"
            />
            <label htmlFor="author">Author</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Enter Course Author"
              value={this.state.author}
              name="author"
            />
            <label htmlFor="language">Language</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Enter Course language"
              value={this.state.language}
              name="language"
            />
            <label htmlFor="created">Created on</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Enter Course Release Date"
              value={this.state.created}
              name="created"
            />
            <label htmlFor="Link">Link</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Enter Course Link"
              value={this.state.link}
              name="link"
            />
            <label htmlFor="course">Price</label>
            <select
              name="price"
              className="form-control  text-center text-primary"
              id="exampleFormControlSelect1"
              onChange={this.handleChange}
              value={this.state.price}
            >
              {' '}
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <button
            className="btn btn-sm rounded-0 btn-danger"
            onClick={this.handleModal}
          >
            Close
          </button>
          <button
            className="btn btn-sm rounded-0 btn-success mx-2"
            onClick={this.handleSave}
          >
            Save Course
          </button>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Developer;
