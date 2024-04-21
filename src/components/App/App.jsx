import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Navigation from "../Navigation/Navigation";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));

const App = () => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyN2E1NTk3OTYzMDQ5Y2IxNjVlOWZjMjkyMDc1ZmMwZCIsInN1YiI6IjY2MjI3NjA2MGQxMWYyMDE2NDAyMmFmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OzFWnDU3Z5NIS742jPFk-1hzwxazE0JJYR2XM_CyvO8",
    },
  };

  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage options={options} />} />
          <Route path="/movies" element={<MoviesPage options={options} />} />
          <Route
            path="/movies/:movieId/*"
            element={<MovieDetailsPage options={options} />}
          />
          <Route
            path="/movies/:movieId/cast"
            element={
              <MovieDetailsPage options={options}>
                <MovieCast options={options} />
              </MovieDetailsPage>
            }
          />
          <Route
            path="/movies/:movieId/reviews"
            element={
              <MovieDetailsPage options={options}>
                <MovieReviews options={options} />
              </MovieDetailsPage>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
