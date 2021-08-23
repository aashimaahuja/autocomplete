import React, { useState, useCallaback } from 'react';
import { Autocomplete } from './Autocomplete';

export const SearchBox = () => {
  const API = `https://restcountries.eu/rest/v2/name`;
  const REDIRECT_URL = 'https://www.google.com/search';

  const getResults = queryString => {
    return fetch(`${API}/${queryString}`)
      .then(res => res.json())
      .then(data => data)
      .catch(err => console.log('No results'));
  };

  const renderResultItem = item => {
    const { name, alpha2Code } = item;
    return <li key={alpha2Code}>{name}</li>;
  };

  const showMoreResults = queryString => {
    window.location.href = `${REDIRECT_URL}?q=${queryString}`;
  };

  return (
    <>
      <Autocomplete
        getResults={getResults}
        renderItem={renderResultItem}
        cacheSize={10}
        closeButton={true}
        minLength={1}
        maxResults={10}
        debounceDelayTime={300}
        showMoreResults={showMoreResults}
        onClear={() => {}}
        onClose={() => {}}
        closeOnEscape={true}
        renderLoader
      />
    </>
  );
};
