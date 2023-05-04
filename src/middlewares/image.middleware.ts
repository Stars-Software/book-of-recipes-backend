import { Request, Response } from "express";

const multer = require("multer");

const dest = "images/";
const option = "file";

export const writeImage = (req: Request, res: Response) => {
  const handler = multer({ dest }).single(option);
  return handler(req, res);
};
