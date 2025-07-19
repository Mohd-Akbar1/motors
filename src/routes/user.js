import express from "express";
import controller from "../controller/index.js";
const router = express.Router();

router.get("/", controller.UsersController.userinfo);
export default router;