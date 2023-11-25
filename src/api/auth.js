import axios from "axios";
import axiosSecure from ".";

export const saveUser = async (user) => {
  const currentUser = {
    email: user.email,
    role: "user",
    pro_user: "false",
    status: "Verified",
  };

  const { data } = await axiosSecure.put(`/users/${user?.email}`, currentUser);

  return data;
};

export const getToken = async (email) => {
  const { data } = await axiosSecure.post(`/jwt`, { email });
  console.log("token generated=>", data);
  return data;
};

export const clearCookie = async () => {
  console.log("hello");
  const { data } = await axiosSecure.get(`/logout`);
  return data;
};

// Get user role
export const getRole = async (email) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/user/${email}`
  );
  return data.role;
};

// Get All Users
export const getAllUsers = async () => {
  const { data } = await axiosSecure(`/users`);
  return data;
};

// update role
export const updateRole = async ({ email, role }) => {
  const currentUser = {
    email,
    role,
    status: "Verified",
  };

  const { data } = await axiosSecure.put(`/users/update/${email}`, currentUser);

  return data;
};
