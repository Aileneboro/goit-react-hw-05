import { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = ({ options }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
      options
    );
    setSearchResults(response.data.results);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <h2>Search Results</h2>
      <MovieList movies={searchResults} />
    </div>
  );
};

export default MoviesPage;
