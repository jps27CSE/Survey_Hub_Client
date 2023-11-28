import { useEffect, useState } from "react";
import {
  addComment,
  getSurvey,
  hasUserVoted,
  incrementDislike,
  incrementLike,
  incrementVote,
  postSurveyReport,
  submitVote,
} from "../../../api/survey";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SurveyDetails = () => {
  const params = useParams();
  const [survey, setSurvey] = useState(null);
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [reportError, setReportError] = useState("");
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
    setSelectedOption(option);
  };

  const handleSubmitVote = async () => {
    if (selectedOption) {
      try {
        const userEmail = user?.email;
        const postData = {
          userName: user?.displayName,
          userEmail: user?.email,
          surveyId: survey._id,
          selectedOption: selectedOption,
        };

        const existingVote = await hasUserVoted(userEmail, survey._id);

        if (existingVote) {
          toast.error("You have already voted for this survey");
        } else {
          const data = await submitVote(postData);

          await incrementVote(survey._id, selectedOption);

          toast.success("Vote submitted successfully");
          console.log("Vote submitted successfully:", data.data);
        }
      } catch (error) {
        console.error("Error submitting vote:", error.message);
        toast.error("Failed to submit vote");
      }
    }
  };

  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleComment = async () => {
    try {
      const userEmail = user?.email;

      await addComment(survey._id, userEmail, commentContent);

      const updatedSurvey = await getSurvey(survey._id);
      setSurvey(updatedSurvey);

      toast.success("Comment added successfully");
      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error.message);
      toast.error("Failed to add comment");
    }
  };

  const handleLikeDislike = async (isLike) => {
    try {
      if (!user || !user.email) {
        toast.error("You need to be logged in to like or dislike the survey");
        return;
      }

      const userLiked = survey.likedBy?.includes(user.email);
      const userDisliked = survey.dislikedBy?.includes(user.email);

      if (isLike && !userLiked) {
        await incrementLike(survey._id);
        setSurvey((prevSurvey) => ({
          ...prevSurvey,
          likedBy: [...(prevSurvey.likedBy || []), user.email],
        }));
      } else if (!isLike && !userDisliked) {
        await incrementDislike(survey._id);
        setSurvey((prevSurvey) => ({
          ...prevSurvey,
          dislikedBy: [...(prevSurvey.dislikedBy || []), user.email],
        }));
      } else {
        toast.error("You have already liked or disliked this survey");
      }
    } catch (error) {
      console.error("Error liking or disliking survey:", error.message);
      toast.error("Failed to like or dislike survey");
    }
  };

  const handleReportSubmit = async () => {
    try {
      if (!reportContent.trim()) {
        setReportError("Report content cannot be empty");
        return;
      }

      await postSurveyReport(
        survey.title,
        survey._id,
        user?.email,
        reportContent
      );

      // Reset state
      setReportContent("");
      setReportError("");

      toast.success("Report submitted successfully");
    } catch (error) {
      console.error("Error submitting report:", error.message);
      setReportError("Failed to submit report");
    }
  };

  // Data for Recharts Bar Chart
  const dataForChart = [
    { option: "Yes", votes: survey.YesVotes || 0 },
    { option: "No", votes: survey.NoVotes || 0 },
  ];

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

        {/* Recharts Bar Chart */}
        <div className="mt-8">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dataForChart}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="option" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="votes" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Allow Pro-Users to Add Comments */}
        {role?.pro_user === true && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Add Comment</h3>
            <textarea
              value={commentContent}
              onChange={handleCommentChange}
              placeholder="Add your comment..."
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleComment}
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
        {/* Allow Users to Report the Survey (show only for logged-in users) */}
        {user ? (
          <div>
            <label
              htmlFor="reportContent"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Report Survey
            </label>
            <textarea
              id="reportContent"
              name="reportContent"
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              rows="4"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your report content..."
            ></textarea>
            {reportError && <p className="text-red-500 mt-2">{reportError}</p>}
            <button
              onClick={handleReportSubmit}
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Submit Report
            </button>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">
            Please log in to report this survey.
          </p>
        )}
      </div>
    </div>
  );
};

export default SurveyDetails;
