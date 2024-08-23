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
    <div className="container mx-auto">
      <HeaderNoCart />
      <h1 className="text-4xl text-center my-8 font-semibold">
        Payment Successful
      </h1>
      <h1 className="text-lg font-semibold">Thank you for your purchase!</h1>
      <h1 className="text-md font-semibold">
        Here are the details for your purchase:
      </h1>
      <p>Payment ID: {sessionData.id}</p>
      <p>Amount: ${(sessionData.amount_total / 100).toFixed(2)}</p>
      <p>Payment Status: {sessionData.payment_status}</p>

      <h2 className="text-lg font-semibold mt-6">Purchase History:</h2>
      {paymentHistory.length > 0 ? (
        <ul>
          {paymentHistory.map((payment) => (
            <li key={payment.id}>
              Payment ID: {payment.id}, Amount: $
              {(payment.amount / 100).toFixed(2)}, Status: {payment.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No previous purchases found.</p>
      )}

      <button
        href="/"
        className="bg-blue-500 text-white px-4 py-2 rounded-md my-3"
      >
        Return to store
      </button>
    </div>
  );
};

export default Success;
