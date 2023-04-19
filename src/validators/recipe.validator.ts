import * as Joi from "joi";

export const CreateRecipeSchema = Joi.object({
  title: Joi.string().trim().required(),
  desription: Joi.string().trim().required(),
  video: Joi.string().trim().required(),
  products: Joi.any(),
});

export const EditRecipeSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().trim().required(),
  desription: Joi.string().trim().required(),
  video: Joi.string().trim().required(),
  products: Joi.any(),
});
