import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">HomePage</NavLink>
        <NavLink to="/movies">MoviesPage</NavLink>
      </nav>
    </header>
  );
};
export default Navigation;
