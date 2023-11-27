import { useEffect, useState } from "react";
import { getAllAdminFeedback } from "../../../api/admin";

const AdminFeedback = () => {
  const [adminFeedback, setAdminFeedback] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    const fetchAdminFeedback = async () => {
      try {
        const feedbackData = await getAllAdminFeedback();
        setAdminFeedback(feedbackData);
      } catch (error) {
        console.error("Error fetching admin feedback:", error.message);
      }
    };

    fetchAdminFeedback();
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
      <h1 className="text-2xl font-bold mb-6">Admin Feedback</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminFeedback.map((feedback) => (
          <div key={feedback._id} className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">
              {feedback.adminEmail}
            </h3>
            <p className="text-gray-600 mb-4">{feedback.feedbackText}</p>
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
                {selectedFeedback.adminEmail}
              </h2>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Feedback Text:</span>{" "}
                {selectedFeedback.feedbackText}
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

export default AdminFeedback;
