# 🛒 E-Commerce Backend API

This project provides a RESTful API for an e-commerce platform. It includes functionality for managing products, categories, shopping carts, and wishlists.

It also includes the ShopSphere React frontend in `client/`. A production build is served by the Express app, so the repository can be deployed as one service.

## 🚀 Features

- Product listing and details
- Category listing
- Shopping cart functionality
- Wishlist functionality

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- RESTful API 

## 📁 Folder Structure

/ecommerce-backend │ ├── controllers/ ├── models/ ├── routes/ ├── middlewares/ ├── config/ ├── utils/ ├── .env ├── server.js └── README.md

## 📦 API Endpoints

![Screenshot 2025-04-29 162408](https://github.com/user-attachments/assets/f2fba51c-8eaa-4c68-8807-39d94c42e0cc)


📌 Setup Instructions
Clone the repository:

git clone https://github.com/yourusername/ecommerce-backend.git
Navigate to the project folder:
cd ecommerce-backend

Install dependencies:
npm install

Set up .env file:
PORT=3001
MONGODBURL=mongodb+srv://<username>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority
CORS_ORIGIN=http://localhost:5173

Run the server:
npm run dev

## Frontend development and production build

Install frontend dependencies and run Vite in a second terminal:

```bash
npm --prefix client ci
npm run client:dev
```

The Vite dev server proxies product, cart, and wishlist calls to the backend at `http://localhost:3001`. To create the production client bundle, run:

```bash
npm run build
```

After the build, `npm start` serves the React app and API from the same origin. The generated `client/dist` directory and dependency directories are intentionally not committed.

## Recreate the product catalogue

After configuring a new MongoDB Atlas connection, populate the `products` collection with:

```bash
npm run seed:products
```

The command downloads the public DummyJSON catalogue and upserts it by product ID. It does not delete existing products, carts, or wishlists.
