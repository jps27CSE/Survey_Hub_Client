import user1 from "../../../assets/users/user1.jpg";
import user2 from "../../../assets/users/user2.jpg";
import user3 from "../../../assets/users/user3.jpg";

const Testimonials = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div>
        <h1 className="text-5xl font-bold text-center mt-10 mb-5">
          Testimonials
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Testimonial 1 */}
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
          <figure className="h-[400px]">
            <img src={user1} alt="User 1" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Jessica</h2>
            <p>
              <span className="font-bold">Review:</span> I absolutely loved the
              variety of surveys available. It's a great platform to share my
              opinions on different topics. The user interface is intuitive,
              making the survey-taking experience enjoyable.
            </p>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
          <figure className="h-[400px]">
            <img src={user2} alt="User 2" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Alex</h2>
            <p>
              <span className="font-bold">Review:</span> The AllPayments page is
              a lifesaver for keeping track of all my transactions. The detailed
              information about each payment helps me manage my finances more
              efficiently. Highly recommended for users looking for a
              comprehensive overview of their payments.
            </p>
          </div>
        </div>

        {/* Testimonial 3 */}
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
          <figure className="h-[400px]">
            <img src={user3} alt="User 3" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Michael</h2>
            <p>
              <span className="font-bold">Review:</span> The Featured Surveys
              section is fantastic! I enjoy exploring surveys with the highest
              votes. It's a quick way to discover popular topics and share my
              thoughts with the community. Great work on creating a
              user-friendly and engaging survey experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
