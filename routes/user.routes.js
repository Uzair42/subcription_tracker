import { Router  } from "express";
import {getUserById,createUser,updateUser,deleteUser, getAllUsers} from '../controllers/user.controller.js';

import {authorizeMiddleware} from '../middleware/authorize.middleware.js';


const userRouter=Router();

userRouter.get('/',getAllUsers)

userRouter.get('/:id',authorizeMiddleware,getUserById)

userRouter.post('/',(req,res)=> res.send({'title':"Create new User"}))

userRouter.put('/:id', updateUser)


userRouter.delete('/:id',deleteUser)




export  {userRouter};