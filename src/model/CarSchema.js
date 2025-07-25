import mongoose from "mongoose";
import { type } from "os";

const carSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,ref: "User", required: true },
    carName: { type: String, required: true },
    carModel: { type: String, required: true },
    carNumber: { type: String, required: true },
    carColor: { type: String, required: true },
    carImage: { type: String, required: true },
    carType: { type: String, required: true },
    carPrice: { type: Number, required: true },
    carDescription: { type: String, required: true },
    carStatus: { type: String, default: "available" },
    updatedAtdAt: { type: Date, default: Date.now },
},
{timestamps:true}
);

const carImageSchema = new mongoose.Schema({
    carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
    carId:{type:mongoose.Schema.Types.ObjectId,ref:"Car"},
    images:{
        type:[String],
        required:true
    },
 
    
},{timestamps:true})

const Car = mongoose.model("Car", carSchema);
const CarImage = mongoose.model("CarImage", carImageSchema);
export { Car, CarImage };
    