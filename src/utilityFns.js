import React from 'react';
import Book from './components/Book';

export const filterForShelf = shelfString => ({ shelf }) =>
  shelf === shelfString;

export const makeBook = clickHandler => (bookObj, idx) => (
  <Book handleBookOptionsClick={clickHandler} {...bookObj} key={idx} />
);
