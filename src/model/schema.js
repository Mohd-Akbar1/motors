import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String},
    phoneNumber:{type:String,required:true},
    isVerified:{type:Boolean,default:false},
    role:{type:String,
        enum:["buyer","seller","admin"],default:"buyer"},
    


    
},{timestamps:true})

const User=mongoose.model("User",userSchema)
export default User