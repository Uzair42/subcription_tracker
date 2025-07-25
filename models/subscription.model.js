import mongoose from "mongoose";   


const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: [true, "Subscription description is required"],
        trim: true,
        minlength: 10,
        maxlength: 500
    },
    price: {
        type: Number,
        required: [true, "Subscription amount is required"],
        min: 0
        
    },
    currency: {
        type: String,
        enum:['USD','PKR','POND','RYAL'],
        required: [true, "Currency is required"],     
        default : 'USD',
        maxlength: 10
    },

    frequency: {
        type: String,
        enum: ['Daily','weekly','monthly', 'yearly'],
        required: [true, "Subscription frequency is required"],
        default: 'monthly'
    },

    category:{
        type: String,
        enum: ['Entertainment', 'Utilities', 'Food', 'Health', 'Education', 'Other'],
        required: [true, "Subscription category is required"],
        default: 'Other'
    }
,
    payment: {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer', 'Other'],
        required: [true, "Payment method is required"],
        default: 'Credit Card'
    },

    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    },
    
    startDate: {
        type: Date,
        required: [true, "Subscription start date is required"],
        validate:{
            validate:(value)=> value <= new Date(),
            message: "Start date must be in the past"
        }
    },
    renewalDate: {
        type: Date,
        required: [true, "Subscription renewal date is required"],
        validate:{
            validate:function (value){return value > this.startDate()},
            message: "RenewalDate must be after start date"
        }
    },
    
    
}, {
    timestamps: true
});


// Auto calculating the renewal databased on frequency

subscriptionSchema.pre('save', function(next) {
    const renewalFrequency = this.frequency;
    const startDate = this.startDate;   
    const renewalDate = new Date(startDate.getTime() + (renewalFrequency * 30 * 24 * 60 * 60 * 1000)); // Assuming frequency is in days, weeks, months, or years
})

// AUTO UPDATE STATUS IF RENEWAL DATE IS PASSED
subscriptionSchema.pre('save', function(next) {
    const currentDate = new Date();
    if (this.renewalDate < currentDate && this.status !== 'cancelled')
    {
        this.status = 'expired'; // Automatically set status to inactive if renewal date has passed        
    }
    next();
});




// Export the subscription model
export const Subscription = mongoose.model('Subscription', subscriptionSchema);