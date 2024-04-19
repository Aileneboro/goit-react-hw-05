import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieReviews = ({ options }) => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`,
          options
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (movieId) {
      fetchReviews();
    }
  }, [movieId, options]);

  return (
    <div>
      <h3>Movie Reviews</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
