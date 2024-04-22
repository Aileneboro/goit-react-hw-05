import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(async (searchTerm) => {
    localStorage.removeItem("searchResults");
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2E1NTk3OTYzMDQ5Y2IxNjVlOWZjMjkyMDc1ZmMwZCIsInN1YiI6IjY2MjI3NjA2MGQxMWYyMDE2NDAyMmFmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OzFWnDU3Z5NIS742jPFk-1hzwxazE0JJYR2XM_CyvO8",
          },
        }
      );
      if (response.data.results.length === 0) {
        setSearchResults([]);
        setSearchMessage("No results found.");
      } else {
        setSearchResults(response.data.results);
        setSearchMessage("");
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
      setSearchMessage(
        "Error fetching search results. Please try again later."
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchTerm(query);
      handleSearch(query);
    }
  }, [searchParams, handleSearch]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSearchParams({ query: searchTerm });
    handleSearch(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button type="submit">Search</button>
      </form>
      <h2>Search Results</h2>
      {loading && <p>Loading...</p>}
      {!loading && searchMessage && <p>{searchMessage}</p>}
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MoviesPage;
