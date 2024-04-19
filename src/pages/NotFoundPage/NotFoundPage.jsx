import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <p>Not Found Page.</p>
      <Link to="/">Go back to Home page.</Link>
    </div>
  );
};

export default NotFoundPage;
