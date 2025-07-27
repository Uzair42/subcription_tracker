// controllers/auth.controller.js
import mongoose from "mongoose";


import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import { User } from "../models/user.model.js"; 
import { JWT_SECRET_KEY, JWT_EXPIRES_IN } from "../config/env.js";


  // -----------------signUp controller logic -----------------//
    export const signUp = async (req,res,next)=>{ 


        // client side will send the Data in the request body 
        // using the post method which allow to html Form to send data
        const {name, email, password, phone} = req.body;
   console.log(` mra apna costom error debug :::: name: ${name}, email: ${email}, password: ${password}, phone: ${phone}`);
        // create database session to store the user data
        // and then save it to the database
       const startSession=  await mongoose.startSession()
        
        try {

           await startSession.startTransaction

            // check if user already exists 
            const isUserExists = await User.findOne({email});
            // console.log(` mra apna costom error debug :::: isUserExists: ${isUserExists}`);

            if(isUserExists){
                const error = new Error("User already exists with this email");
                error.statusCode = 409;// Conflict
                throw error;
            }


            // hash the password before saving it to the database
            // using the bcrypt library

            // create slat for passwor
            const salt = await bcrypt.genSalt(10);

            // hash the password with the salt
            const hashedPassword = await bcrypt.hash(password,salt);
            // console.log(` mra apna costom error debug :::: hashedPassword: ${hashedPassword}`);

            // create the user object
            // const user = new User({
            //    'name': name,
            //    'email' : email,
            //    'password' : hashedPassword,
            //    'phone' : phone
            // });

            // console.log(`mera apna costom error debug :::: user: ${user}`);

           
          



 // save the user to the database
            const savedUser = await User.create([{name,email,password:hashedPassword,phone}], { session: startSession });

             await startSession.commitTransaction
           await startSession.endSession 
            console.log(` mra apna costom error debug :::: savedUser: ${savedUser}`);

            // console.log(`mera apna costom error debug :::: scerte key : ${JWT_SECRET_KEY} and expires in : ${JWT_EXPIRES_IN}`);
            // create a JWT token for the user
            const token = jwt.sign(
                {userId: savedUser[0]._id, email: savedUser[0].email},
                 JWT_SECRET_KEY,
                {expiresIn: JWT_EXPIRES_IN}
            )



           res.status(201).json({
                message: "User created successfully",
                data: {
                    user: {
                        id: savedUser[0]._id,
                        name: savedUser[0].name,
                        email: savedUser[0].email,
                        phone: savedUser[0].phone
                    },
                    token
                }
            });


           
            
        } catch (error) {
            // handle the error
           (await startSession).abortTransaction
            startSession.endSession
            return next(error);

            
        }



        
 }


    // -----------------signIn controller logic -----------------//

export const signIn = async (req,res,next)=>{ 


                // signIn Logic 
                // user send data through post req in body 
                // extract the data from the request body
                // const {email, password} = req.body;
                // check is vailed entries 
                // compare with database 
                // hash password with bcrypt to compare with database
                // if match then create a JWT token and send it to the user
    

     

                const {email, password} = req.body;
     // database ka session start krna hai 
       const startSession = await mongoose.startSession();


     try {

        // start the transaction
        await startSession.startTransaction
           



        // check if user with email exists 
        const isUserExists = await User.findOne({"email":email}); // select the password field as well

        
        if(!isUserExists)
        {
            const error = new Error("User does not exists with this email");
            error.statusCode = 404; // Not Found
            throw error;
        }

        
        // console.log(` mra apna costom error debug :::: isUserExists: ${isUserExists} and email: ${isUserExists.email}
            // and  password: ${password}`);



        // compare the password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, isUserExists.password);

        if(isPasswordMatch === false){
            const error = new Error("Invalid password, Unable to sign in");
            error.statusCode = 401; // Unauthorized
            throw error;
        }



        // create a JWT token for the user
        const token = jwt.sign(
            {userId: isUserExists._id, email: isUserExists.email},
            JWT_SECRET_KEY,
            {expiresIn: JWT_EXPIRES_IN}
        )

        // commit the transaction
        await startSession.commitTransaction
        await startSession.endSession


        // send the response to the user
        res.status(200).json({
            "message": "User Signed in Successfully",
            "data": {
                user: {
                    id: isUserExists._id,
                    name: isUserExists.name,
                    email: isUserExists.email,
                    phone: isUserExists.phone
                },
                token
            }
        })

        // 
        
     } catch (error) {

        await startSession.abortTransaction
        await startSession.endSession
        return next(error);

        
     }



 }

export const signOut = async (req,res,next)=>{ 
    
    
   //sign out logic here 

}