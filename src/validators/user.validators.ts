import Joi from "joi";
import { RegExps } from "../config/regExps";

export const SignUpSchema = Joi.object({
  email: Joi.string().regex(RegExps.email).trim().required(),
  name: Joi.string().min(2).required(),
  password: Joi.string().regex(RegExps.password).required(),
  avatar: Joi.object({
    filename: Joi.string().required(),
    mimetype: Joi.string().required(),
    size: Joi.number().required(),
  }),
});

export const SignInSchema = Joi.object({
  email: Joi.string().regex(RegExps.email).required(),
  password: Joi.string().regex(RegExps.password).required(),
});
