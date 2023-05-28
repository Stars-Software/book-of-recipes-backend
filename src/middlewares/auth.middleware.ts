import { NextFunction, Response } from "express";
import { IRequest } from "../types/request.type";
import { CustomError } from "../utils/error.util";

const passport = require("passport");

export const authenticate = (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (err: Error, user: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      const error = new CustomError(500, "Not authed!");
      return next(error);
    }

    req.user = user;
    next();
  })(req, res, next);
};
