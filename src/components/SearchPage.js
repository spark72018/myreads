import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { makeBook } from '../utilityFns';

export default function SearchPage({
  handleInputChange,
  handleBookOptionsClick,
  inputValue,
  searchResults
}) {
  console.log('inputValue is', inputValue);
  let display;
  if (!inputValue) {
    display = null;
  } else if (searchResults instanceof Error) {
    display = <h2>No Results</h2>;
  } else if (searchResults) {
    display = searchResults.map(makeBook(handleBookOptionsClick));
  }
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={'/'} className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            value={inputValue}
            onChange={handleInputChange}
            type="text"
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">{display}</ol>
      </div>
    </div>
  );
}
