import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import users from "./routes/users";
import auth from "./routes/auth";
import myHotels from "./routes/my-hotels";
import hotels from "./routes/hotels";
import myBookings from "./routes/my-bookings";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import morgan from "morgan";
import path  from "path";
import bodyParser from "body-parser";



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
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors({
  origin: true,
  credentials: true
}));

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/hotels", hotels);
app.use("/api/my-hotels", myHotels);
app.use("/api/my-bookings", myBookings);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Listening on port:${port}`);
});
