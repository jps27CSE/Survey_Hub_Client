import { useEffect, useState } from "react";
import { getSurveyVotes } from "../../api/survey";
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

const SurveyResponse = () => {
  const [surveyResponses, setSurveyResponses] = useState([]);

  useEffect(() => {
    const fetchSurveyVotes = async () => {
      try {
        const surveyVotes = await getSurveyVotes();
        setSurveyResponses(surveyVotes);
      } catch (error) {
        console.error("Error fetching survey votes:", error.message);
      }
    };

    fetchSurveyVotes();
  }, []);

  const dataForChart = surveyResponses.map((response, index) => ({
    name: response.userName,
    votedYes: response.selectedOption === "Yes" ? 1 : 0,
    votedNo: response.selectedOption === "No" ? 1 : 0,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-6">Survey Responses</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Voted</th>
            </tr>
          </thead>
          <tbody>
            {surveyResponses.map((response, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="py-2 px-4 border-b">{response.userName}</td>
                <td className="py-2 px-4 border-b">{response.userEmail}</td>
                <td className="py-2 px-4 border-b">{response.timestamp}</td>
                <td className="py-2 px-4 border-b">
                  {response.selectedOption === "Yes" ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={dataForChart}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="votedYes" fill="#82ca9d" />
            <Bar dataKey="votedNo" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SurveyResponse;
