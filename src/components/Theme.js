import { useState } from 'react';
import HeaderNoCart from './HeaderNoCart';

export const Theme = ({ setColor }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setColor(inputValue); // Update background color
  };

  return (
    <>
      <HeaderNoCart />
      <div className="flex flex-col items-center justify-center m-10">
        <h1 className="text-xl font-medium mb-6 text-white">
          Edit your theme here
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <input
            type="text"
            placeholder="Enter a hex color code"
            className="text-black w-full max-w-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="w-full max-w-sm px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Change Color
          </button>
        </form>
      </div>
    </>
  );
};
