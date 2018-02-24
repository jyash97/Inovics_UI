import React from 'react';
import ImageCard from '../Presentational/ImageCard';
import Navbar from '../Navbar';

class UpcomingMatches extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.extraData = this.extraData.bind(this);
    this.extraLinks = this.extraLinks.bind(this);
  }

  async componentDidMount() {
    const data = await fetch(
      'http://cricapi.com/api/matches?apikey=FwZD4qeM2POyKTnMJEupxcQdNbJ3'
    )
      .then(response => response.json())
      .then(data => data.matches);
    let dataComponent = [];
    data
      .filter(data => !data.matchStarted)
      .filter((data, index) => index < 8)
      .map((data, i) =>
        dataComponent.push({
          title: `${data['team-1']} vs ${data['team-2']}`,
          image: `${process.env.PUBLIC_URL}/images/cricketImg${i}.jpg`,
          time: data.date,
          linktitle: data.type ? data.type : 'Match',
          id: data.unique_id
        })
      );
    this.setState({
      data: dataComponent
    });
  }
  extraData() {}
  extraLinks() {}
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <br />
        <br />
        <ImageCard
          category="cricket/upcomingmatches"
          data={this.state.data}
          extraData={this.extraData}
          extraLinks={this.extraLinks}
        />
      </React.Fragment>
    );
  }
}

export default UpcomingMatches;
