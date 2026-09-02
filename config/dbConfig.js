const mongoose = require("mongoose");

const dbConnection = async () => {
    const connectionString = process.env.MONGODBURL || process.env.MONGO_URI;

    if (!connectionString) {
        throw new Error("Missing MONGODBURL (or MONGO_URI) environment variable.");
    }

    try {
        await mongoose.connect(connectionString, { serverSelectionTimeoutMS: 10000 });
        console.log("database connection successful");
    } catch (error) {
        console.error("database connection failed:", error.message);
        throw error;
    }
};

module.exports = dbConnection;
