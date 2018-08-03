import React from 'react';
import BookOptions from './BookOptions';

export default function Book({
  id,
  imageUrl,
  shelf,
  title,
  authors,
  handleBookOptionsClick
}) {
  const style = {
    width: 128,
    height: 193,
    backgroundImage: `url(${imageUrl})`
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={style} />
          <div className="book-shelf-changer">
            <BookOptions
              handleBookOptionsClick={handleBookOptionsClick}
              id={id}
              shelf={shelf}
            />
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {authors ? authors.join(', ') : 'Unknown'}
        </div>
      </div>
    </li>
  );
}
