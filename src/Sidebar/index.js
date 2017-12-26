import React from 'react';

import Links from './Links';
import Profile from './images/profile.jpg';

class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      toggle: true
    };
    this.handleWidth = this.handleWidth.bind(this);
  }

  handleWidth() {
    this.setState({
      toggle: !this.state.toggle
    });
  }

  render() {
    let stylesSidebar = {
      width: '19vw',
      height: '91vh'
    };
    if (!this.state.toggle) {
      stylesSidebar = {
        width: '2vw',
        height: '5vh'
      };
    }
    // Profile will be uploaded via Backend just for UI purpose.
    const stylesProfile = {
      width: '9vw',
      height: '9vw',
      backgroundImage: `url(${Profile})`,
      backgroundSize: 'cover',
      backgroundPosition: 'top center'
    };
    return (
      <div className="sidebar float-left" style={stylesSidebar}>
        <span
          className="float-right p-2"
          role="img"
          aria-label="Snowman"
          onClick={this.handleWidth}
        >
          ❤️
        </span>
        <div className="mx-auto my-4 rounded-circle" style={stylesProfile} />
        <Links />
      </div>
    );
  }
}

export default Sidebar;
