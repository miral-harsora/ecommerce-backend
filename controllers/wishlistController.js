
const Wishlist = require("../models/Wishlist")



/**
 * @swagger
 * /wishlist:
 *  post:
 *      summary: used to insert product in wishlist collection
 *      description: Returns array of products added in wishlist
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/schemas/Wishlist'
 *      responses:
 *        200:
 *          description: successful operation
 *        500:
 *          description: failed to add product in wishlist
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/Wishlist'
 */
const addToWishlist=async(req,res)=>{
    try {
        const { id } = req.body;
        if (!Number.isFinite(id)) {
            return res.status(400).json({ error: "A numeric id is required." });
        }
        const product = await Wishlist.findOneAndUpdate(
            { id },
            { $set: { ...req.body, id } },
            { new: true, upsert: true, runValidators: true }
        );
        res.status(201).json({ message: "created", product });
    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

/**
 * @swagger
 * /wishlist:
 *  get:
 *      summary: used to fetch products in wishlist collection
 *      description: Returns array of products added in wishlist
 *      responses:
 *        200:
 *          description: successful operation
 *        500:
 *          description: failed 
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#components/schemas/Wishlist'
 */
const getWishlist=async(req,res)=>{
    try {
        const result = await Wishlist.find().select({ _id: 0, __v: 0 })
        // if (result.length==0) {
        //     return res.status(404).json({ error: "No products found in wishlist" })
        // }
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: "failed to fetch wishlist details" })
    }
}

/**
 * @swagger
 * /wishlist/{id}:
 *  delete:
 *      summary: deletes product from wishlist
 *      description: deletes product from wishlist
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
const removeFromWishlist=async(req,res)=>{
    try {
        const id = Number(req.params.id);
        if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid product id." });

        const result = await Wishlist.findOneAndDelete({id});
        if (!result) {
            return res.status(404).json({ error: "product not found!" });
        }
        res.status(200).json({ message: "product deleted successfully!" })


    } catch (error) {
        res.status(500).json({ "error": error.message })
    }
}

module.exports={addToWishlist,getWishlist,removeFromWishlist}
