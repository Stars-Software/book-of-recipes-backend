import { NextFunction, Response, Request } from "express";
import { CustomError } from "../utils/error.util";

export const responseHandler =
  (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await fn(req, res, next);
      if (!value) {
        throw new CustomError(500, "Not found");
      }
      const { refreshToken } = value;
      if (refreshToken) res.cookie("refreshToken", value["refreshToken"]);
      res.json(value);
    } catch (error) {
      next(error);
    }
  };
