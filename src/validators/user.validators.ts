import Joi from "joi";
import { RegExps } from "../config/regExps";

export const SignUpSchema = Joi.object({
  email: Joi.string().regex(RegExps.email).trim().required(),
  avatar: Joi.object()
    .keys({
      path: Joi.string().required(),
      lastModified: Joi.number(),
      lastModifiedDate: Joi.date(),
      name: Joi.string().required(),
      size: Joi.number().required(),
      type: Joi.string().required(),
      webkitRelativePath: Joi.string(),
    })
    .required(),
  name: Joi.string().min(2).required(),
  password: Joi.string().regex(RegExps.password).required(),
});

export const SignInSchema = Joi.object({
  email: Joi.string().regex(RegExps.email).required(),
  password: Joi.string().regex(RegExps.password).required(),
});
