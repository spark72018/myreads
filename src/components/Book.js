import React, { Component } from 'react';
import BookOptions from './BookOptions';

export default function Book({ id, imageUrl, shelf, title, authors }) {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageUrl})`
            }}
          />
          <div className="book-shelf-changer">
            <BookOptions id={id} shelf={shelf} />
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    </li>
  );
}
