import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Survey from "../Pages/Survey/Survey";
import SurveyDetails from "../Pages/Survey/SurveyDetails/SurveyDetails";
import ProPage from "../Pages/ProPage/ProPage";
import PrivateRoute from "./PrivateRoute";
import Sidebar from "../Pages/Dashboard/Sidebar/Sidebar";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import SurveyStatus from "../Pages/Dashboard/SurveyStatus/SurveyStatus";
import AllPayments from "../Pages/Dashboard/AllPayments/AllPayments";
import CreateSurvey from "../Pages/Dashboard/CreateSurvey/CreateSurvey";

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
      {
        path: "/pro_page",
        element: (
          <PrivateRoute>
            <ProPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Sidebar />
      </PrivateRoute>
    ),
    children: [
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "survey-status",
        element: (
          <AdminRoute>
            <SurveyStatus />
          </AdminRoute>
        ),
      },
      {
        path: "all-payments",
        element: (
          <AdminRoute>
            <AllPayments />
          </AdminRoute>
        ),
      },
      {
        path: "create-survey",
        element: (
          <PrivateRoute>
            <CreateSurvey />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
