import * as Joi from 'joi';

export const CreateSubTaskSchema = Joi.object({
  title: Joi.string().min(2).trim().required(),
  isDone: Joi.boolean().optional(),
  todoId: Joi.string().min(2).required()
});

export const EditSubTaskSchema = Joi.object({
  title: Joi.string().min(2).trim().optional(),
  isDone: Joi.boolean().optional(),
  todoId: Joi.string().min(2).optional(),
});

