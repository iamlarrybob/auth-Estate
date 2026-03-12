import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log("Mongo is already connected")
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URL)

        isConnected = true

        console.log("connected to mongodb");

    }

    catch (err) {
        console.log("MongoDB connection Error", err);

    }
}