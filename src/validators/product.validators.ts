import * as Joi from "joi";

export const CreateProductSchema = Joi.object({
  title: Joi.string().min(2).trim().required(),
  amount: Joi.number().min(10).required(),
  categoryId: Joi.string().min(2).trim().required(),
});

export const EditProductSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().min(2).trim().optional(),
  amount: Joi.number().min(10).optional(),
  categoryId: Joi.string().min(2).trim().optional(),
});
