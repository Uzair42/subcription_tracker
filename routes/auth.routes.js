import { Router  } from "express";

const authRouter=Router();

authRouter.post('/sign-up',(req,res)=> res.send({"title":" post sign-up"}))

authRouter.get('/sign-up',(req,res)=> res.send({"title":" get sign-up"}))

authRouter.post('/sign-in',(req,res)=> res.send({"title":"post sign-in"}))

authRouter.get('/sign-in',(req,res)=> res.send({"title":" get sign-in"}))

authRouter.get('/sign-out',(req,res)=> res.send({"title":" get sign-out"}))

export { authRouter}