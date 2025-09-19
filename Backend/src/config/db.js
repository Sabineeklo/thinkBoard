import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB connected Successfully !")
    } catch (error) {
        console.error("Error connecting to MONGODB")
        process.exit(1) //exit with failure
    }
    
}