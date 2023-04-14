import Token from '../models/Token';
import { tokenUtils } from '../utils/token.util';

export class TokenService {
  static async getByToken(token: string) {
    return await Token.findOne({ where: { token } });
  }

  static async getByUserId(userId: string) {
    return await Token.findOne({ where: { userId } });
  }

  static async create(userId: string) {
    const tokens = tokenUtils.generateTokens({ userId });
    await Token.create({
      token: tokens.refreshToken,
      userId,
    });
    return tokens;
  }

  static async update(userId: string) {
    const tokens = tokenUtils.generateTokens({ userId });
    await Token.update(
      {
        token: tokens.refreshToken,
      },
      { where: { userId } }
    );

    return tokens;
  }

  static async delete(userId: string) {
    return await Token.destroy({ where: { userId } });
  }
}
