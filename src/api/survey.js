import axios from "axios";
import axiosSecure from ".";

//fetch all rooms from db
export const getAllSurveys = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/surveys`);
  return data;
};
