import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validateLogin = (req: Request, res: Response, next: NextFunction) => {

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const {error} = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message})
  }

  next()
};

export default validateLogin;