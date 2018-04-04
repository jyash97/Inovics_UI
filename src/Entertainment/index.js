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
      link: '//drumkit/index.html'
    });
    this.setState({
      data: dataComponent
    });
  }
  render() {
    return (
      <React.Fragment>
        <BackButton classes="mx-5 my-3" url="/cricket" name="back to home" />
        <ImageCard
          heading="Entertainment"
          category="cricket/upcomingmatches"
          data={this.state.data}
          extraData={this.extraData}
          extraLinks={this.extraLinks}
        />
      </React.Fragment>
    );
  }
}

export default Entertainment;
