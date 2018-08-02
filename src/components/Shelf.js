import React from 'react';
import { filterForShelf, makeBook } from '../utilityFns';

export default function Shelf({ shelfTitle, shelfFilterString, bookObjects }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {bookObjects.filter(filterForShelf(shelfFilterString)).map(makeBook)}
        </ol>
      </div>
    </div>
  );
}
