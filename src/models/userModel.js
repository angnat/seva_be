import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please enter your name"]
    },
    email : {
        type : String,
        require : [true, "Please provide your email address"],
        unique : [true,"This email already exist"],
        lowercase : true,
        validate : [validator.isEmail, "Please provide correct email address"]
    },
    picture : {
        type : String,
        default : "http://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existing_id.png"       
    },
    status : {
        type : String,
        default : "Hey there i'm using Seva"
    },
    password : {
        type : String,
        required : [true, "Please enter your password"],
        minLength : [6, "Please make sure your password at least 6 character"],
        maxLength : [50, "Please make sure your password less than 50 character"]
    }
}, 
{
    collection : "users",
    timestamps : true
});

const UserModel = mongoose.models.UserModel || mongoose.model("UserModel",userSchema);

export default UserModel;
