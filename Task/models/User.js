import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);

export default User;
