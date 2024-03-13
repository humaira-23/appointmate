import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Please enter your name"
    },
    email: {
        type: String,
        required: "Please enter your email address",
        trim: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: "Please enter your phone number"
    },
    password: {
        type: String,
        required: "Please enter a password"
    },
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User