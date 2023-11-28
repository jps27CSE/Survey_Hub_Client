import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllSurveys } from "../../api/survey.js";
import useAuth from "../../hooks/useAuth.jsx";
import SurveyCard from "./SurveyCard/SurveyCard.jsx";
import Footer from "../Footer/Footer.jsx";

const Survey = () => {
  const { user, loading } = useAuth();
  const [filter, setFilter] = useState({
    title: "",
    category: "",
    vote: null,
  });

  const {
    data: surveys = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled: !loading,
    queryFn: async () => await getAllSurveys(),
  });

  const publishedSurveys = surveys.filter((survey) => survey.publish);

  const handleFilterChange = (filterName, value) => {
    setFilter((prevFilter) => ({ ...prevFilter, [filterName]: value }));
  };

  const filteredSurveys = publishedSurveys.filter((survey) => {
    const titleMatch = survey.title
      .toLowerCase()
      .includes(filter.title.toLowerCase());
    const categoryMatch = filter.category
      ? survey.category.toLowerCase() === filter.category.toLowerCase()
      : true;
    const voteMatch =
      filter.vote !== null ? survey.votes === filter.vote : true;

    return titleMatch && categoryMatch && voteMatch;
  });

  return (
    <div>
      {/* Filter Section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by Title"
          value={filter.title}
          onChange={(e) => handleFilterChange("title", e.target.value)}
          className="input border-2 border-gray-300 mt-2"
        />
        {/* Add other filter inputs as needed */}
      </div>

      {/* Survey Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {filteredSurveys.map((survey) => (
          <SurveyCard key={survey._id} survey={survey} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Survey;
