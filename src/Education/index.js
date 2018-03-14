import React from 'react';

import Cards from '../Presentational/Cards';
import BackButton from '../Presentational/BackButton';

class Education extends React.Component {
  render() {
    let dataCategory = [
      {
        title: 'Resume',
        id: 1,
        image: `${process.env.PUBLIC_URL}/images/b2.jpg`
      },
      {
        title: 'Dictionary',
        id: 2,
        image: `${process.env.PUBLIC_URL}/images/books1.jpg`
      }
    ];
    return (
      <React.Fragment>
        <Cards category="education" number={2} data={dataCategory} />
        <div className="mx-5">
          <BackButton
            url="/"
            classes="float-left btn-outline-notfound"
            name="Back to Home"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Education;
