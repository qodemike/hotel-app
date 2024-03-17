import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import mongoose from "mongoose";

const coordinateSchema = Joi.object({
  lat: Joi.string()
    .required()
    .messages({ "string.base": "latitude is required." }),
  lng: Joi.string()
    .required()
    .messages({ "string.base": "longitude is required." }),
});

const validateHotel = (req: Request, res: Response, next: NextFunction) => {
    
  if (mongoose.Types.ObjectId.isValid(req.body.hoteId))
    return res.status(400).json({ message: "Invalid hotelId" });

  const createHotelSchema = Joi.object({
    hotelId: Joi.string(),
    name: Joi.string().min(2).max(200).required(),
    description: Joi.string().min(3).max(1000).required(),
    address: Joi.string().min(2).max(200).required(),
    coordinates: coordinateSchema.required(),
    adultCount: Joi.string().min(0).max(20).required(),
    childCount: Joi.string().min(0).max(20).required(),
    starRating: Joi.string().required(),
    type: Joi.string().max(50).required(),
    pricePerNight: Joi.number().min(0).required(),
    facilities: Joi.array().items(Joi.string()).required(),
    imageUrls: Joi.array().items(Joi.string())
  });

  const { error } = createHotelSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  next();
};

export default validateHotel;
