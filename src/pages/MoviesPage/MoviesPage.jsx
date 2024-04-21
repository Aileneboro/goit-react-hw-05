import { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = ({ options }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");

  useEffect(() => {
    const savedResults = JSON.parse(localStorage.getItem("searchResults"));
    if (savedResults) {
      setSearchResults(savedResults);
    }
  }, []);

  const handleSearch = async () => {
    localStorage.removeItem("searchResults");
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setSearchMessage("Please enter a search query.");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
        options
      );

      if (response.data.results.length === 0) {
        setSearchResults([]);
        setSearchMessage("No results found.");
      } else {
        setSearchResults(response.data.results);
        setSearchMessage("");
        localStorage.setItem(
          "searchResults",
          JSON.stringify(response.data.results)
        );
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    setSearchTerm("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearch}>Search</button>
      <h2>Search Results</h2>
      {searchMessage && <p>{searchMessage}</p>}
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MoviesPage;
