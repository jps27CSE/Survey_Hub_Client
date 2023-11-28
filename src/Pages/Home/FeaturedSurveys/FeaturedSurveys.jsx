import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getAllSurveys } from "../../../api/survey";

const FeaturedSurveys = () => {
  const { user, loading } = useAuth();
  const {
    data: surveys = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled: !loading,
    queryFn: async () => await getAllSurveys(),
  });

  // Sort surveys based on votes in descending order
  const sortedSurveys = [...surveys].sort((a, b) => b.votes - a.votes);

  console.log(surveys);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 mt-2 mx-auto">Featured Surveys</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {sortedSurveys.map((survey) => (
          <div
            key={survey._id}
            className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-lg p-6 mb-6"
          >
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
        ))}
      </div>
    </div>
  );
};

export default FeaturedSurveys;
