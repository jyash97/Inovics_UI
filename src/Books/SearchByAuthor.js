import React from 'react';

import Input from '../Presentational/Input';
import Cards from '../Presentational/Cards';
import Navbar from '../Navbar';

class SearchByAuthor extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };

    this.handleQuery = this.handleQuery.bind(this);
  }

  async handleQuery(value) {
    if (value !== '') {
      const data = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=''+inauthor:${value}&filter=partial&orderBy=relevance&key=AIzaSyBmhAw1Q0kNKuXqbEVHZE5UTypBSwD5u0A`
      )
        .then(response => response.json())
        .then(data => data.items);
      let dataComponent = [];
      data.map(data => {
        dataComponent.push({
          title: data.volumeInfo.title,
          image: data.volumeInfo.imageLinks
            ? data.volumeInfo.imageLinks.smallThumbnail
            : null,
          id: data.id
        });
      });
      this.setState({
        display: true,
        data: dataComponent
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Input
          category="author"
          handleClick={this.handleClick}
          handleQuery={this.handleQuery}
        />
        {this.state.display ? (
          <Cards number={4} category="books/author" data={this.state.data} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default SearchByAuthor;
