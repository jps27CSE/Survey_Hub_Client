import { Link, Outlet } from "react-router-dom";
import useRole from "../../../hooks/useRole";

const Sidebar = () => {
  const [role, isLoading] = useRole();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-64 p-4">
        <div className="text-2xl font-bold mb-4">Dashboard</div>

        <ul className="space-y-2">
          {role?.role && role?.role.toLowerCase() === "admin" && (
            <>
              <li>
                <Link
                  to="manage-users"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
                >
                  Manage Users
                </Link>
              </li>
              <li>
                <Link
                  to="survey-status"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
                >
                  Survey Status
                </Link>
              </li>
              <li>
                <Link
                  to="all-payments"
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
                >
                  All Payments
                </Link>
              </li>
            </>
          )}
          {role?.role && role?.role.toLowerCase() === "surveyor" && (
            <li>
              <Link
                to="create-survey"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
              >
                Create Survey
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
            >
              Home
            </Link>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
