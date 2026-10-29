import dotenv from 'dotenv'
dotenv.config();

const config = {
    MONGO_URI: process.env.MONGO_URI,
    RAZORPAY_API_KEY: process.env.RAZORPAY_API_KEY,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET
}

export default config