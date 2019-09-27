import React from 'react';
import './Search.scss';

const Search = props => {

  return (
    <div className="defaultWrapper">
      <form className="Search" onSubmit={props.onSubmit}>
        <input className="SearchInput" type="text"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          autocomplete="off" />
      </form>
    </div>
  );
}

export default Search;
