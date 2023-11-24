import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllSurveys } from "../../api/survey.js";
import useAuth from "../../hooks/useAuth.jsx";

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

  return <div></div>;
};

export default Survey;
