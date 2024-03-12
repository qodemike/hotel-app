import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import myBookingsRoutes from "./routes/my-bookings";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import morgan from "morgan";
import path, { dirname } from "path";

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const databaseConnectionString =
  process.env.NODE_ENV === "production"
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI_DEV;

mongoose
  .connect(databaseConnectionString as string)
  .then(() => console.log("Connected to MongoDB..."));

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use(morgan('tiny'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/my-bookings", myBookingsRoutes);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
