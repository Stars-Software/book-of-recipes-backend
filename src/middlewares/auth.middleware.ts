import { Request, Response } from "express";
import { CustomError } from "../utils/error.util";
import { NextFunction } from "connect";

const passport = require("passport");

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: any, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user || info?.name === "TokenExpiredError") {
        const error = new CustomError(401, "Unathorized");
        return next(error);
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};
