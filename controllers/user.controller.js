//user.controller.js
// controllers/user.controller.js
import {User} from "../models/user.model.js";

import bcrypt from 'bcrypt';
export const getAllUsers = async (req, res,next) => {

  try {


    const users = await User.find().select("-password");
    res.status(200).send({
      message: "Get all users logic here",
      data: users,
    });


    
  } catch (error) {
  next(error);

  }

  
}

export const getUserById= async (req,res,next) => {
  
  
  try {

    const userId= req.params.id;

    // console.log(" apna debug mehtod User ID:", userId);


    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "Get user by ID logic here", data: user });
  } catch (error) {
    next(error);
  }

}

export const createUser = async (req,res, next) => {
  const userData=req.body;
  
}

export const updateUser = async (req, res, next ) => {
  

  try {

    const userId=req.params.id;
    const updateData=req.body;

    // hash the password if it is being updated
    if (updateData.password) {
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      updateData.password = hashedPassword;
    }
    // Find the user by ID and update
    // Use findByIdAndUpdate to update the user

    
    const updatedUserInfo = await User.findByIdAndUpdate(
      userId,
      updateData)
  

    if (!updatedUserInfo) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({
      message: "User updated successfully",
      data: updateData,
    });



  }
  catch (error) {
    next(error);
  }
}


export const deleteUser = async (req, res, next) => {
  
  try {


    const userId = req.params.id;

    // delete the user completely

    const deletedUser = await User.findByIdAndDelete(userId)

    if(!deletedUser)
    {
      const error = new Error("Unable to Delete the User")
      error.status=404
      next(error)
    }

    res.status(200).send({
      message: "User deleted successfully"
      ,
      data: deletedUser
      })
    

    
  } catch (error) {
    next(error)
  }




}

