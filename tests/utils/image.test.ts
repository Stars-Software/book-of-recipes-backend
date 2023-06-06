import { describe, it, expect, jest, beforeEach} from '@jest/globals';
import { ImageUtils, imageUtils } from '../../src/utils/image.util';
import { CustomError } from '../../src/utils/error.util';

jest.mock("fs");

describe("ImageUtils", () => {
  let mockFileHandler: any;
  let mockCompressor: any;
  let imageOptions: any;

  beforeEach(() => {
    mockFileHandler = {
      unlink: jest.fn((path: string, callback: Function) => {
        callback(null);
      }),
    };

    mockCompressor = jest.fn().mockReturnValue({
      resize: jest.fn().mockReturnThis(),
      toFormat: jest.fn().mockReturnThis(),
      jpeg: jest.fn().mockReturnThis(),
      toBuffer: jest.fn(),
    });

    imageOptions = {
      size: 350,
      quality: 75,
      format: "jpeg",
    };
  });

  describe("compress", () => {
    it("should compress the image with the given options", async () => {
      const imagePath = "/path/to/image.jpg";

      const imageUtilsInstance = new ImageUtils(
        mockFileHandler,
        mockCompressor,
        imageOptions
      );

      await imageUtilsInstance.compress(imagePath);

      expect(mockCompressor).toHaveBeenCalledWith(imagePath);
      expect(mockCompressor().resize).toHaveBeenCalledWith(imageOptions.size);
      expect(mockCompressor().toFormat).toHaveBeenCalledWith(
        imageOptions.format
      );
      expect(mockCompressor().jpeg).toHaveBeenCalledWith({
        quality: imageOptions.quality,
      });
      expect(mockCompressor().toBuffer).toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("should delete the file using the file handler", () => {
      const imagePath = "/path/to/image.jpg";

      const imageUtilsInstance = new ImageUtils(
        mockFileHandler,
        mockCompressor,
        imageOptions
      );

      imageUtilsInstance["delete"](imagePath);

      expect(mockFileHandler.unlink).toHaveBeenCalledWith(
        imagePath,
        expect.any(Function)
      );
    });

    it("should throw a CustomError if there is an error while deleting the file", () => {
      const imagePath = "/path/to/image.jpg";
      const mockError = new Error("Some error");

      mockFileHandler.unlink = jest.fn((path: string, callback: Function) => {
        callback(mockError);
      });

      const imageUtilsInstance = new ImageUtils(
        mockFileHandler,
        mockCompressor,
        imageOptions
      );

      expect(() => {
        imageUtilsInstance["delete"](imagePath);
      }).toThrow(CustomError);
      expect(() => {
        imageUtilsInstance["delete"](imagePath);
      }).toThrowError("Storage error!");
    });
  });
});

describe("imageUtils", () => {
  it("should export an instance of ImageUtils with the correct dependencies and options", () => {
    expect(imageUtils).toBeInstanceOf(ImageUtils);
    expect((imageUtils as any).options).toEqual({
      size: 350,
      quality: 75,
      format: "jpeg",
    });
  });
});