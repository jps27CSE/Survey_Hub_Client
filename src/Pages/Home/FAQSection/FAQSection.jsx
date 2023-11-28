const FAQSection = () => {
  return (
    <div>
      <div>
        <h1 className="text-5xl font-bold text-center mt-10 mb-5">
          FAQ Section
        </h1>
      </div>
      <div className="collapse collapse-arrow bg-base-200 mb-2">
        <input type="radio" name="my-accordion-2" checked="checked" />
        <div className="collapse-title text-xl font-medium">
          What is the purpose of this survey site?
        </div>
        <div className="collapse-content">
          <p>
            The purpose of this survey site is to gather opinions and feedback
            from users on various topics and provide valuable insights.
          </p>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200 mb-2">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          How can I participate in a survey?
        </div>
        <div className="collapse-content">
          <p>
            To participate in a survey, navigate to the available surveys,
            choose a survey of interest, and follow the provided instructions to
            submit your responses.
          </p>
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-200 mb-2">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
          Can I view the results of a survey?
        </div>
        <div className="collapse-content">
          <p>
            Yes, you can view the results of a survey after it has received
            sufficient responses. The results are usually displayed in a
            graphical format for easy interpretation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
