import path from "path";
import { v4 as uuid } from "uuid";
import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import { CustomError } from "../utils/error.util";

const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
const dest = "images/";
const option = "file";

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    return cb(null, true);
  }
  return cb(new CustomError(500, "Error with image file"));
};

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, dest);
  },
  filename: function (_req, _file, cb) {
    cb(null, uuid());
  },
});

export const writeImage = (req: Request, res: Response, next: NextFunction) => {
  const handler = multer({ storage, fileFilter }).single(option);
  return handler(req, res, next);
};

export const serveImage = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { file } = req.params;
    const imagePath = dest + file;
    res.sendFile(path.resolve(imagePath));
  } catch (error) {
    next(error);
  }
};
