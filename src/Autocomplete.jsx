import React, { useState } from 'react';
// import {Cache} from './Cache';

const cache = {};
export const Autocomplete = props => {
  const [results, setResults] = useState([]);
  const {
    getResults,
    renderItem,
    closeButton,
    minLength = 1,
    maxResults,
    showMoreResults
  } = props;

  // let cache = Cache.getInstance();
  const insertWord = (word, results) => {
    let current = cache;
    for (let i = 0; i < word.length; i++) {
      current[word[i]] = current[word[i]] || {};
      current = current[word[i]];
    }

    current.suggestions = results;
  };

  const searchWord = word => {
    let current = cache;
    for (let i = 0; i < word.length; i++) {
      if (!current[word[i]]) {
        return false;
      }
      current = current[word[i]];
    }
    return current.suggestions;
  };

  const onInputChange = async e => {
    const queryString = e.target.value;

    if (queryString == '' || queryString.length < minLength) {
      setResults([]);
      return;
    }

    let results;
    const cachedResults = searchWord(queryString);
    if (!cachedResults || cachedResults.length == 0) {
      results = await getResults(queryString);
      insertWord(queryString, results);
    } else {
      results = cachedResults;
    }

    results = results.slice(0, maxResults);
    setResults(results);
  };

  return (
    <>
      <input type={closeButton ? 'search' : 'text'} onInput={onInputChange} />
      {results.length > 0 && (
        <ul className="results__list">
          {results.length > 0 && results.map(item => renderItem(item))}
          <li>
            <a onClick={showMoreResults} className="more_results">
              Show more results
            </a>
          </li>
        </ul>
      )}
    </>
  );
};

// var cache = new TrieNode()
// var a = {
//   'd': {
//     'o' : {
//       'g' : {}, 't': {},
//       results: []
//     },
//     'a': {'m':{}},
//     results:[]
//   }
// }
