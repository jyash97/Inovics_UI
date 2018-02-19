import React from 'react';
import IndiviualData from '../Presentational/IndiviualData';
import BackButton from '../Presentational/BackButton';
import LinkButton from '../Presentational/LinkButton';

let img = 0;

class QuotesIndividual extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleQuote = this.handleQuote.bind(this);
  }
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
    switch (randomImage) {
      case 1: {
        img = 1;
        break;
      }
      case 2: {
        img = 2;
        break;
      }
      case 3: {
        img = 3;
        break;
      }
      case 4: {
        img = 4;
        break;
      }
      case 5: {
        img = 5;
        break;
      }
      case 6: {
        img = 6;
        break;
      }
      default: {
        img = 0;
      }
    }
    let dataQuote;
    dataQuote = {
      title: quote.quoteText,
      description: quote.quoteAuthor,
      text: null,
      image: `${process.env.PUBLIC_URL}/images/weather${img}.jpeg`,
      id: quote.quoteText,
      date: null
    };

    this.setState({
      data: dataQuote
    });
  }
  async componentDidMount() {
    this.handleQuote();
  }
  componentWillReceiveProps() {
    this.handleQuote();
  }
  renderButtons() {
    return (
      <React.Fragment>
        <LinkButton url="/quotes" key={null} title="New Quote" />
      </React.Fragment>
    );
  }

  render() {
    return (
      <IndiviualData
        data={this.state.data}
        imageWidth="0%"
        contentWidth="100%"
        extraRender={this.renderButtons}
        renderBack={() => <BackButton url="/" name="Back to Home" />}
      />
    );
  }
}

export default QuotesIndividual;
