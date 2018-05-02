import React from 'react';
import Input from '../Presentational/Input';
import BackButton from '../Presentational/BackButton';
import Modal from '../Presentational/Modal';
import axios from 'axios';

class Jobs extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [
        'Network Administrator',
        'Graphic Designer',
        'Database Developer',
        'Backend',
        'Frontend'
      ],
      filter: [
        'Network Administrator',
        'Graphic Designer',
        'Database Developer',
        'Backend',
        'Frontend'
      ],
      showModal: false,
      tags: '',
      company: '',
      link: '',
      title: '',
      salary: ''
    };
    this.handleQuery = this.handleQuery.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleQuery(value) {
    let jobs = [];
    if (value !== '') {
      jobs = this.state.data.filter(j =>
        j.toUpperCase().startsWith(value.toUpperCase())
      );
      this.setState({
        filter: jobs
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
    const tags = this.state.tags.toLowerCase().split();
    const salary = this.state.salary;
    const company = this.state.company.toLowerCase();
    const link = this.state.link.toLowerCase();
    const title = this.state.title.toLowerCase();
    const user = JSON.parse(localStorage.getItem('userData')).email;

    if (
      this.state.tags === '' ||
      this.state.company === '' ||
      this.state.title === ''
    ) {
      alert('Please fill all details');
    } else {
      await axios
        .post('https://inovics.herokuapp.com/create/jobs', {
          tags,
          company,
          link,
          salary,
          title,
          user
        })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
      this.setState({
        tags: '',
        company: '',
        link: '',
        title: '',
        salary: ''
      });
      this.handleModal();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Input
          category="Jobs"
          handleClick={this.handleClick}
          handleQuery={this.handleQuery}
        />
        <div className="p-2 px-5 mx-5">
          <h4 className="text-uppercase text-dark font-weight-normal">
            All Job Categories
          </h4>
          {this.state.filter.map(data => (
            <BackButton url={`/jobs/${data}`} key={data} name={data} />
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
            Add Job
          </button>
        </div>
        <Modal isOpen={this.state.showModal} handleModal={this.handleModal}>
          <div className="form-container p-2">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Enter Job Title"
              value={this.state.title}
              name="title"
            />
            <label htmlFor="company">Company</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Enter Company"
              value={this.state.company}
              name="company"
            />
            <label htmlFor="language">Job Categories</label>
            <select
              type="text"
              onChange={this.handleChange}
              value={this.state.tags}
              className="form-control  text-center text-primary"
              name="tags"
            >
              <option>Select Job category</option>
              {this.state.data.map((d, i) => (
                <option value={d} key={i}>
                  {d}
                </option>
              ))}
            </select>
            <label htmlFor="Link">Link</label>
            <input
              type="text"
              onChange={this.handleChange}
              placeholder="Enter Job Link"
              value={this.state.link}
              name="link"
            />
            <label htmlFor="course">Salary</label>
            <input
              type="number"
              onChange={this.handleChange}
              placeholder="Enter Salary"
              value={this.state.salary}
              name="salary"
            />
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
            Save Job
          </button>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Jobs;
