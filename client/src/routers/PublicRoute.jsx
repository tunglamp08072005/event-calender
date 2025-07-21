import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PublicRoute = (props) => {
  const { isAuth, children } = props;

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

PublicRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
