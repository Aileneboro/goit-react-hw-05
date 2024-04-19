import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";

const MovieDetailsPage = ({ options }) => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});
  const location = useLocation();
  const backLink = location.state?.from ?? "/";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options
      );
      setMovieData(response.data);
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId, options]);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

  return (
    <div>
      <Link to={backLink}>Go Back</Link>
      <h2>{movieData.title}</h2>
      <img
        src={
          movieData.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
            : defaultImg
        }
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
        <Link to={`/movies/${movieId}/cast`}>Movie Cast</Link>
        <Link to={`/movies/${movieId}/reviews`}>Movie Reviews</Link>
      </div>
      <div>
        <MovieCast movieId={movieId} options={options} />
        <MovieReviews movieId={movieId} options={options} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
