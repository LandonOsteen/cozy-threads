import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const Success = () => {
  const location = useLocation();
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionId = new URLSearchParams(location.search).get('session_id');
      const response = await fetch(
        `http://localhost:4242/checkout-session?sessionId=${sessionId}`
      );
      const data = await response.json();
      setSessionData(data);
    };

    fetchSession();
  }, [location]);

  if (!sessionData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <Header />
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-center my-8">
          Payment Successful
        </h1>
        <h1 className="text-xl font-semibold">Thank you for your purchase!</h1>
        <p>Payment ID: {sessionData.id}</p>
        <p>Amount: ${(sessionData.amount_total / 100).toFixed(2)}</p>
        <p>Payment Status: {sessionData.payment_status}</p>
        <button
          onClick={() => (window.location.href = '/')}
          className="bg-blue-500 text-white px-4 py-2 m-5"
        >
          Return to Store
        </button>
      </div>
    </div>
  );
};

export default Success;
