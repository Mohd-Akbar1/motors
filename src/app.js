import express from "express";
import dotenv from "dotenv";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import defaultRoutes from "./routes/index.js";
import { dbConnect } from "./model/dbcconnection.js";




dotenv.config();
app.use(cors(
    {
        origin:"http://localhost:3000",
        methods:["GET","POST"]

    }
));


const PORT = process.env.PORT || process.env.PORT1;


app.use(express.json());
app.use("/", defaultRoutes);
app.get("/", (req, res) => {
    res.send("Server is running");
});

await dbConnect()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});