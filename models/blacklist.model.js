import mongoose from "mongoose";

const BlacklistSchema = new mongoose.Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true,
        }
    })

    export const Blacklist = mongoose.model('Blacklist', BlacklistSchema);



