import { useEffect, useState } from "react";
import { getSurvey } from "../../../api/survey";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const SurveyDetails = () => {
  const params = useParams();
  const [survey, setSurvey] = useState(null);
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption);
  const [role] = useRole();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSurvey(params.id);
        setSurvey(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [params.id]);

  if (!survey) {
    return <div>Loading...</div>;
  }

  const handleVote = (option) => {
    // Find the selected option by its id and set its text in the state
    setSelectedOption(option);
  };

  const handleSubmitVote = () => {
    // Implement the logic to submit the vote to the backend
    if (selectedOption) {
      console.log(`Submitting vote for option: ${selectedOption}`);
      // Add your API call to submit the vote here
    }
  };

  const handleComment = (comment) => {
    // Implement the logic to handle user commenting
  };

  const handleLikeDislike = (isLike) => {
    // Implement the logic to handle user liking or disliking the survey
  };

  const handleReport = () => {
    // Implement the logic to handle user reporting the survey
  };

  return (
    <div>
      <div className="card shadow-md p-6 m-4 bg-white rounded-md">
        <h2 className="text-xl font-bold mb-4">{survey.title}</h2>
        <p className="text-gray-600 mb-4">{survey.description}</p>

        {/* Display Options for Voting */}
        <div className="mb-4">
          {survey?.options?.map((option, index) => (
            <div key={index} className="mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="voteOption"
                  value={option.id}
                  onChange={() => handleVote(option)}
                  className="mr-2"
                />
                {option}
              </label>
            </div>
          ))}
        </div>

        {selectedOption && (
          <button
            onClick={handleSubmitVote}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Vote
          </button>
        )}

        {/* Display Results */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Survey Results</h3>
          {/* Implement the logic to display survey results visually using charts */}
        </div>

        {/* Allow Pro-Users to Add Comments */}
        {role === "pro-user" && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Add Comment</h3>
            <textarea
              placeholder="Add your comment..."
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={() => handleComment("comment content")}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Comment
            </button>
          </div>
        )}

        {/* Display Comments */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          {survey?.comments?.map((comment, index) => (
            <div key={index} className="border-b border-gray-300 pb-2 mb-2">
              <p className="mb-1">{comment.content}</p>
              <p className="text-sm text-gray-500">Posted by: {comment.user}</p>
            </div>
          ))}
        </div>

        {/* Allow Users to Like or Dislike the Survey */}
        <div className="mb-4">
          <button
            onClick={() => handleLikeDislike(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
          >
            Like
          </button>
          <button
            onClick={() => handleLikeDislike(false)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Dislike
          </button>
        </div>

        {/* Allow Users to Report the Survey */}
        <div>
          <button
            onClick={handleReport}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Report Survey
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
