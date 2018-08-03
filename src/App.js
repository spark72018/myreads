import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import MyReads from './components/MyReads';
import Book from './components/Book';
import SearchPage from './components/SearchPage';
import { getAll, update } from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = { bookObjects: [], inputValue: '' };

  makeBookObject = ({
    authors,
    id,
    imageLinks: { thumbnail: imageUrl },
    title,
    shelf
  }) => ({ authors, id, imageUrl, title, shelf });

  async componentDidMount() {
    const currentBooks = await getAll();
    console.log('currentBooks', currentBooks);
    try {
      const bookObjects = currentBooks.map(this.makeBookObject);
      console.log('bookObjects', bookObjects);
      return this.setState({ bookObjects });
    } catch (e) {
      console.log('COMPONENT_DID_MOUNT ERROR', e);
    }
  }

  handleInputChange = e => {
    return this.setState({
      inputValue: e.target.value
    });
  };

  handleBookOptionsClick = async e => {
    const chosenShelf = e.target.value;

    if (chosenShelf === 'none') return;

    const id = e.target.dataset.bookid;

    await update({ id }, chosenShelf);
    const updatedBooks = await getAll();

    try {
      const bookObjects = updatedBooks.map(this.makeBookObject);
      console.log('bookObjects', bookObjects);
      return this.setState({ bookObjects });
    } catch (e) {
      console.log('COMPONENT_DID_MOUNT ERROR', e);
    }
  };

  render() {
    const { bookObjects, inputValue } = this.state;
    return (
      <BrowserRouter>
        <div className="container">
          <Route
            exact
            path="/"
            render={() => (
              <MyReads
                bookObjects={bookObjects}
                handleBookOptionsClick={this.handleBookOptionsClick}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => (
              <SearchPage
                handleInputChange={this.handleInputChange}
                inputValue={inputValue}
              />
            )}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
