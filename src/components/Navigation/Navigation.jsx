import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header>
      <nav>
        <NavLink exact="true" to="/" activeclassname="active">
          Home
        </NavLink>
        <NavLink to="/movies" activeclassname="active">
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
