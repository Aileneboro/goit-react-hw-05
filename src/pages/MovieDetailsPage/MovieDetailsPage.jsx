import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, NavLink, useLocation, Outlet } from "react-router-dom";
import GoBack from "../../components/Navigation/GoBack";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState({});
  const location = useLocation();
  let backLinkHref = useRef(location.state ?? "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2E1NTk3OTYzMDQ5Y2IxNjVlOWZjMjkyMDc1ZmMwZCIsInN1YiI6IjY2MjI3NjA2MGQxMWYyMDE2NDAyMmFmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OzFWnDU3Z5NIS742jPFk-1hzwxazE0JJYR2XM_CyvO8",
            },
          }
        );
        setMovieData(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  return (
    <div className={css.addWrap}>
      <div className={css.movieWrapp}>
        <div>
          <GoBack to={backLinkHref.current}>Go back</GoBack>
          <h2>{movieData.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`}
            alt="poster"
          />
        </div>
        <div className={css.movieInfo}>
          <h3>Release Date:</h3>
          <p> {movieData.release_date}</p>
          <h3>Overview:</h3>
          <p> {movieData.overview}</p>
          <h3>Rating:</h3>
          <p> {movieData.vote_average}</p>
          <h3>Genres:</h3>
          <p>
            {" "}
            {movieData.genres &&
              movieData.genres.map((genre) => genre.name).join(", ")}
          </p>
          <div className={css.addInfo}>
            <NavLink to="cast">Cast</NavLink>
            <NavLink to="reviews">Reviews</NavLink>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
