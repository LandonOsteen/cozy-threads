# Cozy Threads

Cozy Threads is a simple, responsive e-commerce web application built using React, Node.js, and Tailwind CSS. It allows users to browse products, add items to a cart, and proceed to checkout using the Stripe API.

## Features

- Responsive design with Tailwind CSS
- Product grid with image previews
- Add to cart functionality
- Cart drawer with item preview and total calculation
- Stripe integration for secure checkout
- Mobile-friendly layout

## Architecture

The application is divided into two main components:

### Frontend

- **React**: Component-based architecture for a dynamic user interface.
- **Tailwind CSS**: Utility-first approach for styling, enabling rapid development of responsive designs.
- **React Router**: For client-side routing and navigation.

### Backend

- **Node.js**: Serverless functions deployed on Vercel to handle API requests.
- **Stripe API**: Used for creating checkout sessions and processing payments.
