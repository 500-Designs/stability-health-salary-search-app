import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchResults({ searchTerm, filter }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users?q=${searchTerm}`
      );
      setResults(response.data);
    }
    if (searchTerm) {
      fetchResults();
    }
  }, [searchTerm]);

  return (
    <ul>
      {results
        .filter((result) => {
          if (!filter) {
            return true;
          }
          return result[filter].toLowerCase().includes(searchTerm.toLowerCase());
        })
        .map((result) => (
          <li key={result.id}>
            <p>Name: {result.name}</p>
            <p>Email: {result.email}</p>
            <p>Phone: {result.phone}</p>
          </li>
        ))}
    </ul>
  );
}

export default SearchResults;
