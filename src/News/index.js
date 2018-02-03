import React from 'react';

import Cards from '../Presentational/Cards';

class News extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  // async componentWillMount(){
  //   const data = await fetch('https://newsapi.org/v2/top-headlines?country=in&apiKey=7f6cfa48cc3e42f48752515e6dcac33c').then(r => r.json());
  // }

  render() {
    let data = [
      {
        title: 'search by channel',
        id: 1,
        image: `${process.env.PUBLIC_URL}/images/news.jpg`
      },
      {
        title: 'search by topic',
        id: 2,
        image: `${process.env.PUBLIC_URL}/images/news1.jpg`
      }
    ];
    return (
      <React.Fragment>
        <Cards data={data} category="news" number={2} />
      </React.Fragment>
    );
  }
}

export default News;
