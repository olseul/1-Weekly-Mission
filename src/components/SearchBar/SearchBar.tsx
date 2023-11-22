import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "../../assets/icons/SearchIcon";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <SearchIcon />
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="링크를 검색해 보세요."
        />
      </form>
    </div>
  );
};

export default SearchBar;
