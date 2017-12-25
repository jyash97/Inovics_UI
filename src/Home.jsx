import React from 'react';
import Navbar from './Navbar';
import DashBoard from './DashBoard';

export default class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <DashBoard/>
      </React.Fragment>
    );
  }
}
