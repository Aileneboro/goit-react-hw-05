import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
    </header>
  );
};
export default Navigation;
