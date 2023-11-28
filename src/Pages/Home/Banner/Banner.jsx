import { Link } from "react-router-dom";
import BannerPic from "../../../assets/images/banner.jpg";
import BannerAnimation from "../../../assets/lotties/Banner.json";
import Lottie from "lottie-react";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <div
        className="hero  h-3"
        style={{
          backgroundImage: `url(${BannerPic})`,
          height: "550px",
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className=" flex flex-col lg:flex-row">
            <div className="max-w-md">
              <h1 className="mb-5 mt-0 lg:mt-24 text-4xl font-bold">
                Welcome to <span className="text-blue-400">SurveyHub</span> Your
                Your Ultimate Survey Experience!
              </h1>
              <Link to="/survey">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Explore
                </button>
              </Link>
            </div>
            <div>
              <Lottie
                className="mx-auto w-80"
                animationData={BannerAnimation}
                loop={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
