import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "../../assets/icons/SearchIcon";

interface SearchBarProps {
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBar = ({ setSearchTerm }: SearchBarProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(localSearchTerm);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <SearchIcon />
        <input
          className="search-input"
          type="text"
          value={localSearchTerm}
          onChange={handleChange}
          placeholder="링크를 검색해 보세요."
        />
      </form>
    </div>
  );
};

export default SearchBar;
