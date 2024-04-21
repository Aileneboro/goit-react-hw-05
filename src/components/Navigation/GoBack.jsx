import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const GoBack = ({ to, children }) => {
  return (
    <Link to={to}>
      <BsFillArrowLeftSquareFill size="30" />
      {children}
    </Link>
  );
};
export default GoBack;
