import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import Shelf from './Shelf';

export default function MyReads({ bookObjects }) {
  return (
    <div className="app">
      {
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf
                shelfTitle={'Currently Reading'}
                shelfFilterString="currentlyReading"
                bookObjects={bookObjects}
              />
              <Shelf
                shelfTitle={'Want To Read'}
                shelfFilterString="wantToRead"
                bookObjects={bookObjects}
              />
              <Shelf
                shelfTitle={'Read'}
                shelfFilterString="read"
                bookObjects={bookObjects}
              />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      }
    </div>
  );
}
