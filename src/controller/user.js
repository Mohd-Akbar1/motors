import { CarImage } from "../model/CarSchema.js";

export class UsersController{
    static userinfo(req,res){
        res.send("user info")
    }

    static UploadImageArray=async(req,res)=>{
        try {

            const userId = req.body.userId;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        if(!req.file || req.file.length === 0) {
            return res.status(400).json({ error: 'No files were uploaded.' });
        }
         const uploadedUrls = [];
          const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "car-images" },
            (error, result) => {
              if (error) return reject(error);
              resolve(result.secure_url);
            }
          );
          stream.end(file.buffer);
        });
      });

      const urls = await Promise.all(uploadPromises);

      //db saving
       const carImage = await CarImage.create({ userId, images: urls });
       res.status(201).json({ message: "Images uploaded successfully", carImage });
            
        } catch (error) {

        console.error("Upload Error:", error);
      return res.status(500).json({ error: "Failed to upload images." });
            
        }

    
        
    }
}