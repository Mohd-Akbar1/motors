
import user from "../model/schema.js"
import client from "../utils/twillio.js"
import { generateToken } from "../utils/generateToken.js"

export  class AuthController{
    
    //send otp
    static sendOtp=async(req,res)=>{
       
        const {phoneNumber}=req.body
        if(!phoneNumber){
            return res.status(400).json({sucess:false,message:"Phone number is required"})
        }
       

        const otp=await client.verify.v2.services(process.env.TWILLIO_ServiceID)
        .verifications
        .create({
            to:`+91${phoneNumber}`,
            channel:"sms"
        })
        res.json({sucess:true,message:"Otp sent successfully"})
    }
    //verify otp 
    static verifyOtp=async(req,res)=>{

        try {
            
            const {phoneNumber,otp}=req.body
        const result=await client.verify.v2.services(process.env.TWILIO_ACCOUNT_SID)
        .verificationChecks
        .create({
            to:`+91${phoneNumber}`,
            code:otp
        })

        if(result.status==="approved"){
            let user=await user.findOne({phoneNumber})
            if(!user){
                user=new user({
                    phoneNumber,
                    isVerified:true
                })
            }else{
                user.isVerified=true
            }
            await user.save()
            const token=generateToken(user._id)
            res.status(201).json({sucess:true,token})
           
        }else{
            res.status(400).json({sucess:false,message:"Invalid OTP"})
        }

        } catch (error) {
            console.log(error)
            res.status(500).json({sucess:false,error:error.message})
            
        }
        
    }

}