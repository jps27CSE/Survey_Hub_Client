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

// Submit a vote for a survey
export const submitVote = async (postData) => {
  try {
    const response = await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/submit-vote`,
      postData
    );
    console.log("Vote submitted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting vote:", error.message);
    throw error;
  }
};

// increate vote for a survey

// Increment vote for a survey
export const incrementVote = async (id, option) => {
  try {
    const response = await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/increment-vote/${id}/${option}`
    );
    console.log("Vote incremented successfully:", response.data);
  } catch (error) {
    console.error("Error incrementing vote:", error.message);
    throw error;
  }
};

// vote check
export const hasUserVoted = async (userEmail, surveyId) => {
  try {
    const response = await axiosSecure.get(
      `${import.meta.env.VITE_API_URL}/has-user-voted/${userEmail}/${surveyId}`
    );

    return response.data.hasVoted;
  } catch (error) {
    console.error("Error checking if user has voted:", error.message);
    return false; // Assume the user has not voted in case of an error
  }
};

// Add a comment to a survey
export const addComment = async (surveyId, userEmail, commentContent) => {
  try {
    const postData = {
      surveyId: surveyId,
      userEmail: userEmail,
      commentContent: commentContent,
    };

    const response = await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/add-comment`,
      postData
    );

    console.log("Comment added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error.message);
    throw error;
  }
};

// Create a new survey
export const createSurvey = async (surveyData) => {
  console.log("hit");
  try {
    const response = await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/create-survey`,
      surveyData
    );

    console.log("Survey created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating survey:", error.message);
    throw error;
  }
};
// Increment like
export const incrementLike = async (id) => {
  try {
    const response = await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/increment-like/${id}`
    );
    console.log("Like incremented successfully:", response.data);
  } catch (error) {
    console.error("Error incrementing like:", error.message);
    throw error;
  }
};

// Increment dislike
export const incrementDislike = async (id) => {
  try {
    const response = await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/increment-dislike/${id}`
    );
    console.log("Dislike incremented successfully:", response.data);
  } catch (error) {
    console.error("Error incrementing dislike:", error.message);
    throw error;
  }
};
// Post survey report
export const postSurveyReport = async (surveyId, userEmail, reportContent) => {
  try {
    const postData = {
      userEmail: userEmail,
      reportContent: reportContent,
    };

    const response = await axiosSecure.post(
      `${import.meta.env.VITE_API_URL}/post-report/${surveyId}`,
      postData
    );

    console.log("Report submitted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error submitting report:", error.message);
    throw error;
  }
};
