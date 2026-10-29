import Razorpay from 'razorpay'
import config from './env.config.js'

const paymentInstance = new Razorpay({
    key_id: config.RAZORPAY_API_KEY,
    key_secret: config.RAZORPAY_KEY_SECRET
})

export default paymentInstance;