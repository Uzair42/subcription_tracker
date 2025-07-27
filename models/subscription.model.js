import mongoose from "mongoose";   


const subscriptionSchema = new mongoose.Schema(
    {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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
        enum: ['daily','weekly','monthly', 'yearly'],
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
        default: Date.now,
        required: [false, "Subscription start date is required"],
        validator:{
            validate:(value)=> value <= new Date(),
            message: "Start date must be in the past"
        }
    },
   renewalDate: {
    type: Date,
    validate: {
        validator: function (value) {
            return value > this.startDate; 
        },
        message: "RenewalDate must be after start date"
    }
},
    
    
}, {
    timestamps: true
}
);


// Auto calculating the renewal databased on frequency

subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate && this.startDate && this.frequency) {
        let renewalDate = new Date(this.startDate);
        switch (this.frequency) {
            case 'daily':
                renewalDate.setDate(renewalDate.getDate() + 1);
                break;
            case 'weekly':
                renewalDate.setDate(renewalDate.getDate() + 7);
                break;
            case 'monthly':
                renewalDate.setMonth(renewalDate.getMonth() + 1);
                break;
            case 'yearly':
                renewalDate.setFullYear(renewalDate.getFullYear() + 1);
                break;
        }
        this.renewalDate = renewalDate;
    }

        const currentDate = new Date();

    if (this.renewalDate < currentDate && this.status !== 'cancelled')
    {
        this.status = 'expired'; // Automatically set status to inactive if renewal date has passed        
    }
    next();
});






// Export the subscription model
export const Subscription = mongoose.model('Subscription', subscriptionSchema);