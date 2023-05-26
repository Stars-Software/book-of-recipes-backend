import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error.util";

export const errorHandler = (
  err: Error | CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack);
  if (err instanceof CustomError) {
    const { status, message, code } = err;
    res.status(status).json({ error: { message, code } });
  } else {
    res
      .status(500)
      .json({ error: { message: err.message || "Server Error", code: 500 } });
  }
};
