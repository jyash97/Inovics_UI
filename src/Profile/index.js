import React from 'react';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';

import './styles/profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.setEditorRef = this.setEditorRef.bind(this);
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    let imageURL = userData.image;
    fetch(imageURL)
      .then(res => res.blob())
      .then(blob => (imageURL = window.URL.createObjectURL(blob)));
    this.setState({
      name: userData.name,
      email: userData.email,
      image: imageURL,
      newImage: '',
      isImage: false
    });
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

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-7 mx-auto text-center edit-form">
            {this.state.image ? (
              <div>
                <AvatarEditor
                  ref={this.setEditorRef}
                  image={this.state.image}
                  border={50}
                  width={200}
                  height={200}
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
              Change Image
            </Dropzone>
            <input
              type="text"
              name="name"
              className="form-control mt-4 mx-auto"
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
            <button className="btn btn-outline-primary">Update Profile</button>
            <button className="btn btn-primary">Reset Changes</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
