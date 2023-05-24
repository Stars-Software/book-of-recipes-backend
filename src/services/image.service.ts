import { imageUtils } from "../utils/image.util";
import Image from "../models/Image";

export default class ImageService {
  static async get(userId: string) {
    return await Image.findOne({ where: { userId } });
  }
  static async upload({ path }: any, userId: string) {
    await imageUtils.compress(path);
    return await Image.build({ path, userId }).save();
  }
  static async update({ path }: any, userId: string) {
    const prevUserImage = await this.get(userId);
    imageUtils.delete(prevUserImage);
    return await this.upload({ path }, userId);
  }
}
