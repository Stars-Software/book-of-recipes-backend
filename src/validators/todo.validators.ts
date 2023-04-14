import * as Joi from 'joi';
// prettier-ignore

export const CreateTodoSchema = Joi.object({
  title: Joi.string().min(2).trim().required(),
  isDone: Joi.boolean().optional(),
  groupId: Joi.string().min(2).trim().optional(),
});


export const EditTodoSchema = Joi.object({
  title: Joi.string().min(2).trim().optional(),
  isDone: Joi.boolean().optional(),
  groupId: Joi.string().min(2).trim().optional(),
});