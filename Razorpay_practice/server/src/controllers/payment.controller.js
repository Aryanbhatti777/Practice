import paymentModel from "../models/payment.model.js";
import productModel from "../models/product.model.js";
import paymentInstance from "../config/razorpay.config.js";
import {validatePaymentVerification} from "razorpay/dist/utils/razorpay-utils.js"
import config from "../config/env.config.js";

export const createOrder = async (req, res) => {
    
    const { productId } = req.params;

    const product = await productModel.findById(productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found."
        })
    }

    const order = await paymentInstance.orders.create({
        amount: product.price.amount * 100,
        currency: product.price.currency,
        receipt: `rcpt_${Date.now()}`,
        notes: {
            productId: String(product._id)
        }
    })

    const payment = (await paymentModel.create({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        product: product._id,
        status: "pending"
    })).toObject();

    return res.status(201).json({
        ...payment, keyId: paymentInstance.key_id
    })
}

export const verifyPayment = async (req, res) => {

    const { orderId, paymentId, signature } = req.body;

    const order = await paymentModel.findOne({ orderId , status: "pending"});
    if (!order) {
        return res.status(404).json({
            messae: "Payment not found or already verified"
        })
    }

    const isValid = validatePaymentVerification({
        order_id: orderId,
        payment_id: paymentId
    }, signature, config.RAZORPAY_KEY_SECRET)

    if (!isValid) {
        return res.status(400).json({
            message: "Invalid payment verification"
        })
    }

    await paymentModel.updateOne({orderId}, {$set: { status: 'completed', paymentId, signature}})

    return res.status(200).json({message: "Paymen verified successfully."})
}