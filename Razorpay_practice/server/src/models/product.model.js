import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: "INR"
        }
    },

})

const productModel = mongoose.model("products", productSchema);
export default productModel;