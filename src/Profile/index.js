import React from 'react';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import axios from 'axios';

import Sidebar from '../Sidebar';
import Notifications from '../Presentational/Notifications';
import Errors from '../Presentational/Errors';
import Navbar from '../Navbar';

import './styles/profile.css';

class Profile extends React.Component {
  constructor() {
    //isImage on false gives default image
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      isVerified: false,
      message: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setEditorRef = this.setEditorRef.bind(this);
  }

  componentDidMount() {
    this.handleReset();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  setEditorRef(editor) {
    this.editor = editor;
  }

  handleDrop(a) {
    this.setState({
      image: a[0].preview,
      isImage: true
    });
  }

  async handleUpdate() {
    let canvasScaled = '';
    if (this.state.isImage) {
      canvasScaled = this.editor.getImageScaledToCanvas().toDataURL();
    } else {
      canvasScaled = JSON.parse(localStorage.getItem('userData')).image;
    }
    if (this.state.name !== '') {
      const userData = JSON.parse(localStorage.getItem('userData'));
      await axios
        .post('https://inovics.herokuapp.com/update', {
          email: userData.email,
          name: this.state.name,
          image: canvasScaled
        })
        .then(res => {
          if (!res.data.error) {
            let imageURL = canvasScaled;
            fetch(imageURL)
              .then(res => res.blob())
              .then(blob => (imageURL = window.URL.createObjectURL(blob)));
            localStorage.removeItem('userData');
            localStorage.setItem(
              'userData',
              JSON.stringify({
                name: this.state.name,
                email: userData.email,
                isVerified: userData.isVerified,
                image: canvasScaled
              })
            );
            this.setState({
              image: imageURL,
              error: res.data.error,
              message: res.data.message
            });
          } else {
            this.setState({
              error: res.data.error,
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
      if (this.state.name === '') {
        errors.push('Please enter the name');
      }
      this.setState({
        error: true,
        message: errors
      });
    }
  }

  handleReset() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    let imageURL = userData.image;
    fetch(imageURL)
      .then(res => res.blob())
      .then(blob => (imageURL = window.URL.createObjectURL(blob)));
    this.setState({
      name: userData.name,
      email: userData.email,
      image: imageURL,
      isVerified: userData.isVerified,
      isImage: false
    });
  }

  render() {
    const isVerified = JSON.parse(localStorage.getItem('userData')).isVerified;
    return (
      <React.Fragment>
        {isVerified ? null : <Navbar />}
        <Sidebar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7 mx-auto text-center edit-form">
              {this.state.error ? (
                <Errors errors={this.state.message} />
              ) : (
                <Notifications notifications={this.state.message} />
              )}
              {this.state.image ? (
                <AvatarEditor
                  ref={this.setEditorRef}
                  image={this.state.image}
                  border={100}
                  width={300}
                  height={300}
                  borderRadius={500}
                  color={[255, 255, 255, 1]}
                  rotate={0}
                />
              ) : null}
              {this.state.isVerified ? (
                <div className="alert mx-auto alert-sucess">
                  Your Email is Verified.
                </div>
              ) : (
                <div className="alert mx-auto alert-danger">
                  Please Verify your email.
                </div>
              )}
              <Dropzone
                className="btn droparea mt-4"
                activeClassName="activearea"
                rejectClassName="rejectedarea"
                accept="image/*"
                onDrop={(accepted, rejected) =>
                  this.handleDrop(accepted, rejected)
                }
              >
                Change Image
              </Dropzone>
              <input
                type="text"
                name="name"
                className="form-control mt-4 mx-auto text-capitalize"
                value={this.state.name}
                placeholder="Name"
                onChange={this.handleChange}
              />
              <input
                type="email"
                name="email"
                className="form-control mt-4 mx-auto"
                value={this.state.email}
                placeholder="Email"
                onChange={this.handleChange}
                readOnly
              />
              <button
                className="btn btn-outline-primary"
                onClick={this.handleUpdate}
              >
                Update Profile
              </button>
              <button className="btn btn-primary" onClick={this.handleReset}>
                Reset Changes
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
