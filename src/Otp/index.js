import React from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AvatarEditor from 'react-avatar-editor';

import './styles/otp.css';

class Otp extends React.Component {
  constructor() {
    super();
    this.state = {
      otp: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOtp = this.handleOtp.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleLogout() {
    localStorage.removeItem('userData');
    window.location.href = '/login';
  }

  async handleOtp() {
    if (this.state.otp !== '') {
      const email = JSON.parse(localStorage.getItem('userData')).email;
      await axios
        .post(`http://localhost:3554/otp/verify/${email}`, {
          otp: this.state.otp
        })
        .then(res => {
          if (res.data.error) {
            this.setState({
              error: true,
              message: res.data.message
            });
          } else {
            localStorage.removeItem('userData');
            localStorage.setItem(
              'userData',
              JSON.stringify({
                name: res.data.name,
                email: res.data.email,
                image: res.data.image,
                isVerified: res.data.isVerified
              })
            );
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
      if (this.state.otp === '') {
        errors.push('Please enter the OTP');
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
            <div className="col-md-6 align-middle mx-auto text-center px-5 py-4 form-group otp-form">
              <img
                className="align-middle"
                src={`${process.env.PUBLIC_URL}/images/otp.png`}
                alt="Otp Verification for Users"
              />
              {this.state.error
                ? this.state.message.map(msg => (
                    <div className="text-center alert mx-auto" key="msg">
                      {msg}
                    </div>
                  ))
                : null}
              <input
                type="number"
                name="otp"
                className="form-control mx-auto"
                value={this.state.otp}
                placeholder="Enter OTP"
                onChange={this.handleChange}
              />
              <button className="btn" onClick={this.handleOtp}>
                Verify
              </button>
              <button onClick={this.handleLogout} className="btn mx-auto link">
                Logout
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Otp;
