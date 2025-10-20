import e from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { get } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export function saveUser(req, res) {

    if(req.body.role == "admin"){
        if(req.user==null){
            res.status(401).json({message : "You need to login first"});
            return;
        }

        if(req.user.role != "admin"){
            res.status(403).json({message : "You are not authorized to create an admin user"});
            return;
        }
    }

    const hashPassword = bcrypt.hashSync(req.body.password,10)
    const user = new User({
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : hashPassword,
        role : req.body.role,
    })

    user.save().then(()=>{
          res.json({message : "User saved successfully"})
    }).catch((error)=>{
          res.json({message : "Error saving user", error: error.message})
        }
    )
}

export function getUsers(req, res) {
    User.find().then((users)=>{
        res.json(users)
    }).catch((error)=>{
        res.json({message : "Error getting users", error: error.message})
    })
}

export function loginUser(req, res) {
    const reqEmail = req.body.email;
    const reqPassword = req.body.password; 

    User.findOne({
        email : reqEmail
    }).then((user)=>{
        if(user==null){
            res.status(401).json({
                message : "No user Found"
            })
        }else{
            const isPasswordIsValid =bcrypt.compareSync(reqPassword, user.password)
            if(isPasswordIsValid){
                const userData = {
                    email : user.email,
                    firstName : user.firstName,
                    lastName : user.lastName,
                    role : user.role,
                    phoneNumber : user.phoneNumber,
                    isDisabled : user.isDisabled,
                    isEmailVerified : user.isEmailVerified
                }
                const token =jwt.sign(userData,process.env.JWT_SECRET)
                res.status(200).json({
                    message : "User authenticated successfully",
                    token : token,
                    user : userData
                })
            }else{
                res.status(401).json({
                    message : "Authentication failed"
                })
            }
        }
    })
}