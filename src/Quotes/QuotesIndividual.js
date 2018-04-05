import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './styles/style.css';
import BackButton from '../Presentational/BackButton';
import LinkButton from '../Presentational/LinkButton';

class QuotesIndividual extends React.Component {
  constructor() {
    super();
    this.state = {
      text:
        'Let us sacrifice our today so that our children can have a better tomorrow.',
      author: 'A. P. J. Abdul Kalam',
      copied: false
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

    this.setState({
      text: quote.quoteText,
      author: quote.quoteAuthor
    });
  }

  componentDidMount() {
    this.handleQuote();
  }

  componentWillReceiveProps() {
    this.handleQuote();
    this.setState({
      copied: false
    });
  }

  renderButtons() {
    return <LinkButton url="/quotes" title="Get a new Quote" />;
  }

  render() {
    return (
      <React.Fragment>
        <blockquote className="blockquote border-primary p-2">
          <p className="mb-2 font-weight-normal quote-text">
            {this.state.text}
          </p>
          <footer className="blockquote-footer">
            <cite title="Source Title">{this.state.author}</cite>
          </footer>
        </blockquote>
        <div className="quote-buttons">
          <BackButton
            classes="btn-outline-notfound btn-sm"
            url="/"
            name="back to home"
          />
          <BackButton
            classes="btn-outline-success quote-button"
            url="/quotes"
            name="Get new quote"
          />
        </div>
        <CopyToClipboard
          text={this.state.text}
          onCopy={() => this.setState({ copied: true })}
        >
          <button className="btn btn-outline-danger btn-sm clipBtn">
            Copy Quote
          </button>
        </CopyToClipboard>
        {''}
        {this.state.copied ? (
          <div className="alert alert-success text-center" role="alert">
            Quote Saved to ClipBoard Successfully
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default QuotesIndividual;
