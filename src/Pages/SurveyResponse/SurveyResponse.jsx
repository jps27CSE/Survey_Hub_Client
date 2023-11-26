import { useEffect, useState } from "react";
import { getSurveyVotes } from "../../api/survey";

const SurveyResponse = () => {
  const [surveyResponses, setSurveyResponses] = useState([]);
  console.log(surveyResponses);
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

      {/* Add chart component here */}
    </div>
  );
};

export default SurveyResponse;
