import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SurveyCard = ({ survey }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold mb-2">{survey.title}</h2>
      <p className="text-gray-600 mb-4">{survey.description}</p>
      <div className="flex items-center justify-between">
        <p className="text-gray-500">Category: {survey.category}</p>
        <p className="text-gray-500">Votes: {survey.votes}</p>
      </div>
      {/* Add additional information as needed */}
      <Link to={`/survey/${survey._id}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          View Details
        </button>
      </Link>
    </div>
  );
};

export default SurveyCard;

SurveyCard.propTypes = {
  survey: PropTypes.object.isRequired,
};
