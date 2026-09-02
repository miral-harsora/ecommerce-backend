const mongoose = require("mongoose");

// Product fields come from the catalogue and may evolve. Keep the cart's own
// contract small while retaining the complete product snapshot for display.
const cartSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
    },
    { strict: false, versionKey: false }
);

module.exports = mongoose.model("cart", cartSchema);
