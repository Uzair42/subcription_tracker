// subscription.controller.js
// controllers/subscription.controller.js   
import { Subscription } from '../models/subscription.model.js'; // Assuming you have a Subscription model
import { User } from '../models/user.model.js'; // Assuming you have a User model


export const getAllSubscriptions = async (req, res, next) => { 
  
    try {
       const getUserId= req.user._id; // Get the user ID from the authenticated user
         const subscriptions = await Subscription.find({ userId: getUserId }); // Fetch subscriptions for
         if (!subscriptions || subscriptions.length === 0) {
            return res.status(404).json({ message: 'No subscriptions found for this user' });
        }
        res.status(200).json({ message: 'Get all subscriptions are  here', data:
subscriptions });

    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}   

export const getSubscriptionById = async (req, res,next) => {
   
try {
    const subscriptionId = req.params.id;
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json({ message: 'Get subscription by ID logic here', data: subscription });

    
} catch (error) {
    next(error); // Pass the error to the error handling middleware
}

}

export const createSubscription = async (req, res, next) => {
    
    try{
   const createSubscriptionData = await Subscription.create({
         ...req.body, // Assuming req.body contains the necessary fields for creating a subscription,
         userId: req.user._id // Attach the userId from the authenticated user
    });
    
    if( !createSubscriptionData) {
        return res.status(400).json({ message: 'Failed to create subscription' });
    }
   
    res.status(201).json({ message: 'Subscription created successfully', data: createSubscriptionData });

    }
    catch(error) {
        next(error); 
    }
}

export const updateSubscription = async (req, next,res) => {
   

    try {
        
        const subscriptionId = req.params.id;
        const updateData = req.body;

        // Find the subscription by ID and update
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            subscriptionId,
            updateData,
            { new: true } // Return the updated document
        );

        if (!updatedSubscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json({ message: 'Subscription updated successfully', data: updatedSubscription });


    } catch (error) {
        next(error); // Pass the error to the error handling middleware
        
    }
}

export const deleteSubscription = async (req, res,next) => {

    try {

        const subscriptionId = req.params.id;

        // Find the subscription by ID and delete
        const deletedSubscription = await Subscription.findByIdAndDelete(subscriptionId);

        if (!deletedSubscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        res.status(200).json({ message: 'Subscription deleted successfully', data: deletedSubscription });

        
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
        
    }


}

export const getUserSubscriptions = async (req, res,next) => {
   
try {

    const userId = req.params.id;
    const userSubscriptions = await Subscription.find({ userId: userId });

    if (!userSubscriptions || userSubscriptions.length === 0) {
        return res.status(404).json({ message: 'No subscriptions found for this user' });
    }

    res.status(200).json({ message: 'Get user subscriptions logic here', data: userSubscriptions });

    
} catch (
   error
) {
    next(error); // Pass the error to the error handling middleware
}

}

export const cancelSubscription = async (req, res,next) => {
    
try {

    const subscriptionId = req.params.id;

    // Find the subscription by ID and update its status to 'cancelled'
    const cancelledSubscription = await Subscription.findByIdAndUpdate(
        subscriptionId,
        { status: 'cancelled' }, // Assuming you have a status field in your model
        { new: true } // Return the updated document
    );

    if (!cancelledSubscription) {
        return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json({ message: 'Subscription cancelled successfully', data: cancelledSubscription });
    
} catch (error) {
    next(error); // Pass the error to the error handling middleware
    
}

}   

export const upcomingRenewalSubscriptions = async (req, res,next) => {
try {

    const userid=req.user._id
    const upcomingSubscriptions = await Subscription.find({
        userId: userid,
        renewalDate: { $gte: new Date() }, // Assuming you have a renewalDate field in your model
        status: { $ne: 'cancelled' } // Exclude cancelled subscriptions
    });

    if (!upcomingSubscriptions || upcomingSubscriptions.length === 0) {
        return res.status(404).json({ message: 'No upcoming subscriptions found' });
    }

    res.status(200).json({ "message": "Upcoming renewal subscriptions logic here", data: upcomingSubscriptions });
    
} catch (error) {
    next(error); // Pass the error to the error handling middleware
    
}}   

