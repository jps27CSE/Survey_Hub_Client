import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../Components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const ProPage = () => {
  return (
    <div className="pro-page-container p-8 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Become a Pro User</h1>
      <p className="text-gray-600 mb-4">
        Unlock premium features with our Pro subscription.
      </p>

      <div className="subscription-details mb-6">
        <h2 className="text-lg font-semibold mb-2">Subscription Details</h2>
        <p>Monthly Subscription: $10.00</p>
        <p>Cancel anytime</p>
      </div>

      <div className="payment-section">
        <h2 className="text-lg font-semibold mb-2">Payment</h2>
        <p className="text-gray-600 mb-4">
          Securely pay with your credit card:
        </p>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default ProPage;
