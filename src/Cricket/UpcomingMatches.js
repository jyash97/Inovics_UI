import React from 'react';
import ImageCard from '../Presentational/ImageCard';
import BackButton from '../Presentational/BackButton';

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
      .filter((data, index) => index < 12)
      .map(data =>
        dataComponent.push({
          title: `${data['team-1']} vs ${data['team-2']}`,
          time: data.date,
          image: '',
          type: data.type ? data.type : 'Match',
          id: data.unique_id
        })
      );
    this.setState({
      data: dataComponent
    });
  }
  extraData(data) {
    return (
      <p
        key={data}
        className="border rounded border-primary text-primary text-center d-inline-block p-1 w-25"
      >
        {data.type}
      </p>
    );
  }
  extraLinks() {}
  render() {
    return (
      <React.Fragment>
        <BackButton
          classes="mx-5 my-3 btn-lg"
          url="/cricket"
          name="back to cricket"
        />
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
