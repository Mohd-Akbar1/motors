import express from "express";
import controller from "../controller/index.js";
import { upload } from "../utils/multer.js";


const router = express.Router();


//health check
router.get("/", controller.UsersController.userinfo);

// user uploads array of images of vehicle
router.post("/upload-images",upload.array("images",10),controller.UsersController.UploadImageArray);

export default router;