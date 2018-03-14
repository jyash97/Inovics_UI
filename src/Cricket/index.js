import React from 'react';

import Cards from '../Presentational/Cards';
import BackButton from '../Presentational/BackButton';

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
    return (
      <React.Fragment>
        <Cards category="cricket" number={2} data={dataCategory} />
        <div className="mx-5">
          <BackButton
            url="/"
            classes="btn-outline-notfound"
            name="Back to home"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Cricket;
