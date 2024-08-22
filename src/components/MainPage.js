// src/components/MainPage.js
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import CartDrawer from './CartDrawer';
import Header from './Header';

const products = [
  {
    id: 1,
    title: 'Hire Me Tee',
    description: 'Comes in multiple shades of transparent.',
    price: 20,
    image: './shirts/1.png',
  },
  {
    id: 2,
    title: 'Nonsense Tee',
    description: 'Perfect for grammar buffs.',
    price: 20,
    image: './shirts/2.png',
  },
  {
    id: 3,
    title: 'Job Title Tee',
    description: 'The coolest of job titles in shirt form.',
    price: 20,
    image: './shirts/3.png',
  },
  {
    id: 4,
    title: 'Ethical Always',
    description: 'Amazing company, cozy threads, truly.',
    price: 20,
    image: './shirts/4.png',
  },
  {
    id: 5,
    title: 'Striped Tee',
    description: 'Hopefully not copyright infringement.',
    price: 20,
    image: './shirts/5.png',
  },
  {
    id: 6,
    title: 'Logo Tee',
    description: 'For those who are especially passionate about our brand.',
    price: 20,
    image: './shirts/6.png',
  },
];

const MainPage = ({ color }) => {
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setDrawerOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  return (
    <div className="container mx-auto">
      <Header openCart={() => setDrawerOpen(true)} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
      <CartDrawer
        color={color}
        cart={cart}
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default MainPage;
