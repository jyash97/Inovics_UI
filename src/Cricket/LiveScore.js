import React from 'react';
import BackButton from '../Presentational/BackButton';

class LiveScore extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  async componentDidMount() {
    const data = await fetch(
      'http://cricapi.com/api/cricket?apikey=FwZD4qeM2POyKTnMJEupxcQdNbJ3'
    )
      .then(response => response.json())
      .then(data => data.data);
    let dataComponent = [];
    data.filter((data, index) => index < 6).map(data =>
      dataComponent.push({
        title: data.description,
        id: data.unique_id,
        image: `${process.env.PUBLIC_URL}/images/cricketImg5.jpg`
      })
    );
    this.setState({
      data: dataComponent
    });
  }

  render() {
    const color = [
      'info',
      'danger',
      'success',
      'warning',
      'primary',
      'secondary'
    ];
    return (
      <div
        className="fluid-container  indiviual-container my-0"
        style={{
          background: `linear-gradient(to right,rgba(168,218,220,0.25), rgba(238,249,237,.2)),url(${
            process.env.PUBLIC_URL
          }/images/weather3.jpeg
          )`
        }}
      >
        <BackButton classes="mx-5 my-3" url="/cricket" name="back to cricket" />
        <div className="container justify-content-center w-50 ">
          {this.state.data.map((match, i) => {
            return (
              <div
                className={`alert alert-${color[i]} my-2 py-3`}
                role="alert"
                key={match.id}
                dangerouslySetInnerHTML={{
                  __html: match.title
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default LiveScore;
