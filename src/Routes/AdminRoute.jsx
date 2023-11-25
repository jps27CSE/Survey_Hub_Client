import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import Lottie from "lottie-react";
import Loading from "../assets/lotties/Loading.json";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading)
    return (
      <Lottie className="mx-auto w-80" animationData={Loading} loop={true} />
    );
  if (role === "admin") return children;
  return <Navigate to="/dashboard" />;
};

export default AdminRoute;

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
