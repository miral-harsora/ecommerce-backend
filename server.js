require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const dbConnection = require("./config/dbConfig");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const wishlistRoutes = require("./routes/wishlist");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const options = require("./swagger/swagger");

const app = express();
const port = Number(process.env.PORT) || 3001;
const allowedOrigins = process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
    : "*";
const swaggerSpec = swaggerJSDoc(options);

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({
    origin: allowedOrigins
}))
app.use('/api-docs',swaggerui.serve,swaggerui.setup(swaggerSpec))
app.use(express.json())
app.use("/products",productRoutes)
app.use("/cart",cartRoutes)
app.use("/wishlist",wishlistRoutes)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", database: "connected" });
});

const startServer = async () => {
    await dbConnection();
    app.listen(port, () => {
        console.log(`server is listening on port ${port}`);
    });
};

startServer().catch((error) => {
    console.error("Server startup aborted:", error.message);
    process.exit(1);
});
