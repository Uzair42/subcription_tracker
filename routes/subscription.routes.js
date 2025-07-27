import { Router } from "express";

const subscriptionRouter=Router()
import {createSubscription} from '../controllers/subscription.controller.js';
import {
getAllSubscriptions,
getSubscriptionById,
updateSubscription,
deleteSubscription,
getUserSubscriptions,
cancelSubscription,
upcomingRenewalSubscriptions
} from '../controllers/subscription.controller.js';
import { authorizeMiddleware } from "../middleware/authorize.middleware.js";

// for subscription i have to deal with all use case of my api endponts


// get all user subcripitons
// get find subscripiton using get:id 
// create new subsciption using post 
// update subscription using :id
// delete subscription uisng :id 


subscriptionRouter.get('/upcomingrenewal',authorizeMiddleware,upcomingRenewalSubscriptions)

subscriptionRouter.get('/',authorizeMiddleware,getAllSubscriptions)

subscriptionRouter.get('/:id',authorizeMiddleware, getSubscriptionById)

subscriptionRouter.post('/',authorizeMiddleware, createSubscription)

subscriptionRouter.put('/:id',authorizeMiddleware, updateSubscription)

subscriptionRouter.delete('/:id',authorizeMiddleware, deleteSubscription)


// get subscription link to spacific user/:id 

subscriptionRouter.get('/user/:id',authorizeMiddleware,getUserSubscriptions)

// Cancel all Subscriptions 
// cancel all subscriptions those for id ,,, no more pay

subscriptionRouter.put('/:id/cancel',authorizeMiddleware,cancelSubscription)

// upcoming Subscription
//  those subscritpion which going to end soon 



export  {subscriptionRouter};