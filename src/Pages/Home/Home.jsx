import Footer from "../Footer/Footer";
import Banner from "./Banner/Banner";
import FAQSection from "./FAQSection/FAQSection";
import FeaturedSurveys from "./FeaturedSurveys/FeaturedSurveys";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <FeaturedSurveys />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Home;
