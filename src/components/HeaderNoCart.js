import React from 'react';
import { Link } from 'react-router-dom';

const HeaderNoCart = ({ openCart }) => {
  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <Link to="/">
        <img src="logo.png" alt="Cozy Threads Logo" className="w-32" />
      </Link>
      <button
        onClick={() => (window.location.href = '/')}
        className="bg-none outline outline-1 text-white px-4 py-2 rounded-md my-3"
      >
        Return to store
      </button>
    </header>
  );
};

export default HeaderNoCart;
