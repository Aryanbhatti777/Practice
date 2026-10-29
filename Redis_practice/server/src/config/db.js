import mongoose from 'mongoose'
import config from './env.config.js'

const connectToDb = async () => {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to db")
}

export default connectToDb;