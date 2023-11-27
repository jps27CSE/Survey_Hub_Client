import { saveAdminFeedback } from "../../../api/admin";
import {
  getAllSurveys,
  updatePublishStatusFalse,
  updatePublishStatusTrue,
} from "../../../api/survey";

import { useQuery } from "@tanstack/react-query";
import useRole from "../../../hooks/useRole";

const SurveyStatus = () => {
  const [role] = useRole();
  const { data: surveyData = [], refetch } = useQuery({
    queryKey: ["response"],
    queryFn: async () => await getAllSurveys(),
  });

  const handlePublishStatusUpdate = async (id) => {
    try {
      await updatePublishStatusTrue(id);

      refetch();
    } catch (error) {
      console.error("Error updating publish status:", error.message);
    }
  };

  const handlePublishStatusUpdateFalse = async (id) => {
    try {
      await updatePublishStatusFalse(id);

      refetch();
    } catch (error) {
      console.error("Error updating publish status:", error.message);
    }
  };

  const handleSubmitFeedback = async () => {
    try {
      const feedbackText = document.getElementById("feedback").value;

      if (!feedbackText) {
        console.error("Feedback text is required.");
        return;
      }

      const result = await saveAdminFeedback({
        adminEmail: role?.email,

        feedbackText,
      });

      console.log("Admin feedback saved successfully:", result);

      // Optionally, close the modal after submission
      document.getElementById("my_modal_feedback").close();
    } catch (error) {
      console.error("Error saving admin feedback:", error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-6">Survey Responses</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User Email</th>
              <th className="py-2 px-4 border-b">Survey Title</th>
              <th className="py-2 px-4 border-b">Publish Status</th>
              <th className="py-2 px-4 border-b">Action</th>
              <th className="py-2 px-4 border-b">Feedback</th>
            </tr>
          </thead>
          <tbody>
            {surveyData?.map((survey) => (
              <tr key={survey._id}>
                <td className="py-2 px-4 border-b">{survey.userEmail}</td>
                <td className="py-2 px-4 border-b">{survey.title}</td>
                <td className="py-2 px-4 border-b">
                  {survey.publish ? (
                    <span className="text-green-500">Published</span>
                  ) : (
                    <span className="text-red-500">Unpublished</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handlePublishStatusUpdate(survey?._id, true)}
                    className="btn"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() =>
                      handlePublishStatusUpdateFalse(survey?._id, false)
                    }
                    className="btn ml-2"
                  >
                    Unpublish
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_feedback").showModal()
                    }
                  >
                    Give Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      <dialog id="my_modal_feedback" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Feedback</h3>
          {/* Feedback form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitFeedback();
            }}
          >
            <label htmlFor="feedback">Your Feedback:</label>
            <input
              type="text"
              id="feedback"
              name="feedback"
              className="input ml-2 border-2 border-sky-500 "
            />
            <div className="modal-action">
              <button type="submit" className="btn">
                Submit
              </button>
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_feedback").close()
                }
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default SurveyStatus;
