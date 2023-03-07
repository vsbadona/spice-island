import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
       required : true
    },
    phone : Number,
    email : {
        type : String,
       required : true
    },
    image : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    },
    password : {
        type : String,
       required : true
    },
    role : {
        type : String,
        default : "user"
    },
    token: {
        type: String
    },
})

const User = mongoose.model("User",userSchema)
export default User