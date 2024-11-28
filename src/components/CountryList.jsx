import React from 'react';

const CountryList = ({ countries, onSelectCountry }) => {
  return (
    <ul>
      {countries.map(country => (
        <li key={country.cca3}>
          {country.name.common}{' '}
          <button onClick={() => onSelectCountry(country)}>Show Details</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
