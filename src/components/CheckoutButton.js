import React from 'react';

const CheckoutButton = ({ cart }) => {
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from server:', errorData);
        return;
      }

      const session = await response.json();
      if (session.url) {
        window.location.href = session.url;
      } else {
        console.error('Failed to retrieve Stripe session URL');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-4 bg-blue-500 text-white px-4 py-2 w-full rounded-md"
    >
      Checkout with Stripe
    </button>
  );
};

export default CheckoutButton;
