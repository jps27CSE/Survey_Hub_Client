import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { createPaymentIntent, savePayment } from "../api/payment";
import useRole from "../hooks/useRole";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { updateProUser } from "../api/auth";

const CheckoutForm = () => {
  const [role] = useRole();
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    try {
      const { clientSecret } = await createPaymentIntent(10);

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: role?.email,
            },
          },
        });

      if (confirmError) {
        console.error("Error confirming payment:", confirmError);
        setError("Error confirming payment. Please try again.");
      } else {
        console.log("Payment intent:", paymentIntent);

        if (paymentIntent.status === "succeeded") {
          console.log("Transaction ID:", paymentIntent.id);
          setTransactionId(paymentIntent.id);

          const paymentDetails = {
            userEmail: role?.email,
            paymentMethodId: paymentIntent.payment_method,
            transactionId: paymentIntent.id,
            price: 10,
          };

          await savePayment(paymentDetails);
          await updateProUser(role?.email);
          toast.success("Successfully processed payment");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("Error processing payment. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
