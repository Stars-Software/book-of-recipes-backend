import * as fs from "fs";
import { CustomError } from "./error.util";
import path from "path";
const sharp = require("sharp");

const options: ImageOptions = {
  size: 350,
  quality: 75,
  format: "jpeg",
};

type ImageOptions = {
  size: number;
  quality: number;
  format: string;
};

class ImageUtils {
  private fileHandler: any;
  private compressor: any;
  public options: ImageOptions;

  constructor(fileHandler: any, compressor: any, options: ImageOptions) {
    this.fileHandler = fileHandler;
    this.compressor = compressor;
    this.options = options;
  }
  //find out the soluton with file extension
  async compress(filePath: string) {
    const { size, quality, format } = this.options;
    await this.compressor(filePath)
      .resize(size)
      .toFormat(format)
      .jpeg({ quality })
      .toBuffer();
  }

  delete(path: string) {
    this.fileHandler.unlink(path, (err: any) => {
      if (err) {
        throw new CustomError(500, "Storage error!");
      }
    });
  }
}

export const imageUtils = new ImageUtils(fs, sharp, options);
