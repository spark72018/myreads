import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import Shelf from './Shelf';

export default function MyReads(props) {
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
                {...props}
              />
              <Shelf
                shelfTitle={'Want To Read'}
                shelfFilterString="wantToRead"
                {...props}
              />
              <Shelf
                shelfTitle={'Read'}
                shelfFilterString="read"
                {...props}
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
