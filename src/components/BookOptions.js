import React, { Component } from 'react';

export default function BookOptions({ id, shelf }) {
  return (
    <select defaultValue={shelf} data-bookid={id}>
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
