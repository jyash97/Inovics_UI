import React from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AvatarEditor from 'react-avatar-editor';

import './styles/register.css';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isImage: false,
      image: '',
      error: false,
      message: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.setEditorRef = this.setEditorRef.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleDrop(a) {
    this.setState({
      image: a[0].preview,
      isImage: true
    });
  }

  async handleRegister() {
    let canvasScaled = '';
    if (this.state.isImage) {
      canvasScaled = this.editor.getImageScaledToCanvas().toDataURL();
    }
    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isEmail = email.test(String(this.state.email).toLowerCase());
    if (
      isEmail &&
      this.state.name !== '' &&
      this.state.password !== '' &&
      this.state.password === this.state.confirmPassword
    ) {
      await axios
        .post('http://localhost:3554/register', {
          email: this.state.email,
          name: this.state.name,
          image: canvasScaled,
          password: this.state.password,
          'password-confirm': this.state.confirmPassword
        })
        .then(res => {
          if (res.data.error) {
            this.setState({
              error: true,
              message: res.data.message
            });
          } else {
            window.location.href = '/login';
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
      if (this.state.name === '') {
        errors.push('Please enter the name');
      }
      if (this.state.password === '') {
        errors.push('Please enter the Password');
      }
      if (this.state.password !== this.state.confirmPassword) {
        errors.push('Password do not match');
      }
      this.setState({
        error: true,
        message: errors
      });
    }
  }

  setEditorRef(editor) {
    this.editor = editor;
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row my-5 py-5">
            <div className="col-md-6 p-5 align-middle form-group register-form">
              <h3 className="heading">Get started with Inovics Application!</h3>
              {this.state.error
                ? this.state.message.map(msg => (
                    <div className="text-center alert" key="msg">
                      {msg}
                    </div>
                  ))
                : null}
              <input
                type="text"
                name="name"
                className="form-control"
                value={this.state.name}
                placeholder="Full Name"
                onChange={this.handleChange}
              />
              <input
                type="email"
                name="email"
                className="form-control"
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
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={this.state.confirmPassword}
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
              {this.state.image ? (
                <div style={{ visibility: 'hidden', display: 'none' }}>
                  <AvatarEditor
                    ref={this.setEditorRef}
                    image={this.state.image}
                    border={50}
                    width={300}
                    height={300}
                    borderRadius={50}
                    color={[255, 255, 255, 1]} // RGBA
                    rotate={0}
                  />
                </div>
              ) : null}
              <Dropzone
                className="btn droparea"
                activeClassName="activearea"
                rejectClassName="rejectedarea"
                accept="image/*"
                onDrop={(accepted, rejected) =>
                  this.handleDrop(accepted, rejected)
                }
              >
                {this.state.isImage ? 'Image Uploaded' : 'Upload Image'}
              </Dropzone>
              <button className="btn" onClick={this.handleRegister}>
                Register
              </button>
              <Link to="/login" className="btn link">
                Login
              </Link>
            </div>
            <div className="col-md-6 register-image p-5 text-center">
              <img
                className="align-middle"
                src={`${process.env.PUBLIC_URL}/images/Register.png`}
                alt="Registration for Users"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
