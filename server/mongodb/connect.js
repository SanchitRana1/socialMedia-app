import mongoose from "mongoose"

const connectDB = async ()=>{
   try {
        mongoose.set('strictQuery',true);

        const conn = await mongoose.connect(process.env.MONGO_URI);
    
        console.log("MongoDB connected: " + conn.connection.host);
      } catch (error) {
        // console.log(error);
      }
}

export default connectDB;