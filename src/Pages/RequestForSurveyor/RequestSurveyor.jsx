import { useNavigate } from "react-router-dom";
import { becomeSurveyor } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { toast } from "react-toastify";

const RequestSurveyor = () => {
  const { user } = useAuth();
  const [role] = useRole();
  let navigate = useNavigate();

  const handleRequestSurveyor = async () => {
    try {
      const data = await becomeSurveyor(user?.email);
      console.log("API Response:", data); // Log the API response

      navigate("/");
      if (data.acknowledged === true) {
        toast.success("Success! Please wait for admin confirmation");
      } else {
        toast.info("Success! Please wait for approval");
      }
    } catch (error) {
      console.error("Error requesting surveyor:", error.message);
    }
  };

  return (
    <div className="card shadow-md p-6 m-4 bg-white rounded-md">
      <h2 className="text-xl font-bold mb-4">Request for Surveyor</h2>
      <div className="mb-4">
        <p>User Email: {user?.email}</p>
        <p>User Role: {role?.role}</p>
      </div>
      <button
        onClick={handleRequestSurveyor}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Request Surveyor
      </button>
    </div>
  );
};

export default RequestSurveyor;
