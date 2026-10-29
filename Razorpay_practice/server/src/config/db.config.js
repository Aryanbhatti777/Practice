import mongoose from 'mongoose'
import config from './env.config.js';


const connectToDb = async () => {
    
    try {
        
        await mongoose.connect(config.MONGO_URI);
        console.log("Database connected")
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default connectToDb;