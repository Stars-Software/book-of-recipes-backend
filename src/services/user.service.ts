import { PasswordUtil } from "../utils/password.util";
import { IUserSignUp, IUserSignIn } from "../types/user.type";
import { CustomError } from "../utils/error.util";
import User from "../models/User";
import { TokenService } from "./token.service";
import Image from "../models/Image";

export default class UserService {
  static async signUp(user: IUserSignUp) {
    user.password = PasswordUtil.hash(user.password);
    const createdUser = await User.build(user).save();
    return await TokenService.create(createdUser.dataValues.id);
  }

  static async getByEmail(email: string) {
    return await User.findOne({ where: { email } });
  }

  static async getById(id: string) {
    return await User.findOne({
      where: { id },
      include: [{ as: "avatar", model: Image }],
      exclude: ["password"],
    });
  }

  static async refresh(oldToken: string) {
    const tokenRecord = await TokenService.getByToken(oldToken);
    return await TokenService.update(tokenRecord.dataValues.userId);
  }

  static async signIn({ email, password }: IUserSignIn) {
    const user = await UserService.getByEmail(email);

    if (!user) {
      throw new CustomError(404, "Wrong email or password");
    }

    const { dataValues } = user;
    const isPasswordEquals = PasswordUtil.compare(
      password,
      dataValues.password
    );

    if (!isPasswordEquals) {
      throw new CustomError(404, "Wrong email or password");
    }

    return await TokenService.create(dataValues.id);
  }

  static async logOut(id: string) {
    return await TokenService.delete(id);
  }
}
