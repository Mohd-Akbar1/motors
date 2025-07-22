import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const client=new twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILLIO_AUTH_TOKEN)
export default client
