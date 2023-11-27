import { useState, useEffect } from "react";
import { getAllPayments } from "../../../api/payment";

const AllPayments = () => {
  const [payments, setPayments] = useState(null);

  useEffect(() => {
    // Fetch payments data from the server
    const fetchPayments = async () => {
      try {
        const response = await getAllPayments();

        setPayments(response);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-6">All Payments</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">User Email</th>
              <th className="py-2 px-4 border-b">Payment Method ID</th>
              <th className="py-2 px-4 border-b">Transaction ID</th>
              <th className="py-2 px-4 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="py-2 px-4 border-b">{payment.userEmail}</td>
                <td className="py-2 px-4 border-b">
                  {payment.paymentMethodId}
                </td>
                <td className="py-2 px-4 border-b">{payment.transactionId}</td>
                <td className="py-2 px-4 border-b">${payment.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPayments;
