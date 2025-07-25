import {mongoose} from 'mongoose';
import {DATABASE_URL,NODE_ENV} from '../config/env.js'; 

 export const connectToDatabase = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with failure
    }
    }



