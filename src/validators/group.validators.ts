import * as Joi from 'joi';

export const GroupSchema = Joi.object({
  title: Joi.string().min(2).trim().required(),
});
