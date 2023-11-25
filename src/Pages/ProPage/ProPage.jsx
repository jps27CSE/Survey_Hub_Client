const ProPage = () => {
  return (
    <div className="pro-page-container p-8 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Become a Pro User</h1>
      <p className="text-gray-600 mb-4">
        Unlock premium features with our Pro subscription.
      </p>

      <div className="subscription-details mb-6">
        <h2 className="text-lg font-semibold mb-2">Subscription Details</h2>
        <p>Monthly Subscription: $9.99</p>
        <p>Cancel anytime</p>
      </div>

      <div className="payment-section">
        <h2 className="text-lg font-semibold mb-2">Payment</h2>
        <p className="text-gray-600 mb-4">
          Securely pay with your credit card:
        </p>

        {/* Stripe Checkout Button (Integration needed) */}
        {/* Replace this with your Stripe integration */}
        <button className="btn btn-primary">Subscribe with Stripe</button>
      </div>
    </div>
  );
};

export default ProPage;
