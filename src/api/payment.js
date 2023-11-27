import axiosSecure from ".";

//create payment intent
export const createPaymentIntent = async (price) => {
  try {
    const { data } = await axiosSecure.post("/create-payment-intent", {
      price,
    });
    return data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

export const savePayment = async (paymentDetails) => {
  try {
    const { data } = await axiosSecure.post("/save-payment", paymentDetails);
    return data;
  } catch (error) {
    console.error("Error saving payment:", error);
    throw error;
  }
};

export const getAllPayments = async () => {
  try {
    const { data } = await axiosSecure.get("/all-payments");
    return data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
};
