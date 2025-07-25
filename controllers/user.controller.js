//user.controller.js
// controllers/user.controller.js

export const getAllUsers = async (req, res) => {
  res.send({ message: 'Get all users logic here' });
}

export const getUserById= async (req,res,next) => {
  const userId=req.params.userId
  res.send({ message: `Get user by ID: ${userId} logic here` });

}

export const createUser = async (req,res, next) => {
  const userData=req.body;
  res.send({ message: 'Create new user logic here', data: userData });
}

export const updateUser = async (req, res, next ) => {
  const userId = req.params.userId;
  const updatedData = req.body;
  res.send({ message: `Update user with ID: ${userId} logic here`, data: updatedData });  
}


export const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  res.send({ message: `Delete user with ID: ${userId} logic here` });
}

