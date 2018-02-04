import React from 'react';

import ImageCard from '../Presentational/ImageCard';
import BackButton from '../Presentational/BackButton';

class NewsChannel extends React.Component {

  constructor(){
    super();
    this.state={
      data:[]
    };
  }

  async componentDidMount(){
    const data = await fetch(`https://newsapi.org/v1/articles?source=${this.props.match.params.id}&apiKey=7f6cfa48cc3e42f48752515e6dcac33c`).then(r => r.json()).then(r=>r.articles);
    let dataComponent = [];
    data
      .filter((data, index) => index < 6)
      .filter(data => data.urlToImage)
      .map((data, index) =>
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
      data:dataComponent
    });
  }

  render() {
    return(
      <React.Fragment>
        <BackButton classes="mx-5 my-3 btn-lg" url='/news/search by channel' key={1} name='Back to Channel Search' />
        <ImageCard heading="Latest" data={this.state.data} number={4} />
      </React.Fragment>
    );
  }
}

export default NewsChannel;
