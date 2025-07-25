import { Router } from "express";

const subscriptionRouter=Router()

// for subscription i have to deal with all use case of my api endponts


// get all user subcripitons
// get find subscripiton using get:id 
// create new subsciption using post 
// update subscription using :id
// delete subscription uisng :id 



subscriptionRouter.get('/',(req,res)=> res.send({"title":"get all subscriptions "}))

subscriptionRouter.get('/:id',(req,res)=> res.send({"title":"get id subscriptions "}))

subscriptionRouter.post('/',(req,res)=> res.send({"title":"Create new subscriptions "}))

subscriptionRouter.put('/:id',(req,res)=> res.send({"title":"update id subscriptions "}))

subscriptionRouter.delete('/:id',(req,res)=> res.send({"title":"delete id subscriptions "}))


// get subscription link to spacific user/:id 

subscriptionRouter.get('/user/:id',(req,res)=> res.send({"title":"get all subscriptions "}))

// Cancel all Subscriptions 
// cancel all subscriptions those for id ,,, no more pay

subscriptionRouter.put('/:id/cancel',(req,res)=>res.send({"title":"Cancel Subscription"}))

// upcoming Subscription
//  those subscritpion which going to end soon 

subscriptionRouter.put('/upcomingrenewal',(req,res)=>res.send({"title":"Upcoming  renewal  Subscription"}))


export  {subscriptionRouter};