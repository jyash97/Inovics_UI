import React from 'react';
import Cards from '../Presentational/Cards';

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
    return <Cards category="education" number={2} data={dataCategory} />;
  }
}

export default Education;
