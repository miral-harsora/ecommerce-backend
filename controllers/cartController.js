
const Cart = require("../models/Cart")


/**
 * @swagger
 * /cart:
 *  post:
 *      summary: used to insert product in cart collection
 *      description: Returns array of products added in cart
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/schemas/Cart'
 *      responses:
 *        200:
 *          description: successful operation
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/Cart'
 *        500:
 *          description: failed to add product in cart
 *         
 */
const addToCart = async (req, res) => {
    try {
        const { id, quantity = 1 } = req.body;
        if (!Number.isFinite(id) || !Number.isFinite(quantity) || quantity < 1) {
            return res.status(400).json({ error: "A numeric id and a positive quantity are required." });
        }

        const product = await Cart.findOneAndUpdate(
            { id },
            { $set: { ...req.body, id }, $setOnInsert: { quantity } },
            { new: true, upsert: true, runValidators: true }
        );
        res.status(201).json({ message: "created", product });
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

/**
 * @swagger
 * /cart:
 *  get:
 *      summary: used to fetch products in cart collection
 *      description: Returns array of products added in cart
 *      responses:
 *        200:
 *          description: successful operation
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/Cart'   
 *        500:
 *          description: failed 
 *         
 */
const getCart = async (req, res) => {
    try {
        const result = await Cart.find().select({ _id: 0, __v: 0 })
        // if (result.length==0) {
        //     return res.status(404).json({ error: "No products found in cart" })
        // }
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: "failed to fetch cart details" })
    }
}

/**
 * @swagger
 * /cart/{id}:
 *  put:
 *      summary: used to update product in cart collection
 *      description: updates product in cart
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: string id required 
 *            schema:
 *              type: string
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/schemas/Cart'
 *      responses:
 *        200:
 *          description: successful operation
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/Cart'
 *        404:
 *          description: product not found
 *        500:
 *          description: failed to update product in cart
 
 */
const updateCart = async(req,res)=>{
    try{
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid product id." });
        const result = await Cart.findOneAndUpdate({ id }, req.body, { new: true, runValidators: true })
        if (!result) {
            return res.status(404).json({ error: "product not found!" });
        }
        res.status(200).json({ message: "product updated successfully!", product: result })
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
    }

/**
 * @swagger
 * /cart/{id}:
 *  delete:
 *      summary: deletes product from cart
 *      description: deletes product from cart
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: string id required 
 *            schema:
 *              type: string
 *      responses:
 *        200:
 *          description: successful operation
 *        404:
 *          description: product not found
 *        500:
 *          description: failed 
 */
const removeFromCart = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid product id." });

        const result = await Cart.findOneAndDelete({id});
        if (!result) {
            return res.status(404).json({ error: "product not found!" });
        }
        res.status(200).json({ message: "product deleted successfully!" })


    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

module.exports = { addToCart, getCart, updateCart,removeFromCart }
