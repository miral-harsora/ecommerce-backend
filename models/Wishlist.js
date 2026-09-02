const mongoose = require("mongoose");

// Store the selected catalogue item without requiring every display field.
const wishlistSchema = new mongoose.Schema(
    { id: { type: Number, required: true } },
    { strict: false, versionKey: false }
);

module.exports = mongoose.model("wishlist", wishlistSchema);
