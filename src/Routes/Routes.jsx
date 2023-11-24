import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Survey from "../Pages/Survey/Survey";
import SurveyDetails from "../Pages/Survey/SurveyDetails/SurveyDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/survey",
        element: <Survey />,
      },
      {
        path: "/survey/:id",
        element: <SurveyDetails />,
      },
    ],
  },
]);

export default router;
