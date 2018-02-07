import React from 'react';

import Input from '../Presentational/Input';
import Cards from '../Presentational/Cards';

class Books extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }

  handleQuery(value) {
    this.setState({
      value
    });
  }

  async handleClick(value) {
    if (value !== '') {
      const data = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&langRestrict=en&orderBy=relevance&key=AIzaSyBEYPWQgGtkUBQb2ZW5oYAFDT84S1yXHhw`
      )
        .then(response => response.json())
        .then(data => data.items);

      this.setState({
        data
      });
    }
  }

  async componentDidMount() {
    const data = await fetch(
      'https://www.googleapis.com/books/v1/volumes?q=books&orderBy=relevance&langRestrict=en&maxResults=15&key=AIzaSyBEYPWQgGtkUBQb2ZW5oYAFDT84S1yXHhw'
    )
      .then(response => response.json())
      .then(data => data.items);
    this.setState({
      data
    });
  }

  render() {
    let dataComponent = [];
    this.state.data.map(data =>
      dataComponent.push({
        title: data.volumeInfo.title,
        image: data.volumeInfo.imageLinks.smallThumbnail
          ? data.volumeInfo.imageLinks.smallThumbnail
          : null,
        id: data.id
      })
    );

    return (
      <React.Fragment>
        <Input
          category="Books"
          handleClick={this.handleClick}
          handleQuery={this.handleQuery}
        />
        <Cards number={4} category="books" data={dataComponent} />
      </React.Fragment>
    );
  }
}

export default Books;
