import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ openCart }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-slate-950 shadow-md">
      <Link to="/">
        <img src="logo.png" alt="Cozy Threads Logo" className="w-32" />
      </Link>
      <button
        onClick={openCart}
        className="text-lg font-medium text-blue-500 hover:underline"
      >
        Open Cart
      </button>
    </header>
  );
};

export default Header;
