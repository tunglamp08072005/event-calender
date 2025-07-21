import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const { isAuth, children } = props;

  if (isAuth) {
    return children;
  }

  return <Navigate to="/auth/login" />;
};

PrivateRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
