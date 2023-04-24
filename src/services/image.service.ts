import Image from "../models/Image";

export default class ImageService {
  static async upload({ path }: any, userId: string) {
    return await await Image.build({ path, userId }).save();
  }
}
