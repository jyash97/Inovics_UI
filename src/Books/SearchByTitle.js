import React from 'react';

import Input from '../Presentational/Input';
import Cards from '../Presentational/Cards';
import Navbar from '../Navbar';

class SearchByTitle extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
  }

  async handleClick(value) {
    if (value !== '') {
      const data = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&filter=partial&orderBy=relevance&key=AIzaSyBEYPWQgGtkUBQb2ZW5oYAFDT84S1yXHhw`
      )
        .then(response => response.json())
        .then(data => data.items);
      let dataComponent = [];
      data.map(data =>
        dataComponent.push({
          title: data.volumeInfo.title,
          image: data.volumeInfo.imageLinks
            ? data.volumeInfo.imageLinks.smallThumbnail
            : null,
          id: data.id
        })
      );
      this.setState({
        display: true,
        data: dataComponent
      });
    }
  }

  handleQuery(value) {
    this.setState({
      value
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Input
          category="title"
          handleClick={this.handleClick}
          handleQuery={this.handleQuery}
        />
        {this.state.display ? (
          <Cards number={4} category="books/title" data={this.state.data} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default SearchByTitle;
