import express, { Request, Response } from "express";
import multer from "multer";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import { HotelType } from "../../entities/HotelType";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import validateHotel from "../middleware/validateHotel";
import { rmSync } from "fs";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels!" });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id.toString();

  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hotels!" });
  }
});

router.post(
  "/",
  verifyToken,
  validateHotel(),
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // Returns a URL after uploading to Cloudinary.
      const imageUrls = await uploadToCloudinary(imageFiles);

      const hotel = new Hotel({
        ...newHotel,
        imageUrls: imageUrls,
        lastUpdated: new Date(),
        userId: req.userId,
      });
      await hotel.save();

      res.status(201).send(hotel);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong!" });
    }
  }
);

router.put(
  "/:hotelId",
  verifyToken,
  validateHotel(),
  upload.array("imageFiles"),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;

      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        return res.status(404).json({ message: "Hotel not found!" });
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadToCloudinary(files);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];

      await hotel.save();
      res.status(201).json(hotel);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

router.delete("/:hotelId", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.hotelId);

    if (!hotel) return res.status(404).json({ message: "Hotel not found!" });

    return res.status(201).json(hotel);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
