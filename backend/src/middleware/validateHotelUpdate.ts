import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const coordinateSchema = Joi.object({
  lat: Joi.number().required(),
  lng: Joi.number().required(),
});

const validateHotelUpdate = (req: Request, res: Response, next: NextFunction) => {
  const createHotelSchema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    description: Joi.string().min(3).max(1000).required(),
    address: Joi.string().min(2).max(200).required(),
    coordinates: coordinateSchema.required(),
    type: Joi.string().max(50).required(),
    pricePerNight: Joi.number().min(0).required(),
    facilities: Joi.array().items(Joi.string()).required(),
    imageFiles: Joi.array().items(Joi.object()).min(1).max(5)
  });

  const { error } = createHotelSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  next()
};

export default validateHotelUpdate;
