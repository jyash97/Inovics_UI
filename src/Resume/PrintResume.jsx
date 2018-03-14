import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Section from './Section';
import Buttons from './Buttons';

class PrintResume extends React.Component {
  render() {
    let data = JSON.parse(localStorage.getItem('resumedata'));
    return (
      <React.Fragment>
        {data === undefined || data === null ? (
          <div className="alert alert-warning rounded-0" role="alert">
            You have not Saved Data, Please <Link to="/">Go back</Link> and Save
            details.
          </div>
        ) : (
          <React.Fragment>
            <button
              className="btn btn-block rounded-0 d-print-none font-weight-bold  text-uppercase btn-sm btn-success"
              onClick={() => {
                window.print();
              }}
            >
              Print Resume
            </button>
            <Header
              name={data.name}
              surname={data.surname}
              details={data.details}
            />
            <Section
              title="education"
              entries={['name', 'university', 'standard', 'score']}
              data={data.education}
            />
            <Section
              title="experience"
              entries={['name', 'duration', 'role', 'description']}
              data={data.experience}
            />
            {data.extradetails.map((name, index) => (
              <div
                className="text-dark text-capitalize text-left p-2"
                key={index}
              >
                <h3
                  className="text-dark text-capitalize border-primary text-left d-inline-block p-1 my-1 font-weight-normal"
                  style={{ borderBottom: '4px solid' }}
                >
                  {name['title']}
                </h3>
                <div className="my-2 p-1">
                  <Buttons data={name['description']} />
                </div>
              </div>
            ))}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default PrintResume;
