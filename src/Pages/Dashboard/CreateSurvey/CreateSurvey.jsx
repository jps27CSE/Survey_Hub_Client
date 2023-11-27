import { useState } from "react";
import { createSurvey } from "../../../api/survey";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useRole from "../../../hooks/useRole";

const CreateSurvey = () => {
  const [role] = useRole();
  const userEmail = role?.email;
  let navigate = useNavigate();
  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
    options: ["Yes", "No"],
    category: "",
    userEmail: userEmail,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const createdSurvey = await createSurvey(surveyData);
      console.log("Created Survey:", createdSurvey);

      // Reset the form
      setSurveyData({
        title: "",
        description: "",
        options: ["Yes", "No"],
        category: "",
      });
      navigate("/survey");
      toast.success("Survey created successfully");
    } catch (error) {
      console.error("Error creating survey:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurveyData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create a New Survey</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={surveyData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            name="description"
            value={surveyData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Options:
          </label>
          <select
            name="options"
            value={surveyData.options}
            onChange={handleInputChange}
            multiple
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category:
          </label>
          <input
            type="text"
            name="category"
            value={surveyData.category}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Survey
        </button>
      </form>
    </div>
  );
};

export default CreateSurvey;
