import React from 'react';
import Book from './components/Book';

export const filterForShelf = shelfString => ({ shelf }) => shelf === shelfString;

export const makeBook = (bookObj, idx) => <Book {...bookObj} key={idx}/>;