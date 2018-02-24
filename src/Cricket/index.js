import React from 'react';
import Cards from '../Presentational/Cards';

class Cricket extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  render() {
    let dataCategory = [
      {
        title: 'live scores',
        id: 1,
        image: `${process.env.PUBLIC_URL}/images/cricket.jpeg`
      },
      {
        title: 'upcoming matches',
        id: 2,
        image: `${process.env.PUBLIC_URL}/images/cricket.jpg`
      }
    ];
    return (
      <React.Fragment>
        <Cards category="cricket" number={2} data={dataCategory} />
      </React.Fragment>
    );
  }
}

export default Cricket;
