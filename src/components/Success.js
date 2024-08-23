import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderNoCart from './HeaderNoCart';

const Success = () => {
  const location = useLocation();
  const [sessionData, setSessionData] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionId = new URLSearchParams(location.search).get('session_id');
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/checkout-session?sessionId=${sessionId}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSessionData(data.session);
        setPaymentHistory(data.paymentHistory);
      } catch (error) {
        console.error('Error fetching session data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!sessionData) {
    return <div>Failed to load session data.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderNoCart />
      <div className="container mx-auto px-4 py-12">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center text-green-600 mb-8">
            Payment Successful!
          </h1>
          <p className="text-lg text-center mb-6">
            Thank you for your purchase! Below are your purchase details.
          </p>

          <div className="p-4 rounded-lg border border-gray-300 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Purchase Summary:
            </h2>
            <p className="text-gray-600">
              <strong>Payment ID:</strong> {sessionData.id}
            </p>
            <p className="text-gray-600">
              <strong>Amount:</strong> $
              {(sessionData.amount_total / 100).toFixed(2)}
            </p>
            <p className="text-gray-600">
              <strong>Payment Status:</strong> {sessionData.payment_status}
            </p>
          </div>

          <div className="p-4 rounded-lg border border-gray-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Purchase History:
            </h2>
            {paymentHistory.length > 0 ? (
              <ul className="space-y-2">
                {paymentHistory.map((payment) => (
                  <li
                    key={payment.id}
                    className="p-4 rounded-md border border-gray-300"
                  >
                    <p className="text-gray-600">
                      <strong>Payment ID:</strong> {payment.id}
                    </p>
                    <p className="text-gray-600">
                      <strong>Amount:</strong> $
                      {(payment.amount / 100).toFixed(2)}
                    </p>
                    <p className="text-gray-600">
                      <strong>Status:</strong> {payment.status}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No previous purchases found.</p>
            )}
          </div>

          <div className="text-center mt-8">
            <a
              href="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md"
            >
              Return to Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
