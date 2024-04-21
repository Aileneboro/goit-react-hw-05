import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";

const MovieDetailsPage = ({ options, children }) => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          options
        );
        setMovieData(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId, options]);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div>
      <div>
        <button onClick={handleGoBack}>Go Back</button>
        <h2>{movieData.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
          alt="poster"
        />
        <p>Release Date: {movieData.release_date}</p>
        <p>Overview: {movieData.overview}</p>
        <p>Rating: {movieData.vote_average}</p>
        <p>
          Genres:{" "}
          {movieData.genres &&
            movieData.genres.map((genre) => genre.name).join(", ")}
        </p>
        <div>
          <NavLink to={`/movies/${movieId}/cast`}>
            <p>Cast</p>
          </NavLink>
          <NavLink to={`/movies/${movieId}/reviews`}>
            <p>Reviews</p>
          </NavLink>
        </div>
      </div>
      {children}
    </div>
  );
};

export default MovieDetailsPage;
