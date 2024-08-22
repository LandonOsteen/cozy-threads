import React from 'react';
import CheckoutButton from './CheckoutButton';

const CartDrawer = ({ cart, isOpen, onClose, removeFromCart, color }) => {
  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div
      style={{ backgroundColor: color, minHeight: '100vh' }}
      className={`text-white fixed right-0 top-0 w-full h-full p-10 shadow-lg md:w-2/4 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300`}
    >
      <button onClick={onClose} className="text-sm p-4 text-red-600">
        CLOSE CART
      </button>
      <h2 className="text-3xl font-bold p-4">Your Cart</h2>
      <h2 className="text-sm p-4">
        Thank you for shopping on our test store. You can checkout using any of
        the sample credit card numbers{' '}
        <a
          href="https://stripe.com/docs/testing#cards"
          target="_blank"
          rel="noreferrer"
          className="text-green-200"
        >
          at this link.
        </a>
      </h2>
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
                Remove item
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
