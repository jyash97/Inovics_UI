import React from 'react';
import DashBoard from './DashBoard';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Sidebar />
        <DashBoard />
      </React.Fragment>
    );
  }
}
