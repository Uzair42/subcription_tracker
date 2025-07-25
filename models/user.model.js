import { Mongoose } from "mongoose";


const userSchema=new Mongoose.Schema(
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
        match: [/\S+@\S\.\S/,"please enter a valid email address"],
    
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:6,
        select:false // This will not return the password in the response

    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
}

)


// Export the user model
export const User = Mongoose.model('User', userSchema);