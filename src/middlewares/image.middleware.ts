import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { CustomError } from "../utils/error.util";
import * as express from "express";

const dest = "images/";
const option = "file";

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (allowedFileTypes.includes(file.mimetype)) {
    return cb(null, true);
  }
  return cb(new CustomError(500, "Error with file"));
};

export const writeImage = (req: Request, res: Response, next: NextFunction) => {
  const handler = multer({ dest, fileFilter }).single(option);
  return handler(req, res, next);
};

export const serveImage = express.static(dest);
