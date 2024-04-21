import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieCast = ({ options }) => {
  const [movieCast, setMovieCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const getCast = async (id) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
          options
        );
        if (response) {
          setMovieCast(response.data.cast);
        } else {
          console.log("No data found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    getCast(movieId);
  }, [movieId, options]);

  return (
    <>
      {movieCast && movieCast.length > 0 ? (
        <ul>
          {movieCast.map((actor) => (
            <li key={actor.credit_id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
              />
              <h4>Name: {actor.name}</h4>
              <h4>Character: {actor.character}</h4>
            </li>
          ))}
        </ul>
      ) : (
        <p>There is a problem with the actors cast.</p>
      )}
    </>
  );
};

export default MovieCast;
