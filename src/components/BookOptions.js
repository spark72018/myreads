import React, { Component } from 'react';

export default function BookOptions({ id, shelf, handleBookOptionsClick }) {
  return (
    <select
      onChange={handleBookOptionsClick}
      defaultValue={shelf || 'none'}
      data-bookid={id}
    >
      <option value="move" disabled>
        Move to...
      </option>
      <option value="currentlyReading">Currently Reading</option>
      <option value="wantToRead">Want to Read</option>
      <option value="read">Read</option>
      <option value="none">None</option>
    </select>
  );
}
