import React from 'react';

import './styles/style.css';

import ImageCard from '../Presentational/ImageCard';
import BackButton from '../Presentational/BackButton';

class Entertainment extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.extraData = this.extraData.bind(this);
    this.extraLinks = this.extraLinks.bind(this);
  }

  extraData() {}
  extraLinks() {}

  componentDidMount() {
    let dataComponent = [];
    dataComponent.push({
      title: 'Drumkit',
      time: Date.now(),
      image: `${process.env.PUBLIC_URL}/images/entertainment1.jpeg`,
      linktitle: 'Play Now',
      link: `${process.env.PUBLIC_URL}/drumkit/index.html`
    });
    dataComponent.push({
      title: 'Whack A Mole',
      time: Date.now(),
      image: `${process.env.PUBLIC_URL}/images/entertainment2.jpg`,
      linktitle: 'Play Now',
      link: `${process.env.PUBLIC_URL}/whack-a-mole/index.html`
    });
    this.setState({
      data: dataComponent
    });
  }
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid px-4">
          <div className="row px-5 m-5 entertainment">
            <ImageCard
              heading="Entertainment"
              data={this.state.data}
              extraData={this.extraData}
              extraLinks={this.extraLinks}
              classes="card-deck"
            />
          </div>
        </div>
        <BackButton
          url="/"
          classes="btn-outline-notfound mx-5"
          name="Back to home"
        />
      </React.Fragment>
    );
  }
}

export default Entertainment;
