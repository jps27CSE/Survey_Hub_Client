import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Lottie from "lottie-react";
import Loading from "../assets/lotties/Loading.json";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <Lottie className="mx-auto w-80" animationData={Loading} loop={true} />
    );

  if (user) return children;
  return <Navigate to="/login" state={{ from: location }} replace="true" />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
