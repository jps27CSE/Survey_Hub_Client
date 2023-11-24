import axios from "axios";
import axiosSecure from ".";

//fetch all survey from db
export const getAllSurveys = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/surveys`);
  return data;
};

// fetch single survey from db
export const getSurvey = async (id) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/surveys/${id}`
  );
  return data;
};
