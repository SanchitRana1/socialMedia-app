import express from "express"
import bodyParser from "body-parser"

import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import connectDB from "./mongodb/connect.js"

import authRoutes from "./routes/authRoutes.js"
import { register } from "./controllers/auth.js"
import { createPost } from "./controllers/posts.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import { verifyToken } from "./middleware/auth.js"

import User from "./models/UserModel.js"
import Post from "./models/PostModel.js"
import { posts, users } from "./data/index.js"

/** CONFIGURATION */

const __filename = fileURLToPath(import.meta.url); //to get the file URL
const __dirname = path.dirname(__filename); //
dotenv.config(); // access .env file

const app = express();
app.use(express.json());
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors());//invoke cors policies
app.use("/assets",express.static(path.join(__dirname,"public/assets"))); //set directory of where we keep the assets


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"public/assets");
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    }
});

const upload= multer({storage});

// ROUTES with FILES
app.post("/auth/register",upload.single("picture"),register);
app.post("/posts",verifyToken, upload.single("picture"),createPost);

//ROUTES
app.use("/auth",authRoutes);
app.use("/user",userRoutes);
app.use("/post",postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5000;
try {
  connectDB();
  app.listen(PORT, () => {
    // User.insertMany(users);
    // Post.insertMany(posts)
    console.log(`Server has started on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}