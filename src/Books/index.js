import React from 'react';

import Input from '../Presentational/Input';
import Cards from '../Presentational/Cards';

class Books extends React.Component {
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
        `https://www.googleapis.com/books/v1/volumes?q=${value}&filter=partial&orderBy=relevance&key=AIzaSyBmhAw1Q0kNKuXqbEVHZE5UTypBSwD5u0A`
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
      'https://www.googleapis.com/books/v1/volumes?q=Book&orderBy=newest&key=AIzaSyBmhAw1Q0kNKuXqbEVHZE5UTypBSwD5u0A'
    )
      .then(response => response.json())
      .then(data => data.items);
    this.setState({
      data
    });
  }

  render() {
    let dataComponent = [];
    this.state.data.map(data => {
      dataComponent.push({
        title: data.volumeInfo.title,
        image: data.volumeInfo.imageLinks.smallThumbnail
          ? data.volumeInfo.imageLinks.smallThumbnail
          : null,
        id: data.id
      });
    });

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
