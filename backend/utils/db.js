import mongoose from "mongoose";


const conectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_URI );
        console.log("mongoDB connected successfully");

        
    } catch (error) {
        console.log("mongoDB not connected");
        
    }
}
export default conectDB;
