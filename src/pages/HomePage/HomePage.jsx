import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = ({ options }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        options
      );
      setTrendingMovies(response.data.results);
    };

    fetchTrendingMovies();
  }, [options]);

  return (
    <div>
      <h2>Trending Movies</h2>
      <MovieList movies={trendingMovies} />
    </div>
  );
};

export default HomePage;
