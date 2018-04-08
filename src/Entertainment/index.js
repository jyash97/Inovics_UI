import React from 'react';
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
        <div className="container-fluid">
          <div className="row p-5 px-5">
            <ImageCard
              heading="Entertainment"
              data={this.state.data}
              extraData={this.extraData}
              extraLinks={this.extraLinks}
            />
            <BackButton
              url="/"
              classes="btn-outline-notfound"
              name="Back to home"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Entertainment;
