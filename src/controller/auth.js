

import client from "../utils/twillio.js"
import { generateToken } from "../utils/generateToken.js"
import User from "../model/schema.js"

export  class AuthController{
    
    //send otp
    static sendOtp=async(req,res)=>{
       
        try {
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
        res.status(201).json({success:true,message:"Otp sent successfully"})
    
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
            
        }
    }
   
   // verify otp 
        static verifyOtp = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        console.log(phoneNumber, otp);

        const result = await client.verify.v2.services(process.env.TWILLIO_ServiceID)
            .verificationChecks.create({
                to: `+91${phoneNumber}`,
                code: otp
            });

        if (result.status === "approved") 
            {
            let existingUser = await User.findOne({ phoneNumber });

            if (!existingUser) {
                existingUser = new User({
                    phoneNumber,
                     isVerified: true
                });
            } else {
                existingUser.isVerified = true;
            }

            await existingUser.save();

            const token = generateToken(existingUser._id);
              res.status(201).json({ success: true, token });

        } else {
            res.status(400).json({ success: false, message: "Invalid OTP" });
        }

    } catch (error) {
        console.error(error);
         res.status(500).json({ success: false, error: error.message });
    }
}


}