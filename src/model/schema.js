import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String},
    phoneNumber:{type:String,required:true},
    isVerified:{type:Boolean,default:false},

    
},{timestamps:true})

const user=mongoose.model("user",userSchema)
export default user