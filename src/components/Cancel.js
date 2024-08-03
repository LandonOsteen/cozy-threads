import React from 'react';
import Header from './Header';

const Cancel = () => {
  return (
    <div className="container mx-auto">
      <Header />
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-center my-6">
          Payment Canceled
        </h1>
        <p className="text-center">
          Your payment was canceled. Please try again.
        </p>
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

export default Cancel;
