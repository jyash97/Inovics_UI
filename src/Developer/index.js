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
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSave() {
    const language = this.state.language.toLowerCase();
    const author = this.state.author.toLowerCase();
    const name = this.state.name.toLowerCase();
    const link = this.state.link.toLowerCase();
    const user = JSON.parse(localStorage.getItem('userData')).email;

    if (
      this.state.name === '' &&
      this.state.language === '' &&
      this.state.author === ''
    ) {
      alert('Please fill all details');
    } else {
      await axios
        .post('https://inovics.herokuapp.com/create/courses', {
          language,
          author,
          link,
          name,
          price: this.state.price,
          user
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
      this.setState({
        language: '',
        author: '',
        link: '',
        name: '',
        price: ''
      });
      this.handleModal();
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
