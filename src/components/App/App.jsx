import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Navigation from "../Navigation/Navigation";

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
      <Routes>
        <Route path="/" element={<HomePage options={options} />} />
        <Route path="/movies" element={<MoviesPage options={options} />} />
        <Route
          path="/movies/:movieId/*"
          element={<MovieDetailsPage options={options} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
