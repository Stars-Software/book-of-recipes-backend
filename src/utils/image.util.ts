import * as fs from "fs";
import { CustomError } from "./error.util";
const sharp = require("sharp");

class ImageUtils {
  private fileHandler: any;
  private resizingHandler: any;

  constructor() {
    this.fileHandler = fs;
    this.resizingHandler = sharp;
  }

  resize(path: string) {}

  delete(path: string) {
    this.fileHandler.unlink(path, (err: any) => {
      if (err) {
        return new CustomError(500, "Storage error!");
      }
    });
  }
}

export const imageUtils = new ImageUtils() 