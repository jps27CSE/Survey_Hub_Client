import axiosSecure from ".";

// Save Admin Feedback
export const saveAdminFeedback = async ({ adminEmail, feedbackText }) => {
  try {
    const { data } = await axiosSecure.post("/admin-feedback", {
      adminEmail,
      feedbackText,
    });

    return data;
  } catch (error) {
    console.error("Error saving admin feedback:", error.message);
    throw error;
  }
};

// Get All Admin Feedback
export const getAllAdminFeedback = async () => {
  try {
    const { data } = await axiosSecure.get("/admin-feedback");
    return data;
  } catch (error) {
    console.error("Error fetching admin feedback:", error.message);
    throw error;
  }
};
