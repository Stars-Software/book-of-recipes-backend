import { NextFunction, Response, Request } from 'express';
import { CustomError } from '../utils/error.util';

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      userId: string;
    };
  }
}


export const checkExistance =
  <T>(
    field: string,
    service: (userId: string, id: string) => Promise<T | null>
  ) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { body, params, user } = req;
      const { userId } = user;
      const param = body[field] || params[field];
      const record = await service(userId, param);
      if (!record) {
        throw new CustomError(404, 'Instance is not found');
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };
