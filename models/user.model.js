import mongoose from "mongoose";


const userSchema= new mongoose.Schema(
{
    name:{
        type:String,
        required:[true,"User Name is required"],
        trim:true,
        minlength:3,
        maxlength:50
            
    },

    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email already exists"],
        trim:true,
        lowercase:true,
        // match: [ /\S+@\S\.\S/,"please enter a valid email address"],
match: [/.+\@.+\..+/,"galta hai bhai email address sahi daal"],

    //      validate: {
    //   validator: function(value) {
    //     // Regular expression for basic email format validation
    //     return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value); 
    //   },
    //   message: 'Invalid email address format'
    // }
    
    },
    password:{
        type:String,

        required:[true,"Password is required"],
        minlength:6,

    },
    phone:{
        type:String,
        required:[true,"Phone number is required"],
        unique:true,
        trim:true,
        // match: [/^\d{10}$/,"Please enter a valid phone number"]
    },
},{
    timestamps:true
}

)


// Export the user model
export const User = mongoose.model('User', userSchema);