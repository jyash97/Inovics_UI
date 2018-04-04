import React from 'react';

import Links from './Links';

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
    let imageURL = JSON.parse(localStorage.getItem('userData')).image;
    fetch(imageURL)
      .then(res => res.blob())
      .then(blob => (imageURL = window.URL.createObjectURL(blob)));
    const stylesProfile = {
      width: '9vw',
      height: '9vw',
      backgroundImage: `url(${imageURL})`,
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
        <div className="mx-auto my-5 rounded-circle" style={stylesProfile} />
        <Links />
      </div>
    );
  }
}

export default Sidebar;
