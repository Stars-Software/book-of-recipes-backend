import { tokenUtils } from '../../src/utils/token.util';
import { describe, it, expect, afterEach, jest } from '@jest/globals';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('TokenUtils', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateTokens', () => {
    it('should generate access and refresh tokens', () => {
      const mockValue = { userId: '123' };
      const mockAccessToken = 'accessToken';
      const mockRefreshToken = 'refreshToken';

      (jwt.sign as jest.Mock).mockReturnValueOnce(mockAccessToken);
      (jwt.sign as jest.Mock).mockReturnValueOnce(mockRefreshToken);

      const tokens = tokenUtils.generateTokens(mockValue);

      expect(tokens.accessToken).toBe(`Bearer ${mockAccessToken}`);
      expect(tokens.refreshToken).toBe(mockRefreshToken);
      expect(jwt.sign).toHaveBeenCalledWith(
        mockValue,
        process.env.ACCESS_SECRET!,
        { expiresIn: process.env.ACCESS_EXPIRATION! }
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        mockValue,
        process.env.REFRESH_SECRET!,
        { expiresIn: process.env.REFRESH_EXPIRATION! }
      );
    });
  });

  describe('decodeToken', () => {
    it('should decode an access token', () => {
      const mockAccessToken = 'Bearer mockAccessToken';
      const mockDecodedToken = { userId: '123' };

      tokenUtils.decodeToken(mockAccessToken);

      expect(jwt.verify).toHaveBeenCalledWith(
        mockAccessToken.replace('Bearer ', ''),
        process.env.ACCESS_SECRET!
      );
    });

    it('should decode a refresh token', () => {
      const mockRefreshToken = 'mockRefreshToken';

      tokenUtils.decodeToken(mockRefreshToken);

      expect(jwt.verify).toHaveBeenCalledWith(
        mockRefreshToken,
        process.env.REFRESH_SECRET!
      );
    });
  });
});