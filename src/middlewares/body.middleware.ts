import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { CustomError } from '../utils/error.util';

export const validateBody =
  <T extends Joi.ObjectSchema>(schema: T) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw new CustomError(400, 'Invalid input!');
      }
      return next();
    } catch (error) {
      next(error);
    }
  };
