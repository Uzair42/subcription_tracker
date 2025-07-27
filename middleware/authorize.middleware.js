

// Logic for dealing with authorization middleware

import mongoose from 'mongoose';
import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/env.js'; 


// plan sada hy ,, iss middleware ko use krna hy 
// jab koi bi kisi assy route pr jaye jo ki protected ho
// protected route ka matlab hy ki usko access krne ke liye
// user ko login hona padega yaani ki uska token valid hona chahiye
// agar token valid hoga to hi user ko access milega



// filhal k liye sirf user/id k ko protect karty hn...
//user jo sign-in hy oor uss k pass token bi hy wo token verify krwa 
// sirf apna profile dekh sakta hy
// agar user kisi aur ka profile dekhne ki koshish karega to usko access nahi milega
// user id oor token ko verify karke check karenge hoga 


export const authorizeMiddleware = async (req , res , next ) => {

    try {

        // Get the token from the request headers
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header missing or malformed' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET_KEY);

        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Find the user by ID from the decoded token
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Optionally check if user is active or not banned
        if (user.status === 'banned' || user.isDeleted) {
            return res.status(403).json({ message: 'User is banned or deleted' });
        }

        // Attach user to the request object for further use
        req.user = user;
        console.log("Apna debugg tariqa kar  request.usre object ::::\n ", req.user);

        // Optionally, restrict access to own profile only
        if (req.user.id && req.user.id !== user._id.toString()) {
            return res.status(403).json({ message: 'Access denied to other user profiles' });
        }

        next(); // Proceed to the next middleware or route handler  





        
    } catch (error) {
        
        console.error('Authorization error:', error);
        return res.status(401).json({ message: 'Unauthorized access' });


    }


}