import { Router  } from "express";
import {getUserById,createUser,updateUser,deleteUser, getAllUsers} from '../controllers/user.controller.js';

import {authorizeMiddleware} from '../middleware/authorize.middleware.js';


const userRouter=Router();

userRouter.get('/',authorizeMiddleware,getAllUsers)

userRouter.get('/:id',authorizeMiddleware,getUserById)

userRouter.post('/',authorizeMiddleware,createUser)

userRouter.put('/:id',authorizeMiddleware, updateUser)


userRouter.delete('/:id',authorizeMiddleware,deleteUser)




export  {userRouter};