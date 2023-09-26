import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleSearch(query);
    setQuery('');
  };

  return (
    <form className="d-flex mt-2" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="search"
        area-label="search"
        onChange={handleChange}
        value={query}
      />
      <button className="btn btn-outline-success" type="submit">
        <FcSearch />
      </button>
    </form>
  );
};

export default SearchBar;
