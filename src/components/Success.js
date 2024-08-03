import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const [sessionData, setSessionData] = useState(null);
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
        setSessionData(data);
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
      <h1 className="text-4xl text-center my-8">Payment Successful</h1>
      <p>Thank you for your purchase!</p>
      <p>Payment ID: {sessionData.id}</p>
      <p>Amount: ${(sessionData.amount_total / 100).toFixed(2)}</p>
      <p>Payment Status: {sessionData.payment_status}</p>
    </div>
  );
};

export default Success;
