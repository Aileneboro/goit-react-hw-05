import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import css from "./GoBack.module.css";

const GoBack = ({ to, children }) => {
  return (
    <div className={css.gbWrapp}>
      <Link className={css.goBackButton} to={to}>
        <BsFillArrowLeftSquareFill size="25" />
        {children}
      </Link>
    </div>
  );
};
export default GoBack;
