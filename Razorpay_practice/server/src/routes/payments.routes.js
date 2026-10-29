import Router from 'express'
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';

const paymentRouter = Router();

paymentRouter.post("/:productId/order", createOrder);
paymentRouter.post("/verify", verifyPayment)

export default paymentRouter