import React from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';

import './styles/feedback.css';

class feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      feedback: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleFeedback() {
    if (this.state.feedback !== '') {
      await axios
        .post('http://localhost:3554/feedback', {
          feedback: this.state.feedback
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
              response: true,
              feedback: ''
            });
          }
        })
        .catch(err =>
          this.setState({
            error: true,
            message: ['Something went wrong with the Server']
          })
        );
      console.log('true');
    } else {
      const errors = [];
      if (this.state.feedback === '') {
        errors.push('Please enter the Feedback');
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
        <Sidebar />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 align-middle mx-auto text-center px-5 py-4 form-group feedback-form">
              <img
                className="align-middle"
                src={`${process.env.PUBLIC_URL}/images/feedback.png`}
                alt="Feedback for Users"
              />
              {this.state.error
                ? this.state.message.map(msg => (
                    <div className="text-center alert mx-auto" key="msg">
                      {msg}
                    </div>
                  ))
                : null}
              {this.state.response ? (
                <div className="text-center successalert mx-auto" key="msg">
                  Feedback Submitted!
                </div>
              ) : null}
              <textarea
                name="feedback"
                className="form-control mx-auto"
                value={this.state.feedback}
                placeholder="Enter Feedback"
                onChange={this.handleChange}
              />
              <button className="btn" onClick={this.handleFeedback}>
                Send
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default feedback;
