import React from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AvatarEditor from 'react-avatar-editor';

import Errors from '../Presentational/Errors';

import './styles/reset.css';

class Reset extends React.Component {
  constructor() {
    super();
    this.state = {
      otp: ''
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
    // if (this.state.email !== '') {
    //   const email = JSON.parse(localStorage.getItem('userData')).email;
    //   await axios
    //     .post(`http://localhost:3554/otp/verify/${email}`, {
    //       email: this.state.otp
    //     })
    //     .then(res => {
    //       if (res.data.error) {
    //         this.setState({
    //           error: true,
    //           message: res.data.message
    //         });
    //       } else {
    //         localStorage.removeItem('userData');
    //         localStorage.setItem(
    //           'userData',
    //           JSON.stringify({
    //             name: res.data.name,
    //             email: res.data.email,
    //             image: res.data.image,
    //             isVerified: res.data.isVerified
    //           })
    //         );
    //       }
    //     })
    //     .catch(err =>
    //       this.setState({
    //         error: true,
    //         message: ['Something went wrong with the Server']
    //       })
    //     );
    // } else {
    //   const errors = [];
    //   if (this.state.otp === '') {
    //     errors.push('Please enter the OTP');
    //   }
    //   this.setState({
    //     error: true,
    //     message: errors
    //   });
    // }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 align-middle mx-auto text-center px-5 py-4 form-group otp-form">
              <img
                className="align-middle"
                src={`${process.env.PUBLIC_URL}/images/reset.png`}
                alt="Reset Email for Users"
              />
              {this.state.error ? (
                <Errors errors={this.state.messages} />
              ) : null}
              <input
                type="email"
                name="otp"
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
