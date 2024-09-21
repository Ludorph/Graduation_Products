import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './searchstyle.css';  // 카드 전용 css파일

const SearchBox = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="wrapper">
      <div className="search_box">
        {/* <div className="search_btn">
          <FontAwesomeIcon icon={faSearch} />
        </div> */}
        <input
          type="text"
          className="input_search"
          placeholder="What are you looking for?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="search_btn">
          <a href='#'><FontAwesomeIcon icon={faMagnifyingGlass} /></a>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;