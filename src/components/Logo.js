import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <img
        src="logo.png"
        alt="Cozy Threads Logo"
        className="mx-auto w-1/6 m-10"
      />
    </Link>
  );
};

export default Logo;
