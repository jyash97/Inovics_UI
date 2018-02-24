import React from 'react';
import Cards from '../Presentational/Cards';

class Cricket extends React.Component {
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
    return <Cards category="cricket" number={2} data={dataCategory} />;
  }
}

export default Cricket;
