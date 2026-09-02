# ecommerce_app

A full-stack e-commerce application for browsing products, filtering collections, managing a cart and wishlist, and signing in to an account.

## Built with

- React, Vite, Redux, and Tailwind CSS
- Node.js and Express
- MongoDB and Mongoose

## Frontend previews

<img src="client/src/assets/shopsphere-hero-v2.png" alt="ecommerce_app home page seasonal collection hero" width="100%" />

<p align="center">
  <img src="client/src/assets/cart.png" alt="ecommerce_app add-to-cart graphic" width="280" />
</p>

<img src="client/src/assets/banner1.png" alt="ecommerce_app shopping collection banner" width="100%" />

## Run locally

```bash
git clone https://github.com/miral-harsora/ecommerce_app.git
cd ecommerce_app
npm install
npm --prefix client install
```

Create a `.env` file based on `.env.example`, add your MongoDB connection string and `JWT_SECRET`, then run:

```bash
npm run dev
```

In a second terminal, start the frontend:

```bash
npm run client:dev
```

The API runs on `http://localhost:3001` and the frontend on `http://localhost:5173`.
