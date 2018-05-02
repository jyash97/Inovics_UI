import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Errors from '../Presentational/Errors';
import Notifications from '../Presentational/Notifications';

import './styles/reset.css';

class Reset extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      message: [],
      error: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleReset() {
    if (this.state.email) {
      await axios
        .post('https://inovics.herokuapp.com/reset', {
          email: this.state.email
        })
        .then(res => {
          if (res.data.error) {
            this.setState({
              error: true,
              message: res.data.message
            });
          } else {
            this.setState({
              error: false,
              message: res.data.message
            });
          }
        })
        .catch(err =>
          this.setState({
            error: true,
            message: ['Something went wrong with the Server']
          })
        );
    } else {
      const errors = [];
      if (!this.state.email) {
        errors.push('Please enter the Email');
      }
      this.setState({
        error: true,
        message: errors
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 align-middle mx-auto text-center px-5 py-4 form-group reset-form">
              {this.state.error ? (
                <Errors errors={this.state.message} />
              ) : (
                <Notifications notifications={this.state.message} />
              )}

              <img
                className="align-middle"
                src={`${process.env.PUBLIC_URL}/images/reset.png`}
                alt="Reset Email for Users"
              />
              <input
                type="email"
                name="email"
                className="form-control mx-auto"
                value={this.state.email}
                placeholder="Enter Email"
                onChange={this.handleChange}
              />
              <button className="btn" onClick={this.handleReset}>
                Reset
              </button>
              <Link
                to="/login"
                className="btn btn-sm btn-outline-primary link mx-auto"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Reset;
