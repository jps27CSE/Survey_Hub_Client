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
          {role && role.toLowerCase() === "admin" && (
            <li>
              <Link
                to="manage-users"
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
              >
                Manage Users
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/reports"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
            >
              <span className="material-icons">analytics</span>
              Reports
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700"
            >
              <span className="material-icons">settings</span>
              Settings
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
