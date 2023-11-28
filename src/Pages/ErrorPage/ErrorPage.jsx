import { Link } from "react-router-dom";
import ErrorAnimation from "../../assets/lotties/ErrorPage.json";
import Lottie from "lottie-react";

const ErrorPage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Lottie
          className="mx-auto w-80"
          animationData={ErrorAnimation}
          loop={true}
        />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          404 Not Found
        </h1>
        <p className="text-lg text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to="/">
          <button className="btn btn-primary mt-2">Back To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
