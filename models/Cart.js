const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  
    id: { type: Number, required: true },
    title:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    category:
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    discountPercentage:
    {
        type: String,
        required: true
    },
    rating:
    {
        type: String,
        required: true
    },
    stock:
    {
        type: Number,
        required: true
    },
    tags:
    {
        type: Array,
        required: true
    },
    brand:
    {
        type: String,
        required: false
    },
    sku:
    {
        type: String,
        required: true
    },
    weight:
    {
        type: Number,
        required: true
    },
    dimensions:
    {
        type: Object,
        required: true
    },
    warrantyInformation:
    {
        type: String,
        required: true
    },
    shippingInformation:
    {
        type: String,
        required: true
    },
    availabilityStatus:
    {
        type: String,
        required: true
    },
    reviews:
    {
        type: Array,
        required: true
    },
    returnPolicy:
    {
        type: String,
        required: true
    },
    minimumOrderQuantity:
    {
        type: Number,
        required: true
    },
    meta:
    {
        type: Object,
        required: true
    },
    images:
    {
        type: Array,
        required: true
    },
    thumbnail:
    {
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required:true
    }
})

const cart = mongoose.model("cart",cartSchema)
module.exports = cart;
