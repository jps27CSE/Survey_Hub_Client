import "./App.css";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Pages/Common/Navbar";

function App() {
  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <ToastContainer />
      <Outlet />
    </div>
  );
}

export default App;
