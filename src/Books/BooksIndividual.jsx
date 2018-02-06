import React from 'react';
import IndiviualData from '../Presentational/IndiviualData';
import BackButton from '../Presentational/BackButton';

class BooksIndiviual extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  async handleLoad(title) {
    if (title !== '') {
      const data = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${title}&orderBy=newest&key=AIzaSyBmhAw1Q0kNKuXqbEVHZE5UTypBSwD5u0A`
      )
        .then(response => response.json())
        .then(data => data.items);
      const dataBooks = {
        title: data[0].volumeInfo.title,
        author: data[0].volumeInfo.authors[0],
        description: data[0].volumeInfo.description,
        date: data[0].volumeInfo.publishedDate,
        image: `${process.env.PUBLIC_URL}/images/bgImg.jpg`,
        id: data[0].id,
        buyLink: data[0].saleInfo.buyLink,
        webLink: data[0].accessInfo.webReaderLink,
        accessStatus: data[0].accessInfo.accessViewStatus,
        pdf: data[0].accessInfo.pdf.acsTokenLink
      };

      this.setState({
        data: dataBooks
      });
    }
  }

  componentDidMount() {
    this.handleLoad(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    this.handleLoad(nextProps.match.params.id);
  }
  renderButtons() {
    return (
      <React.Fragment>
        {this.state.data.pdf ? (
          <a
            className="btn btn-primary btn-sm mr-1"
            href={this.state.data.pdf}
            target="_blank"
          >
            Download
          </a>
        ) : null}
        {this.state.data.buyLink ? (
          <a
            className="btn btn-primary btn-sm mr-1"
            href={this.state.data.buyLink}
            target="_blank"
          >
            Buy Now
          </a>
        ) : null}
        {this.state.data.webLink &&
        this.state.data.accessStatus === 'SAMPLE' ? (
          <a
            className="btn btn-primary btn-sm"
            href={this.state.data.webLink}
            target="_blank"
          >
            Preview
          </a>
        ) : null}
        {this.state.data.webLink &&
        this.state.data.accessStatus === 'FULL_PUBLIC_DOMAIN' ? (
          <a
            className="btn btn-primary btn-sm"
            href={this.state.data.webLink}
            target="_blank"
          >
            Read Online
          </a>
        ) : null}
      </React.Fragment>
    );
  }
  render() {
    return (
      <React.Fragment>
        <IndiviualData
          data={this.state.data}
          imageWidth="0%"
          contentWidth="100%"
          extraRender={this.renderButtons}
          renderBack={() => <BackButton url="/books" name="back to books" />}
        />
      </React.Fragment>
    );
  }
}

export default BooksIndiviual;
