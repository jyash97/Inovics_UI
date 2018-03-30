import React from 'react';

import './styles/styles.css';
import DataComponent from './DataComponent';
import Navigation from '../Chatbot/Navigation';

class DashBoard extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row p-5">
          <DataComponent />
          <Navigation />
        </div>
      </div>
    );
  }
}

export default DashBoard;
