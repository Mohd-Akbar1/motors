import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import defaultRoutes from "./routes/index.js";



const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || process.env.PORT1;



app.use("/", defaultRoutes);
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});