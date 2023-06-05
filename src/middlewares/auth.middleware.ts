import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error.util";

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

      if (!user) {
        return next(new CustomError(401, "Wrong token"));
      }

      if (info && info.name === "TokenExpiredError") {
        return next(new CustomError(403, "Token expired"));
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};
