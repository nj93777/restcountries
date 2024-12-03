import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchField from './components/SearchField';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    // Fetch all countries using Axios
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setFilter(filterValue); // Update filter state with input value
    setSelectedCountry(null); // Clear selected country when filter changes

    // Filter countries based on the input
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  // Determine what to display based on filteredCountries
  const renderContent = () => {
    if (selectedCountry) {
      return <CountryDetails country={selectedCountry} />;
    }

    if (filteredCountries.length === 1) {
      // Automatically show details if only one country matches
      return <CountryDetails country={filteredCountries[0]} />;
    }

    if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      return <CountryList countries={filteredCountries} onSelectCountry={handleCountrySelect} />;
    }

    if (filteredCountries.length > 10) {
      return <p>Too many matches, please refine your search.</p>;
    }

    return <p>No matches found.</p>;
  };

  return (
    <div>
      <h1>Country Info App</h1>
      <SearchField filter={filter} onFilterChange={handleFilterChange} />
      {renderContent()}
    </div>
  );
};

export default App;
