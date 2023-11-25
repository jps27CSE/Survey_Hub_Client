import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../api/auth";
import UserDataRow from "./UserDataRow";
import { useState } from "react";

const ManageUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await getAllUsers(),
  });

  const [filter, setFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    if (filter === "pro") return user?.pro_user === "true";
    if (filter === "user") return user?.role === "user";
    if (filter === "surveyor") return user?.role === "surveyor";
    return true;
  });
  return (
    <div>
      {" "}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <div className="mb-4">
                <label className="text-sm font-semibold">Filter:</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-1 border rounded-md ml-2"
                >
                  <option value="all">All</option>
                  <option value="pro">Pro Users</option>
                  <option value="normal">Users</option>
                  <option value="surveyor">Surveyors</option>
                </select>
              </div>

              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Pro User
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* User data table row */}
                  {filteredUsers.map((user) => (
                    <UserDataRow key={user._id} user={user} refetch={refetch} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
