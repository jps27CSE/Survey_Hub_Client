import { useEffect, useState } from "react";
import { getAllSurveyReports } from "../../../api/survey";

const UserFeedback = () => {
  const [surveyReports, setSurveyReports] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const fetchSurveyReports = async () => {
      try {
        const reports = await getAllSurveyReports();
        setSurveyReports(reports);
      } catch (error) {
        console.error("Error fetching survey reports:", error.message);
      }
    };

    fetchSurveyReports();
  }, []);

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);

    document.getElementById("my_modal_1").showModal();
  };

  const closeModal = () => {
    setSelectedFeedback(null);

    document.getElementById("my_modal_1").close();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-6">User Feedback</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surveyReports.map((feedback) => (
          <div
            key={feedback._id.$oid}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <h3 className="text-lg font-semibold mb-2">
              {feedback.surveyTitle}
            </h3>
            <p className="text-gray-600 mb-4">{feedback.reportContent}</p>
            <button
              onClick={() => openModal(feedback)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Native dialog element */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          {selectedFeedback && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {selectedFeedback.surveyTitle}
              </h2>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Report Content:</span>{" "}
                {selectedFeedback.reportContent}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Report User Mail:</span>{" "}
                {selectedFeedback.userEmail}
              </p>
              <button
                onClick={closeModal}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default UserFeedback;
