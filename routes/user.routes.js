import { Router  } from "express";

const userRouter=Router();

userRouter.get('/',(req,res)=> res.send({'title':"Get all Users "}))

userRouter.get('/:id',(req,res)=> res.send({'title':"Get :id User "}))

userRouter.post('/',(req,res)=> res.send({'title':"Create new User"}))

userRouter.put('/:id',(req,res)=> res.send({'title':"update id  User "}))


userRouter.delete('/',(req,res)=> res.send({'title':"delete id User"}))




export  {userRouter};