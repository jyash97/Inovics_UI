import React from 'react';
import Navbar from './Navbar';
import DashBoard from './DashBoard';
import Sidebar from './Sidebar';

export default class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Sidebar />
        <DashBoard/>
      </React.Fragment>
    );
  }
}
