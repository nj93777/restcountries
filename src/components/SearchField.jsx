import React from 'react';

const SearchField = ({ filter, onFilterChange }) => {
  return (
    <input
      type="text"
      placeholder="Search for a country..."
      value={filter}
      onChange={onFilterChange}
    />
  );
};

export default SearchField;
