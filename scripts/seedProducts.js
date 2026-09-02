require("dotenv").config();

const mongoose = require("mongoose");
const dbConnection = require("../config/dbConfig");
const Product = require("../models/Product");

const PRODUCT_API_URL = "https://dummyjson.com/products?limit=0";

const seedProducts = async () => {
    await dbConnection();

    try {
        const response = await fetch(PRODUCT_API_URL);
        if (!response.ok) {
            throw new Error(`Could not download products (${response.status}).`);
        }

        const { products } = await response.json();
        if (!Array.isArray(products) || products.length === 0) {
            throw new Error("The product source returned no products.");
        }

        const operations = products.map((product) => ({
            replaceOne: {
                filter: { id: product.id },
                replacement: { ...product, _id: String(product.id) },
                upsert: true,
            },
        }));

        const result = await Product.bulkWrite(operations, { ordered: false });
        console.log(`Product seed complete: ${products.length} products processed.`, result);
    } finally {
        await mongoose.disconnect();
    }
};

seedProducts().catch((error) => {
    console.error("Product seed failed:", error.message);
    process.exitCode = 1;
});
