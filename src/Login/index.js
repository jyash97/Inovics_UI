import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './styles/login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: false,
      message: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleLogin() {
    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmail = email.test(String(this.state.email).toLowerCase());
    if (isEmail && this.state.password) {
      await axios
        .post('https://inovics.herokuapp.com/login', {
          email: this.state.email,
          password: this.state.password
        })
        .then(async res => {
          if (res.data.error) {
            this.setState({
              error: true,
              message: [res.data.message]
            });
          } else {
            await axios
              .post('https://inovics.herokuapp.com/islogin', {
                email: this.state.email
              })
              .then(res => {
                console.log(res);
                if (res.data.isVerified) {
                  localStorage.setItem('userData', JSON.stringify(res.data));
                  window.location.href = '/';
                } else {
                  localStorage.setItem(
                    'userData',
                    JSON.stringify({
                      email: res.data.email,
                      image: res.data.image,
                      isVerified: res.data.isVerified
                    })
                  );
                  window.location.href = '/otp';
                }
              })
              .catch(err =>
                this.setState({
                  error: true,
                  message: ['Something went wrong with the server']
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
      this.setState({
        error: true,
        message: ['Please fill the details Properly']
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid loginContainer">
          <div className="row my-5 py-5">
            <div className="col-md-6 login-image p-5 text-center">
              <img
                className="align-middle"
                src={`${process.env.PUBLIC_URL}/images/Login.png`}
                alt="Registration for Users"
              />
            </div>
            <div className="col-md-6 p-5 my-5 form-group login-form">
              <h4 className="heading">Welcome to Inovics Login</h4>
              {this.state.error ? (
                <div className="alert text-center">{this.state.message}</div>
              ) : (
                <div className="noalert" />
              )}
              <input
                type="email"
                name="email"
                className="form-control mt-4"
                value={this.state.email}
                placeholder="Email"
                onChange={this.handleChange}
              />
              <input
                type="password"
                name="password"
                className="form-control"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleChange}
              />
              <button
                className="btn text-capitalize"
                onClick={this.handleLogin}
              >
                Login
              </button>
              <Link to="/register" className="btn link">
                Register
              </Link>
              <Link
                to="/reset"
                className="btn btn-sm btn-outline-primary reset"
              >
                Reset Password
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
