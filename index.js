import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import verifyJWT from './middleware/auth.js';
import orderRouter from './routes/orderRouter.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors({}));  // Enable CORS for all routes (you can customize the options as needed

mongoose.connect(process.env.MONGO_URL).then( // Connection to MongoDB , use .env for security
    ()=>{
        console.log("Connected to MongoDB");
    }
).catch(
    ()=>{
        console.log("Connection failed");
    }
)

app.use(bodyParser.json()); // Parse JSON bodies
app.use(verifyJWT); // Middleware to verify JWT tokens

// Define routes
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/order", orderRouter)  

// Start the server
app.listen(5000,()=>{
    console.log("Server is running on port 5000");
}) 