import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

export const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
export const upload=multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024
    },
    fileFilter:(req,file,cb)=>{
        if(file.mimetype.startsWith("image/")){
            cb(null,true)
        }else{
            cb(new Error("Unsupported file format only image is allowed"),false)
        }
    }
})

