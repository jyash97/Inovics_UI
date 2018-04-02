import React from 'react';
import Cards from '../Presentational/Cards';

class Entertainment extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  render() {
    let dataCategory = [
      {
        title: 'Drumkit',
        id: 1,
        image: `${process.env.PUBLIC_URL}/images/entertainment1.jpeg`
      },
      {
        title: 'Whack-A-Mole',
        id: 2,
        image: `${process.env.PUBLIC_URL}/images/entertainment2.jpg`
      }
    ];
    return <Cards category="entertainment" number={2} data={dataCategory} />;
  }
}

export default Entertainment;
