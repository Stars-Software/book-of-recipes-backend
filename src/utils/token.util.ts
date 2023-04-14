import jwt from 'jsonwebtoken';

type IEncodeData = {
  userId: string;
};

interface ITokenOptions {
  secretWord: string;
  expiresIn: string;
}

class TokenUtils {
  private accessOptions: ITokenOptions = {
    secretWord: process.env.ACCESS_SECRET!,
    expiresIn: process.env.ACCESS_EXPIRATION!,
  };
  private refreshOptions: ITokenOptions = {
    secretWord: process.env.REFRESH_SECRET!,
    expiresIn: process.env.REFRESH_EXPIRATION!,
  };

  private generate(value: IEncodeData, secretWord: string, expiresIn: string) {
    return jwt.sign(value, secretWord, {
      expiresIn,
    });
  }

  private getAccsessToken(value: IEncodeData) {
    const { secretWord, expiresIn } = this.accessOptions;
    const token = this.generate(value, secretWord, expiresIn);
    return `Bearer ${token}`;
  }

  private getRefreshToken(value: IEncodeData) {
    const { secretWord, expiresIn } = this.refreshOptions;
    return this.generate(value, secretWord, expiresIn);
  }

  generateTokens(value: IEncodeData) {
    const accessToken = this.getAccsessToken(value);
    const refreshToken = this.getRefreshToken(value);
    return { accessToken, refreshToken };
  }

  decodeToken(token: string) {
    const isAccessToken = token.includes('Bearer ');
    const { secretWord } = isAccessToken
      ? this.accessOptions
      : this.refreshOptions;
    if (isAccessToken) {
      token = token.replace('Bearer ', '');
    }
    return jwt.verify(token, secretWord);
  }
}

export const tokenUtils = new TokenUtils();
