import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import MyReads from './components/MyReads';
import Book from './components/Book';
import SearchPage from './components/SearchPage';
import { getAll, update, search } from './BooksAPI';
import { DONE_TYPING_INTERVAL } from './constants';
import './App.css';

class BooksApp extends Component {
  state = {
    bookObjects: [],
    inputValue: '',
    timerId: null,
    searchResults: null
  };

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

  // returns Object or Boolean
  checkIfInAShelf = bookId => {
    const { bookObjects } = this.state; // Array
    const length = bookObjects.length;

    for (let i = 0; i < length; i++) {
      if (bookId === bookObjects[i].id) {
        return bookObjects[i];
      }
    }
    return false;
  };

  makeBookQuery = queryString => async () => {
    const { bookObjects } = this.state;
    const results = await search(queryString);
    console.log('results are', results);
    if (!results || results.error === 'empty query') {
      return this.setState({
        searchResults: new Error('No Results')
      });
    }
    const searchResults = results.reduce((acc, result) => {
      const bookObjFromShelf = this.checkIfInAShelf(result.id);

      if (bookObjFromShelf) {
        acc.push(bookObjFromShelf);
      } else {
        acc.push(this.makeBookObject(result));
      }

      return acc;
    }, []);

    console.log('results are', results);
    console.log('searchResults are', searchResults);

    return this.setState({ searchResults });
  };

  handleInputChange = e => {
    const { clearTimeout, setTimeout } = window;
    const { timerId } = this.state;
    const queryString = e.target.value;

    clearTimeout(timerId);

    return this.setState({
      inputValue: queryString,
      timerId: setTimeout(this.makeBookQuery(queryString), DONE_TYPING_INTERVAL)
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
    const { bookObjects, inputValue, searchResults } = this.state;
    const myReadsProps = {
      bookObjects,
      handleBookOptionsClick: this.handleBookOptionsClick
    };
    const searchPageProps = {
      inputValue,
      searchResults,
      handleInputChange: this.handleInputChange,
      handleBookOptionsClick: this.handleBookOptionsClick
    };
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" render={() => <MyReads {...myReadsProps} />} />
          <Route
            exact
            path="/search"
            render={() => <SearchPage {...searchPageProps} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
