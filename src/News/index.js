import React from 'react';

import ImageCard from '../Presentational/ImageCard';
import Cards from '../Presentational/Cards';

class News extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.extraLinks = this.extraLinks.bind(this);
    this.extraData = this.extraData.bind(this);
  }
  extraData() {}
  extraLinks() {}
  async componentDidMount() {
    const data = await fetch(
      'https://newsapi.org/v2/top-headlines?country=in&apiKey=7f6cfa48cc3e42f48752515e6dcac33c'
    )
      .then(response => response.json())
      .then(response => response.articles);
    let dataComponent = [];
    data.filter(data => data.urlToImage).map((data, index) =>
      dataComponent.push({
        id: index,
        title: data.title,
        image: data.urlToImage,
        link: data.url,
        linktitle: 'Read Full Story',
        description: data.description,
        time: data.publishedAt
      })
    );
    this.setState({
      data: dataComponent
    });
  }

  render() {
    let dataCategory = [
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
        <Cards category="news" number={2} data={dataCategory} />
        {this.state.data.length > 3 ? (
          <ImageCard
            heading="Latest"
            data={this.state.data}
            number={4}
            extraData={this.extraData}
            extraLinks={this.extraLinks}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default News;
