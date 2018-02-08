import React from 'react';
import Cards from '../Presentational/Cards';

class Books extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  async componentDidMount() {
    const data = await fetch(
      'https://www.googleapis.com/books/v1/volumes?q=Book&orderBy=newest&key=AIzaSyBmhAw1Q0kNKuXqbEVHZE5UTypBSwD5u0A'
    )
      .then(response => response.json())
      .then(data => data.items);
    let dataComponent = [];
    data.filter((data, index) => index < 4).map(data => {
      dataComponent.push({
        title: data.volumeInfo.title,
        image: data.volumeInfo.imageLinks
          ? data.volumeInfo.imageLinks.smallThumbnail
          : null,
        id: data.id
      });
    });
    this.setState({
      data: dataComponent
    });
  }

  render() {
    let dataCategory = [
      {
        title: 'search by title',
        id: 1,
        image: `${process.env.PUBLIC_URL}/images/b2.jpg`
      },
      {
        title: 'search by author',
        id: 2,
        image: `${process.env.PUBLIC_URL}/images/books1.jpg`
      }
    ];
    return (
      <React.Fragment>
        <Cards category="books" number={2} data={dataCategory} />
        <h2 className="ml-3">Popular Releases</h2>
        <Cards category="books/title" number={4} data={this.state.data} />
      </React.Fragment>
    );
  }
}

export default Books;
