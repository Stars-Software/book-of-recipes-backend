import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/error.util';
import UserService from '../services/user.service';

export const checkEmailExistance = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const userByEmail = await UserService.getByEmail(email);
    if (userByEmail) {
      throw new CustomError(404, 'User with such email already exist');
    }
    next();
  } catch (error) {
    next(error);
  }
};
