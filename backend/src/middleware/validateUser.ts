import express, { Request, Response } from "express";
import Joi from "joi";


const validateUser = (req: Request) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required().min(3).max(200),
    password: Joi.string().min(5).max(255).required(),
  }).unknown(false);

  const result = schema.validate(req.body)

  return result;
};

export default validateUser;