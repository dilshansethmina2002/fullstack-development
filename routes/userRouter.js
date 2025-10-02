import express from "express";
import { getUsers, loginUser, saveUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", saveUser)
userRouter.get("/", getUsers)
userRouter.post("/login", loginUser)

export default userRouter; 