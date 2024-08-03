import React from 'react';
import CheckoutButton from './CheckoutButton';

const CartDrawer = ({ cart, isOpen, onClose, removeFromCart }) => {
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div
      className={`fixed right-0 top-0 w-1/3 h-full p-10 bg-slate-950 shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300`}
    >
      <button onClick={onClose} className="text-xl p-4">
        x
      </button>
      <h2 className="text-3xl font-bold p-4">Your Cart</h2>
      <div className="p-4">
        {cart.map((product) => (
          <div key={product.id}>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center my-1">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="text-green-200 font-semibold">
                    ${product.price}
                  </p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <hr className="w-full" />
        <div className="text-2xl font-bold my-5">Total: ${total}</div>
        <CheckoutButton cart={cart} />
      </div>
    </div>
  );
};

export default CartDrawer;
