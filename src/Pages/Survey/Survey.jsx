import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllSurveys } from "../../api/survey.js";
import useAuth from "../../hooks/useAuth.jsx";
import SurveyCard from "./SurveyCard/SurveyCard.jsx";

const Survey = () => {
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

  console.log(surveys);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surveys?.map((survey) => (
        <SurveyCard key={survey._id} survey={survey} />
      ))}
    </div>
  );
};

export default Survey;
