import React from 'react';
import IndiviualData from '../Presentational/IndiviualData';
import BackButton from '../Presentational/BackButton';
import LinkButton from '../Presentational/LinkButton';

class QuotesIndividual extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleQuote = this.handleQuote.bind(this);
    this.extraLinks = this.extraLinks.bind(this);
    this.extraData = this.extraData.bind(this);
  }
  extraData() {}
  extraLinks() {}
  async handleQuote() {
    const quote = await fetch(
      'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en',
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'multipart/form-data'
        }
      }
    ).then(response => response.json());

    const randomImage = Math.floor(Math.random() * 7);
    let dataQuote;
    dataQuote = {
      text: quote.quoteText,
      description: `By ${quote.quoteAuthor}`,
      title: null,
      image: `${process.env.PUBLIC_URL}/images/weather${randomImage}.jpeg`,
      id: quote.quoteText,
      date: Date.now()
    };

    this.setState({
      data: dataQuote
    });
  }

  componentDidMount() {
    this.handleQuote();
  }

  componentWillReceiveProps() {
    this.handleQuote();
  }

  renderButtons() {
    return <LinkButton url="/quotes" title="Get a new Quote" />;
  }

  render() {
    return (
      <IndiviualData
        data={this.state.data}
        contentWidth="100%"
        imageWidth="0"
        extraRender={this.renderButtons}
        extraData={this.extraData}
        extraLinks={this.extraLinks}
        renderBack={() => <BackButton url="/" name="Back to Home" />}
      />
    );
  }
}

export default QuotesIndividual;
